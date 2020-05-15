var sliderWidth = 96, app = getApp();

Page({
    data: {
        commercialTotal: 1e6,
        gjjTotal: 5e5,
        tabs: [ "商业贷款", "公积金贷款", "组合贷款" ],
        activeIndex: 0,
        loansType: [ "按房价总额", "按贷款总额" ],
        loanIndex: 0,
        ratesName: [ [ "基准利率（4.9%）", "基准利率7折（3.43%）", "基准利率75折（3.68%）", "基准利率8折（3.92%）", "基准利率85折（4.17%）", "基准利率9折（4.41%）", "基准利率95折（4.66%）", "基准利率1.05倍（5.15%）", "基准利率1.1倍（5.39%）", "基准利率1.2倍（5.88%）", "基准利率1.3倍（6.37%）" ], [ "基准利率（3.25%）", "基准利率7折（2.27%）", "基准利率75折（2.44%）", "基准利率8折（2.60%）", "基准利率85折（2.76%）", "基准利率9折（2.93%）", "基准利率95折（3.09%）", "基准利率1.05倍（3.41%）", "基准利率1.1倍（3.58%）", "基准利率1.2倍（3.90%）", "基准利率1.3倍（4.23%）" ] ],
        rates: [ [ .049, .034, .0368, .0392, .0417, .0441, .0466, .0515, .0539, .0588, .0637 ], [ .0325, .0227, .0244, .026, .0276, .0293, .0309, .0341, .0358, .039, .0423 ] ],
        rateIndex0: 0,
        rateIndex1: 0,
        percentArr: [ 7, 6, 5, 4, 3, 2 ],
        percentIndex: 0,
        years: [ 30, 25, 20, 15, 10 ],
        yearIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0
    },
    onLoad: function() {
        var a = this;
        wx.getSystemInfo({
            success: function(t) {
                a.setData({
                    sliderLeft: (t.windowWidth / a.data.tabs.length - sliderWidth) / 2,
                    sliderOffset: t.windowWidth / a.data.tabs.length * a.data.activeIndex
                });
            }
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
                }), a.setData({
                    intro: t.data.data.intro
                }));
            },
            complete: function() {
                wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
        });
    },
    loanChange: function(t) {
        this.setData({
            loanIndex: t.detail.value
        });
    },
    rateChange0: function(t) {
        this.setData({
            rateIndex0: t.detail.value
        });
    },
    rateChange1: function(t) {
        this.setData({
            rateIndex1: t.detail.value
        });
    },
    percentChange: function(t) {
        this.setData({
            percentIndex: t.detail.value
        });
    },
    yearChange: function(t) {
        this.setData({
            yearIndex: t.detail.value
        });
    },
    commercialTotalChange: function(t) {
        this.setData({
            commercialTotal: t.detail.value
        });
    },
    gjjTotalChange: function(t) {
        this.setData({
            gjjTotal: t.detail.value
        });
    },
    showDetail: function() {
        var t, a, e, n, i;
        t = 1 == this.data.loanIndex || 2 == this.data.activeIndex ? this.data.commercialTotal : this.data.commercialTotal * this.data.percentArr[this.data.percentIndex] / 10, 
        a = 1 == this.data.loanIndex || 2 == this.data.activeIndex ? this.data.gjjTotal : this.data.gjjTotal * this.data.percentArr[this.data.percentIndex] / 10, 
        e = this.data.rates[0][this.data.rateIndex0], n = this.data.rates[1][this.data.rateIndex1], 
        i = 12 * this.data.years[this.data.yearIndex], wx.navigateTo({
            url: "./detail/detail?parentActiveIndex=" + this.data.activeIndex + "&commercialTotal=" + t + "&gjjTotal=" + a + "&interestRatePerMou0=" + e + "&interestRatePerMou1=" + n + "&totalMouths=" + i
        });
    },
    tabClick: function(t) {
        this.setData({
            sliderOffset: t.currentTarget.offsetLeft,
            activeIndex: t.currentTarget.id
        });
    },
    onShareAppMessage: function() {
        return {
            title: "房贷计算",
            path: "/pages/mortgage/mortgage",
            success: function(t) {},
            fail: function(t) {}
        };
    }
});