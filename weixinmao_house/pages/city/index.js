var app = getApp();

Page({
    data: {
        scrollHeight: "",
        toView: "#",
        type: 0
    },
    onLoad: function(a) {
        var t = this;
        console.log(a.id), t.data.type = a.id, wx.setNavigationBarTitle({
            title: "切换城市"
        }), wx.getSystemInfo({
            success: function(a) {
                t.setData({
                    scrollHeight: a.windowHeight
                });
            }
        }), app.util.request({
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
        }), app.util.request({
            url: "entry/wxapp/getcitylist",
            success: function(a) {
                a.data.message.errno || (console.log(a.data.data.firstnamelist), t.setData({
                    hotlist: a.data.data.hotlist,
                    firstnamelist: a.data.data.firstnamelist
                }));
            }
        });
    },
    goBack: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    selectcity: function(a) {
        var t = this, e = a.currentTarget.dataset.id, i = a.currentTarget.dataset.name, o = {};
        o.name = i, o.id = e, wx.setStorageSync("cityinfo", o), 1 == t.data.type ? wx.switchTab({
            url: "/weixinmao_house/pages/newhouselist/index"
        }) : 2 == t.data.type ? wx.navigateTo({
            url: "/weixinmao_house/pages/lethouselist/index"
        }) : 0 == t.data.type ? wx.switchTab({
            url: "/weixinmao_house/pages/index/index"
        }) : 4 == t.data.type ? wx.navigateTo({
            url: "/weixinmao_house/pages/salelist/index"
        }) : 5 == t.data.type ? wx.navigateTo({
            url: "/weixinmao_house/pages/agentlist/index"
        }) : 6 == t.data.type ? wx.navigateTo({
            url: "/weixinmao_house/pages/active/index"
        }) : wx.switchTab({
            url: "/weixinmao_house/pages/oldhouselist/index"
        });
    },
    choiceWordindex: function(a) {
        var t = a.target.dataset.wordindex;
        this.setData({
            toView: t
        });
    }
});