var R_htmlToWxml = require("../../resource/js/htmlToWxml.js"), imageUtil = require("../../resource/js/images.js"), app = getApp();

Page({
    data: {
        showmsg: !0,
        isuser: !0,
      islogin: !0
    },
  cancel_login: function (e) {
    this.setData({
      islogin: !0
    });
  },
  onLogin: function(e) {
    this.setData({
      islogin: !1,
    });
  },
    onShow: function(e) {
        wx.setNavigationBarTitle({
            title: "会员中心"
        });
        var a = this, o = wx.getStorageSync("userInfo");
        console.log(o), o && o.hasOwnProperty("wxInfo") ? (a.data.isuser = !0, a.setData({
            userinfo: o
        }), app.util.request({
            url: "entry/wxapp/Getuserinfo",
            data: {
                uid: o.memberInfo.uid
            },
            success: function(e) {console.log(e)
                e.data.message.errno || a.setData({
                    score: e.data.data.score
                });
            }
        })) : a.data.isuser = !1, a.setData({
            isuser: a.data.isuser
        }), app.util.request({
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
                }), a.setData({
                    intro: e.data.data.intro
                }));
            },
            complete: function() {
                wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
        });
    },
    bindGetUserInfo: function(e) {console.log(e)
        var n = this;
        app.util.getUserInfo(function(a) {
            console.log(a), n.data.isuser = !0;
            var e = a.memberInfo.uid, o = a.wxInfo.nickName, t = a.wxInfo.avatarUrl;
            n.data.isuser = !0, n.setData({
                userinfo: a,
                isuser: n.data.isuser
            }), app.util.request({
                url: "entry/wxapp/Updateuserinfo",
                data: {
                    uid: e,
                    nickname: o,
                    avatarUrl: t
                },
                success: function(e) {console.log(e)
                    e.data.message.errno || (app.globalData.isuser = !0, n.setData({
                        userinfo: a,
                        isuser: n.data.isuser,
                        score: e.data.data.userinfo.score,
                        islogin: !0
                    }));
                }
            });
        }, e.detail);
    },
    onReady: function() {},
    toOrderlist: function(e) {
        var a = e.currentTarget.dataset.id;
        console.log(a), wx.navigateTo({
            url: "/weixinmao_house/pages/orderlist/index?id=" + a
        });
    },
    toMycomment: function() {
        wx.navigateTo({
            url: "/weixinmao_house/pages/mycomment/index"
        });
    },
    toMysave: function() {
        wx.navigateTo({
            url: "/weixinmao_house/pages/mysave/index"
        });
    },
    toMycomplain: function() {
        wx.navigateTo({
            url: "/weixinmao_house/pages/mycomplain/index"
        });
    },
    toFxuser: function() {
        wx.navigateTo({
            url: "/weixinmao_house/pages/fxuser/index"
        });
    },
    toMyhousemsg: function() {
        wx.navigateTo({
            url: "/weixinmao_house/pages/myhousemsg/index"
        });
    },
    toMypubs: function(e) {
        wx.navigateTo({
            url: "/weixinmao_house/pages/mypub/index"
        });
    },
    toBindUser: function() {
        wx.navigateTo({
            url: "/weixinmao_house/pages/binduser/index"
        });
    },
    toJoinuser: function() {
        wx.navigateTo({
            url: "/weixinmao_house/pages/joinuser/index?id=0"
        });
    },
    toMyteam: function() {
        wx.navigateTo({
            url: "/weixinmao_house/pages/myteam/index"
        });
    },
    toPaymoney: function() {
        wx.navigateTo({
            url: "/weixinmao_house/pages/paymoney/index"
        });
    },
    toMyspread: function() {
        wx.navigateTo({
            url: "/weixinmao_house/pages/myspread/index"
        });
    },
    toMyletpub: function(e) {
        e.currentTarget.dataset.id;
        var a = wx.getStorageSync("userInfo");console.log(a)
        app.util.request({
            url: "entry/wxapp/Checkagent",
            data: {
                sessionid: a.sessionid,
                uid: a.memberInfo.uid
            },
            success: function(e) {
                1 == e.data.data.error ? wx.navigateTo({
                    url: "/weixinmao_house/pages/agentcenter/index"
                }) : wx.showModal({
                    title: "提示",
                    content: e.data.data.msg,
                    showCancel: !1
                });
            }
        });
    },
    toMysalepub: function(e) {
        var a = e.currentTarget.dataset.id;
        console.log(a), wx.navigateTo({
            url: "/weixinmao_house/pages/mysalepub/index?id=" + a
        });
    },
    toMyHouse: function(e) {
        wx.navigateTo({
            url: "/weixinmao_house/pages/myhouse/index"
        });
    },
    toMoneyrecord: function(e) {
        wx.navigateTo({
            url: "/weixinmao_house/pages/moneyrecord/index"
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    binduserinfo: function(e) {
        var a = this;
        a.data.showmsg = !1;
        var o = wx.getStorageSync("userInfo");console.log(o)
        app.util.request({
            url: "entry/wxapp/getuserinfo",
            data: {
                sessionid: o.sessionid,
                uid: o.memberInfo.uid
            },
            success: function(e) {
                a.setData({
                    user: e.data.data,
                    showmsg: a.data.showmsg
                });
            }
        });
    },
    getusers: function() {
        app.util.getUserInfo(function(e) {
            console.log(e);
        });
    },
    saveuserinfo: function(e) {
        var a = this, o = e.detail.value.name, t = e.detail.value.tel;
        a.data.showmsg = !0;
        var n = wx.getStorageSync("userInfo");console.log(n)
        "" != o ? "" != t ? app.util.request({
            url: "entry/wxapp/saveuserinfo",
            data: {
                sessionid: n.sessionid,
                uid: n.memberInfo.uid,
                name: o,
                tel: t
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
                }), a.setData({
                    showmsg: a.data.showmsg
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
    },
    closemsg: function(e) {
        this.data.showmsg = !0, this.setData({
            showmsg: this.data.showmsg
        });
    },
    onReachBottom: function() {},
    toMycouponlist: function(e) {
        wx.navigateTo({
            url: "/weixinmao_house/pages/couponlist/index"
        });
    },
    Puboldhouse: function(e) {
        wx.navigateTo({
            url: "/weixinmao_house/pages/pub/index"
        });
    },
    onShareAppMessage: function() {},
    checkuser: function(a) {
        var o = this, e = (a = a, wx.getStorageSync("userInfo"));console.log(e)
        return e ? e.memberInfo.uid ? void app.util.request({
            url: "entry/wxapp/checkuserinfo",
            data: {
                sessionid: e.sessionid,
                uid: e.memberInfo.uid
            },
            success: function(e) {
                0 == e.data.data.error ? (console.log(a), a.doServices()) : 2 == e.data.data.error && a.doServices();
            }
        }) : (console.log("tmddddsssssqqqqs1111"), app.util.getUserInfo(function(e) {
            o.setData({
                userinfo: e
            });
        }), !1) : (console.log("tmddddssssss222222"), app.util.getUserInfo(function(e) {
            o.setData({
                userinfo: e
            });
        }), !1);
    }
});