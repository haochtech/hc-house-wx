var app = getApp();

Page({
    data: {
        city: wx.getStorageSync("companyinfo").city,
        isCars: !0,
        isSort: !0,
        isPrice: !0,
        isType: !0,
        isTaps: !0,
        isSelect: !0,
        loadMore: "",
        list: [],
        house_list: [],
        housetypelist: [],
        housewaylist: [],
        houseareaid: 0,
        housepriceid: 0,
        housetype: 0,
        letway: 0,
        page: 1,
        title: "",
        price: "",
        typetitle: "",
        selecttitle: "",
        bid: 0,
        buildarea: ""
    },
    onShow: function() {
        var i = this;
        wx.setNavigationBarTitle({
            title: "急售房源-" + wx.getStorageSync("companyinfo").name
        });
        this.setData({
            housetypelist: [ {
                name: "1室",
                id: 1
            }, {
                name: "2室",
                id: 2
            }, {
                name: "3室",
                id: 3
            }, {
                name: "4室",
                id: 4
            }, {
                name: "5室",
                id: 5
            }, {
                name: "5室以上",
                id: 6
            } ],
            housewaylist: [ {
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
            priceid: 0,
            selectid: 0
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
            url: "entry/wxapp/getinitoldinfo",
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
                }), wx.setStorageSync("cityinfo", t.data.data.cityinfo), console.log(wx.getStorageSync("cityinfo")), 
                e.gethouselist(), e.data.buildarea = t.data.data.buildarea, e.setData({
                    city: wx.getStorageSync("cityinfo").name,
                    arealist: t.data.data.arealist,
                    housepricelist: t.data.data.housepricelist,
                    title: e.data.title,
                    price: e.data.price,
                    typetitle: e.data.typetitle,
                    intro: t.data.data.intro
                }));
            },
            complete: function() {
                wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
        });
    },
    toHouseDetail: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_house/pages/oldsalehousedetail/index?id=" + e
        });
    },
    toSearch: function(t) {
        wx.navigateTo({
            url: "/weixinmao_house/pages/search/index"
        });
    },
    gethouselist: function(t) {
        var e = this, a = wx.getStorageSync("cityinfo").id;
        app.util.request({
            url: "entry/wxapp/getoldsalehouselist",
            data: {
                cityid: a,
                page: e.data.page,
                houseareaid: e.data.houseareaid,
                housepriceid: e.data.housepriceid,
                housetype: e.data.housetype,
                bid: e.data.bid,
                letway: e.data.letway
            },
            success: function(t) {
                t.data.message.errno || (console.log(t.data.data), e.setData({
                    houselist: t.data.data
                }));
            },
            complete: function() {
                e.setData({
                    loadMore: ""
                });
            }
        });
    },
    selectcarsitem: function(t) {
        var e = this.data.buildarea, a = t.currentTarget.id, i = t.currentTarget.dataset.title;
        this.data.title = i, 0 == (this.data.houseareaid = a) ? (this.data.bid = 0, this.setData({
            carid: a,
            isCars: !0,
            title: i
        }), this.gethouselist()) : this.setData({
            carid: a,
            title: i,
            isTaps: !1,
            buildarealist: e[a]
        });
    },
    selectbuilditem: function(t) {
        this.data.buildarea;
        var e = t.currentTarget.id, a = t.currentTarget.dataset.title;
        this.data.title = a, this.setData({
            bid: e,
            isTaps: !0,
            isCars: !0,
            title: a
        }), this.data.bid = e, this.gethouselist();
    },
    selectpriceitem: function(t) {
        console.log(t.currentTarget.id);
        var e = t.currentTarget.id, a = t.currentTarget.dataset.title;
        this.data.price = a, console.log(t.currentTarget), this.setData({
            priceid: e,
            isPrice: !0,
            price: a
        }), this.data.housepriceid = e, this.gethouselist();
    },
    selecttypeitem: function(t) {
        console.log(t.currentTarget.id);
        var e = t.currentTarget.id, a = t.currentTarget.dataset.title;
        this.data.typetitle = a, console.log(t.currentTarget), this.setData({
            typeid: e,
            isType: !0,
            typetitle: a
        }), this.data.housetype = e, this.gethouselist();
    },
    selectwayitem: function(t) {
        console.log(t.currentTarget.id);
        var e = t.currentTarget.id, a = t.currentTarget.dataset.title;
        this.data.selecttitle = a, console.log(t.currentTarget), this.setData({
            selectid: e,
            isSelect: !0,
            selecttitle: a
        }), this.data.letway = e, this.gethouselist();
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
            isSelect: !0,
            isCars: !this.data.isCars
        });
    },
    selectPrice: function() {
        this.setData({
            isSort: !0,
            isCars: !0,
            isType: !0,
            isSelect: !0,
            isPrice: !this.data.isPrice
        });
    },
    selectType: function() {
        this.setData({
            isSort: !0,
            isCars: !0,
            isPrice: !0,
            isSelect: !0,
            isType: !this.data.isType
        });
    },
    selectWay: function() {
        this.setData({
            isSort: !0,
            isCars: !0,
            isPrice: !0,
            isType: !0,
            isSelect: !this.data.isSelect
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
            title: "二手房-" + wx.getStorageSync("companyinfo").name,
            path: "/weixinmao_house/pages/oldhouselist/index"
        };
    }
});