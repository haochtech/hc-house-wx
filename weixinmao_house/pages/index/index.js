var _Page;

function _defineProperty(e, a, t) {
    return a in e ? Object.defineProperty(e, a, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[a] = t, e;
}

var qqmapsdk, QQMapWX = require("../../resource/js/qqmap-wx-jssdk.min.js"), config = require("../../resource/js/config.js"), markersData = [], app = getApp();

Page((_defineProperty(_Page = {
    data: {
        autoplay: !0,
        interval: 3e3,
        duration: 1e3,
        showmsg: !0,
        isshow: !0,
        isuser: true,
        isphone: !0,
        moban: 0,
        uid: 0,
        indeximg: !0
    },
    onLoad: function(e) {
        var o = this;
        var t = wx.getStorageSync("cityinfo");
        t ? (wx.setStorageSync("city", t.name), o.initPage()) : (qqmapsdk = new QQMapWX({
            key: "5D3BZ-J55WF-SFPJJ-NI6PG-YN2ZO-M4BHX"
        }), wx.getLocation({
            type: "gcj02",
            success: function(e) {
                qqmapsdk.reverseGeocoder({
                    location: {
                        latitude: e.latitude,
                        longitude: e.longitude
                    },
                    success: function(e) {
                        var a = e.result.address_component.city, t = a.substr(0, a.length - 1);
                        wx.setStorageSync("city", t), o.initPage();
                    }
                });
            },
            fail: function() {
                o.initPage();
            },
            complete: function() {}
        }));
    },
    onShow: function() {
        var e = wx.getStorageSync("cityinfo");
        e && (wx.setStorageSync("city", e.name), this.initPage());
    },
    initPage: function() {
        var a = this, e = wx.getStorageSync("city");
        console.log(e), app.util.request({
            url: "entry/wxapp/GetSysInit",
            data: {
                city: e
            },
            success: function(e) {console.log(e)
                e.data.message.errno || (wx.setStorageSync("companyinfo", e.data.data.intro), wx.setStorageSync("cityinfo", e.data.data.cityinfo), 
                wx.setNavigationBarTitle({
                    title: wx.getStorageSync("companyinfo").name
                }), console.log(e.data.data.intro), e.data.data.intro.maincolor || (e.data.data.intro.maincolor = "#3274e5"), 
                wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: e.data.data.intro.maincolor,
                    animation: {
                        duration: 400,
                        timingFunc: "easeIn"
                    }
                }), "" != e.data.data.intro.indexadv && (wx.getStorageSync("onimg") || (a.data.indeximg = !1, 
                a.setData({
                    indeximg: !1
                }))), a.setData({
                    newhouselist: e.data.data.newhouselist,
                    oldhouselist: e.data.data.oldhouselist,
                    lethouselist: e.data.data.lethouselist,
                    agentlist: e.data.data.agentlist,
                    navlist: e.data.data.navlist,
                    banners: e.data.data.banner,
                    intro: e.data.data.intro,
                    ordertype: 3,
                    moban: e.data.data.intro.moban,
                    isshow: !1,
                    isoldhouse: e.data.data.intro.isoldhouse,
                    islethouse: e.data.data.intro.islethouse,
                    isbuyhouse: e.data.data.intro.isbuyhouse,
                    issalehouse: e.data.data.intro.issalehouse,
                    isagentlethouse: e.data.data.intro.isagentlethouse,
                    isagentoldhouse: e.data.data.intro.isagentoldhouse,
                    houselist:e.data.data.houselist,
                    city: wx.getStorageSync("cityinfo").name
                }));
            },
            complete: function() {
                wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
        });
    },
    closeIndeximg: function() {
        var e = this;
        e.data.indeximg = !0, wx.setStorageSync("onimg", !0), e.setData({
            indeximg: e.data.indeximg
        });
    },
    getPhoneNumber: function(e) {
        console.log(e.detail);
        var a = this;
        "getPhoneNumber:fail user deny" == e.detail.errMsg ? wx.showModal({
            title: "提示",
            showCancel: !1,
            content: "未授权",
            success: function(e) {}
        }) : (a.setData({
            isphone: !0
        }), app.util.request({
            url: "entry/wxapp/Getphone",
            data: {
                iv: e.detail.iv,
                encryptedData: e.detail.encryptedData,
                uid: a.data.uid
            },
            success: function(e) {
                e.data.message.errno || a.setData({
                    isphone: !0
                });
            }
        }));
    },
  cancel_login: function(e) {
    this.setData({
      isuser: !0
    });
  },
    bindGetUserInfo: function(e) {
        var n = this;
        app.util.getUserInfo(function(a) {
            console.log(a), n.data.isuser = !0;
            var e = a.memberInfo.uid, t = a.wxInfo.nickName, o = a.wxInfo.avatarUrl;
            0 < (n.data.uid = e) && (n.setData({
                userinfo: a,
                isuser: n.data.isuser
            }), app.util.request({
                url: "entry/wxapp/Updateuserinfo",
                data: {
                    uid: e,
                    nickname: t,
                    avatarUrl: o
                },
                success: function(e) {
                    e.data.message.errno || (app.globalData.isuser = !0, n.setData({
                        userinfo: a,
                        isuser: n.data.isuser
                    }));
                }
            }));
        }, e.detail);
    },
    toHouseDetail: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_house/pages/oldpayhousedetail/index?id=" + e
        });
    },
    toInnerUrl: function(e) {
        var a = e.currentTarget.dataset.url;
        wx.navigateTo({
            url: a
        });
    },
    toMenuUrl: function(e) {
        var a = e.currentTarget.dataset.url;
        wx.switchTab({
            url: a
        });
    },
    toWxapp: function(e) {
        var a = e.currentTarget.dataset.url, t = e.currentTarget.dataset.appid;
        console.log(a), console.log(t), wx.navigateToMiniProgram({
            appId: t,
            path: a,
            extraData: {
                foo: "bar"
            },
            envVersion: "develop",
            success: function(e) {}
        });
    },
    toHousemoney: function() {
        wx.navigateTo({
            url: "/weixinmao_house/pages/housemoney/index"
        });
    },
    cancelUser: function(e) {
        this.data.isuser = !0, this.setData({
            isuser: this.data.isuser
        });
    },
    cancelPhone: function(e) {
        this.data.isphone = !0, this.setData({
            isphone: this.data.isphone
        });
    },
    toNagivate: function(e) {
        var a = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: a
        });
    },
    toSwitchtab: function(e) {
        var a = e.currentTarget.dataset.id;
        wx.switchTab({
            url: a
        });
    }
}, "toWxapp", function(e) {
    var a = e.currentTarget.dataset.id, t = e.currentTarget.dataset.appid;
    console.log(a), console.log(t), wx.navigateToMiniProgram({
        appId: t,
        path: a,
        extraData: {
            foo: "bar"
        },
        envVersion: "develop",
        success: function(e) {}
    });
}), _defineProperty(_Page, "toStorelist", function(e) {
    var a = e.currentTarget.dataset.id;
    wx.navigateTo({
        url: "/weixinmao_house/pages/storelist/index?id=" + a
    });
}), _defineProperty(_Page, "toletHouseDetail", function(e) {
    var a = e.currentTarget.dataset.id;
    wx.navigateTo({
        url: "/weixinmao_house/pages/lethousedetail/index?id=" + a
    });
}), _defineProperty(_Page, "toNewHouse", function(e) {
    wx.switchTab({
        url: "/weixinmao_house/pages/newhouselist/index"
    });
}), _defineProperty(_Page, "toOldHouse", function(e) {
    wx.switchTab({
        url: "/weixinmao_house/pages/oldhouselist/index"
    });
}), _defineProperty(_Page, "toOldSaleHouse", function(e) {
    wx.navigateTo({
        url: "/weixinmao_house/pages/oldsalehouselist/index"
    });
}), _defineProperty(_Page, "toOldPayHouse", function(e) {
    wx.navigateTo({
        url: "/weixinmao_house/pages/oldpayhouselist/index"
    });
}), _defineProperty(_Page, "toLetBusinessHouse", function(e) {
    wx.navigateTo({
        url: "/weixinmao_house/pages/letbusinesshouselist/index"
    });
}), _defineProperty(_Page, "toAgentlist", function(e) {
    wx.navigateTo({
        url: "/weixinmao_house/pages/agentlist/index"
    });
}), _defineProperty(_Page, "toArticle", function(e) {
    wx.navigateTo({
        url: "/weixinmao_house/pages/salelist/index"
    });
}), _defineProperty(_Page, "toActive", function(e) {
    wx.navigateTo({
        url: "/weixinmao_house/pages/active/index"
    });
}), _defineProperty(_Page, "toBusinesshouselist", function(e) {
    wx.navigateTo({
        url: "/weixinmao_house/pages/businesshouselist/index"
    });
}), _defineProperty(_Page, "toNewHouseDetail", function(e) {
    var a = e.currentTarget.dataset.id;
    wx.navigateTo({
        url: "/weixinmao_house/pages/newhousedetail/index?id=" + a
    });
}), _defineProperty(_Page, "toOldHouseDetail", function(e) {
    var a = e.currentTarget.dataset.id;
    wx.navigateTo({
        url: "/weixinmao_house/pages/oldhousedetail/index?id=" + a
    });
}), _defineProperty(_Page, "toLethouse", function(e) {
    var a = e.currentTarget.dataset.id;
    wx.navigateTo({
        url: "/weixinmao_house/pages/lethouselist/index?id=" + a
    });
}), _defineProperty(_Page, "toMessage", function(e) {
    var a = wx.getStorageSync("userInfo");
    e.currentTarget.dataset.tel;
    app.util.request({
        url: "entry/wxapp/Checkagent",
        data: {
            sessionid: a.sessionid,
            uid: a.memberInfo.uid
        },
        success: function(e) {
            0 == e.data.data.error ? wx.navigateTo({
                url: "/weixinmao_house/pages/message/index"
            }) : wx.showModal({
                title: "提示",
                content: e.data.data.msg,
                showCancel: !1
            });
        }
    });
}), _defineProperty(_Page, "toSearch", function(e) {
    wx.navigateTo({
        url: "/weixinmao_house/pages/search/index"
    });
}), _defineProperty(_Page, "PubOldhouse", function(e) {
    var a = this;
    wx.navigateTo({
        url: "/weixinmao_house/pages/pub/index",
        success: function() {
            a.data.showmsg = !0, a.setData({
                showmsg: a.data.showmsg
            });
        }
    });
}), _defineProperty(_Page, "PubLethouse", function(e) {
    var a = this;
    wx.navigateTo({
        url: "/weixinmao_house/pages/letpub/index",
        success: function() {
            a.data.showmsg = !0, a.setData({
                showmsg: a.data.showmsg
            });
        }
    });
}), _defineProperty(_Page, "toSaleOldPub", function(e) {
    var a = this;
    wx.navigateTo({
        url: "/weixinmao_house/pages/saleoldpub/index",
        success: function() {
            a.data.showmsg = !0, a.setData({
                showmsg: a.data.showmsg
            });
        }
    });
}), _defineProperty(_Page, "toSalePub", function(e) {
    var a = this;
    wx.navigateTo({
        url: "/weixinmao_house/pages/salepub/index",
        success: function() {
            a.data.showmsg = !0, a.setData({
                showmsg: a.data.showmsg
            });
        }
    });
}), _defineProperty(_Page, "toSaleBuyPub", function(e) {
    var a = this;
    wx.navigateTo({
        url: "/weixinmao_house/pages/salebuypub/index",
        success: function() {
            a.data.showmsg = !0, a.setData({
                showmsg: a.data.showmsg
            });
        }
    });
}), _defineProperty(_Page, "toSaleLetPub", function(e) {
    var a = this;
    wx.navigateTo({
        url: "/weixinmao_house/pages/saleletpub/index",
        success: function() {
            a.data.showmsg = !0, a.setData({
                showmsg: a.data.showmsg
            });
        }
    });
}), _defineProperty(_Page, "tabClick", function(e) {
    var a = e.currentTarget.id;
    this.setData({
        ordertype: a
    });
}), _defineProperty(_Page, "goPub", function(e) {
    this.data.showmsg = !1, this.setData({
        showmsg: this.data.showmsg
    });
}), _defineProperty(_Page, "toAgentDetail", function(e) {
    var a = e.currentTarget.dataset.id;
    wx.navigateTo({
        url: "/weixinmao_house/pages/agentdetail/index?id=" + a
    });
}), _defineProperty(_Page, "closemsg", function(e) {
    this.data.showmsg = !0, this.setData({
        showmsg: this.data.showmsg
    });
}), _defineProperty(_Page, "goMap", function(e) {
    wx.openLocation({
        latitude: parseFloat(wx.getStorageSync("companyinfo").lat),
        longitude: parseFloat(wx.getStorageSync("companyinfo").lng),
        scale: 18,
        name: wx.getStorageSync("companyinfo").name,
        address: wx.getStorageSync("companyinfo").address
    });
}), _defineProperty(_Page, "onReady", function() {}), _defineProperty(_Page, "bindInput", function(e) {
    this.setData({
        inputValue: e.detail.value
    }), this.onLoad();
}), _defineProperty(_Page, "onHide", function() {}), _defineProperty(_Page, "onUnload", function() {}), 
_defineProperty(_Page, "onPullDownRefresh", function() {
    wx.showNavigationBarLoading(), this.onLoad();
}), _defineProperty(_Page, "doCall", function() {
    var e = this.data.textData.shop_tel;
    wx.makePhoneCall({
        phoneNumber: e
    });
}), _defineProperty(_Page, "onShareAppMessage", function() {
    return {
        title: wx.getStorageSync("companyinfo").name,
        path: "/weixinmao_house/pages/index/index"
    };
}), _Page));