var app = getApp();

Page({
    data: {
        flag: 0,
        noteMaxLen: 300,
        info: "",
        noteNowLen: 0,
        score: 0,
        id: 0
    },
    onLoad: function(a) {
        var t = this;
        t.data.id = a.id, app.util.request({
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
                }), t.setData({
                    intro: a.data.data.intro
                }));
            },
            complete: function() {
                wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
        });
    },
    bindTextAreaChange: function(a) {
        var t = a.detail.value, o = parseInt(t.length);
        o > this.data.noteMaxLen || this.setData({
            info: t,
            noteNowLen: o
        });
    },
    bindSubmit: function(a) {
        var t = this, o = t.data.score, n = a.detail.value.content, e = t.data.id, i = wx.getStorageSync("userInfo");
        if ("" != n) {
            var s = {
                sessionid: i.sessionid,
                uid: i.memberInfo.uid,
                type: "newhouse",
                houseid: e,
                score: o,
                content: n
            };
            app.util.request({
                url: "entry/wxapp/savecomment",
                data: s,
                success: function(a) {
                    if (0 != a.data.errno) return wx.hideLoading(), void wx.showModal({
                        title: "失败",
                        content: a.data.data.msg,
                        showCancel: !1
                    });
                    wx.showToast({
                        title: "发布成功",
                        icon: "success",
                        duration: 1500,
                        mask: !1,
                        success: function() {
                            t.setData({
                                info: "",
                                noteNowLen: 0,
                                flag: 0
                            }), wx.navigateBack({
                                changed: !0
                            });
                        }
                    });
                }
            });
        } else wx.showModal({
            title: "提示",
            content: "请输入评论内容",
            showCancel: !1
        });
    },
    changeColor1: function() {
        this.data.score = 2, this.setData({
            flag: 1
        });
    },
    changeColor2: function() {
        this.data.score = 4, this.setData({
            flag: 2
        });
    },
    changeColor3: function() {
        this.data.score = 6, this.setData({
            flag: 3
        });
    },
    changeColor4: function() {
        this.data.score = 8, this.setData({
            flag: 4
        });
    },
    changeColor5: function() {
        this.data.score = 10, this.setData({
            flag: 5
        });
    }
});