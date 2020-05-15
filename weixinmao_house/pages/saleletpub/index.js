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
        toplistid: -1,
        isuser: !0,
        isagree: 0
    },
    onLoad: function(a) {
        var t = this;
        wx.setNavigationBarTitle({
            title: "求租房屋发布-" + wx.getStorageSync("companyinfo").name
        });
        var e = wx.getStorageSync("userInfo");
        console.log(e), e ? (t.data.isuser = !0, t.setData({
            userinfo: e
        })) : t.data.isuser = !1, t.setData({
            isuser: t.data.isuser
        }), t.oldhouseinit();
    },
    oldhouseinit: function(a) {
        var t = this, e = (wx.getStorageSync("userInfo"), wx.getStorageSync("cityinfo"));
        app.util.request({
            url: "entry/wxapp/Getpubinit",
            data: {
                cityid: e.id
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
                }), t.data.arealist = a.data.data.arealist, t.data.toplist = a.data.data.toplist, 
                t.setData({
                    arealist: a.data.data.arealist,
                    toplist: a.data.data.toplist,
                    intro: a.data.data.intro
                }));
            }
        });
    },
    goHousexy: function(a) {
        wx.navigateTo({
            url: "/weixinmao_house/pages/housexy/index"
        });
    },
    bindGetUserInfo: function(a) {
        var t = this;
        app.util.getUserInfo(function(a) {
            console.log(a), t.data.isuser = !0, t.setData({
                userinfo: a,
                isuser: t.data.isuser
            });
        }, a.detail);
    },
    bindAreaChange: function(a) {
        var t = this.data.arealist;
        t && (this.data.areaid = t[a.detail.value].id), this.setData({
            arealist: t,
            areaidindex: a.detail.value
        });
    },
    bindToplistChange: function(a) {
        var t = this.data.toplist;
        t && (this.data.toplistid = t[a.detail.value].id), this.setData({
            toplist: t,
            toplistidindex: a.detail.value
        });
    },
    upload: function(a) {
        var t = this;
        a = a;
        t.checkuser({
            doServices: function() {
                t.doupload(a);
            },
            doElseServices: function() {
                t.doupload(a);
            }
        });
    },
    doupload: function(a) {
        var e, i, o, s, n, r, l = this, u = parseInt(a.currentTarget.dataset.id);
        switch (u) {
          case 1:
            if (0 == l.data.true1) return;
            break;

          case 2:
            if (0 == l.data.true2) return;
            break;

          case 3:
            if (0 == l.data.true3) return;
            break;

          case 4:
            if (0 == l.data.true4) return;
            break;

          case 5:
            if (0 == l.data.true5) return;
            break;

          case 6:
            if (0 == l.data.true6) return;
        }
        wx.chooseImage({
            count: 1,
            sizeType: [ "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                var t = a.tempFilePaths;
                switch (u) {
                  case 1:
                    if (e = t, console.log(l.data.true1), 0 == l.data.true1) return;
                    l.data.true1 = !1;
                    break;

                  case 2:
                    i = t, l.data.true2 = !1;
                    break;

                  case 3:
                    o = t, l.data.true3 = !1;
                    break;

                  case 4:
                    s = t, l.data.true4 = !1;
                    break;

                  case 5:
                    n = t, l.data.true5 = !1;
                    break;

                  case 6:
                    r = t, l.data.true6 = !1;
                }
                l.setData({
                    imgurl1: e,
                    imgurl2: i,
                    imgurl3: o,
                    imgurl4: s,
                    imgurl5: n,
                    imgurl6: r,
                    true1: l.data.true1,
                    true2: l.data.true2,
                    true3: l.data.true3,
                    true4: l.data.true4,
                    true5: l.data.true5,
                    true6: l.data.true6
                }), l.data.imagelist.push(t), l.uploadimg(t, u);
            }
        });
    },
    delupload: function(a) {
        var t = this, e = parseInt(a.currentTarget.dataset.id);
        switch (e) {
          case 1:
            t.setData({
                imgurl1: "",
                true1: !0
            });
            break;

          case 2:
            t.setData({
                imgurl2: "",
                true2: !0
            });
            break;

          case 3:
            t.setData({
                imgurl3: "",
                true3: !0
            });
            break;

          case 4:
            t.setData({
                imgurl4: "",
                true4: !0
            });
            break;

          case 5:
            t.setData({
                imgurl5: "",
                true5: !0
            });
            break;

          case 6:
            t.setData({
                imgurl6: "",
                true6: !0
            });
        }
        for (var i = 0; i < this.data.uploadimagelist.length; i++) {
            i + 1 == e && (this.data.uploadimagelist[i] = "");
        }
        console.log(this.data.uploadimagelist);
    },
    doagree: function(a) {
        var t = a.detail.value;
        0 < t.length ? this.data.isagree = t[0] : this.data.isagree = 0, console.log(this.data.isagree);
    },
    savepubinfo: function(a) {
        var o = this, t = wx.getStorageSync("userInfo"), e = wx.getStorageSync("cityinfo");
        if (0 != o.data.isagree) {
            var i = a.detail.value.content, s = a.detail.value.name, n = a.detail.value.tel, r = this.data.areaid, l = this.data.special;
            if ("" != i) if (l) {
                var u = this.data.uploadimagelist;
                if (u.length < 2) wx.showModal({
                    title: "提示",
                    content: "上传图片不少于2张",
                    showCancel: !1
                }); else if ("" != s) if ("" != n) if (0 != r) {
                    var d = u.join("@"), c = this.data.toplistid;
                    if (-1 != c) {
                        var p = {
                            sessionid: t.sessionid,
                            uid: t.memberInfo.uid,
                            uploadimagelist_str: d,
                            content: i,
                            special: l,
                            name: s,
                            tel: n,
                            houseareaid: r,
                            saletype: 4,
                            avatarUrl: t.wxInfo.avatarUrl,
                            toplistid: c,
                            cityid: e.id
                        };
                        app.util.request({
                            url: "entry/wxapp/savesaleinfo",
                            data: p,
                            success: function(a) {
                                if (0 < o.data.toplistid) {
                                    var t = o.data.toplistid, e = a.data.data.saleinfoid, i = wx.getStorageSync("userInfo");
                                    wx.showModal({
                                        title: "确认支付",
                                        content: "确认支付？",
                                        success: function(a) {
                                            a.confirm && app.util.request({
                                                url: "entry/wxapp/Salepay",
                                                data: {
                                                    toplistid: t,
                                                    ordertype: "puboldhouse",
                                                    pid: e,
                                                    sessionid: i.sessionid,
                                                    uid: i.memberInfo.uid
                                                },
                                                success: function(a) {
                                                    console.log(a), a.data && a.data.data && wx.requestPayment({
                                                        timeStamp: a.data.data.timeStamp,
                                                        nonceStr: a.data.data.nonceStr,
                                                        package: a.data.data.package,
                                                        signType: "MD5",
                                                        paySign: a.data.data.paySign,
                                                        success: function(a) {
                                                            console.log(a), wx.showToast({
                                                                title: "提交成功",
                                                                icon: "success",
                                                                duration: 2e3,
                                                                success: function(a) {
                                                                    console.log(a), wx.navigateTo({
                                                                        url: "/weixinmao_house/pages/mypub/index?id=4"
                                                                    });
                                                                }
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
                                } else {
                                    if (0 != a.data.errno) return wx.hideLoading(), void wx.showModal({
                                        title: "失败",
                                        content: a.data.data.msg,
                                        showCancel: !1
                                    });
                                    wx.showToast({
                                        title: "提交成功",
                                        icon: "success",
                                        duration: 2e3,
                                        success: function(a) {
                                            console.log(a), wx.navigateTo({
                                                url: "/weixinmao_house/pages/mypub/index?id=4"
                                            });
                                        }
                                    });
                                }
                            }
                        });
                    } else wx.showModal({
                        title: "提示",
                        content: "请选择置顶信息",
                        showCancel: !1
                    });
                } else wx.showModal({
                    title: "提示",
                    content: "请选择地区",
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
            } else wx.showModal({
                title: "提示",
                content: "请选择房屋特色",
                showCancel: !1
            }); else wx.showModal({
                title: "提示",
                content: "请输入求租房描述",
                showCancel: !1
            });
        } else wx.showModal({
            title: "提示",
            content: "请先同意房屋委托出售协议",
            showCancel: !1
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
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
            e.oldhouseinit();
        }), !1);
    }
});