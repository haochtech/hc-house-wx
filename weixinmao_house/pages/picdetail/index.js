function _defineProperty(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var R_htmlToWxml = require("../../resource/js/htmlToWxml.js"), WxParse = require("../../resource/wxParse/wxParse.js"), app = getApp();

Page(_defineProperty({
    data: {
        id: 0,
        typeid: 0,
        title: ""
    },
    onLoad: function(t) {
        if (wx.setNavigationBarTitle({
            title: wx.getStorageSync("companyinfo").name
        }), 0 < this.data.id) var a = this.data.id, e = this.data.typeid; else {
            a = t.id;
            this.data.id = t.id;
            e = t.typeid;
            this.data.typeid = t.typeid;
        }
        var i = this;
        app.util.request({
            url: "entry/wxapp/getpicdetail",
            data: {
                id: a,
                typeid: e
            },
            success: function(t) {
                t.data.message.errno || (t.data.data.intro.maincolor || (t.data.data.intro.maincolor = "#3274e5"), 
                wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: t.data.data.intro.maincolor,
                    animation: {
                        duration: 400,
                        timingFunc: "easeIn"
                    }
                }), i.data.title = t.data.data.list.title + "-" + wx.getStorageSync("companyinfo").name, 
                wx.setNavigationBarTitle({
                    title: i.data.title
                }), i.setData({
                    data: t.data.data.list,
                    houseinfo: t.data.data.houseinfo,
                    content: WxParse.wxParse("article", "html", t.data.data.list.content, i, 5)
                }));
            },
            complete: function() {
                wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
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
    onReachBottom: function() {
        wx.showNavigationBarLoading(), this.onLoad();
    },
    onShareAppMessage: function() {}
}, "onShareAppMessage", function() {
    return {
        title: this.data.title,
        path: "/weixinmao_house/pages/index/index"
    };
}));