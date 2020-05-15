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
        var i = 750 / e, n = this.data.imgheights;
        n.push(i), this.setData({
            imgheights: n
        });
    },
    bindchange: function(a) {
        console.log(a.detail.current), this.setData({
            current: a.detail.current
        });
    },
    onLoad: function(a) {
        var t = this;
        if (0 < this.data.id) this.data.id; else {
            a.id;
            this.data.id = a.id;
        }
        var u = wx.getStorageSync("userInfo");
        if(u){
            var uid = u.memberInfo.uid;
        }else{
            var uid = '';
        }
        app.util.request({
            url: "entry/wxapp/getnewhousedetail",
            data: {
                id: t.data.id,
                uid:uid
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
                }), t.data.title = a.data.data.list.housename, t.data.address = a.data.data.list.houseaddress, 
                t.data.lat = a.data.data.list.lat, t.data.lng = a.data.data.list.lng, wx.setNavigationBarTitle({
                    title: t.data.title + "-" + a.data.data.intro.name
                }), t.setData({
                    activelist: a.data.data.active_list,
                    data: a.data.data.list,
                    issave: a.data.data.issave,
                    score: a.data.data.score,
                    housepic: a.data.data.housepic,
                    houseplan: a.data.data.houseplan,
                    piclist: a.data.data.piclist,
                    commentlist: a.data.data.commentlist,
                    content: WxParse.wxParse("article", "html", a.data.data.list.content, t, 5)
                }));
            },
            complete: function() {
                wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
        });
    },
    toHousemoney: function() {
        wx.navigateTo({
            url: "/weixinmao_house/pages/housemoney/index"
        });
    },
    toComment: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_house/pages/comment/index?id=" + t
        });
    },
    savehouse: function(a) {
        var t = this, e = wx.getStorageSync("userInfo"), i = t.data.id;
        app.util.request({
            url: "entry/wxapp/savehouse",
            data: {
                housetype: "newhouse",
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
    toActiveDetail: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_house/pages/activedetail/index?id=" + t
        });
    },
    goMessage: function(a) {
        var t = this.data.id, e = a.currentTarget.dataset.typeid;
        wx.navigateTo({
            url: "/weixinmao_house/pages/housemsg/index?id=" + t + "&typeid=" + e
        });
    },
    toPicDetail: function(a) {
        var t = a.currentTarget.dataset.id, e = a.currentTarget.dataset.typeid;
        wx.navigateTo({
            url: "/weixinmao_house/pages/picdetail/index?id=" + t + "&typeid=" + e
        });
    },
    goMap: function(a) {
        var t = this;
        wx.openLocation({
            latitude: Number(t.data.lat),
            longitude: Number(t.data.lng),
            scale: 18,
            name: t.data.title,
            address: t.data.address
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
    jumpTo: function(a) {
        var t = a.currentTarget.dataset.opt;
        console.log(t), this.setData({
            toView: t
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
    return {
        title: this.data.title + "-" + wx.getStorageSync("companyinfo").name,
        path: "/weixinmao_house/pages/newhousedetail/index?id=" + this.data.id
    };
}));