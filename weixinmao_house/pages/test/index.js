var app = getApp();

function isHasElementOne(e, a) {
    for (var t = 0, r = e.length; t < r; t++) if (e[t] == a) return t;
    return -1;
}

function isHasElementTwo(e, a) {
    for (var t = 0, r = e.length; t < r; t++) if (e[t].id == a) return t;
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
        field: [ "name", "tel" ]
    },
    onLoad: function(e) {
        this.data.id = e.id, wx.setNavigationBarTitle({
            title: "申请入驻-" + wx.getStorageSync("companyinfo").name
        });
    },
    savepubinfo: function(e) {
        var a = wx.getStorageSync("userInfo");
        console.log(a);
        var t = e.detail.formId;
        console.log(t);
        var r = {
            form_id: t
        };
        app.util.request({
            url: "entry/wxapp/Sendmsg",
            data: r,
            success: function(e) {}
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
    uploadimg: function(e, u) {
        var a = app.util.geturl({
            url: "entry/wxapp/upload"
        });
        u = u;
        wx.showToast({
            icon: "loading",
            title: "正在上传"
        });
        var i = this;
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
                if (200 == e.statusCode) for (var t = a.data.path, r = 0; r < i.data.uploadimagelist.length; r++) {
                    r + 1 == u && (i.data.uploadimagelist[r] = t);
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
        var t, r, u, i, o, n, s = this, l = parseInt(e.currentTarget.dataset.id);
        switch (l) {
          case 1:
            if (0 == s.data.true1) return;
            break;

          case 2:
            if (0 == s.data.true2) return;
            break;

          case 3:
            if (0 == s.data.true3) return;
            break;

          case 4:
            if (0 == s.data.true4) return;
            break;

          case 5:
            if (0 == s.data.true5) return;
            break;

          case 6:
            if (0 == s.data.true6) return;
        }
        wx.chooseImage({
            count: 1,
            sizeType: [ "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                var a = e.tempFilePaths;
                switch (l) {
                  case 1:
                    if (t = a, console.log(s.data.true1), 0 == s.data.true1) return;
                    s.data.true1 = !1;
                    break;

                  case 2:
                    r = a, s.data.true2 = !1;
                    break;

                  case 3:
                    u = a, s.data.true3 = !1;
                    break;

                  case 4:
                    i = a, s.data.true4 = !1;
                    break;

                  case 5:
                    o = a, s.data.true5 = !1;
                    break;

                  case 6:
                    n = a, s.data.true6 = !1;
                }
                s.setData({
                    imgurl1: t,
                    imgurl2: r,
                    imgurl3: u,
                    imgurl4: i,
                    imgurl5: o,
                    imgurl6: n,
                    true1: s.data.true1,
                    true2: s.data.true2,
                    true3: s.data.true3,
                    true4: s.data.true4,
                    true5: s.data.true5,
                    true6: s.data.true6
                }), s.data.imagelist.push(a), s.uploadimg(a, l);
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
        for (var r = 0; r < this.data.uploadimagelist.length; r++) {
            r + 1 == t && (this.data.uploadimagelist[r] = "");
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