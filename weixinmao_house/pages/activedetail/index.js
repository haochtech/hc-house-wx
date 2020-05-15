function _defineProperty(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}

var WxParse = require("../../resource/wxParse/wxParse.js"), app = getApp();

Page(_defineProperty({
    data: {
        images: {},
        autoplay: !0,
        interval: 3e3,
        duration: 1e3,
        title: "",
        address: "",
        lat: 0,
        lng: 0,
        showmsg: !0,
        aid: 0,
        pid: 0
    },
    imageLoad: function(a) {
        var t = imageUtil.imageUtil(a);
        this.setData({
            imagewidth: t.imageWidth,
            imageheight: t.imageHeight
        });
    },
    onLoad: function(a) {
        wx.setNavigationBarTitle({
            title: wx.getStorageSync("companyinfo").name
        });
        var i = this;
        if (0 < this.data.aid) var t = this.data.aid; else {
            t = a.id;
            this.data.aid = a.id;
        }
        app.util.request({
            url: "entry/wxapp/getactivedetail",
            data: {
                id: t
            },
            success: function(a) {
                if (!a.data.message.errno) {
                    a.data.data.intro.maincolor || (a.data.data.intro.maincolor = "#3274e5"), wx.setNavigationBarColor({
                        frontColor: "#ffffff",
                        backgroundColor: a.data.data.intro.maincolor,
                        animation: {
                            duration: 400,
                            timingFunc: "easeIn"
                        }
                    });
                    var t = WxParse.wxParse("article2", "html", a.data.data.list.content, i, 5), e = WxParse.wxParse("article", "html", a.data.data.activeinfo.content, i, 5);
                    i.data.title = a.data.data.list.housename, i.data.pid = a.data.data.list.id, i.data.address = a.data.data.list.houseaddress, 
                    i.data.lat = a.data.data.list.lat, i.data.lng = a.data.data.list.lng, wx.setNavigationBarTitle({
                        title: i.data.title + "-" + a.data.data.intro.name
                    }), i.setData({
                        data: a.data.data.list,
                        housepic: a.data.data.housepic,
                        houseplan: a.data.data.houseplan,
                        piclist: a.data.data.piclist,
                        activeinfo: a.data.data.activeinfo,
                        content: t,
                        activDetail: e,
                        showmsg: i.data.showmsg,
                        totalnum: a.data.data.totalnum,
                        intro: a.data.data.intro
                    });
                }
            }
        });
    },
    toPicDetail: function(a) {
        var t = a.currentTarget.dataset.id, e = a.currentTarget.dataset.typeid;
        console.log(t), console.log(e), wx.navigateTo({
            url: "/weixinmao_house/pages/picdetail/index?id=" + t + "&typeid=" + e
        });
    },
    doBaoming: function(a) {
        this.setData({
            scrollTop: 0,
            showmsg: !1
        });
    },
    closemsg: function(a) {
        this.setData({
            showmsg: !0
        });
    },
    saveuserinfo: function(a) {
        var t = this, e = a.detail.value.name, i = a.detail.value.tel, o = t.data.aid, n = t.data.pid;
        0 != o ? 0 != n ? "" != e ? "" != i ? app.util.request({
            url: "entry/wxapp/savebaoming",
            data: {
                name: e,
                tel: i,
                aid: o,
                pid: n
            },
            success: function(a) {
                if (0 != a.data.errno) return wx.hideLoading(), void wx.showModal({
                    title: "失败",
                    content: a.data.msg,
                    showCancel: !1
                });
                wx.showToast({
                    title: "提交成功",
                    icon: "success",
                    duration: 2e3
                }), t.setData({
                    showmsg: !0,
                    totalnum: a.data.data.totalnum
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
        }) : wx.showModal({
            title: "提示",
            content: "房产ID不存在",
            showCancel: !1
        }) : wx.showModal({
            title: "提示",
            content: "活动ID不存在",
            showCancel: !1
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
        path: "/weixinmao_house/pages/activedetail/index?id=" + this.data.aid
    };
}));