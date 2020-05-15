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
        showtip: "提交预约",
        paystatus: 0,
        houseinfo: [],
        houseplan: [],
        toplistinfo: null
    },
    onLoad: function(t) {
        if (wx.setNavigationBarTitle({
            title: "维修申请"
        }), 0 < this.data.id) this.data.id; else {
            t.id;
            this.data.id = t.id;
        }
        this.oldhouseinit();
    },
    oldhouseinit: function(t) {
        var a = this;
        app.util.request({
            url: "entry/wxapp/getnewhousedetail",
            data: {
                id: a.data.id
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
                }), a.data.title = t.data.data.list.housename, a.data.address = t.data.data.list.houseaddress, 
                a.data.lat = t.data.data.list.lat, a.data.lng = t.data.data.list.lng, a.data.houseinfo = t.data.data.list, 
                a.data.houseplan = t.data.data.houseplan, wx.setNavigationBarTitle({
                    title: t.data.data.intro.name
                }), a.setData({
                    data: t.data.data.list,
                    toplist: t.data.data.houseplan,
                    showtip: a.data.showtip
                }));
            },
            complete: function() {
                wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
        });
    },
    bindAreaChange: function(t) {
        var a = this.data.arealist;
        a && (this.data.areaid = a[t.detail.value].id), this.setData({
            arealist: a,
            areaidindex: t.detail.value
        });
    },
    bindToplistChange: function(t) {
        var a = this.data.toplist, i = this.data.houseplan;
        a && (this.data.toplistid = a[t.detail.value].id);
        for (var e = 0; e < i.length; e++) i[e].id == this.data.toplistid && (this.data.toplistinfo = i[e]);
        console.log(this.data.toplistinfo), 1 == this.data.paystatus ? this.data.showtip = "支付全款" + this.data.toplistinfo.money : 2 == this.data.paystatus ? this.data.showtip = "支付定金" + this.data.toplistinfo.dmoney : this.data.showtip = "提交预约", 
        this.setData({
            toplist: a,
            showtip: this.data.showtip,
            toplistidindex: t.detail.value
        });
    },
    savepubinfo: function(t) {
        var a = this, i = wx.getStorageSync("userInfo"), e = t.detail.value.name, o = t.detail.value.tel, s = t.detail.value.content;
        if ("" != e) if ("" != o) if ("" != s) {
            var n = {
                sessionid: i.sessionid,
                uid: i.memberInfo.uid,
                id: a.data.id,
                name: e,
                tel: o,
                content: s
            };
            app.util.request({
                url: "entry/wxapp/savecomplain",
                data: n,
                success: function(t) {
                    if (0 != t.data.errno) return wx.hideLoading(), void wx.showModal({
                        title: "失败",
                        content: t.data.data.msg,
                        showCancel: !1
                    });
                    0 == t.data.data.error ? wx.showToast({
                        title: t.data.data.msg,
                        icon: "success",
                        duration: 2e3,
                        success: function(t) {
                            console.log(t), wx.navigateTo({
                                url: "/weixinmao_house/pages/agentdetail/index?id=" + a.data.id
                            });
                        }
                    }) : wx.showModal({
                        title: "失败",
                        content: t.data.data.msg,
                        showCancel: !1
                    });
                }
            });
        } else wx.showModal({
            title: "提示",
            content: "请输入投诉内容",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: "请输入手机号",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: "请输入联系人",
            showCancel: !1
        });
    },
    radioChange: function(t) {
        var a = this;
        a.data.paystatus = t.detail.value, console.log(a.data.toplistid), console.log(a.data.houseplan), 
        a.data.toplistinfo && (1 == a.data.paystatus ? a.data.showtip = "支付全款" + a.data.toplistinfo.money : 2 == a.data.paystatus ? a.data.showtip = "支付定金" + a.data.toplistinfo.dmoney : a.data.showtip = "提交预约"), 
        a.setData({
            showtip: a.data.showtip
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    bindDateChange: function(t) {
        this.data.date = t.detail.value, console.log(t.detail.value), this.setData({
            dates: t.detail.value
        });
    },
    bindTimeChange: function(t) {
        this.data.datetime = t.detail.value, console.log(t.detail.value), this.setData({
            datetime: t.detail.value
        });
    },
    uploadimg: function(t, o) {
        var a = app.util.geturl({
            url: "entry/wxapp/upload"
        });
        o = o;
        wx.showToast({
            icon: "loading",
            title: "正在上传"
        });
        var s = this;
        wx.uploadFile({
            url: a,
            filePath: t[0],
            name: "file",
            header: {
                "Content-Type": "multipart/form-data"
            },
            formData: {
                session_token: wx.getStorageSync("session_token")
            },
            success: function(t) {
                var a = JSON.parse(t.data);
                if (200 == t.statusCode) for (var i = a.data.path, e = 0; e < s.data.uploadimagelist.length; e++) {
                    e + 1 == o && (s.data.uploadimagelist[e] = i);
                } else wx.showModal({
                    title: "提示",
                    content: "上传失败",
                    showCancel: !1
                });
            },
            fail: function(t) {
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
    checkboxChange: function(t) {
        var a = t.detail.value;
        this.data.special = a.join(",");
    },
    checkuser: function(a) {
        var i = this, t = (a = a, wx.getStorageSync("userInfo"));
        return console.log(t), t ? t.memberInfo.uid ? void app.util.request({
            url: "entry/wxapp/checkuserinfo",
            data: {
                sessionid: t.sessionid,
                uid: t.memberInfo.uid
            },
            success: function(t) {
                console.log("payyyy"), 0 == t.data.data.error ? a.doServices() : 2 == t.data.data.error && a.doElseServices();
            }
        }) : (app.util.getUserInfo(), !1) : (app.util.getUserInfo(function(t) {
            i.getlethousedetail();
        }), !1);
    }
});