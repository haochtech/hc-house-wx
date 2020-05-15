var R_htmlToWxml = require("../../resource/js/htmlToWxml.js"), imageUtil = require("../../resource/js/images.js"), app = getApp();

Page({
    data: {
        id: 0,
        ordertype: 1
    },
    onLoad: function(a) {
        wx.setNavigationBarTitle({
            title: "我的收藏"
        });
        var o = this;
        this.checkuser({
            doServices: function() {
                var e = wx.getStorageSync("userInfo");
                if (0 < o.data.id) var t = o.data.id; else {
                    t = a.id;
                    o.data.id = a.id;
                }
                t = o.data.ordertype;
                app.util.request({
                    url: "entry/wxapp/mysavelist",
                    data: {
                        ordertype: t,
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
                        }), o.setData({
                            list: e.data.data.list,
                            housetype: e.data.data.housetype,
                            ordertype: t
                        }));
                    }
                });
            }
        });
    },
    toHouseDetail: function(e) {
        var t = e.currentTarget.dataset.id, a = this.data.ordertype;
        1 == a ? wx.navigateTo({
            url: "/weixinmao_house/pages/newhousedetail/index?id=" + t
        }) : 2 == a ? wx.navigateTo({
            url: "/weixinmao_house/pages/oldhousedetail/index?id=" + t
        }) : wx.navigateTo({
            url: "/weixinmao_house/pages/lethousedetail/index?id=" + t
        });
    },
    onReady: function() {},
    tabClick: function(a) {
        var o = this;
        this.checkuser({
            doServices: function() {
                var t = a.currentTarget.id, e = wx.getStorageSync("userInfo");
                app.util.request({
                    url: "entry/wxapp/mysavelist",
                    data: {
                        ordertype: t,
                        sessionid: e.sessionid,
                        uid: e.memberInfo.uid
                    },
                    success: function(e) {
                        e.data.message.errno || o.setData({
                            list: e.data.data.list,
                            housetype: e.data.data.housetype,
                            ordertype: t
                        });
                    }
                });
            }
        });
    },
    delOrder: function(e) {
        var o = this;
        this.checkuser({
            doServices: function() {
                var t = e.currentTarget.dataset.id, a = wx.getStorageSync("userInfo");
                wx.showModal({
                    title: "订单取消",
                    content: "确认取消订单？",
                    success: function(e) {
                        e.confirm && app.util.request({
                            url: "entry/wxapp/delOrder",
                            data: {
                                id: t,
                                sessionid: a.sessionid,
                                uid: a.memberInfo.uid
                            },
                            success: function(e) {
                                console.log(e), o.onLoad();
                            },
                            fail: function(e) {
                                console.log(e);
                            }
                        });
                    }
                });
            }
        });
    },
    RepayOrder: function(e) {
        var o = this;
        this.checkuser({
            doServices: function() {
                var t = e.currentTarget.dataset.id, a = wx.getStorageSync("userInfo");
                wx.showModal({
                    title: "订单支付",
                    content: "是否确认订单？",
                    success: function(e) {
                        e.confirm && app.util.request({
                            url: "entry/wxapp/repay",
                            data: {
                                id: t,
                                sessionid: a.sessionid,
                                uid: a.memberInfo.uid
                            },
                            success: function(e) {
                                e.data && e.data.data && wx.requestPayment({
                                    timeStamp: e.data.data.timeStamp,
                                    nonceStr: e.data.data.nonceStr,
                                    package: e.data.data.package,
                                    signType: "MD5",
                                    paySign: e.data.data.paySign,
                                    success: function(e) {
                                        o.onLoad();
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