var app = getApp();

Page({
    data: {
        autoplay: !0,
        interval: 3e3,
        duration: 1e3
    },
    onLoad: function(a) {
        wx.setNavigationBarTitle({
            title: "门店列表"
        });
        var t = this;
        if (0 < t.data.id) t.data.id; else {
            a.id;
            t.data.id = a.id;
        }
        app.util.request({
            url: "entry/wxapp/getstorelist",
            data: {
                cateid: t.data.id
            },
            success: function(a) {
                a.data.message.errno || (console.log(a.data.data), a.data.data.intro.maincolor || (a.data.data.intro.maincolor = "#3274e5"), 
                wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: a.data.data.intro.maincolor,
                    animation: {
                        duration: 400,
                        timingFunc: "easeIn"
                    }
                }), t.setData({
                    storelist: a.data.data.list
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
    toStoredetail: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_house/pages/storedetail/index?id=" + t
        });
    },
    onUnload: function() {},
    doCall: function(a) {
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
    goShop: function(a) {
        var t = a.currentTarget.id, e = a.currentTarget.dataset.name;
        wx.setStorageSync("storeid", t), wx.setStorageSync("storename", e), wx.switchTab({
            url: "/weixinmao_ktv/pages/index/index"
        });
    },
    goMap: function(a) {
        var t = a.currentTarget.dataset.lat, e = a.currentTarget.dataset.lng, o = a.currentTarget.dataset.name, n = a.currentTarget.dataset.address;
        wx.openLocation({
            latitude: parseFloat(t),
            longitude: parseFloat(e),
            scale: 18,
            name: o,
            address: n
        });
    },
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), this.onLoad();
    },
    onReachBottom: function() {
        wx.showNavigationBarLoading(), this.onLoad();
    },
    onShareAppMessage: function() {
        return {
            title: "门店列表" + wx.getStorageSync("companyinfo").name,
            path: "/weixinmao_house/pages/storelist/index"
        };
    }
});