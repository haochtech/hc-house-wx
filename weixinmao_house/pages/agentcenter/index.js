var _Page;

function _defineProperty(e, o, a) {
    return o in e ? Object.defineProperty(e, o, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[o] = a, e;
}

var R_htmlToWxml = require("../../resource/js/htmlToWxml.js"), imageUtil = require("../../resource/js/images.js"), app = getApp();

Page((_defineProperty(_Page = {
    data: {
        showmsg: !0
    },
    onLoad: function(e) {
        wx.setNavigationBarTitle({
            title: "经纪人中心"
        });
        var o = this;
        app.util.request({
            url: "entry/wxapp/GetSysInit",
            data: {},
            success: function(e) {
                e.data.message.errno || (wx.setStorageSync("companyinfo", e.data.data.intro), wx.setNavigationBarTitle({
                    title: wx.getStorageSync("companyinfo").name
                }), console.log(e.data.data.intro), e.data.data.intro.maincolor || (e.data.data.intro.maincolor = "#3274e5"), 
                wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: e.data.data.intro.maincolor,
                    animation: {
                        duration: 400,
                        timingFunc: "easeIn"
                    }
                }), o.setData({
                    intro: e.data.data.intro
                }));
            },
            complete: function() {
                wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
        });
    },
    onReady: function() {},
    toOrderlist: function(e) {
        var o = e.currentTarget.dataset.id;
        console.log(o), wx.navigateTo({
            url: "/weixinmao_house/pages/orderlist/index?id=" + o
        });
    },
    toMypubs: function(e) {
        wx.navigateTo({
            url: "/weixinmao_house/pages/mypub/index"
        });
    },
    toFxrecord: function() {
        wx.navigateTo({
            url: "/weixinmao_house/pages/fxrecord/index"
        });
    },
    toBindUser: function() {
        wx.navigateTo({
            url: "/weixinmao_house/pages/binduser/index"
        });
    },
    toFxhouse: function() {
        wx.navigateTo({
            url: "/weixinmao_house/pages/fxhouse/index"
        });
    },
    toMoneyrecord: function() {
        wx.navigateTo({
            url: "/weixinmao_house/pages/moneyrecord/index"
        });
    },
    toJoinuser: function() {
        wx.navigateTo({
            url: "/weixinmao_house/pages/myletpub/index?id=0"
        });
    },
    toMyteam: function() {
        wx.navigateTo({
            url: "/weixinmao_house/pages/guestmsg/index"
        });
    },
    toMyspread: function() {
        wx.navigateTo({
            url: "/weixinmao_house/pages/myspread/index"
        });
    },
    toMyletpub: function(e) {
        var o = e.currentTarget.dataset.id;
        console.log(o), wx.navigateTo({
            url: "/weixinmao_house/pages/myletpub/index?id=" + o
        });
    },
    toMysalepub: function(e) {
        var o = e.currentTarget.dataset.id;
        console.log(o), wx.navigateTo({
            url: "/weixinmao_house/pages/mysalepub/index?id=" + o
        });
    },
    toMyHouse: function(e) {
        wx.navigateTo({
            url: "/weixinmao_house/pages/myhouse/index"
        });
    }
}, "toMoneyrecord", function(e) {
    wx.navigateTo({
        url: "/weixinmao_house/pages/moneyrecord/index"
    });
}), _defineProperty(_Page, "onShow", function() {
    var o = this;
    this.checkuser({
        doServices: function() {
            var e = wx.getStorageSync("userInfo");
            console.log(e.wxInfo), o.setData({
                userinfo: e
            });
        }
    });
}), _defineProperty(_Page, "onHide", function() {}), _defineProperty(_Page, "onUnload", function() {}), 
_defineProperty(_Page, "onPullDownRefresh", function() {}), _defineProperty(_Page, "binduserinfo", function(e) {
    var o = this;
    o.data.showmsg = !1;
    var a = wx.getStorageSync("userInfo");
    app.util.request({
        url: "entry/wxapp/getuserinfo",
        data: {
            sessionid: a.sessionid,
            uid: a.memberInfo.uid
        },
        success: function(e) {
            o.setData({
                user: e.data.data,
                showmsg: o.data.showmsg
            });
        }
    });
}), _defineProperty(_Page, "saveuserinfo", function(e) {
    var o = this, a = e.detail.value.name, n = e.detail.value.tel;
    o.data.showmsg = !0;
    var t = wx.getStorageSync("userInfo");
    "" != a ? "" != n ? app.util.request({
        url: "entry/wxapp/saveuserinfo",
        data: {
            sessionid: t.sessionid,
            uid: t.memberInfo.uid,
            name: a,
            tel: n
        },
        success: function(e) {
            if (0 != e.data.errno) return wx.hideLoading(), void wx.showModal({
                title: "失败",
                content: e.data.msg,
                showCancel: !1
            });
            wx.showToast({
                title: "操作成功",
                icon: "success",
                duration: 2e3
            }), o.setData({
                showmsg: o.data.showmsg
            });
        }
    }) : wx.showModal({
        title: "提示",
        content: "请填写您的手机号",
        showCancel: !1
    }) : wx.showModal({
        title: "提示",
        content: "请填写您的姓名",
        showCancel: !1
    });
}), _defineProperty(_Page, "closemsg", function(e) {
    this.data.showmsg = !0, this.setData({
        showmsg: this.data.showmsg
    });
}), _defineProperty(_Page, "onReachBottom", function() {}), _defineProperty(_Page, "toMycouponlist", function(e) {
    wx.navigateTo({
        url: "/weixinmao_house/pages/couponlist/index"
    });
}), _defineProperty(_Page, "Puboldhouse", function(e) {
    wx.navigateTo({
        url: "/weixinmao_house/pages/pub/index"
    });
}), _defineProperty(_Page, "onShareAppMessage", function() {}), _defineProperty(_Page, "checkuser", function(o) {
    var a = this, e = (o = o, wx.getStorageSync("userInfo"));
    return e ? e.memberInfo.uid ? void app.util.request({
        url: "entry/wxapp/checkuserinfo",
        data: {
            sessionid: e.sessionid,
            uid: e.memberInfo.uid
        },
        success: function(e) {
            0 == e.data.data.error ? (console.log(o), o.doServices()) : 2 == e.data.data.error && o.doServices();
        }
    }) : (console.log("tmddddsssssqqqqs1111"), app.util.getUserInfo(function(e) {
        a.setData({
            userinfo: e
        });
    }), !1) : (console.log("tmddddssssss222222"), app.util.getUserInfo(function(e) {
        a.setData({
            userinfo: e
        });
    }), !1);
}), _Page));