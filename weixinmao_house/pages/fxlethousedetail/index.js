var _data, _Page;

function _defineProperty(a, t, e) {
  return t in a ? Object.defineProperty(a, t, {
    value: e,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : a[t] = e, a;
}

var WxParse = require("../../resource/wxParse/wxParse.js"),
  QQMapWX = require("../../resource/js/qqmap-wx-jssdk.min.js"),
  app = getApp();

Page((_defineProperty(_Page = {
  data: (_data = {
      images: {},
      autoplay: !0,
      interval: 3e3,
      duration: 1e3,
      title: "",
      address: "",
      lat: 0,
      lng: 0,
      id: 0
    }, _defineProperty(_data, "title", ""), _defineProperty(_data, "showmsg", !0), _defineProperty(_data, "isuser", !0),
    _defineProperty(_data, "hdimg", []), _defineProperty(_data, "circular", !0), _defineProperty(_data, "indicatorDots", !1),
    _defineProperty(_data, "indicatorcolor", "#000"), _defineProperty(_data, "vertical", !1),
    _defineProperty(_data, "imgheights", []), _defineProperty(_data, "imgwidth", 750),
    _defineProperty(_data, "current", 0), _defineProperty(_data, "showpay", !0), _defineProperty(_data, "paytype", 0),
    _defineProperty(_data, "shownotice", !0), _defineProperty(_data, "shownoti", !0),
    _defineProperty(_data, "fxmoney", 0), _defineProperty(_data, "tid", 0), _defineProperty(_data, "showmsg", !0),
    _data),
  imageLoad: function(a) {
    var t = a.detail.width,
      e = t / (i = a.detail.height);
    console.log(t, i);
    var i = 750 / e,
      s = this.data.imgheights;
    s.push(i), this.setData({
      imgheights: s
    });
  },
  bindchange: function(a) {
    console.log(a.detail.current), this.setData({
      current: a.detail.current
    });
  },
  bbb: function() {
    wx.previewImage({
      current: this.data.piclist[this.data.current],
      urls: this.data.piclist
    });
  },
  onLoad: function(a) {
    wx.setNavigationBarTitle({
      title: wx.getStorageSync("companyinfo").name
    });
    var t = this,
      e = decodeURIComponent(a.scene).split("@"),
      i = parseInt(e[0]),
      s = parseInt(e[1]);
    t.data.tid = s, t.data.id = i, t.getlethousedetail();
  },
  gochat: function(a) {
    var t = wx.getStorageSync("userInfo"),
      e = a.detail.formId;
    if (console.log(a), console.log(this.data.kefu + "交易保障顾问"), console.log(this.data.intro.wechaname),
      t) {
      app.util.request({
        url: "entry/wxapp/Saveform",
        data: {
          formid: e,
          uid: t.memberInfo.uid
        },
        success: function(a) {}
      });
      var i = this.data.data.money + "元/月";
      wx.navigateTo({
        url: "/weixinmao_house/pages/chat/index?id=" + this.data.kefu + "&himg=" + this.data.piclist[0] + "&hname=" + this.data.data.title + "&hmoney=" + i + "&hid=" + this.data.data.id + "&htype=1&uname=" + this.data.intro.wechaname
      });
    } else wx.showToast({
      title: "请先登录！",
      icon: "none",
      duration: 2e3
    });
  },
  gocccc: function(a) {
    var t = wx.getStorageSync("userInfo"),
      e = a.detail.formId;
    if (console.log(this.data.guke + "业主"), console.log(a), t) {
      app.util.request({
        url: "entry/wxapp/Saveform",
        data: {
          formid: e,
          uid: t.memberInfo.uid
        },
        success: function(a) {}
      });
      var i = this.data.data.money + "元/月";
      wx.navigateTo({
        url: "/weixinmao_house/pages/chat/index?id=" + this.data.guke + "&himg=" + this.data.piclist[0] + "&hname=" + this.data.data.title + "&hmoney=" + i + "&hid=" + this.data.data.id + "&htype=1&uname=" + this.data.agentinfo.username
      });
    } else wx.showToast({
      title: "请先登录！",
      icon: "none",
      duration: 2e3
    });
  },
  toletHouseDetail: function(a) {
    var t = a.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/weixinmao_house/pages/lethousedetail/index?id=" + t
    });
  },
  selectPaytype: function(a) {
    this.data.paytype = a.detail.value, console.log(this.data.paytype);
  },
  goMessage: function(a) {
    var t = this.data.id,
      e = a.currentTarget.dataset.typeid;
    wx.navigateTo({
      url: "/weixinmao_house/pages/housemsg/index?id=" + t + "&typeid=" + e
    });
  },
  savehouse: function(a) {
    var t = this,
      e = wx.getStorageSync("userInfo");
    app.util.request({
      url: "entry/wxapp/Saveform",
      data: {
        formid: a.detail.formId,
        uid: e.memberInfo.uid
      },
      success: function(a) {}
    });
    var i = t.data.id;
    app.util.request({
      url: "entry/wxapp/savehouse",
      data: {
        housetype: "lethouse",
        pid: i,
        sessionid: e.sessionid,
        uid: e.memberInfo.uid
      },
      success: function(a) {
        a.data.message.errno || t.setData({
          issave: a.data.data.issave
        });
      }
    });
  },
  toComplain: function() {
    var t = this.data.id,
      a = wx.getStorageSync("userInfo");
    app.util.request({
      url: "entry/wxapp/Checktel",
      data: {
        sessionid: a.sessionid,
        uid: a.memberInfo.uid
      },
      success: function(a) {
        a.data.message.errno || (0 == a.data.data.isbind ? wx.navigateTo({
          url: "/weixinmao_house/pages/binduser/index"
        }) : wx.navigateTo({
          url: "/weixinmao_house/pages/complain/index?id=" + t + "&msgtype=lethouse"
        }));
      }
    });
  },
  toAgentDetail: function(a) {
    var t = a.currentTarget.dataset.id;
    console.log(t), 0 == t ? wx.switchTab({
      url: "/weixinmao_house/pages/lethouselist/index"
    }) : wx.navigateTo({
      url: "/weixinmao_house/pages/agentdetail/index?id=" + t
    });
  },
  showpay: function() {
    this.data.showpay = !1, this.setData({
      showpay: this.data.showpay
    });
  },
  goMap: function(a) {
    var t = wx.getStorageSync("userInfo");
    t.memberInfo && app.util.request({
      url: "entry/wxapp/Saveform",
      data: {
        formid: a.detail.formId,
        uid: t.memberInfo.uid
      },
      success: function(a) {}
    }), wx.openLocation({
      latitude: parseFloat(this.data.lat),
      longitude: parseFloat(this.data.lng),
      scale: 18,
      name: this.data.title
    });
  },
  rrr: function() {
    this.setData({
      shownotice: !0,
      shownoti: !0
    });
  },
  markcall: function(a) {
    console.log(111);
    var t = this;
    wx.makePhoneCall({
      phoneNumber: t.data.intro.tel,
      success: function(a) {
        t.setData({
          shownoti: !0
        });
      },
      fail: function(a) {
        t.setData({
          shownoti: !0
        });
      }
    });
  },
  markca: function(a) {
    console.log(222);
    var t = wx.getStorageSync("userInfo"),
      e = a.currentTarget.dataset.tel,
      i = (e = this.data.agentinfo.tel,
        this.data.id);
    app.util.request({
      url: "entry/wxapp/Saveform",
      data: {
        formid: a.detail.formId,
        uid: t.memberInfo.uid
      },
      success: function(a) {}
    }), this.data.shownotice = !0, this.setData({
      shownotice: this.data.shownotice
    }), app.util.request({
      url: "entry/wxapp/Checktel",
      data: {
        sessionid: t.sessionid,
        uid: t.memberInfo.uid
      },
      success: function(a) {
        a.data.message.errno || (0 == a.data.data.isbind ? wx.navigateTo({
          url: "/weixinmao_house/pages/binduser/index"
        }) : app.util.request({
          url: "entry/wxapp/Checkmaketel",
          data: {
            housetype: "lethouse",
            pid: i,
            sessionid: t.sessionid,
            uid: t.memberInfo.uid
          },
          success: function(a) {
            if (!a.data.message.errno) {
              if (0 != a.data.data.error) return void wx.showModal({
                title: "提示",
                content: a.data.data.msg,
                showCancel: !1
              });
              wx.makePhoneCall({
                phoneNumber: e,
                success: function() {
                  console.log("拨打电话成功！");
                },
                fail: function() {
                  console.log("拨打电话失败！");
                }
              });
            }
          }
        }));
      }
    });
  },
  doMessage: function(a) {
    var t = this,
      e = wx.getStorageSync("userInfo");
    console.log(e), e && e.hasOwnProperty("wxInfo") ? t.data.isuser = !0 : t.data.isuser = !1,
      t.setData({
        isuser: t.data.isuser
      }), 1 == t.data.isuser && t.showMessage();
  },
  showMessage: function() {
    console.log("fffffffffff"), this.data.showmsg = !1, this.setData({
      showmsg: this.data.showmsg
    });
  },
  doCall: function(a) {
    var t = wx.getStorageSync("userInfo");
    t.memberInfo && app.util.request({
      url: "entry/wxapp/Saveform",
      data: {
        formid: a.detail.formId,
        uid: t.memberInfo.uid
      },
      success: function(a) {}
    });
    this.data.shownotice = !1, this.setData({
      shownotice: this.data.shownotice
    });
  },
  niojj: function() {
    this.setData({
      shownoti: !1
    });
  },
  closePay: function() {
    this.data.showpay = !0, this.setData({
      showpay: this.data.showpay
    });
  },
  saveuserinfo: function(a) {
    console.log("立即预约");
    var t = this,
      e = a.detail.value.name,
      i = a.detail.value.tel;
    t.data.showmsg = !0;
    var s = wx.getStorageSync("userInfo"),
      o = t.data.id;
    "" != e ? "" != i ? app.util.request({
      url: "entry/wxapp/savefxmessage",
      data: {
        sessionid: s.sessionid,
        uid: s.memberInfo.uid,
        name: e,
        tel: i,
        pid: o,
        fxmoney: t.data.fxmoney,
        type: 2,
        tid: t.data.tid
      },
      success: function(a) {
        if (0 != a.data.errno) return wx.hideLoading(), void wx.showModal({
          title: "失败",
          content: a.data.msg,
          showCancel: !1
        });
        wx.showToast({
          title: a.data.data.msg,
          icon: "success",
          duration: 2e3
        }), t.setData({
          showmsg: t.data.showmsg
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
  closemsg: function(a) {
    this.data.showmsg = !0, this.setData({
      showmsg: this.data.showmsg
    });
  },
  cancel_login: function (e) {
    this.setData({
      isuser: !0
    });
  },
  bindGetUserInfo: function(a) {
    var s = this;
    app.util.getUserInfo(function(t) {
      console.log(t), s.data.isuser = !0;
      var a = t.memberInfo.uid,
        e = t.wxInfo.nickName,
        i = t.wxInfo.avatarUrl;
      0 < (s.data.uid = a) && (s.setData({
        userinfo: t,
        isphone: !1,
        isuser: s.data.isuser
      }), wx.setStorageSync("userInfo", t), app.util.request({
        url: "entry/wxapp/Updateuserinfo",
        data: {
          uid: a,
          nickname: e,
          avatarUrl: i
        },
        success: function(a) {
          a.data.message.errno || (s.data.isphone = a.data.data.isphone, s.setData({
            userinfo: t,
            isphone: s.data.isphone,
            isuser: s.data.isuser
          }));
        }
      }));
    }, a.detail);
  },
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading(), this.onLoad();
  },
  onReachBottom: function() {},
  onShareAppMessage: function() {},
  getlethousedetail: function() {
    var t = this,
      a = wx.getStorageSync("userInfo");
    if (a) var e = {
      id: t.data.id,
      sessionid: a.sessionid,
      uid: a.memberInfo.uid
    };
    else e = {
      id: t.data.id
    };
    app.util.request({
      url: "entry/wxapp/getlethousedetail",
      data: e,
      success: function(a) {
        console.log(a), a.data.message.errno || (a.data.data.intro.maincolor || (a.data.data.intro.maincolor = "#3274e5"),
          wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: a.data.data.intro.maincolor,
            animation: {
              duration: 400,
              timingFunc: "easeIn"
            }
          }), t.data.title = a.data.data.list.title, t.data.address = a.data.data.list.address,
          t.data.lat = a.data.data.list.lat, t.data.lng = a.data.data.list.lng, wx.setNavigationBarTitle({
            title: t.data.title + "-" + wx.getStorageSync("companyinfo").name
          }), t.setData({
            data: a.data.data.list,
            piclist: a.data.data.piclist,
            housepic: a.data.data.housepic,
            intro: a.data.data.intro,
            houseplan: a.data.data.houseplan,
            agentinfo: a.data.data.agentinfo,
            issave: a.data.data.issave,
            lethouselist: a.data.data.lethouselist,
            content: WxParse.wxParse("article", "html", a.data.data.list.content, t, 5),
            ispay: a.data.data.ispay,
            kefu: a.data.data.intro.uid,
            guke: a.data.data.list.uid
          }));
      },
      complete: function() {
        wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
      }
    });
  }
}, "onShareAppMessage", function() {
  return {
    title: this.data.title + "-" + wx.getStorageSync("companyinfo").name,
    path: "/weixinmao_house/pages/lethousedetail/index?id=" + this.data.id
  };
}), _defineProperty(_Page, "checkuser", function(t) {
  var e = this,
    a = (t = t, wx.getStorageSync("userInfo"));
  return console.log(a), a ? a.memberInfo.uid ? void app.util.request({
    url: "entry/wxapp/checkuserinfo",
    data: {
      sessionid: a.sessionid,
      uid: a.memberInfo.uid
    },
    success: function(a) {
      console.log("payyyy"), 0 == a.data.data.error ? t.doServices() : 2 == a.data.data.error && t.doElseServices();
    }
  }) : (app.util.getUserInfo(), !1) : (app.util.getUserInfo(function(a) {
    e.getlethousedetail();
  }), !1);
}), _defineProperty(_Page, "pay", function(a) {
  var t = this,
    e = t.data.paytype,
    i = t.data.id,
    s = wx.getStorageSync("userInfo");
  if (0 == e) {
    wx.showModal({
      title: "确认支付",
      content: "确认支付？",
      success: function(a) {
        a.confirm && app.util.request({
          url: "entry/wxapp/pay",
          data: {
            ordertype: "lethouse",
            pid: i,
            sessionid: s.sessionid,
            uid: s.memberInfo.uid
          },
          success: function(a) {
            console.log(a), a.data && a.data.data && wx.requestPayment({
              timeStamp: a.data.data.timeStamp,
              nonceStr: a.data.data.nonceStr,
              package: a.data.data.package,
              signType: "MD5",
              paySign: a.data.data.paySign,
              success: function(a) {
                console.log(a), t.data.showpay = !0, t.setData({
                  ispay: 1,
                  showpay: t.data.showpay
                });
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
  } else app.util.request({
    url: "entry/wxapp/Paylookhouse",
    data: {
      pid: i,
      sessionid: s.sessionid,
      uid: s.memberInfo.uid
    },
    success: function(a) {
      if (!a.data.message.errno) {
        if (0 != a.data.data.error) return void wx.showModal({
          title: "提示",
          content: a.data.data.msg,
          showCancel: !1
        });
        t.data.showpay = !0, t.setData({
          ispay: 1,
          showpay: t.data.showpay
        });
      }
    }
  });
}), _defineProperty(_Page, "saveuserinfo", function(a) {
  console.log("立即预约");
  var t = this,
    e = a.detail.value.name,
    i = a.detail.value.tel;
  t.data.showmsg = !0;
  var s = wx.getStorageSync("userInfo"),
    o = t.data.id;
  "" != e ? "" != i ? app.util.request({
    url: "entry/wxapp/savefxmessage",
    data: {
      sessionid: s.sessionid,
      uid: s.memberInfo.uid,
      name: e,
      tel: i,
      pid: o,
      fxmoney: t.data.fxmoney,
      type: 2,
      tid: t.data.tid
    },
    success: function (a) {
      if (0 != a.data.errno) return wx.hideLoading(), void wx.showModal({
        title: "失败",
        content: a.data.msg,
        showCancel: !1
      });
      wx.showToast({
        title: a.data.data.msg,
        icon: "success",
        duration: 2e3
      }), t.setData({
        showmsg: t.data.showmsg
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
  })
}), _defineProperty(_Page, "closemsg", function(a) {
  this.data.showmsg = !0, this.setData({
    showmsg: this.data.showmsg
  });
}), _Page));