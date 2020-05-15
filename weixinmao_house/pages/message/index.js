var app = getApp();

function isHasElementOne(e, a) {
    for (var t = 0, o = e.length; t < o; t++) if (e[t] == a) return t;
    return -1;
}

function isHasElementTwo(e, a) {
    for (var t = 0, o = e.length; t < o; t++) if (e[t].id == a) return t;
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
        isuser: !0
    },
    onLoad: function(e) {
        var a = this;
        a.data.id = e.id, wx.setNavigationBarTitle({
            title: "申请入驻-" + wx.getStorageSync("companyinfo").name
        });
        var t = wx.getStorageSync("userInfo");
        console.log(t), t ? (a.data.isuser = !0, a.oldhouseinit(), a.setData({
            userinfo: t
        })) : a.data.isuser = !1, a.setData({
            isuser: a.data.isuser,
            companyinfo: wx.getStorageSync("companyinfo")
        });
    },
    oldhouseinit: function(e) {
        var t = this, a = wx.getStorageSync("userInfo");
        app.util.request({
            url: "entry/wxapp/Getagentinit",
            data: {
                sessionid: a.sessionid,
                uid: a.memberInfo.uid
            },
            success: function(e) {
                if (!e.data.message.errno) if (e.data.data.intro.maincolor || (e.data.data.intro.maincolor = "#3274e5"), 
                wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: e.data.data.intro.maincolor,
                    animation: {
                        duration: 400,
                        timingFunc: "easeIn"
                    }
                }), t.setData({
                    intro: e.data.data.intro
                }), 1 == e.data.data.error) {
                    var a = "您已申请过经纪人，并已审核通过！";
                    wx.redirectTo({
                        url: "/weixinmao_house/pages/done/index?m=" + a
                    });
                } else if (2 == e.data.data.error) {
                    a = "正在审核,请耐心等待！";
                    wx.redirectTo({
                        url: "/weixinmao_house/pages/done/index?m=" + a
                    });
                }
            }
        });
    },
    bindGetUserInfo: function(e) {
        var a = this;
        app.util.getUserInfo(function(e) {
            console.log(e), a.data.isuser = !0, a.setData({
                userinfo: e,
                isuser: a.data.isuser
            }), a.oldhouseinit();
        }, e.detail);
    },
    savepubinfo: function(e) {
        var a = wx.getStorageSync("userInfo"), t = wx.getStorageSync("cityinfo"), o = e.detail.value.name, i = (this.data.sex, 
        e.detail.value.tel), n = e.detail.value.qq, r = e.detail.value.address, s = e.detail.value.content;
        if (0 != o) if ("" != i) if ("" != n) if ("" != r) if ("" != s) {
            var u = this.data.uploadimagelist;
            if (u.length < 1) wx.showModal({
                title: "提示",
                content: "上传图片不少于1张",
                showCancel: !1
            }); else {
                var d = u[0], l = {
                    sessionid: a.sessionid,
                    uid: a.memberInfo.uid,
                    name: o,
                    tel: i,
                    qq: n,
                    address: r,
                    content: s,
                    cityid: t.id,
                    uploadimagelist_str: d
                };
                app.util.request({
                    url: "entry/wxapp/Saveagent",
                    data: l,
                    success: function(e) {
                        if (0 != e.data.errno) return wx.hideLoading(), void wx.showModal({
                            title: "失败",
                            content: e.data.data.msg,
                            showCancel: !1
                        });
                        wx.showToast({
                            title: "提交成功",
                            icon: "success",
                            duration: 2e3,
                            success: function(e) {
                                console.log(e);
                                wx.redirectTo({
                                    url: "/weixinmao_house/pages/done/index?m=恭喜您提交成功，我们会尽快审核！"
                                });
                            }
                        });
                    }
                });
            }
        } else wx.showModal({
            title: "提示",
            content: "请输入自我介绍及工作经历",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: "请填写现居住地",
            showCancel: !1
        }); else wx.showModal({
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
    onReady: function() {},
    radioChange: function(e) {
        this.data.sex = e.detail.value;
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    uploadimg: function(e, i) {
        var a = app.util.geturl({
            url: "entry/wxapp/upload"
        });
        i = i;
        wx.showToast({
            icon: "loading",
            title: "正在上传"
        });
        var n = this;
        wx.uploadFile({
            url: a,
            filePath: e[0],
            name: "file",
            header: {
                "Content-Type": "multipart/form-data"
            },
            formData: {
                session_token: wx.getStorageSync("session_token")
            },
            success: function(e) {
                var a = JSON.parse(e.data);
                if (200 == e.statusCode) for (var t = a.data.path, o = 0; o < n.data.uploadimagelist.length; o++) {
                    o + 1 == i && (n.data.uploadimagelist[o] = t);
                } else wx.showModal({
                    title: "提示",
                    content: "上传失败",
                    showCancel: !1
                });
            },
            fail: function(e) {
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
    upload: function(e) {
        var a = this;
        e = e;
        a.checkuser({
            doServices: function() {
                a.doupload(e);
            },
            doElseServices: function() {
                a.doupload(e);
            }
        });
    },
    doupload: function(e) {
        var t, o, i, n, r, s, u = this, d = parseInt(e.currentTarget.dataset.id);
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
            success: function(e) {
                var a = e.tempFilePaths;
                switch (d) {
                  case 1:
                    if (t = a, console.log(u.data.true1), 0 == u.data.true1) return;
                    u.data.true1 = !1;
                    break;

                  case 2:
                    o = a, u.data.true2 = !1;
                    break;

                  case 3:
                    i = a, u.data.true3 = !1;
                    break;

                  case 4:
                    n = a, u.data.true4 = !1;
                    break;

                  case 5:
                    r = a, u.data.true5 = !1;
                    break;

                  case 6:
                    s = a, u.data.true6 = !1;
                }
                u.setData({
                    imgurl1: t,
                    imgurl2: o,
                    imgurl3: i,
                    imgurl4: n,
                    imgurl5: r,
                    imgurl6: s,
                    true1: u.data.true1,
                    true2: u.data.true2,
                    true3: u.data.true3,
                    true4: u.data.true4,
                    true5: u.data.true5,
                    true6: u.data.true6
                }), u.data.imagelist.push(a), u.uploadimg(a, d);
            }
        });
    },
    delupload: function(e) {
        var a = this, t = parseInt(e.currentTarget.dataset.id);
        switch (t) {
          case 1:
            a.setData({
                imgurl1: "",
                true1: !0
            });
            break;

          case 2:
            a.setData({
                imgurl2: "",
                true2: !0
            });
            break;

          case 3:
            a.setData({
                imgurl3: "",
                true3: !0
            });
            break;

          case 4:
            a.setData({
                imgurl4: "",
                true4: !0
            });
            break;

          case 5:
            a.setData({
                imgurl5: "",
                true5: !0
            });
            break;

          case 6:
            a.setData({
                imgurl6: "",
                true6: !0
            });
        }
        for (var o = 0; o < this.data.uploadimagelist.length; o++) {
            o + 1 == t && (this.data.uploadimagelist[o] = "");
        }
        console.log(this.data.uploadimagelist);
    },
    checkboxChange: function(e) {
        var a = e.detail.value;
        this.data.special = a.join(",");
    },
    checkuser: function(a) {
        var t = this, e = (a = a, wx.getStorageSync("userInfo"));
        return console.log(e), e ? e.memberInfo.uid ? void app.util.request({
            url: "entry/wxapp/checkuserinfo",
            data: {
                sessionid: e.sessionid,
                uid: e.memberInfo.uid
            },
            success: function(e) {
                console.log("payyyy"), 0 == e.data.data.error ? a.doServices() : 2 == e.data.data.error && a.doElseServices();
            }
        }) : (app.util.getUserInfo(), !1) : (app.util.getUserInfo(function(e) {
            t.getlethousedetail();
        }), !1);
    }
});