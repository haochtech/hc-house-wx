var R_htmlToWxml = require("../../resource/js/htmlToWxml.js"), app = getApp();

Page({
    data: {
        id: 0,
        title: "",
        tel: "",
        pid: 1
    },
    onLoad: function(a) {
        if (wx.setNavigationBarTitle({
            title: wx.getStorageSync("companyinfo").name
        }), 0 < this.data.id) var t = this.data.id; else {
            t = a.id;
            this.data.id = a.id;
        }
        var e = this;
        app.util.request({
            url: "entry/wxapp/getagentdetail",
            data: {
                id: t
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
                }), e.data.title = a.data.data.list.name + "-" + wx.getStorageSync("companyinfo").name, 
                e.data.tel = a.data.data.list.tel, wx.setNavigationBarTitle({
                    title: e.data.title
                }), console.log(a.data.data.oldhouselist), e.setData({
                    data: a.data.data.list,
                    list: a.data.data.oldhouselist,
                    activeCategoryId: 1,
                    city: wx.getStorageSync("companyinfo").city,
                    intro: a.data.data.intro
                }));
            },
            complete: function() {
                wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
        });
    },
    tabClick: function(a) {
        var t = a.currentTarget.id, e = this;
        e.data.pid = t;
        var i = e.data.tel;
        app.util.request({
            url: "entry/wxapp/getagenthouse",
            data: {
                pid: t,
                tel: i
            },
            success: function(a) {
                a.data.message.errno || e.setData({
                    list: a.data.data.houselist,
                    activeCategoryId: t
                });
            }
        });
    },
    toComplain: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_house/pages/complain/index?id=" + t
        });
    },
    toHouseDetail: function(a) {
        var t = a.currentTarget.dataset.id;
        1 == this.data.pid ? wx.navigateTo({
            url: "/weixinmao_house/pages/oldhousedetail/index?id=" + t
        }) : wx.navigateTo({
            url: "/weixinmao_house/pages/lethousedetail/index?id=" + t
        });
    },
    doCall: function(a) {
        console.log(a.currentTarget);
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
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), this.onLoad();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: this.data.title,
            path: "/weixinmao_house/pages/agentdetail/index?id=" + this.data.id
        };
    }
});