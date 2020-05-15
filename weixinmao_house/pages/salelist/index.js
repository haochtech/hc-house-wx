var app = getApp();

Page({
    data: {
        city: wx.getStorageSync("companyinfo").city,
        isCars: !0,
        isSort: !0,
        isPrice: !0,
        isType: !0,
        loadMore: "",
        list: [],
        house_list: [],
        housetypelist: [],
        houseareaid: 0,
        housepriceid: 0,
        housetype: 0,
        page: 1
    },
    onLoad: function(t) {
        var i = this;
        this.setData({
            housetypelist: [ {
                name: "出售",
                id: 1
            }, {
                name: "出租",
                id: 2
            }, {
                name: "求购",
                id: 3
            }, {
                name: "求租",
                id: 4
            } ],
            typeid: 0,
            carid: 0,
            priceid: 0
        }), wx.setNavigationBarTitle({
            title: "房屋买卖-" + wx.getStorageSync("companyinfo").name
        });
        var e = wx.getStorageSync("cityinfo");
        e ? (console.log(e.name), wx.setStorageSync("city", e.name), i.initpage()) : (qqmapsdk = new QQMapWX({
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
                        var e = t.result.address_component.city, a = e.substr(0, e.length - 1);
                        wx.setStorageSync("city", a), i.initpage();
                    }
                });
            },
            fail: function() {},
            complete: function() {}
        }));
    },
    initpage: function() {
        var e = this, t = wx.getStorageSync("city");
        app.util.request({
            url: "entry/wxapp/getinitinfo",
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
                }), wx.setStorageSync("cityinfo", t.data.data.cityinfo), e.gethouselist(), e.setData({
                    city: wx.getStorageSync("cityinfo").name,
                    arealist: t.data.data.arealist,
                    housepricelist: t.data.data.housepricelist,
                    title: "",
                    price: "",
                    typetitle: "",
                    intro: t.data.data.intro
                }));
            },
            complete: function() {
                wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
        });
    },
    gethouselist: function(t) {
        var e = this, a = wx.getStorageSync("cityinfo").id;
        app.util.request({
            url: "entry/wxapp/getsalelist",
            data: {
                cityid: a,
                page: e.data.page,
                houseareaid: e.data.houseareaid,
                housepriceid: e.data.housepriceid,
                housetype: e.data.housetype
            },
            success: function(t) {
                t.data.message.errno || e.setData({
                    salelist: t.data.data.salelist,
                    topsalelist: t.data.data.topsalelist
                });
            },
            complete: function() {
                e.setData({
                    loadMore: ""
                });
            }
        });
    },
    doCall: function(t) {
        console.log(t.currentTarget);
        var e = t.currentTarget.dataset.tel;
        wx.makePhoneCall({
            phoneNumber: e,
            success: function() {
                console.log("拨打电话成功！");
            },
            fail: function() {
                console.log("拨打电话失败！");
            }
        });
    },
    toHouseDetail: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_house/pages/saledetail/index?id=" + e
        });
    },
    toSearch: function(t) {
        wx.navigateTo({
            url: "/weixinmao_house/pages/search/index"
        });
    },
    selectcarsitem: function(t) {
        var e = t.currentTarget.id, a = t.currentTarget.dataset.title;
        this.setData({
            carid: e,
            isCars: !0,
            title: a
        }), this.data.houseareaid = e, this.gethouselist();
    },
    selectpriceitem: function(t) {
        var e = t.currentTarget.id, a = t.currentTarget.dataset.title;
        this.setData({
            priceid: e,
            isPrice: !0,
            price: a
        }), this.data.housepriceid = e, this.gethouselist();
    },
    selecttypeitem: function(t) {
        var e = t.currentTarget.id, a = t.currentTarget.dataset.title;
        this.setData({
            typeid: e,
            isType: !0,
            typetitle: a
        }), this.data.housetype = e, this.gethouselist();
    },
    onReachBottom: function(t) {
        this.setData({
            loadMore: "正在加载中..."
        }), this.data.page = this.data.page + 1, this.gethouselist();
    },
    clickSearch: function(t) {
        wx.switchTab({
            url: "/pages/search/search"
        });
    },
    clickList: function() {
        wx.navigateTo({
            url: "../cars/cars"
        });
    },
    selectCars: function(t) {
        this.setData({
            isSort: !0,
            isPrice: !0,
            isType: !0,
            isCars: !this.data.isCars
        });
    },
    selectPrice: function() {
        this.setData({
            isSort: !0,
            isCars: !0,
            isType: !0,
            isPrice: !this.data.isPrice
        });
    },
    selectType: function() {
        this.setData({
            isSort: !0,
            isCars: !0,
            isPrice: !0,
            isType: !this.data.isType
        });
    },
    selectSort: function() {
        this.setData({
            isCars: !0,
            isPrice: !0,
            isType: !0,
            isSort: !this.data.isSort
        });
    },
    selectBrand: function() {
        wx.navigateTo({
            url: "../brand/brand"
        });
    },
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), this.onLoad();
    },
    onShareAppMessage: function() {
        return {
            title: "房屋买卖-" + wx.getStorageSync("companyinfo").name,
            path: "/weixinmao_house/pages/salelist/index"
        };
    }
});