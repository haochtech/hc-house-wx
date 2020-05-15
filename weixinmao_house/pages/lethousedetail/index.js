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
    _data),
  imageLoad: function(a) {
    var t = a.detail.width,
      e = t / (i = a.detail.height);
    console.log(t, i);
    var i = 750 / e,
      o = this.data.imgheights;
    o.push(i), this.setData({
      imgheights: o
    });
  },
  bindchange: function(a) {
    console.log(a.detail.current), this.setData({
      current: a.detail.current
    });
  },
  onLoad: function(a) {
    wx.setNavigationBarTitle({
      title: wx.getStorageSync("companyinfo").name
    });
    var t = this;
    if (0 < t.data.id) t.data.id;
    else {
      a.id;
      t.data.id = a.id;
    }
    var e = wx.getStorageSync("userInfo");
    console.log(e), e ? (t.data.isuser = !0, t.setData({
      userinfo: e
    })) : t.data.isuser = !1, t.setData({
      isuser: t.data.isuser,
      showpay: t.data.showpay
    }), t.getlethousedetail();
  },
  phonecall: function(a) {
    var t = a.currentTarget.dataset.tel;
    wx.makePhoneCall({
      phoneNumber: t // 仅为示例，并非真实的电话号码
    })
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
      e = wx.getStorageSync("userInfo"),
      i = t.data.id;
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
  toAgentDetail: function(a) {
    var t = a.currentTarget.dataset.id;
    0 == t ? wx.navigateTo({
      url: "/weixinmao_house/pages/lethouselist/index"
    }) : wx.navigateTo({
      url: "/weixinmao_house/pages/agentdetail/index?id=" + t
    });
  },
  showpay: function() {
    var a = this;
    a.data.showpay = !1, a.setData({
      showpay: a.data.showpay
    });
  },
  bindGetUserInfo: function(a) {
    var t = this;
    app.util.getUserInfo(function(a) {
      console.log(a), t.data.isuser = !0, t.setData({
        userinfo: a,
        isuser: t.data.isuser
      }), t.getlethousedetail();
    }, a.detail);
  },
  goMap: function(a) {
    var t = this;
    console.log("ffffff"), wx.openLocation({
      latitude: Number(t.data.lat),
      longitude: Number(t.data.lng),
      scale: 18,
      name: t.data.title,
      address: t.data.address
    });
  },
  doCall: function(a) {
    var t = a.currentTarget.dataset.tel;
    wx.makePhoneCall({
      phoneNumber: t,
      success: function(a) {
        console.log("拨打电话成功！");
      },
      fail: function(a) {
        console.log(a), console.log("拨打电话失败！");
      }
    });
  },
  closePay: function() {
    this.data.showpay = !0, this.setData({
      showpay: this.data.showpay
    });
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
        a.data.message.errno || (a.data.data.intro.maincolor || (a.data.data.intro.maincolor = "#3274e5"),
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
            houseplan: a.data.data.houseplan,
            agentinfo: a.data.data.agentinfo,
            lethouselist: a.data.data.lethouselist,
            content: WxParse.wxParse("article", "html", a.data.data.list.content, t, 5),
            ispay: a.data.data.ispay
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
    o = wx.getStorageSync("userInfo");
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
            sessionid: o.sessionid,
            uid: o.memberInfo.uid
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
      sessionid: o.sessionid,
      uid: o.memberInfo.uid
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
  var t = this,
    e = a.detail.value.name,
    i = a.detail.value.tel;
  t.data.showmsg = !0;
  var o = wx.getStorageSync("userInfo");
  "" != e ? "" != i ? app.util.request({
    url: "entry/wxapp/saveuserinfo",
    data: {
      sessionid: o.sessionid,
      uid: o.memberInfo.uid,
      name: e,
      tel: i
    },
    success: function(a) {
      if (0 != a.data.errno) return wx.hideLoading(), void wx.showModal({
        title: "失败",
        content: a.data.msg,
        showCancel: !1
      });
      wx.showToast({
        title: "操作成功",
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
}), _defineProperty(_Page, "closemsg", function(a) {
  this.data.showmsg = !0, this.setData({
    showmsg: this.data.showmsg
  });
}), _Page));