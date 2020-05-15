var R_htmlToWxml = require("../../resource/js/htmlToWxml.js"), imageUtil = require("../../resource/js/images.js"), app = getApp();

Page({
    data: {
        id: 0,
        ordertype: 1
    },
    onLoad: function(e) {
        wx.setNavigationBarTitle({
            title: "客户预约"
        });
        var t = this, a = wx.getStorageSync("companyinfo");
        "" == a.maincolor && (a.maincolor = "#3274e5"), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: a.maincolor,
            animation: {
                duration: 400,
                timingFunc: "easeIn"
            }
        });
        var o = wx.getStorageSync("userInfo");
        console.log(o), o ? (t.data.isuser = !0, t.initpage(), t.setData({
            userinfo: o
        })) : t.data.isuser = !1, t.setData({
            isuser: t.data.isuser
        });
    },
    toPayOrder: function(e) {
        var t = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_house/pages/payhouse/index?id=" + t
        });
    },
    initpage: function() {
        var t = this, e = wx.getStorageSync("userInfo"), a = t.data.ordertype;
        app.util.request({
            url: "entry/wxapp/myguestmsg",
            data: {
                sessionid: e.sessionid,
                uid: e.memberInfo.uid,
                ordertype: a
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
    bindGetUserInfo: function(e) {
        var t = this;
        app.util.getUserInfo(function(e) {
            console.log(e), t.data.isuser = !0, t.setData({
                userinfo: e,
                isuser: t.data.isuser
            });
        }, e.detail);
    },
    onReady: function() {},
    tabClick: function(e) {
        this.data.ordertype = e.currentTarget.id, this.initpage();
    },
    delOrder: function(e) {
        var t = this, a = e.currentTarget.dataset.id, o = wx.getStorageSync("userInfo");
        wx.showModal({
            title: "订单取消",
            content: "确认取消订单？",
            success: function(e) {
                e.confirm && app.util.request({
                    url: "entry/wxapp/delOrder",
                    data: {
                        id: a,
                        sessionid: o.sessionid,
                        uid: o.memberInfo.uid
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
    payOrder: function(e) {
        var t = this, a = e.currentTarget.dataset.id, o = wx.getStorageSync("userInfo");
        wx.showModal({
            title: "订单支付",
            content: "是否确认订单？",
            success: function(e) {
                e.confirm && app.util.request({
                    url: "entry/wxapp/repay",
                    data: {
                        id: a,
                        sessionid: o.sessionid,
                        uid: o.memberInfo.uid
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
    toComment: function(e) {
        var t = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_house/pages/comment/index?id=" + t
        });
    },
    doCall: function(e) {
        console.log(e.currentTarget);
        var t = e.currentTarget.dataset.tel;
        wx.makePhoneCall({
            phoneNumber: t,
            success: function() {
                console.log("拨打电话成功！");
            },
            fail: function() {
                console.log("拨打电话失败！");
            }
        });
    },
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