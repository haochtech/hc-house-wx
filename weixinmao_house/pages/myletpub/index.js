var R_htmlToWxml = require("../../resource/js/htmlToWxml.js"), imageUtil = require("../../resource/js/images.js"), app = getApp();

Page({
    data: {
        ordertype: 1
    },
    onLoad: function(e) {
        wx.setNavigationBarTitle({
            title: "经纪人发布"
        });
        var t = this;
        t.data.ordertype;
        wx.getStorageSync("userInfo").sessionid ? t.initpage() : app.util.getUserInfo(function() {
            console.log("tmmmrrrr"), t.initpage();
        });
    },
    initpage: function() {
        var t = this, e = wx.getStorageSync("userInfo"), a = t.data.ordertype;
        app.util.request({
            url: "entry/wxapp/myletpublist",
            data: {
                ordertype: a,
                sessionid: e.sessionid,
                uid: e.memberInfo.uid
            },
            success: function(e) {
                e.data.message.errno || (e.data.data.intro.maincolor || (e.data.data.intro.maincolor = "#3274e5"), 
                wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: e.data.data.intro.maincolor,
                    animation: {
                        duration: 400,
                        timingFunc: "easeIn"
                    }
                }), t.setData({
                    list: e.data.data.list,
                    ordertype: a
                }));
            }
        });
    },
    delOrder: function(e) {
        var t = this, a = e.currentTarget.dataset.id, n = wx.getStorageSync("userInfo");
        wx.showModal({
            title: "删除信息",
            content: "确认删除信息？",
            success: function(e) {
                e.confirm && app.util.request({
                    url: "entry/wxapp/delOldhouseinfo",
                    data: {
                        id: a,
                        sessionid: n.sessionid,
                        uid: n.memberInfo.uid
                    },
                    success: function(e) {
                        console.log(e), t.onLoad();
                    },
                    fail: function(e) {
                        console.log(e);
                    }
                });
            }
        });
    },
    delLetOrder: function(e) {
        var t = this, a = e.currentTarget.dataset.id, n = wx.getStorageSync("userInfo");
        wx.showModal({
            title: "删除信息",
            content: "确认删除信息？",
            success: function(e) {
                e.confirm && app.util.request({
                    url: "entry/wxapp/delLethouseinfo",
                    data: {
                        id: a,
                        sessionid: n.sessionid,
                        uid: n.memberInfo.uid
                    },
                    success: function(e) {
                        console.log(e), t.onLoad();
                    },
                    fail: function(e) {
                        console.log(e);
                    }
                });
            }
        });
    },
    goSaveuser: function(e) {
        var t = e.currentTarget.dataset.id;
        console.log(t), wx.navigateTo({
            url: "/weixinmao_house/pages/saveuser/index?id=" + t
        });
    },
    onReady: function() {},
    tabClick: function(e) {
        var t = this, a = e.currentTarget.id, n = wx.getStorageSync("userInfo");
        app.util.request({
            url: "entry/wxapp/myletpublist",
            data: {
                ordertype: a,
                sessionid: n.sessionid,
                uid: n.memberInfo.uid
            },
            success: function(e) {
                e.data.message.errno || t.setData({
                    list: e.data.data.list,
                    ordertype: a
                });
            }
        });
    },
    RepayOrder: function(e) {
        var t = this, a = e.currentTarget.dataset.id, n = wx.getStorageSync("userInfo");
        wx.showModal({
            title: "订单支付",
            content: "是否确认订单？",
            success: function(e) {
                e.confirm && app.util.request({
                    url: "entry/wxapp/repay",
                    data: {
                        id: a,
                        sessionid: n.sessionid,
                        uid: n.memberInfo.uid
                    },
                    success: function(e) {
                        e.data && e.data.data && wx.requestPayment({
                            timeStamp: e.data.data.timeStamp,
                            nonceStr: e.data.data.nonceStr,
                            package: e.data.data.package,
                            signType: "MD5",
                            paySign: e.data.data.paySign,
                            success: function(e) {
                                t.onLoad();
                            },
                            fail: function(e) {}
                        });
                    },
                    fail: function(e) {
                        console.log(e);
                    }
                });
            }
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    checkuser: function(t) {
        t = t;
        var e = wx.getStorageSync("userInfo");
        return e && e.memberInfo.uid ? void app.util.request({
            url: "entry/wxapp/checkuserinfo",
            data: {
                sessionid: e.sessionid,
                uid: e.memberInfo.uid
            },
            success: function(e) {
                0 == e.data.data.error ? (console.log(t), t.doServices()) : 2 == e.data.data.error && t.doServices();
            }
        }) : (app.util.getUserInfo(), !1);
    }
});