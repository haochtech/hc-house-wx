var R_htmlToWxml = require("../../resource/js/htmlToWxml.js"), imageUtil = require("../../resource/js/images.js"), app = getApp();

Page({
    data: {
        id: 0,
        ordertype: 1
    },
    onLoad: function(a) {
        wx.setNavigationBarTitle({
            title: "我的订单"
        });
        var t = this;
        0 < t.data.id ? t.data.ordertype = t.data.id : (t.data.ordertype = a.id, t.data.id = a.id);
        var e = wx.getStorageSync("companyinfo");
        "" == e.maincolor && (e.maincolor = "#3274e5"), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: e.maincolor,
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
    initpage: function() {
        var t = this, a = wx.getStorageSync("userInfo"), e = t.data.ordertype;
        app.util.request({
            url: "entry/wxapp/myorderlist",
            data: {
                ordertype: e,
                sessionid: a.sessionid,
                uid: a.memberInfo.uid
            },
            success: function(a) {
                a.data.message.errno || (a.data.data.intro.maincolor || (a.data.data.intro.maincolor = "#3274e5"), 
                wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: a.data.data.intro.maincolor,
                    animation: {
                        duration: 400,
                        timingFunc: "easeIn"
                    }
                }), t.setData({
                    list: a.data.data.list,
                    ordertype: e
                }));
            }
        });
    },
    bindGetUserInfo: function(a) {
        var t = this;
        app.util.getUserInfo(function(a) {
            console.log(a), t.data.isuser = !0, t.setData({
                userinfo: a,
                isuser: t.data.isuser
            });
        }, a.detail);
    },
    onReady: function() {},
    tabClick: function(a) {
        var t = this, e = a.currentTarget.id, o = wx.getStorageSync("userInfo");
        app.util.request({
            url: "entry/wxapp/myorderlist",
            data: {
                ordertype: e,
                sessionid: o.sessionid,
                uid: o.memberInfo.uid
            },
            success: function(a) {
                a.data.message.errno || t.setData({
                    list: a.data.data.list,
                    ordertype: e
                });
            }
        });
    },
    delOrder: function(a) {
        var t = this, e = a.currentTarget.dataset.id, o = wx.getStorageSync("userInfo");
        wx.showModal({
            title: "订单取消",
            content: "确认取消订单？",
            success: function(a) {
                a.confirm && app.util.request({
                    url: "entry/wxapp/delOrder",
                    data: {
                        id: e,
                        sessionid: o.sessionid,
                        uid: o.memberInfo.uid
                    },
                    success: function(a) {
                        console.log(a), t.onLoad();
                    },
                    fail: function(a) {
                        console.log(a);
                    }
                });
            }
        });
    },
    RepayOrder: function(a) {
        var o = this;
        this.checkuser({
            doServices: function() {
                var t = a.currentTarget.dataset.id, e = wx.getStorageSync("userInfo");
                wx.showModal({
                    title: "订单支付",
                    content: "是否确认订单？",
                    success: function(a) {
                        a.confirm && app.util.request({
                            url: "entry/wxapp/repay",
                            data: {
                                id: t,
                                sessionid: e.sessionid,
                                uid: e.memberInfo.uid
                            },
                            success: function(a) {
                                a.data && a.data.data && wx.requestPayment({
                                    timeStamp: a.data.data.timeStamp,
                                    nonceStr: a.data.data.nonceStr,
                                    package: a.data.data.package,
                                    signType: "MD5",
                                    paySign: a.data.data.paySign,
                                    success: function(a) {
                                        o.onLoad();
                                    },
                                    fail: function(a) {}
                                });
                            },
                            fail: function(a) {
                                console.log(a);
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
        var a = wx.getStorageSync("userInfo");
        return a && a.memberInfo.uid ? void app.util.request({
            url: "entry/wxapp/checkuserinfo",
            data: {
                sessionid: a.sessionid,
                uid: a.memberInfo.uid
            },
            success: function(a) {
                0 == a.data.data.error ? (console.log(t), t.doServices()) : 2 == a.data.data.error && t.doServices();
            }
        }) : (app.util.getUserInfo(), !1);
    }
});