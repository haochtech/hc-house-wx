var app = getApp();

function isHasElementOne(a, e) {
    for (var t = 0, o = a.length; t < o; t++) if (a[t] == e) return t;
    return -1;
}

function isHasElementTwo(a, e) {
    for (var t = 0, o = a.length; t < o; t++) if (a[t].id == e) return t;
    return -1;
}

Page({
    data: {
        imagelist: [],
        uploadimagelist: [ "", "", "", "", "", "" ],
        true1: !0,
        true2: !0,
        true3: !0,
        true4: !0,
        true5: !0,
        true6: !0,
        sex: -1,
        id: 0,
        tid: 0,
        isuser: !0
    },
  cancelUser: function(){
    wx.navigateBack();
  },
    onLoad: function(a) {
        var e = this;
        wx.setNavigationBarTitle({
            title: "申请分销商-" + wx.getStorageSync("companyinfo").name
        });
        var t = decodeURIComponent(a.scene).split("="), o = parseInt(t[1]);
        e.data.tid = o;
        var i = wx.getStorageSync("userInfo");
        console.log(i), i ? i.hasOwnProperty("wxInfo") ? (e.data.isuser = !0, e.oldhouseinit()) : (e.data.isuser = !1, 
        e.initpage()) : (e.initpage(), e.data.isuser = !1), e.setData({
            isuser: e.data.isuser
        });
    },
    initpage: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/GetSysInit",
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
                }), e.setData({
                    intro: a.data.data.intro
                }));
            }
        });
    },
    oldhouseinit: function(a) {
        var t = this, e = wx.getStorageSync("userInfo");
        app.util.request({
            url: "entry/wxapp/Getcouponinit",
            data: {
                sessionid: e.sessionid,
                uid: e.memberInfo.uid
            },
            success: function(a) {
                if (!a.data.message.errno) if (a.data.data.intro.maincolor || (a.data.data.intro.maincolor = "#3274e5"), 
                wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: a.data.data.intro.maincolor,
                    animation: {
                        duration: 400,
                        timingFunc: "easeIn"
                    }
                }), t.setData({
                    intro: a.data.data.intro
                }), 1 == a.data.data.error) {
                    var e = "您已申请过分销商，并已审核通过！";
                    wx.redirectTo({
                        url: "/weixinmao_house/pages/done/index?m=" + e
                    });
                } else if (2 == a.data.data.error) {
                    e = "正在审核,请耐心等待！";
                    wx.redirectTo({
                        url: "/weixinmao_house/pages/done/index?m=" + e
                    });
                }
            }
        });
    },
    savepubinfo: function(a) {
        var e = wx.getStorageSync("userInfo"), t = a.detail.value.name, o = a.detail.value.tel, i = a.detail.value.weixin;
        if (console.log(e.wxInfo.avatarUrl), 0 != t) if ("" != o) if ("" != i) {
            var r = {
                sessionid: e.sessionid,
                uid: e.memberInfo.uid,
                tid: this.data.tid,
                name: t,
                tel: o,
                weixin: i,
                avatarUrl: e.wxInfo.avatarUrl
            };
            app.util.request({
                url: "entry/wxapp/Savecoupon",
                data: r,
                success: function(a) {
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
                            console.log(a);
                            wx.redirectTo({
                                url: "/weixinmao_house/pages/done/index?m=恭喜您提交成功，我们会尽快审核！"
                            });
                        }
                    });
                }
            });
        } else wx.showModal({
            title: "提示",
            content: "请填写微信号",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: "请填写手机号",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: "请输入姓名",
            showCancel: !1
        });
    },
    bindGetUserInfo: function(a) {
        var i = this;
        app.util.getUserInfo(function(e) {
            console.log(e), i.data.isuser = !0;
            var a = e.memberInfo.uid, t = e.wxInfo.nickName, o = e.wxInfo.avatarUrl;
            0 < (i.data.uid = a) && (i.setData({
                userinfo: e,
                isphone: !1,
                isuser: i.data.isuser
            }), app.util.request({
                url: "entry/wxapp/Updateuserinfo",
                data: {
                    uid: a,
                    nickname: t,
                    avatarUrl: o
                },
                success: function(a) {
                    a.data.message.errno || (app.globalData.isuser = !0, i.setData({
                        userinfo: e,
                        isphone: !1,
                        isuser: i.data.isuser
                    }));
                }
            }));
        }, a.detail);
    },
    onReady: function() {},
    radioChange: function(a) {
        this.data.sex = a.detail.value;
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    uploadimg: function(a, i) {
        var e = app.util.geturl({
            url: "entry/wxapp/upload"
        });
        i = i;
        wx.showToast({
            icon: "loading",
            title: "正在上传"
        });
        var r = this;
        wx.uploadFile({
            url: e,
            filePath: a[0],
            name: "file",
            header: {
                "Content-Type": "multipart/form-data"
            },
            formData: {
                session_token: wx.getStorageSync("session_token")
            },
            success: function(a) {
                var e = JSON.parse(a.data);
                if (200 == a.statusCode) for (var t = e.data.path, o = 0; o < r.data.uploadimagelist.length; o++) {
                    o + 1 == i && (r.data.uploadimagelist[o] = t);
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
    upload: function(a) {
        var e = this;
        a = a;
        e.checkuser({
            doServices: function() {
                e.doupload(a);
            },
            doElseServices: function() {
                e.doupload(a);
            }
        });
    },
    doupload: function(a) {
        var t, o, i, r, n, s, u = this, d = parseInt(a.currentTarget.dataset.id);
        switch (d) {
          case 1:
            if (0 == u.data.true1) return;
            break;

          case 2:
            if (0 == u.data.true2) return;
            break;

          case 3:
            if (0 == u.data.true3) return;
            break;

          case 4:
            if (0 == u.data.true4) return;
            break;

          case 5:
            if (0 == u.data.true5) return;
            break;

          case 6:
            if (0 == u.data.true6) return;
        }
        wx.chooseImage({
            count: 1,
            sizeType: [ "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                var e = a.tempFilePaths;
                switch (d) {
                  case 1:
                    if (t = e, console.log(u.data.true1), 0 == u.data.true1) return;
                    u.data.true1 = !1;
                    break;

                  case 2:
                    o = e, u.data.true2 = !1;
                    break;

                  case 3:
                    i = e, u.data.true3 = !1;
                    break;

                  case 4:
                    r = e, u.data.true4 = !1;
                    break;

                  case 5:
                    n = e, u.data.true5 = !1;
                    break;

                  case 6:
                    s = e, u.data.true6 = !1;
                }
                u.setData({
                    imgurl1: t,
                    imgurl2: o,
                    imgurl3: i,
                    imgurl4: r,
                    imgurl5: n,
                    imgurl6: s,
                    true1: u.data.true1,
                    true2: u.data.true2,
                    true3: u.data.true3,
                    true4: u.data.true4,
                    true5: u.data.true5,
                    true6: u.data.true6
                }), u.data.imagelist.push(e), u.uploadimg(e, d);
            }
        });
    },
    delupload: function(a) {
        var e = this, t = parseInt(a.currentTarget.dataset.id);
        switch (t) {
          case 1:
            e.setData({
                imgurl1: "",
                true1: !0
            });
            break;

          case 2:
            e.setData({
                imgurl2: "",
                true2: !0
            });
            break;

          case 3:
            e.setData({
                imgurl3: "",
                true3: !0
            });
            break;

          case 4:
            e.setData({
                imgurl4: "",
                true4: !0
            });
            break;

          case 5:
            e.setData({
                imgurl5: "",
                true5: !0
            });
            break;

          case 6:
            e.setData({
                imgurl6: "",
                true6: !0
            });
        }
        for (var o = 0; o < this.data.uploadimagelist.length; o++) {
            o + 1 == t && (this.data.uploadimagelist[o] = "");
        }
        console.log(this.data.uploadimagelist);
    },
    checkboxChange: function(a) {
        var e = a.detail.value;
        this.data.special = e.join(",");
    },
    checkuser: function(e) {
        var t = this, a = (e = e, wx.getStorageSync("userInfo"));
        return console.log(a), a ? a.memberInfo.uid ? void app.util.request({
            url: "entry/wxapp/checkuserinfo",
            data: {
                sessionid: a.sessionid,
                uid: a.memberInfo.uid
            },
            success: function(a) {
                console.log("payyyy"), 0 == a.data.data.error ? e.doServices() : 2 == a.data.data.error && e.doElseServices();
            }
        }) : (app.util.getUserInfo(), !1) : (app.util.getUserInfo(function(a) {
            t.getlethousedetail();
        }), !1);
    }
});