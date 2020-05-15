var app = getApp();

Page({
    data: {
        areamsg: !0,
        buildmsg: !0,
        bid: 0,
        buildareainfo: "",
        decmsg: !0,
        typemsg: !0,
        housemap: !0,
        ismaster: !0,
        houseareaid: 0,
        housetype: 0,
        decorate: "",
        title: "",
        saleprice: 0,
        perprice: 0,
        housestyle: "",
        area: "",
        floor: "",
        direction: "",
        year: "",
        address: "",
        housearea: "",
        special: "",
        imagelist: [],
        lng: 0,
        lat: 0,
        uploadimagelist: [ "", "", "", "", "", "" ],
        true1: !0,
        true2: !0,
        true3: !0,
        true4: !0,
        true5: !0,
        true6: !0,
        isuser: !0,
        isagree: 0
    },
    onLoad: function(t) {
        var a = this;
        wx.setNavigationBarTitle({
            title: "中介发布二手房-" + wx.getStorageSync("companyinfo").name
        });
        var e = wx.getStorageSync("userInfo");
        console.log(e), e ? (a.data.isuser = !0, a.oldhouseinit(), a.setData({
            userinfo: e
        })) : a.data.isuser = !1, a.setData({
            isuser: a.data.isuser,
            companyinfo: wx.getStorageSync("companyinfo")
        });
    },
    oldhouseinit: function(t) {
        var a = this, e = wx.getStorageSync("userInfo"), i = wx.getStorageSync("cityinfo");
        app.util.request({
            url: "entry/wxapp/Getpubinit",
            data: {
                cityid: i.id,
                sessionid: e.sessionid,
                uid: e.memberInfo.uid
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
                }), 0 == t.data.data.ismaster && (a.data.ismaster = !1, a.setData({
                    ismaster: a.data.ismaster
                })), a.data.buildareainfo = t.data.data.buildareainfo, a.setData({
                    citylist: t.data.data.arealist,
                    intro: t.data.data.intro
                }));
            }
        }), app.getLocationInfo(function(t) {
            a.setData({
                longitude: t.longitude,
                latitude: t.latitude,
                markers: [ {
                    id: 0,
                    iconPath: "../../resource/images/marker_checked.png",
                    longitude: t.longitude,
                    latitude: t.latitude,
                    width: 30,
                    height: 30
                } ]
            });
        }), wx.getSystemInfo({
            success: function(t) {
                a.setData({
                    map_width: t.windowWidth,
                    map_height: t.windowWidth,
                    controls: [ {
                        id: 1,
                        iconPath: "../../resource/images/marker_checked.png",
                        position: {
                            left: t.windowWidth / 2 - 8,
                            top: t.windowWidth / 2 - 16,
                            width: 30,
                            height: 30
                        },
                        clickable: !0
                    } ]
                });
            }
        });
    },
    getpostion: function() {
        var e = this;
        wx.chooseLocation({
            success: function(t) {
                console.log(t.name), console.log(t.latitude), console.log(t.longitude), e.data.lat = t.latitude, 
                e.data.lng = t.longitude;
                var a = t.longitude + "," + t.latitude;
                e.setData({
                    map: a
                });
            },
            fail: function(t) {
                console.log(t);
            },
            complete: function() {}
        });
    },
    bindGetUserInfo: function(t) {
        var a = this;
        app.util.getUserInfo(function(t) {
            console.log(t), a.data.isuser = !0, a.setData({
                userinfo: t,
                isuser: a.data.isuser
            }), a.oldhouseinit();
        }, t.detail);
    },
    upload: function(t) {
        t = t;
        this.doupload(t);
    },
    goHousexy: function(t) {
        wx.navigateTo({
            url: "/weixinmao_house/pages/housexy/index"
        });
    },
    toMessage: function(t) {
        wx.navigateTo({
            url: "/weixinmao_house/pages/message/index"
        });
    },
    doupload: function(t) {
        var e, i, s, o, n, r, d = this, l = parseInt(t.currentTarget.dataset.id);
        switch (l) {
          case 1:
            if (0 == d.data.true1) return;
            break;

          case 2:
            if (0 == d.data.true2) return;
            break;

          case 3:
            if (0 == d.data.true3) return;
            break;

          case 4:
            if (0 == d.data.true4) return;
            break;

          case 5:
            if (0 == d.data.true5) return;
            break;

          case 6:
            if (0 == d.data.true6) return;
        }
        wx.chooseImage({
            count: 1,
            sizeType: [ "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
                var a = t.tempFilePaths;
                switch (l) {
                  case 1:
                    if (e = a, console.log(d.data.true1), 0 == d.data.true1) return;
                    d.data.true1 = !1;
                    break;

                  case 2:
                    i = a, d.data.true2 = !1;
                    break;

                  case 3:
                    s = a, d.data.true3 = !1;
                    break;

                  case 4:
                    o = a, d.data.true4 = !1;
                    break;

                  case 5:
                    n = a, d.data.true5 = !1;
                    break;

                  case 6:
                    r = a, d.data.true6 = !1;
                }
                d.setData({
                    imgurl1: e,
                    imgurl2: i,
                    imgurl3: s,
                    imgurl4: o,
                    imgurl5: n,
                    imgurl6: r,
                    true1: d.data.true1,
                    true2: d.data.true2,
                    true3: d.data.true3,
                    true4: d.data.true4,
                    true5: d.data.true5,
                    true6: d.data.true6
                }), d.data.imagelist.push(a), d.uploadimg(a, l);
            }
        });
    },
    delupload: function(t) {
        var a = this, e = parseInt(t.currentTarget.dataset.id);
        switch (e) {
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
        for (var i = 0; i < this.data.uploadimagelist.length; i++) {
            i + 1 == e && (this.data.uploadimagelist[i] = "");
        }
        console.log(this.data.uploadimagelist);
    },
    doagree: function(t) {
        var a = t.detail.value;
        0 < a.length ? this.data.isagree = a[0] : this.data.isagree = 0, console.log(this.data.isagree);
    },
    savepubinfo: function(t) {
        console.log(this.data.bid);
        var a = wx.getStorageSync("userInfo"), e = wx.getStorageSync("cityinfo");
        if (0 != this.data.isagree) {
            var i = t.detail.value.title, s = t.detail.value.saleprice, o = t.detail.value.perprice, n = t.detail.value.housestyle, r = t.detail.value.area, d = this.data.bid, l = t.detail.value.floor, u = t.detail.value.direction, c = t.detail.value.year, h = t.detail.value.housearea, g = t.detail.value.address, m = this.data.special, f = this.data.lng, p = this.data.lat, w = t.detail.value.content;
            if (0 != this.data.houseareaid) if (0 != d) {
                var x = this.data.houseareaid;
                if ("" != this.data.decorate) {
                    var v = this.data.decorate;
                    if (0 != this.data.housetype) if (0 != f && 0 != p) {
                        var y = this.data.housetype;
                        if ("" != i) if ("" != s) if ("" != o) if ("" != n) if ("" != r) if ("" != l) if ("" != u) if ("" != c) if ("" != h) if ("" != g) if (m) {
                            var b = this.data.uploadimagelist;
                            if (b.length < 2) wx.showModal({
                                title: "提示",
                                content: "上传图片不少于2张",
                                showCancel: !1
                            }); else {
                                var C = b.join("@");
                                if ("" != w) {
                                    var D = {
                                        sessionid: a.sessionid,
                                        uid: a.memberInfo.uid,
                                        uploadimagelist_str: C,
                                        cityid: e.id,
                                        houseareaid: x,
                                        bid: d,
                                        decorate: v,
                                        housetype: y,
                                        longitude: f,
                                        latitude: p,
                                        title: i,
                                        saleprice: s,
                                        perprice: o,
                                        housestyle: n,
                                        area: r,
                                        floor: l,
                                        direction: u,
                                        year: c,
                                        housearea: h,
                                        address: g,
                                        special: m,
                                        content: w
                                    };
                                    app.util.request({
                                        url: "entry/wxapp/savepubinfo",
                                        data: D,
                                        success: function(t) {
                                            if (0 != t.data.errno) return wx.hideLoading(), void wx.showModal({
                                                title: "失败",
                                                content: t.data.data.msg,
                                                showCancel: !1
                                            });
                                            wx.showToast({
                                                title: "提交成功",
                                                icon: "success",
                                                duration: 2e3,
                                                success: function(t) {
                                                    console.log(t), wx.navigateTo({
                                                        url: "/weixinmao_house/pages/mypub/index"
                                                    });
                                                }
                                            });
                                        }
                                    });
                                } else wx.showModal({
                                    title: "提示",
                                    content: "请输入填写房源详情描述",
                                    showCancel: !1
                                });
                            }
                        } else wx.showModal({
                            title: "提示",
                            content: "请选择特色服务",
                            showCancel: !1
                        }); else wx.showModal({
                            title: "提示",
                            content: "请输入地址",
                            showCancel: !1
                        }); else wx.showModal({
                            title: "提示",
                            content: "请输入小区",
                            showCancel: !1
                        }); else wx.showModal({
                            title: "提示",
                            content: "请输入年代",
                            showCancel: !1
                        }); else wx.showModal({
                            title: "提示",
                            content: "请输入朝向",
                            showCancel: !1
                        }); else wx.showModal({
                            title: "提示",
                            content: "请输入楼层",
                            showCancel: !1
                        }); else wx.showModal({
                            title: "提示",
                            content: "请输入面积",
                            showCancel: !1
                        }); else wx.showModal({
                            title: "提示",
                            content: "请输入户型",
                            showCancel: !1
                        }); else wx.showModal({
                            title: "提示",
                            content: "请输入均价",
                            showCancel: !1
                        }); else wx.showModal({
                            title: "提示",
                            content: "请输入售价",
                            showCancel: !1
                        }); else wx.showModal({
                            title: "提示",
                            content: "请输入标题",
                            showCancel: !1
                        });
                    } else wx.showModal({
                        title: "提示",
                        content: "请设置位置",
                        showCancel: !1
                    }); else wx.showModal({
                        title: "提示",
                        content: "请选择房型",
                        showCancel: !1
                    });
                } else wx.showModal({
                    title: "提示",
                    content: "请选择装修",
                    showCancel: !1
                });
            } else wx.showModal({
                title: "提示",
                content: "请选择片区",
                showCancel: !1
            }); else wx.showModal({
                title: "提示",
                content: "请选择区域",
                showCancel: !1
            });
        } else wx.showModal({
            title: "提示",
            content: "请先同意房屋委托出售协议",
            showCancel: !1
        });
    },
    onReady: function() {},
    showarea: function(t) {
        this.data.areamsg = !1, this.setData({
            areamsg: this.data.areamsg
        });
    },
    selectarea: function(t) {
        this.data.houseareaid = t.currentTarget.dataset.id;
        var a = t.currentTarget.dataset.name;
        console.log(this.data.buildareainfo);
        var e = this.data.buildareainfo;
        console.log(e[this.data.houseareaid]), this.setData({
            areaname: a,
            buildarealist: e[this.data.houseareaid]
        }), this.closemsg();
    },
    selectdec: function(t) {
        this.data.decorate = t.currentTarget.dataset.id;
        var a = t.currentTarget.dataset.id;
        this.setData({
            decorate: a
        }), this.closedec();
    },
    selecttype: function(t) {
        this.data.housetype = t.currentTarget.dataset.id;
        t.currentTarget.dataset.id;
        var a = t.currentTarget.dataset.name;
        this.setData({
            housetypename: a
        }), this.closetype();
    },
    showdec: function() {
        this.data.decmsg = !1, this.setData({
            decmsg: this.data.decmsg
        });
    },
    showtype: function() {
        this.data.typemsg = !1, this.setData({
            typemsg: this.data.typemsg
        });
    },
    showmap: function() {
        this.data.housemap = !1, this.setData({
            housemap: this.data.housemap
        });
    },
    getmap: function() {
        this.getLngLat();
    },
    getLngLat: function() {
        var e = this;
        this.mapCtx = wx.createMapContext("map4select"), this.mapCtx.getCenterLocation({
            success: function(t) {
                var a = t.longitude + "," + t.latitude;
                e.data.lng = t.longitude, e.data.lat = t.latitude, e.setData({
                    longitude: t.longitude,
                    latitude: t.latitude,
                    housemap: !0,
                    map: a,
                    markers: [ {
                        id: 0,
                        iconPath: "../../resource/images/marker_checked.png",
                        longitude: t.longitude,
                        latitude: t.latitude,
                        width: 30,
                        height: 30
                    } ]
                });
            }
        });
    },
    closemsg: function(t) {
        this.data.areamsg = !0, this.setData({
            areamsg: this.data.areamsg
        });
    },
    selectbuildarea: function(t) {
        this.data.bid = t.currentTarget.dataset.id;
        var a = t.currentTarget.dataset.name;
        this.setData({
            buildareaname: a
        }), this.closebuildmsg();
    },
    closebuildmsg: function(t) {
        this.data.buildmsg = !0, this.setData({
            buildmsg: this.data.buildmsg
        });
    },
    showbuildarea: function(t) {
        this.data.buildmsg = !1, this.setData({
            buildmsg: this.data.buildmsg
        });
    },
    closetype: function(t) {
        this.data.typemsg = !0, this.setData({
            typemsg: this.data.typemsg
        });
    },
    closedec: function(t) {
        this.data.decmsg = !0, this.setData({
            decmsg: this.data.decmsg
        });
    },
    closemap: function(t) {
        this.data.housemap = !0, this.setData({
            housemap: this.data.housemap
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    uploadimg: function(t, s) {
        var a = app.util.geturl({
            url: "entry/wxapp/upload"
        });
        s = s;
        wx.showToast({
            icon: "loading",
            title: "正在上传"
        });
        var o = this;
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
                if (200 == t.statusCode) for (var e = a.data.path, i = 0; i < o.data.uploadimagelist.length; i++) {
                    i + 1 == s && (o.data.uploadimagelist[i] = e);
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
        var e = this, t = (a = a, wx.getStorageSync("userInfo"));
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
            e.oldhouseinit();
        }), !1);
    }
});