var app = getApp();

Page({
    data: {},
    onShow: function(t) {
        wx.setNavigationBarTitle({
            title: "经纪人-" + wx.getStorageSync("companyinfo").name
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
            url: "entry/wxapp/getagentlist",
            data: {
                city: t
            },
            success: function(t) {
                t.data.message.errno || (console.log(t.data.data), t.data.data.intro.maincolor || (t.data.data.intro.maincolor = "#3274e5"), 
                wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: t.data.data.intro.maincolor,
                    animation: {
                        duration: 400,
                        timingFunc: "easeIn"
                    }
                }), wx.setStorageSync("cityinfo", t.data.data.cityinfo), a.setData({
                    city: wx.getStorageSync("cityinfo").name,
                    list: t.data.data.list,
                    intro: t.data.data.intro
                }));
            },
            complete: function() {
                wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
        });
    },
    doCall: function(t) {
        console.log(t.currentTarget);
        var a = t.currentTarget.dataset.tel;
        wx.makePhoneCall({
            phoneNumber: a,
            success: function() {
                console.log("拨打电话成功！");
            },
            fail: function() {
                console.log("拨打电话失败！");
            }
        });
    },
    toSearch: function(t) {
        wx.navigateTo({
            url: "/weixinmao_house/pages/search/index"
        });
    },
    toAgentDetail: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_house/pages/agentdetail/index?id=" + a
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
            title: "经纪人-" + wx.getStorageSync("companyinfo").name,
            path: "/weixinmao_house/pages/agentlist/index"
        };
    }
});