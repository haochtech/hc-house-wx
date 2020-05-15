var qqmapsdk, QQMapWX = require("../../resource/js/qqmap-wx-jssdk.min.js"), config = require("../../resource/js/config.js"), markersData = [], app = getApp();

Page({
    data: {
        autoplay: !0,
        interval: 3e3,
        duration: 1e3,
        showmsg: !0,
        isshow: !0,
        moban: 0
    },
    onLoad: function(a) {
        var t = this;
        t.setData({
            isshow: !0
        }), app.util.request({
            url: "entry/wxapp/GetFxSysInit",
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
                    newhouselist: a.data.data.newhouselist,
                    oldhouselist: a.data.data.oldhouselist,
                    lethouselist: a.data.data.lethouselist,
                    agentlist: a.data.data.agentlist,
                    navlist: a.data.data.navlist,
                    banners: a.data.data.banner,
                    intro: a.data.data.intro,
                    ordertype: 1,
                    moban: a.data.data.intro.moban,
                    isshow: !1
                }));
            },
            complete: function() {
                wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
        });
    },
    toletHouseDetail: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_house/pages/lethousedetail/index?id=" + t
        });
    },
    toNewHouse: function(a) {
        wx.switchTab({
            url: "/weixinmao_house/pages/newhouselist/index"
        });
    },
    toOldHouse: function(a) {
        wx.switchTab({
            url: "/weixinmao_house/pages/oldhouselist/index"
        });
    },
    toAgentlist: function(a) {
        wx.navigateTo({
            url: "/weixinmao_house/pages/agentlist/index"
        });
    },
    toArticle: function(a) {
        wx.navigateTo({
            url: "/weixinmao_house/pages/salelist/index"
        });
    },
    toActive: function(a) {
        wx.navigateTo({
            url: "/weixinmao_house/pages/active/index"
        });
    },
    toNewHouseDetail: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_house/pages/fxnewshare/index?id=" + t
        });
    },
    toOldHouseDetail: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_house/pages/fxoldshare/index?id=" + t
        });
    },
    toLethouse: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_house/pages/lethouselist/index?id=" + t
        });
    },
    toMessage: function(a) {
        wx.navigateTo({
            url: "/weixinmao_house/pages/message/index"
        });
    },
    toSearch: function(a) {
        wx.navigateTo({
            url: "/weixinmao_house/pages/search/index"
        });
    },
    PubOldhouse: function(a) {
        var t = this;
        wx.navigateTo({
            url: "/weixinmao_house/pages/pub/index",
            success: function() {
                t.data.showmsg = !0, t.setData({
                    showmsg: t.data.showmsg
                });
            }
        });
    },
    PubLethouse: function(a) {
        var t = this;
        wx.navigateTo({
            url: "/weixinmao_house/pages/letpub/index",
            success: function() {
                t.data.showmsg = !0, t.setData({
                    showmsg: t.data.showmsg
                });
            }
        });
    },
    toSaleOldPub: function(a) {
        var t = this;
        wx.navigateTo({
            url: "/weixinmao_house/pages/saleoldpub/index",
            success: function() {
                t.data.showmsg = !0, t.setData({
                    showmsg: t.data.showmsg
                });
            }
        });
    },
    toSalePub: function(a) {
        var t = this;
        wx.navigateTo({
            url: "/weixinmao_house/pages/salepub/index",
            success: function() {
                t.data.showmsg = !0, t.setData({
                    showmsg: t.data.showmsg
                });
            }
        });
    },
    toSaleBuyPub: function(a) {
        var t = this;
        wx.navigateTo({
            url: "/weixinmao_house/pages/salebuypub/index",
            success: function() {
                t.data.showmsg = !0, t.setData({
                    showmsg: t.data.showmsg
                });
            }
        });
    },
    toSaleLetPub: function(a) {
        var t = this;
        wx.navigateTo({
            url: "/weixinmao_house/pages/saleletpub/index",
            success: function() {
                t.data.showmsg = !0, t.setData({
                    showmsg: t.data.showmsg
                });
            }
        });
    },
    tabClick: function(a) {
        var t = a.currentTarget.id;
        this.setData({
            ordertype: t
        });
    },
    goPub: function(a) {
        this.data.showmsg = !1, this.setData({
            showmsg: this.data.showmsg
        });
    },
    toAgentDetail: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_house/pages/agentdetail/index?id=" + t
        });
    },
    closemsg: function(a) {
        this.data.showmsg = !0, this.setData({
            showmsg: this.data.showmsg
        });
    },
    goMap: function(a) {
        wx.openLocation({
            latitude: parseFloat(wx.getStorageSync("companyinfo").lat),
            longitude: parseFloat(wx.getStorageSync("companyinfo").lng),
            scale: 18,
            name: wx.getStorageSync("companyinfo").name,
            address: wx.getStorageSync("companyinfo").address
        });
    },
    onReady: function() {},
    bindInput: function(a) {
        this.setData({
            inputValue: a.detail.value
        }), this.onShow();
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), this.onLoad();
    },
    doCall: function() {
        var a = this.data.textData.shop_tel;
        wx.makePhoneCall({
            phoneNumber: a
        });
    },
    onShareAppMessage: function() {
        return {
            title: wx.getStorageSync("companyinfo").name,
            path: "/weixinmao_house/pages/index/index"
        };
    }
});