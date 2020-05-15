var app = getApp();

Page({
    data: {
        picfile: "",
        shareImgSrc: "",
        savebtn: !0,
        myqrcode: "",
        myqrcodefile: "",
        houseinfo: "",
        id: 0
    },
    onLoad: function(e) {
        wx.setNavigationBarTitle({
            title: "生成推广卡片"
        }), this.getQrcodenewhouse();
    },
    getQrcodenewhouse: function() {
        var o = this, e = wx.getStorageSync("userInfo");
        app.util.request({
            url: "entry/wxapp/myspread",
            data: {
                uid: e.memberInfo.uid
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
                }), o.data.myqrcode = e.data.data.myqrcode, o.data.houseinfo = e.data.data.houseinfo, 
                o.doShow());
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    reload: function() {
        this.onLoad();
    },
    doShow: function() {
        var o = this, e = o.data.houseinfo, t = wx.createCanvasContext("myCanvas");
        wx.showLoading({
            title: "正在生成推广卡片"
        }), wx.downloadFile({
            url: e.thumb,
            success: function(e) {
                200 === e.statusCode && (o.data.picfile = e.tempFilePath, wx.downloadFile({
                    url: o.data.myqrcode,
                    success: function(e) {
                        console.log(e.tempFilePath), o.data.myqrcodefile = e.tempFilePath, t.setFillStyle("white"), 
                        t.drawImage(o.data.picfile, 0, 0, 600, 320), t.setFillStyle("white"), t.fillRect(0, 340, 600, 580), 
                        t.drawImage(o.data.myqrcodefile, 180, 350, 255, 255), t.setFontSize(24), t.setFillStyle("#000000"), 
                        t.fillText("长按扫码成为代言人", 200, 630), t.draw(), wx.canvasToTempFilePath({
                            x: 0,
                            y: 0,
                            width: 600,
                            height: 800,
                            destWidth: 600,
                            destHeight: 800,
                            canvasId: "myCanvas",
                            success: function(e) {
                                console.log(e.tempFilePath), o.data.shareImgSrc = e.tempFilePath, setTimeout(function() {
                                    wx.hideLoading();
                                }, 2e3), o.setData({
                                    shareImgSrc: e.tempFilePath,
                                    savebtn: !1,
                                    test: "aaaa"
                                });
                            },
                            fail: function(e) {
                                setTimeout(function() {
                                    wx.hideLoading();
                                }, 2e3), o.onLoad(), console.log(e);
                            }
                        });
                    }
                }));
            }
        });
    },
    savepic: function() {
        var o = this;
        wx.saveImageToPhotosAlbum({
            filePath: o.data.shareImgSrc,
            success: function(e) {
                wx.showModal({
                    title: "存图成功",
                    content: "图片成功保存到相册了，去发圈噻~",
                    showCancel: !1,
                    confirmText: "好哒",
                    confirmColor: "#72B9C3",
                    success: function(e) {
                        e.confirm && console.log("用户点击确定"), o.hideShareImg();
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
    checkuser: function(o) {
        var t = this, e = (o = o, wx.getStorageSync("userInfo"));
        return console.log(e), e ? e.memberInfo.uid ? void app.util.request({
            url: "entry/wxapp/checkuserinfo",
            data: {
                sessionid: e.sessionid,
                uid: e.memberInfo.uid
            },
            success: function(e) {
                console.log("payyyy"), 0 == e.data.data.error ? o.doServices() : 2 == e.data.data.error && o.doElseServices();
            }
        }) : (app.util.getUserInfo(), !1) : (app.util.getUserInfo(function(e) {
            t.getQrcodenewhouse();
        }), !1);
    }
});