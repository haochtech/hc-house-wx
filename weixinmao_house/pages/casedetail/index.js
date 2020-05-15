function _defineProperty(o, a, n) {
    return a in o ? Object.defineProperty(o, a, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : o[a] = n, o;
}

var R_htmlToWxml = require("../../resource/js/htmlToWxml.js"), app = getApp();

Page(_defineProperty({
    data: {},
    onLoad: function(o) {
        wx.setNavigationBarTitle({
            title: wx.getStorageSync("companyinfo").name
        });
        var a = o.id;
        console.log(a);
        var n = this;
        app.util.request({
            url: "entry/wxapp/getcasedetail",
            data: {
                id: a
            },
            success: function(o) {
                var a;
                o.data.message.errno || (o.data.data.intro.maincolor || (o.data.data.intro.maincolor = "#3274e5"), 
                wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: o.data.data.intro.maincolor,
                    animation: {
                        duration: 400,
                        timingFunc: "easeIn"
                    }
                }), a = R_htmlToWxml.html2json(o.data.data.content), n.setData({
                    data: o.data.data,
                    content: a
                }));
            },
            complete: function() {
                console.log("ok"), wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        console.log("pull"), wx.showNavigationBarLoading(), this.onLoad();
    },
    onReachBottom: function() {
        console.log("pull"), wx.showNavigationBarLoading(), this.onLoad();
    },
    onShareAppMessage: function() {}
}, "onShareAppMessage", function() {
    return {
        title: wx.getStorageSync("companyinfo").name,
        path: "/weixinmao_house/pages/index/index"
    };
}));