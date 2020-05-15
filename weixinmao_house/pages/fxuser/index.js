var R_htmlToWxml = require("../../resource/js/htmlToWxml.js"), imageUtil = require("../../resource/js/images.js"), app = getApp();

Page({
    data: {
        showmsg: !0,
        gourl: "",
      isuser: !0
    },
  cancel_login: function (e) {
    this.setData({
      isuser: !0
    });
    wx.navigateBack();
  },
  onLogin: function () {
    this.setData({
      isuser: !1,
    });
  },
  bindGetUserInfo: function (e) {
    var n = this;
    app.util.getUserInfo(function (a) {
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
        success: function (e) {
          e.data.message.errno || (app.globalData.isuser = !0, n.setData({
            userinfo: a,
            isuser: n.data.isuser,
          }));
        }
      });
    }, e.detail);
  },
    onLoad: function(o) {
        wx.setNavigationBarTitle({
            title: "会员中心"
        });
      var e = this, o = wx.getStorageSync("userInfo");
      console.log(o);
      if(!o) {e.setData({
        isuser: false
      });}
        app.util.request({
            url: "entry/wxapp/GetSysInit",
            data: {},
            success: function(o) {
                o.data.message.errno || (wx.setStorageSync("companyinfo", o.data.data.intro), wx.setNavigationBarTitle({
                    title: wx.getStorageSync("companyinfo").name
                }), console.log(o.data.data.intro), o.data.data.intro.maincolor || (o.data.data.intro.maincolor = "#3274e5"), 
                wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: o.data.data.intro.maincolor,
                    animation: {
                        duration: 400,
                        timingFunc: "easeIn"
                    }
                }), e.setData({
                    intro: o.data.data.intro
                }));
            },
            complete: function() {
                wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
        });
    },
    onReady: function() {},
    toOrderlist: function(o) {
        var e = o.currentTarget.dataset.id;
        console.log(e), wx.navigateTo({
            url: "/weixinmao_house/pages/orderlist/index?id=" + e
        });
    },
    toMypubs: function(o) {
        wx.navigateTo({
            url: "/weixinmao_house/pages/mypub/index"
        });
    },
    toFxrecord: function() {
        this.data.gourl = "/weixinmao_house/pages/fxrecord/index", this.Checkcoupon();
    },
    toBindUser: function() {
        wx.navigateTo({
            url: "/weixinmao_house/pages/binduser/index"
        });
    },
    toFxhouse: function() {
        this.data.gourl = "/weixinmao_house/pages/fxhouse/index", this.Checkcoupon();
    },
    toMoneyrecord: function() {
        this.data.gourl = "/weixinmao_house/pages/moneyrecord/index", this.Checkcoupon();
    },
    toJoinuser: function() {
        var e = this;
        e.data.gourl = "/weixinmao_house/pages/joinuser/index?id=0";
        var o = wx.getStorageSync("userInfo");
        app.util.request({
            url: "entry/wxapp/Checkcoupon",
            data: {
                sessionid: o.sessionid,
                uid: o.memberInfo.uid
            },
            success: function(o) {
                0 == o.data.data.error ? wx.navigateTo({
                    url: e.data.gourl
                }) : wx.showModal({
                    title: "提示",
                    content: o.data.data.msg,
                    showCancel: !1
                });
            }
        });
    },
    toMyteam: function() {
        this.data.gourl = "/weixinmao_house/pages/myteam/index", this.Checkcoupon();
    },
    toMyspread: function() {
        this.data.gourl = "/weixinmao_house/pages/myspread/index", this.Checkcoupon();
    },
    toMyletpub: function(o) {
        var e = o.currentTarget.dataset.id;
        console.log(e), wx.navigateTo({
            url: "/weixinmao_house/pages/myletpub/index?id=" + e
        });
    },
    toMysalepub: function(o) {
        var e = o.currentTarget.dataset.id;
        console.log(e), wx.navigateTo({
            url: "/weixinmao_house/pages/mysalepub/index?id=" + e
        });
    },
    toMyHouse: function(o) {
        wx.navigateTo({
            url: "/weixinmao_house/pages/myhouse/index"
        });
    },
    onShow: function() {
        var e = this;
        this.checkuser({
            doServices: function() {
                var o = wx.getStorageSync("userInfo");
                console.log(o.wxInfo), e.setData({
                    userinfo: o
                });
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    binduserinfo: function(o) {
        var e = this;
        e.data.showmsg = !1;
        var t = wx.getStorageSync("userInfo");
        app.util.request({
            url: "entry/wxapp/getuserinfo",
            data: {
                sessionid: t.sessionid,
                uid: t.memberInfo.uid
            },
            success: function(o) {
                e.setData({
                    user: o.data.data,
                    showmsg: e.data.showmsg
                });
            }
        });
    },
    saveuserinfo: function(o) {
        var e = this, t = o.detail.value.name, a = o.detail.value.tel;
        e.data.showmsg = !0;
        var n = wx.getStorageSync("userInfo");
        "" != t ? "" != a ? app.util.request({
            url: "entry/wxapp/saveuserinfo",
            data: {
                sessionid: n.sessionid,
                uid: n.memberInfo.uid,
                name: t,
                tel: a
            },
            success: function(o) {
                if (0 != o.data.errno) return wx.hideLoading(), void wx.showModal({
                    title: "失败",
                    content: o.data.msg,
                    showCancel: !1
                });
                wx.showToast({
                    title: "操作成功",
                    icon: "success",
                    duration: 2e3
                }), e.setData({
                    showmsg: e.data.showmsg
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
    closemsg: function(o) {
        this.data.showmsg = !0, this.setData({
            showmsg: this.data.showmsg
        });
    },
    onReachBottom: function() {},
    toMycouponlist: function(o) {
        wx.navigateTo({
            url: "/weixinmao_house/pages/couponlist/index"
        });
    },
    Puboldhouse: function(o) {
        wx.navigateTo({
            url: "/weixinmao_house/pages/pub/index"
        });
    },
    Checkcoupon: function(o) {
        var e = this, t = wx.getStorageSync("userInfo");
        app.util.request({
            url: "entry/wxapp/Checkcoupon",
            data: {
                sessionid: t.sessionid,
                uid: t.memberInfo.uid
            },
            success: function(o) {
                1 == o.data.data.error ? wx.navigateTo({
                    url: e.data.gourl
                }) : wx.showModal({
                    title: "提示",
                    content: o.data.data.msg,
                    showCancel: !1
                });
            }
        });
    },
    onShareAppMessage: function() {},
    checkuser: function(e) {
        var t = this, o = (e = e, wx.getStorageSync("userInfo"));
        return o ? o.memberInfo.uid ? void app.util.request({
            url: "entry/wxapp/checkuserinfo",
            data: {
                sessionid: o.sessionid,
                uid: o.memberInfo.uid
            },
            success: function(o) {
                0 == o.data.data.error ? (console.log(e), e.doServices()) : 2 == o.data.data.error && e.doServices();
            }
        }) : (console.log("tmddddsssssqqqqs1111"), app.util.getUserInfo(function(o) {
            t.setData({
                userinfo: o
            });
        }), !1) : (console.log("tmddddssssss222222"), app.util.getUserInfo(function(o) {
            t.setData({
                userinfo: o
            });
        }), !1);
    }
});