function _defineProperty(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var app = getApp();

Page(_defineProperty({
    data: {},
    onLoad: function(e) {
        wx.setNavigationBarTitle({
            title: wx.getStorageSync("shopinfo").name
        });
        var t = e.id, a = this;
        app.util.request({
            url: "entry/wxapp/getlist",
            data: {
                pid: t
            },
            success: function(e) {
                e.data.message.errno || a.setData({
                    services: e.data.data
                });
            }
        });
    },
    tabClick: function(e) {
        var t = e.currentTarget.id, a = this;
        app.util.request({
            url: "entry/wxapp/getsecondlist",
            data: {
                pid: t
            },
            success: function(e) {
                e.data.message.errno || a.setData({
                    article: e.data.data,
                    activeCategoryId: t
                });
            }
        });
    },
    toNewsDetail: function(e) {
        var t = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/wxsmall_001/pages/newsdetail/index?id=" + t
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
}, "onShareAppMessage", function() {
    return {
        title: wx.getStorageSync("shopinfo").name,
        path: "/wxsmall_001/pages/index/index"
    };
}));