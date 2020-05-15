var _extends = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var o in a) Object.prototype.hasOwnProperty.call(a, o) && (t[o] = a[o]);
    }
    return t;
}, CFHL = require("../../../resource/js/calculatorForHouseLoan.js"), app = getApp(), sliderWidth = 96;

Page({
    data: {
        tabs: [ "等额本息", "等额本金", "本息/本金" ],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0,
        hiddenDetail: !0,
        parentActiveIndex: 0,
        commercialTotal: 0,
        gjjTotal: 0,
        interestRatePerMou0: 0,
        interestRatePerMou1: 0,
        totalMouths: 0,
        loanTotal: 0,
        totalInterestAi: 0,
        totalRepayAi: 0,
        repayPerMouAi: 0,
        totalInterestAp: 0,
        totalRepayPriceAp: 0,
        repayPerMouthAp: 0,
        decreasePerMouAp: 0,
        repayPerMouObjAi: {},
        repayPerMouObjAp: {}
    },
    showDetail: function() {
        this.data.hiddenDetail = !this.data.hiddenDetail, this.setData({
            hiddenDetail: this.data.hiddenDetail
        });
    },
    onLoad: function(t) {
        var e;
        if (wx.showLoading({
            title: "数据加载中...",
            mask: !0
        }), app.util.request({
            url: "entry/wxapp/GetSysInit",
            data: {},
            success: function(t) {
                t.data.message.errno || (wx.setStorageSync("companyinfo", t.data.data.intro), wx.setNavigationBarTitle({
                    title: "房贷计算器"
                }), console.log(t.data.data.intro), t.data.data.intro.maincolor || (t.data.data.intro.maincolor = "#3274e5"), 
                wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: t.data.data.intro.maincolor,
                    animation: {
                        duration: 400,
                        timingFunc: "easeIn"
                    }
                }), r.setData({
                    intro: t.data.data.intro
                }));
            },
            complete: function() {
                wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
        }), 0 == t.parentActiveIndex) e = CFHL.calculate(+t.commercialTotal, +t.interestRatePerMou0 / 12, +t.totalMouths); else if (1 == t.parentActiveIndex) e = CFHL.calculate(+t.gjjTotal, +t.interestRatePerMou1 / 12, +t.totalMouths); else {
            var a = CFHL.calculate(+t.commercialTotal, +t.interestRatePerMou0 / 12, +t.totalMouths);
            for (var o in e = CFHL.calculate(+t.gjjTotal, +t.interestRatePerMou1 / 12, +t.totalMouths)) if (e.hasOwnProperty(o)) if ("string" == typeof e[o]) e[o] = (+e[o] + +a[o]).toFixed(2); else for (var i in e[o]) if (e[o].hasOwnProperty(i)) for (var n = 0; n < e[o][i].length; n++) e[o][i][n] = (+e[o][i][n] + +a[o][i][n]).toFixed(2);
        }
        console.log(e), this.setData(_extends({}, t, e), function() {
            wx.hideLoading();
        });
        var r = this;
        wx.getSystemInfo({
            success: function(t) {
                r.setData({
                    sliderLeft: (t.windowWidth / r.data.tabs.length - sliderWidth) / 2,
                    sliderOffset: t.windowWidth / r.data.tabs.length * r.data.activeIndex
                });
            }
        });
    },
    tabClick: function(t) {
        this.setData({
            sliderOffset: t.currentTarget.offsetLeft,
            activeIndex: t.currentTarget.id
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
    }
});