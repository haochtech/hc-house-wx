function _defineProperty(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}

var app = getApp();

Page(_defineProperty({
    data: {},
    onLoad: function(a) {
        wx.setNavigationBarTitle({
            title: "信息综合查询"
        }), this.setData({
            loadmore: !0
        });
        var t = this;
        app.util.request({
            url: "entry/wxapp/GetSysInit",
            data: {},
            success: function(a) {
                a.data.message.errno || (wx.setStorageSync("companyinfo", a.data.data.intro), wx.setNavigationBarTitle({
                    title: wx.getStorageSync("companyinfo").name
                }), console.log(a.data.data.intro), a.data.data.intro.maincolor || (a.data.data.intro.maincolor = "#3274e5"), 
                wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: a.data.data.intro.maincolor,
                    animation: {
                        duration: 400,
                        timingFunc: "easeIn"
                    }
                }), t.setData({
                    intro: a.data.data.intro
                }));
            },
            complete: function() {
                wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        this.setData({
            loadmore: !0
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    bindSave: function(a) {
        var t = this, e = a.detail.value.keyword;
        "" != e ? app.util.request({
            url: "entry/wxapp/search",
            data: {
                keyword: e
            },
            success: function(a) {
                if (0 != a.data.errno) return wx.hideLoading(), void wx.showModal({
                    title: "失败",
                    content: a.data.data.msg,
                    showCancel: !1
                });
                0 == a.data.data.length ? (console.log("fffffffff"), t.setData({
                    list: a.data.data,
                    loadmore: !1
                })) : t.setData({
                    list: a.data.data,
                    loadmore: !0
                });
            }
        }) : wx.showModal({
            title: "提示",
            content: "请输入小区、地名、物业等相关信息",
            showCancel: !1
        });
    },
    toNewsDetail: function(a) {
        console.log(a);
        var t = a.currentTarget.dataset.id, e = a.currentTarget.dataset.type;
        wx.navigateTo({
            url: "/weixinmao_house/pages/" + e + "/index?id=" + t
        });
    }
}, "onShareAppMessage", function() {
    return {
        title: "信息综合查询-" + wx.getStorageSync("companyinfo").name,
        path: "/weixinmao_house/pages/search/index"
    };
}));