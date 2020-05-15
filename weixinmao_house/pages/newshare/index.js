var app = getApp();

Page({
    data: {
        picfile: "",
        shareImgSrc: "",
        savebtn: !0,
        myqrcode: "",
        myqrcodefile: "",
        houseinfo: "",
        id: 0,
        isuser: !0,
    },
    onLoad: function(e) {
        if (wx.setNavigationBarTitle({
            title: "生成分享卡片"
        }), 0 < this.data.id) this.data.id; else {
            e.id;
            this.data.id = e.id;
        }
        wx.getStorageSync("userInfo").sessionid || app.util.getUserInfo(), this.getQrcodenewhouse();
        var aa = this, o = wx.getStorageSync("userInfo");
      console.log(o);
      if(!o) {aa.setData({
        isuser: false
      });}
    },
    cancel_login: function (e) {
        this.setData({
          isuser: !0
        });
      },
    bindGetUserInfo: function(a) {
        var o = this;
        app.util.getUserInfo(function(t) {
            console.log(t), o.data.isuser = !0;
            var a = t.memberInfo.uid, e = t.wxInfo.nickName, i = t.wxInfo.avatarUrl;
            0 < (o.data.uid = a) && (o.setData({
                userinfo: t,
                isphone: !1,
                isuser: o.data.isuser
            }), wx.setStorageSync("userInfo", t), app.util.request({
                url: "entry/wxapp/Updateuserinfo",
                data: {
                    uid: a,
                    nickname: e,
                    avatarUrl: i,
                    tid: o.data.tid
                },
                success: function(a) {
                    a.data.message.errno || (o.data.isphone = a.data.data.isphone, o.setData({
                        userinfo: t,
                        isphone: o.data.isphone,
                        isuser: o.data.isuser
                    }));
                }
            }));
        }, a.detail);
    },


    getQrcodenewhouse: function() {
        var t = this, e = wx.getStorageSync("userInfo");
        if(e){
            var uid = e.memberInfo.uid
        }else{
            var uid = ''
        }
        console.log(e), app.util.request({
            url: "entry/wxapp/getQrcodenewhouse",
            data: {
                id: t.data.id,
                uid: uid
            },
            success: function(e) {
                e.data.message.errno || (e.data.data.intro.maincolor || (e.data.data.intro.maincolor = "#3274e5"), 
                wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: e.data.data.intro.maincolor,
                    animation: {
                        duration: 400,
                        timingFunc: "easeIn"
                    }
                }), t.data.myqrcode = e.data.data.myqrcode, t.data.houseinfo = e.data.data.houseinfo, 
                t.doShow());
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    reload: function(e) {
        var t = this;
        wx.setStorageSync("wxInfo", e.detail), e.detail.userInfo && app.util.getUserInfo(function(e) {
            t.getQrcodenewhouse();
        });
    },
    doShow: function() {
        var t = this, o = t.data.houseinfo, a = wx.createCanvasContext("myCanvas");
        wx.showLoading({
            title: "正在生成分享卡片"
        }), wx.downloadFile({
            url: o.thumb,
            success: function(e) {
                200 === e.statusCode && (t.data.picfile = e.tempFilePath, wx.downloadFile({
                    url: t.data.myqrcode,
                    success: function(e) {
                        console.log(e.tempFilePath), t.data.myqrcodefile = e.tempFilePath, a.drawImage(t.data.picfile, 0, 0, 600, 320), 
                        a.setFillStyle("white"), a.fillRect(0, 320, 600, 800), a.drawImage(t.data.picfile, 30, 340, 60, 60), 
                        a.drawImage(t.data.myqrcodefile, 360, 560, 165, 165), a.setFontSize(28), a.setFillStyle("red"), 
                        a.fillText(o.houseprice + "元/平方", 110, 380), a.setFontSize(28), a.setFillStyle("#111111"), 
                        a.fillText(o.housename, 30, 450), a.fillText("售楼热线" + o.tel, 30, 500), a.setFontSize(24), 
                        a.fillText("长按二维码了解房源", 30, 670), a.draw(), wx.canvasToTempFilePath({
                            x: 0,
                            y: 0,
                            width: 600,
                            height: 800,
                            destWidth: 600,
                            destHeight: 800,
                            canvasId: "myCanvas",
                            success: function(e) {
                                console.log(e.tempFilePath), t.data.shareImgSrc = e.tempFilePath, setTimeout(function() {
                                    wx.hideLoading();
                                }, 2e3), t.setData({
                                    shareImgSrc: e.tempFilePath,
                                    //shareImgSrc: t.data.myqrcode,
                                    savebtn: !1,
                                    test: "aaaa"
                                });
                            },
                            fail: function(e) {
                                setTimeout(function() {
                                    wx.hideLoading();
                                }, 2e3), t.onLoad(), console.log(e);
                            }
                        });
                    }
                }));
            }
        });
    },
    savepic: function() {
        var t = this;
        wx.saveImageToPhotosAlbum({
            filePath: t.data.shareImgSrc,
            success: function(e) {
                wx.showModal({
                    title: "存图成功",
                    content: "图片成功保存到相册了，去发圈噻~",
                    showCancel: !1,
                    confirmText: "好哒",
                    confirmColor: "#72B9C3",
                    success: function(e) {
                        e.confirm && console.log("用户点击确定"), t.hideShareImg();
                    }
                });
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    checkuser: function(t) {
        var o = this, e = (t = t, wx.getStorageSync("userInfo"));
        return console.log(e), e ? e.memberInfo.uid ? void app.util.request({
            url: "entry/wxapp/checkuserinfo",
            data: {
                sessionid: e.sessionid,
                uid: e.memberInfo.uid
            },
            success: function(e) {
                console.log("payyyy"), 0 == e.data.data.error ? t.doServices() : 2 == e.data.data.error && t.doElseServices();
            }
        }) : (app.util.getUserInfo(), !1) : (app.util.getUserInfo(function(e) {
            o.getQrcodenewhouse();
        }), !1);
    }
});