function _defineProperty(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}

var R_htmlToWxml = require("../../resource/js/htmlToWxml.js"), imageUtil = require("../../resource/js/images.js"), app = getApp();

Page(_defineProperty({
    data: _defineProperty({
        images: {},
        autoplay: !0,
        interval: 3e3,
        duration: 1e3,
        title: "",
        address: "",
        lat: 0,
        lng: 0,
        id: 0
    }, "title", ""),
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
        var e = this;
        if (0 < this.data.id) var t = this.data.id; else {
            t = a.id;
            this.data.id = a.id;
        }
        app.util.request({
            url: "entry/wxapp/getsaledetail",
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
                    var t = R_htmlToWxml.html2json(a.data.data.list.content);
                    wx.setNavigationBarTitle({
                        title: a.data.data.list.content + "-" + wx.getStorageSync("companyinfo").name
                    }), e.setData({
                        list: a.data.data.list,
                        piclist: a.data.data.piclist,
                        content: t
                    });
                }
            },
            complete: function() {
                wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
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
        path: "/weixinmao_house/pages/saledetail/index?id=" + this.data.id
    };
}));