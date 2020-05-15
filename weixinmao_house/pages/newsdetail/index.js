function _defineProperty(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}

var R_htmlToWxml = require("../../resource/js/htmlToWxml.js"), WxParse = require("../../resource/wxParse/wxParse.js"), app = getApp();

Page(_defineProperty({
    data: {
        id: 0,
        title: ""
    },
    onLoad: function(a) {
        if (0 < this.data.id) var t = this.data.id; else {
            t = a.id;
            this.data.id = a.id;
        }
        console.log(t);
        var e = this;
        app.util.request({
            url: "entry/wxapp/getnewsdetail",
            data: {
                id: t
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
                }), e.data.title = a.data.data.title + "-" + a.data.data.intro.name, wx.setNavigationBarTitle({
                    title: e.data.title
                }), e.setData({
                    data: a.data.data,
                    content: WxParse.wxParse("article", "html", a.data.data.content, e, 5)
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
        wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
    },
    onShareAppMessage: function() {}
}, "onShareAppMessage", function() {
    return {
        title: this.data.title + "-" + wx.getStorageSync("companyinfo").name,
        path: "/weixinmao_house/pages/newsdetail/index?id=" + this.data.id
    };
}));