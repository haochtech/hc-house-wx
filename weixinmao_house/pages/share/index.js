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
        wx.getStorageSync("userInfo").sessionid || app.util.getUserInfo(), this.getQrcodeoldhouse();
        
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
      onLogin: function () {
        this.setData({
          isuser: !1,
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
                    that.getQrcodeoldhouse();
                }
            }));
        }, a.detail);
    },
    getQrcodeoldhouse: function() {
        var t = this, e = this.data.id, a = wx.getStorageSync("userInfo");
        if(a){
            var uid = a.memberInfo.uid
        }else{
            var uid = ''
        }
        app.util.request({
            url: "entry/wxapp/getQrcode",
            data: {
                id: e,
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
        wx.setStorageSync("wxInfo", e.detail), e.detail.userInfo && app.util.getUserInfo(function(e) {
            that.getQrcodeoldhouse();
        });
    },
    doShow: function() {
        var t = this, a = t.data.houseinfo, o = wx.createCanvasContext("myCanvas");
        wx.showLoading({
            title: "正在生成分享卡片"
        }), wx.downloadFile({
            url: a.thumb,
            success: function(e) {
                200 === e.statusCode && (t.data.picfile = e.tempFilePath, wx.downloadFile({
                    url: t.data.myqrcode,
                    success: function(e) {
                        console.log(e.tempFilePath), t.data.myqrcodefile = e.tempFilePath, o.drawImage(t.data.picfile, 0, 0, 600, 320), 
                        o.setFillStyle("white"), o.fillRect(0, 320, 600, 800), o.drawImage(t.data.picfile, 30, 340, 60, 60), 
                        o.drawImage(t.data.myqrcodefile, 360, 600, 160, 160), o.setFontSize(28), o.setFillStyle("red"), 
                        o.fillText("总价" + a.saleprice + "万", 110, 380), o.setFontSize(30), o.setFillStyle("#111111"), 
                        o.fillText(a.title, 30, 460), o.fillText("所在小区" + a.housearea, 30, 520), o.setFontSize(24), 
                        o.fillText("长按二维码了解房源", 30, 700), o.draw(), wx.canvasToTempFilePath({
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
    onShareAppMessage: function() {}
});