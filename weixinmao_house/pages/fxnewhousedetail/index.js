var _data, _Page;

function _defineProperty(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}

var WxParse = require("../../resource/wxParse/wxParse.js"), app = getApp();

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
    }, _defineProperty(_data, "title", ""), _defineProperty(_data, "fxmoney", 0), _defineProperty(_data, "tid", 0), 
    _defineProperty(_data, "showmsg", !0), _data),
    imageLoad: function(a) {
        var t = imageUtil.imageUtil(a);
        this.setData({
            imagewidth: t.imageWidth,
            imageheight: t.imageHeight
        });
    },
    onLoad: function(a) {
        var t = this, e = decodeURIComponent(a.scene).split("@"), i = parseInt(e[0]), o = parseInt(e[1]);
        t.data.id = i, t.data.tid = o, app.util.request({
            url: "entry/wxapp/getnewhousedetail",
            data: {
                id: t.data.id
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
                }), t.data.title = a.data.data.list.housename, t.data.address = a.data.data.list.houseaddress, 
                t.data.lat = a.data.data.list.lat, t.data.lng = a.data.data.list.lng, t.data.fxmoney = a.data.data.list.fxmoney, 
                wx.setNavigationBarTitle({
                    title: t.data.title + "-" + a.data.data.intro.name
                }), t.setData({
                    activelist: a.data.data.active_list,
                    data: a.data.data.list,
                    housepic: a.data.data.housepic,
                    houseplan: a.data.data.houseplan,
                    piclist: a.data.data.piclist,
                    content: WxParse.wxParse("article", "html", a.data.data.list.content, t, 5)
                }));
            },
            complete: function() {
                wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
        });
    },
    saveuserinfo: function(a) {
        var t = this, e = a.detail.value.name, i = a.detail.value.tel;
        t.data.showmsg = !0;
        var o = wx.getStorageSync("userInfo"), s = t.data.id;
        "" != e ? "" != i ? app.util.request({
            url: "entry/wxapp/savefxmessage",
            data: {
                sessionid: o.sessionid,
                uid: o.memberInfo.uid,
                name: e,
                tel: i,
                pid: s,
                fxmoney: t.data.fxmoney,
                type: 0,
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
    doMessage: function(a) {
        var t = this, e = wx.getStorageSync("userInfo");
        console.log(e), e && e.hasOwnProperty("wxInfo") ? t.data.isuser = !0 : t.data.isuser = !1, 
        t.setData({
            isuser: t.data.isuser
        }), 1 == t.data.isuser && t.showMessage();
    },
    showMessage: function() {
        this.data.showmsg = !1, this.setData({
            showmsg: this.data.showmsg
        });
    },
    toActiveDetail: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_house/pages/activedetail/index?id=" + t
        });
    },
    toPicDetail: function(a) {
        var t = a.currentTarget.dataset.id, e = a.currentTarget.dataset.typeid;
        wx.navigateTo({
            url: "/weixinmao_house/pages/picdetail/index?id=" + t + "&typeid=" + e
        });
    },
    goMap: function(a) {
        var t = this;
        wx.openLocation({
            latitude: parseFloat(t.data.lat),
            longitude: parseFloat(t.data.lng),
            scale: 18,
            name: t.data.title,
            address: t.data.address
        });
    },
    doCall: function(a) {
        console.log(a.currentTarget);
        var t = a.currentTarget.dataset.tel;
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
  cancel_login: function (e) {
    this.setData({
      isuser: !0
    });
  },
    bindGetUserInfo: function(a) {
        var o = this;
        app.util.getUserInfo(function(t) {
            console.log(t), o.data.isuser = !0;
            var a = t.memberInfo.uid, e = t.wxInfo.nickName, i = t.wxInfo.avatarUrl;
            0 < (o.data.uid = a) && (o.setData({
                userinfo: t,
                isphone: !1,
                isuser: o.data.isuser
            }), wx.setStorageSync("userInfo", t), app.util.request({
                url: "entry/wxapp/Updateuserinfo",
                data: {
                    uid: a,
                    nickname: e,
                    avatarUrl: i,
                    tid: o.data.tid
                },
                success: function(a) {
                    a.data.message.errno || (o.data.isphone = a.data.data.isphone, o.setData({
                        userinfo: t,
                        isphone: o.data.isphone,
                        isuser: o.data.isuser
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
    onShareAppMessage: function() {}
}, "onShareAppMessage", function() {
    return {
        title: this.data.title + "-" + wx.getStorageSync("companyinfo").name,
        path: "/weixinmao_house/pages/newhousedetail/index?id=" + this.data.id
    };
}), _defineProperty(_Page, "checkuser", function(t) {
    var e = this, a = (t = t, wx.getStorageSync("userInfo"));
    return console.log(a), a ? a.memberInfo.uid ? void app.util.request({
        url: "entry/wxapp/checkuserinfo",
        data: {
            sessionid: a.sessionid,
            uid: a.memberInfo.uid
        },
        success: function(a) {
            console.log("payyyy"), 0 == a.data.data.error ? t.doServices() : 2 == a.data.data.error ? t.doElseServices() : console.log("error11111111");
        }
    }) : (app.util.getUserInfo(), !1) : (app.util.getUserInfo(function(a) {
        e.showMessage();
    }), !1);
}), _Page));