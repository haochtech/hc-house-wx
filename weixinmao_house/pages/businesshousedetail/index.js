var _data;

function _defineProperty(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}

var WxParse = require("../../resource/wxParse/wxParse.js"), app = getApp();

Page(_defineProperty({
    data: (_data = {
        images: {},
        autoplay: !0,
        interval: 3e3,
        duration: 1e3,
        title: "",
        address: "",
        lat: 0,
        lng: 0,
        id: 0
    }, _defineProperty(_data, "title", ""), _defineProperty(_data, "hdimg", []), _defineProperty(_data, "circular", !0), 
    _defineProperty(_data, "indicatorDots", !1), _defineProperty(_data, "indicatorcolor", "#000"), 
    _defineProperty(_data, "vertical", !1), _defineProperty(_data, "imgheights", []), 
    _defineProperty(_data, "imgwidth", 750), _defineProperty(_data, "current", 0), _data),
    imageLoad: function(a) {
        var t = a.detail.width, e = t / (i = a.detail.height);
        console.log(t, i);
        var i = 750 / e, o = this.data.imgheights;
        o.push(i), this.setData({
            imgheights: o
        });
    },
    bindchange: function(a) {
        console.log(a.detail.current), this.setData({
            current: a.detail.current
        });
    },
    onLoad: function(a) {
        var t = this;
        if (0 < this.data.id) var e = this.data.id; else {
            e = a.id;
            this.data.id = a.id;
        }
        app.util.request({
            url: "entry/wxapp/getbusinesshousedetail",
            data: {
                id: e
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
                }), t.data.title = a.data.data.list.title, t.data.address = a.data.data.list.address, 
                t.data.lat = a.data.data.list.lat, t.data.lng = a.data.data.list.lng, wx.setNavigationBarTitle({
                    title: t.data.title + "-" + a.data.data.intro.name
                }), t.setData({
                    data: a.data.data.list,
                    piclist: a.data.data.piclist,
                    housepic: a.data.data.housepic,
                    houseplan: a.data.data.houseplan,
                    agentinfo: a.data.data.agentinfo,
                    issave: a.data.data.issave,
                    oldhouselist: a.data.data.houselist,
                    content: WxParse.wxParse("article", "html", a.data.data.list.content, t, 5)
                }));
            },
            complete: function() {
                wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
        });
    },
    toOldHouseDetail: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_house/pages/oldhousedetail/index?id=" + t
        });
    },
    goMessage: function(a) {
        var t = this.data.id, e = a.currentTarget.dataset.typeid;
        wx.navigateTo({
            url: "/weixinmao_house/pages/housemsg/index?id=" + t + "&typeid=" + e
        });
    },
    toHousemoney: function() {
        wx.navigateTo({
            url: "/weixinmao_house/pages/housemoney/index"
        });
    },
    toAgentDetail: function(a) {
        var t = a.currentTarget.dataset.id;
        0 == t ? wx.switchTab({
            url: "/weixinmao_house/pages/oldhouselist/index"
        }) : wx.navigateTo({
            url: "/weixinmao_house/pages/agentdetail/index?id=" + t
        });
    },
    goMap: function(a) {
        var t = this;
        console.log(t.data.lat), console.log(t.data.lng), wx.openLocation({
            latitude: Number(t.data.lat),
            longitude: Number(t.data.lng),
            scale: 28,
            name: t.data.title,
            address: t.data.address
        });
    },
    savehouse: function(a) {
        var t = this, e = wx.getStorageSync("userInfo"), i = t.data.id;
        app.util.request({
            url: "entry/wxapp/savehouse",
            data: {
                housetype: "oldhouse",
                pid: i,
                sessionid: e.sessionid,
                uid: e.memberInfo.uid
            },
            success: function(a) {
                a.data.message.errno || t.setData({
                    issave: a.data.data.issave
                });
            }
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
    onShareAppMessage: function() {}
}, "onShareAppMessage", function() {
    return console.log(this.data.id), {
        title: this.data.title + "-" + wx.getStorageSync("companyinfo").name,
        path: "/weixinmao_house/pages/oldhousedetail/index?id=" + this.data.id
    };
}));