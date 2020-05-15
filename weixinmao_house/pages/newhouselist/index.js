var app = getApp();

Page({
    data: {
        city: wx.getStorageSync("companyinfo").city,
        isCars: !0,
        isSort: !0,
        isPrice: !0,
        isType: !0,
        isTaps: !0,
        loadMore: "",
        list: [],
        house_list: [],
        housetypelist: [],
        houseareaid: 0,
        housepriceid: 0,
        bid: 0,
        housetype: 0,
        page: 1,
        title: "",
        price: "",
        typetitle: "",
        buildarea: ""
    },
    onShow: function() {
        var i = this;
        this.setData({
            housetypelist: [ {
                name: "住宅",
                id: 1
            }, {
                name: "别墅",
                id: 2
            }, {
                name: "公寓",
                id: 3
            }, {
                name: "商铺",
                id: 4
            }, {
                name: "写字楼",
                id: 5
            }, {
                name: "酒店",
                id: 6
            }, {
                name: "厂房",
                id: 7
            } ],
            typeid: 0,
            carid: 0,
            priceid: 0
        }), wx.setNavigationBarTitle({
            title: "新楼盘-" + wx.getStorageSync("companyinfo").name
        });
        var t = wx.getStorageSync("cityinfo");
        t ? (console.log(t.name), wx.setStorageSync("city", t.name), i.initpage()) : (qqmapsdk = new QQMapWX({
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
                        var a = t.result.address_component.city, e = a.substr(0, a.length - 1);
                        wx.setStorageSync("city", e), i.initpage();
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
                }), console.log(t.data.data.cityinfo), wx.setStorageSync("cityinfo", t.data.data.cityinfo), 
                a.gethouselist(), a.data.buildarea = t.data.data.buildarea, a.setData({
                    city: wx.getStorageSync("cityinfo").name,
                    arealist: t.data.data.arealist,
                    housepricelist: t.data.data.housepricelist,
                    title: a.data.title,
                    price: a.data.price,
                    typetitle: a.data.typetitle,
                    intro: t.data.data.intro
                }));
            },
            complete: function() {
                wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
        });
    },
    gethouselist: function(t) {
        var a = this, e = wx.getStorageSync("cityinfo").id;
        app.util.request({
            url: "entry/wxapp/getnewhouselist",
            data: {
                cityid: e,
                page: a.data.page,
                houseareaid: a.data.houseareaid,
                housepriceid: a.data.housepriceid,
                housetype: a.data.housetype,
                bid: a.data.bid
            },
            success: function(t) {
                t.data.message.errno || a.setData({
                    houselist: t.data.data
                });
            },
            complete: function() {
                a.setData({
                    loadMore: ""
                });
            }
        });
    },
    toHouseDetail: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_house/pages/newhousedetail/index?id=" + a
        });
    },
    toSearch: function(t) {
        wx.navigateTo({
            url: "/weixinmao_house/pages/search/index"
        });
    },
    selectcarsitem: function(t) {
        var a = this.data.buildarea, e = t.currentTarget.id, i = t.currentTarget.dataset.title;
        this.data.title = i, 0 == (this.data.houseareaid = e) ? (this.data.bid = 0, this.setData({
            carid: e,
            isCars: !0,
            title: i
        }), this.gethouselist()) : this.setData({
            carid: e,
            title: i,
            isTaps: !1,
            buildarealist: a[e]
        });
    },
    selectbuilditem: function(t) {
        this.data.buildarea;
        var a = t.currentTarget.id, e = t.currentTarget.dataset.title;
        this.data.title = e, this.setData({
            bid: a,
            isTaps: !0,
            isCars: !0,
            title: e
        }), this.data.bid = a, this.gethouselist();
    },
    selectpriceitem: function(t) {
        var a = t.currentTarget.id, e = t.currentTarget.dataset.title;
        this.data.price = e, this.setData({
            priceid: a,
            isPrice: !0,
            price: e
        }), this.data.housepriceid = a, this.gethouselist();
    },
    selecttypeitem: function(t) {
        var a = t.currentTarget.id, e = t.currentTarget.dataset.title;
        this.data.typetitle = e, this.setData({
            typeid: a,
            isType: !0,
            typetitle: e
        }), this.data.housetype = a, this.gethouselist();
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
            isTaps: !0,
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
        wx.showNavigationBarLoading(), this.onShow();
    },
    onShareAppMessage: function() {
        return {
            title: "新楼盘-" + wx.getStorageSync("companyinfo").name,
            path: "/weixinmao_house/pages/newhouselist/index"
        };
    }
});