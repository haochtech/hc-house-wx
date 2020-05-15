var app = getApp();

Page({
    data: {},
    onShow: function(t) {
        wx.setNavigationBarTitle({
            title: "房产活动-" + wx.getStorageSync("companyinfo").name
        });
        var e = this, a = wx.getStorageSync("cityinfo");
        a ? (console.log(a.name), wx.setStorageSync("city", a.name), e.initpage()) : (qqmapsdk = new QQMapWX({
            key: "5D3BZ-J55WF-SFPJJ-NI6PG-YN2ZO-M4BHX"
        }), wx.getLocation({
            type: "gcj02",
            success: function(t) {
                qqmapsdk.reverseGeocoder({
                    location: {
                        latitude: t.latitude,
                        longitude: t.longitude
                    },
                    success: function(t) {
                        var a = t.result.address_component.city, n = a.substr(0, a.length - 1);
                        wx.setStorageSync("city", n), e.initpage();
                    }
                });
            },
            fail: function() {},
            complete: function() {}
        }));
    },
    initpage: function() {
        var a = this, t = wx.getStorageSync("city");
        app.util.request({
            url: "entry/wxapp/getactivelist",
            data: {
                city: t
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
                }), wx.setStorageSync("cityinfo", t.data.data.cityinfo), a.setData({
                    city: wx.getStorageSync("cityinfo").name,
                    list: t.data.data.list
                }));
            },
            complete: function() {
                wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
        });
    },
    toSearch: function(t) {
        wx.navigateTo({
            url: "/weixinmao_house/pages/search/index"
        });
    },
    toActiveDetail: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_house/pages/activedetail/index?id=" + a
        });
    },
    onReady: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), this.onLoad();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: "房产活动-" + wx.getStorageSync("companyinfo").name,
            path: "/weixinmao_house/pages/active/index"
        };
    }
});