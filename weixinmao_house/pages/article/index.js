var app = getApp();

Page({
    data: {
        autoplay: !0,
        interval: 3e3,
        duration: 1e3,
        page: 1,
        loadMore: "",
        pid: 0
    },
    onLoad: function(a) {
        wx.setNavigationBarTitle({
            title: "房产资讯-" + wx.getStorageSync("companyinfo").name
        });
        var t = this;
        app.util.request({
            url: "entry/wxapp/getbanner",
            success: function(a) {
                a.data.message.errno || t.setData({
                    banners: a.data.data
                });
            }
        }), t.getnewslist();
    },
    getnewslist: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/getarticle",
            data: {
                page: t.data.page
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
                }), t.setData({
                    category: a.data.data.category,
                    article: a.data.data.article,
                    activeCategoryId: a.data.data.activeCategoryId
                }));
            },
            complete: function() {
                t.setData({
                    loadMore: ""
                }), wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
        });
    },
    getsecondlist: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/getsecondlist",
            data: {
                pid: t.data.pid,
                page: t.data.page
            },
            success: function(a) {
                a.data.message.errno || t.setData({
                    article: a.data.data,
                    activeCategoryId: t.data.pid
                });
            },
            complete: function() {
                t.setData({
                    loadMore: ""
                }), wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
        });
    },
    tabClick: function(a) {
        var t = this, e = a.currentTarget.id;
        t.data.pid = e, t.data.page = 1, app.util.request({
            url: "entry/wxapp/getsecondlist",
            data: {
                pid: e,
                page: t.data.page
            },
            success: function(a) {
                a.data.message.errno || t.setData({
                    article: a.data.data,
                    activeCategoryId: e
                });
            }
        });
    },
    toNewsDetail: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_house/pages/newsdetail/index?id=" + t
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
        this.setData({
            loadMore: "正在加载中..."
        }), this.data.page = this.data.page + 1, 0 < this.data.pid ? this.getsecondlist() : this.getnewslist();
    },
    onShareAppMessage: function() {
        return {
            title: "房产资讯-" + wx.getStorageSync("companyinfo").name,
            path: "/weixinmao_house/pages/article/index"
        };
    }
});