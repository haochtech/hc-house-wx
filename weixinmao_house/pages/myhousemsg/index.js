var R_htmlToWxml = require("../../resource/js/htmlToWxml.js"), imageUtil = require("../../resource/js/images.js"), app = getApp();

Page({
    data: {
        id: 0,
        ordertype: 1
    },
    onLoad: function(a) {
        wx.setNavigationBarTitle({
            title: "我的预约"
        });
        var e = this;
        0 < e.data.id ? e.data.ordertype = e.data.id : (e.data.ordertype = a.id, e.data.id = a.id);
        var t = wx.getStorageSync("companyinfo");
        "" == t.maincolor && (t.maincolor = "#3274e5"), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: t.maincolor,
            animation: {
                duration: 400,
                timingFunc: "easeIn"
            }
        });
        var o = wx.getStorageSync("userInfo");
        console.log(o), o ? (e.data.isuser = !0, e.initpage(), e.setData({
            userinfo: o
        })) : e.data.isuser = !1, e.setData({
            isuser: e.data.isuser
        });
    },
    toPayOrder: function(a) {
        var e = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_house/pages/payhouse/index?id=" + e
        });
    },
    initpage: function() {
        var e = this, a = wx.getStorageSync("userInfo");
        e.data.ordertype;
        app.util.request({
            url: "entry/wxapp/myhousemsg",
            data: {
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
                }), e.setData({
                    list: a.data.data.list
                }));
            }
        });
    },
    bindGetUserInfo: function(a) {
        var e = this;
        app.util.getUserInfo(function(a) {
            console.log(a), e.data.isuser = !0, e.setData({
                userinfo: a,
                isuser: e.data.isuser
            });
        }, a.detail);
    },
    onReady: function() {},
    tabClick: function(a) {
        var e = this, t = a.currentTarget.id, o = wx.getStorageSync("userInfo");
        app.util.request({
            url: "entry/wxapp/myorderlist",
            data: {
                ordertype: t,
                sessionid: o.sessionid,
                uid: o.memberInfo.uid
            },
            success: function(a) {
                a.data.message.errno || e.setData({
                    list: a.data.data,
                    ordertype: t
                });
            }
        });
    },
    delOrder: function(a) {
        var e = this, t = a.currentTarget.dataset.id, o = wx.getStorageSync("userInfo");
        wx.showModal({
            title: "订单取消",
            content: "确认取消订单？",
            success: function(a) {
                a.confirm && app.util.request({
                    url: "entry/wxapp/delOrder",
                    data: {
                        id: t,
                        sessionid: o.sessionid,
                        uid: o.memberInfo.uid
                    },
                    success: function(a) {
                        console.log(a), e.onLoad();
                    },
                    fail: function(a) {
                        console.log(a);
                    }
                });
            }
        });
    },
    payOrder: function(a) {
        var e = this, t = a.currentTarget.dataset.id, o = wx.getStorageSync("userInfo");
        wx.showModal({
            title: "订单支付",
            content: "是否确认订单？",
            success: function(a) {
                a.confirm && app.util.request({
                    url: "entry/wxapp/repay",
                    data: {
                        id: t,
                        sessionid: o.sessionid,
                        uid: o.memberInfo.uid
                    },
                    success: function(a) {
                        a.data && a.data.data && wx.requestPayment({
                            timeStamp: a.data.data.timeStamp,
                            nonceStr: a.data.data.nonceStr,
                            package: a.data.data.package,
                            signType: "MD5",
                            paySign: a.data.data.paySign,
                            success: function(a) {
                                e.onLoad();
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
    },
    onShow: function() {},
    toComment: function(a) {
        var e = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_house/pages/comment/index?id=" + e
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    checkuser: function(e) {
        e = e;
        var a = wx.getStorageSync("userInfo");
        return a && a.memberInfo.uid ? void app.util.request({
            url: "entry/wxapp/checkuserinfo",
            data: {
                sessionid: a.sessionid,
                uid: a.memberInfo.uid
            },
            success: function(a) {
                0 == a.data.data.error ? (console.log(e), e.doServices()) : 2 == a.data.data.error && e.doServices();
            }
        }) : (app.util.getUserInfo(), !1);
    }
});