var app = getApp();

Page({
    data: {
        title: "",
        special: "",
        imagelist: [],
        uploadimagelist: [ "", "", "", "", "", "" ],
        true1: !0,
        true2: !0,
        true3: !0,
        true4: !0,
        true5: !0,
        true6: !0,
        arealist: [],
        toplist: [],
        areaid: 0,
        toplistid: 0,
        date: "",
        datetime: "",
        id: 0,
        showtip: "立即支付",
        paystatus: 0,
        houseinfo: [],
        houseplan: [],
        toplistinfo: null
    },
    onLoad: function(a) {
        var t = this;
        if (0 < t.data.id) this.data.id; else {
            a.id;
            t.data.id = a.id;
        }
        t.oldhouseinit();
    },
    oldhouseinit: function(a) {
        var t = this;
        app.util.request({
            url: "entry/wxapp/gethousemsg",
            data: {
                id: t.data.id
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
                }), t.data.houseinfo = a.data.data.list.newhouse, t.data.houseplan = a.data.data.list.houseplan, 
                console.log(t.data.houseplan), wx.setNavigationBarTitle({
                    title: a.data.data.intro.name
                }), t.setData({
                    data: a.data.data.list.newhouse,
                    toplist: a.data.data.list.houseplan,
                    showtip: t.data.showtip
                }));
            },
            complete: function() {
                wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
        });
    },
    bindAreaChange: function(a) {
        var t = this.data.arealist;
        t && (this.data.areaid = t[a.detail.value].id), this.setData({
            arealist: t,
            areaidindex: a.detail.value
        });
    },
    bindToplistChange: function(a) {
        var t = this.data.toplist, e = this.data.houseplan;
        t && (this.data.toplistid = t[a.detail.value].id);
        for (var i = 0; i < e.length; i++) e[i].id == this.data.toplistid && (this.data.toplistinfo = e[i]);
        console.log(this.data.toplistinfo), 1 == this.data.paystatus ? this.data.showtip = "支付全款" + this.data.toplistinfo.money : 2 == this.data.paystatus ? this.data.showtip = "支付定金" + this.data.toplistinfo.dmoney : this.data.showtip = "立即支付", 
        this.setData({
            toplist: t,
            showtip: this.data.showtip,
            toplistidindex: a.detail.value
        });
    },
    savepubinfo: function(a) {
        var t = wx.getStorageSync("userInfo"), e = this.data.id, i = this.data.paystatus;
        if (0 != i) {
            wx.showModal({
                title: "支付提示",
                content: "是否支付？",
                success: function(a) {
                    a.confirm && app.util.request({
                        url: "entry/wxapp/payhousemsg",
                        data: {
                            pid: e,
                            paytype: i,
                            ordertype: "housemsg",
                            sessionid: t.sessionid,
                            uid: t.memberInfo.uid
                        },
                        success: function(a) {
                            a.data && a.data.data && wx.requestPayment({
                                timeStamp: a.data.data.timeStamp,
                                nonceStr: a.data.data.nonceStr,
                                package: a.data.data.package,
                                signType: "MD5",
                                paySign: a.data.data.paySign,
                                success: function(a) {
                                    wx.navigateTo({
                                        url: "/weixinmao_house/pages/orderlist/index"
                                    });
                                },
                                fail: function(a) {}
                            });
                        },
                        fail: function(a) {
                            console.log(a);
                        }
                    });
                }
            });
        } else wx.showModal({
            title: "提示",
            content: "请选择支付方式",
            showCancel: !1
        });
    },
    radioChange: function(a) {
        var t = this;
        t.data.paystatus = a.detail.value, console.log(t.data.toplistid), console.log(t.data.houseplan), 
        t.data.houseplan && (1 == t.data.paystatus ? t.data.showtip = "支付全款" + t.data.houseplan.money : 2 == t.data.paystatus ? t.data.showtip = "支付定金" + t.data.houseplan.dmoney : t.data.showtip = "立即支付"), 
        t.setData({
            showtip: t.data.showtip
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    bindDateChange: function(a) {
        this.data.date = a.detail.value, console.log(a.detail.value), this.setData({
            dates: a.detail.value
        });
    },
    bindTimeChange: function(a) {
        this.data.datetime = a.detail.value, console.log(a.detail.value), this.setData({
            datetime: a.detail.value
        });
    },
    uploadimg: function(a, o) {
        var t = app.util.geturl({
            url: "entry/wxapp/upload"
        });
        o = o;
        wx.showToast({
            icon: "loading",
            title: "正在上传"
        });
        var s = this;
        wx.uploadFile({
            url: t,
            filePath: a[0],
            name: "file",
            header: {
                "Content-Type": "multipart/form-data"
            },
            formData: {
                session_token: wx.getStorageSync("session_token")
            },
            success: function(a) {
                var t = JSON.parse(a.data);
                if (200 == a.statusCode) for (var e = t.data.path, i = 0; i < s.data.uploadimagelist.length; i++) {
                    i + 1 == o && (s.data.uploadimagelist[i] = e);
                } else wx.showModal({
                    title: "提示",
                    content: "上传失败",
                    showCancel: !1
                });
            },
            fail: function(a) {
                wx.showModal({
                    title: "提示",
                    content: "上传失败",
                    showCancel: !1
                });
            },
            complete: function() {
                wx.hideToast();
            }
        });
    },
    checkboxChange: function(a) {
        var t = a.detail.value;
        this.data.special = t.join(",");
    },
    checkuser: function(t) {
        var e = this, a = (t = t, wx.getStorageSync("userInfo"));
        return console.log(a), a ? a.memberInfo.uid ? void app.util.request({
            url: "entry/wxapp/checkuserinfo",
            data: {
                sessionid: a.sessionid,
                uid: a.memberInfo.uid
            },
            success: function(a) {
                console.log("payyyy"), 0 == a.data.data.error ? t.doServices() : 2 == a.data.data.error && t.doElseServices();
            }
        }) : (app.util.getUserInfo(), !1) : (app.util.getUserInfo(function(a) {
            e.getlethousedetail();
        }), !1);
    }
});