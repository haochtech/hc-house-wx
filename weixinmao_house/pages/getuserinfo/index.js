var app = getApp();

Page({
    data: {},
    onLoad: function(n) {},
    bindGetUserInfo: function(n) {
        var o = this;
        app.util.getUserInfo(function(n) {
            console.log(n), o.data.isuser = !0, o.setData({
                userinfo: n,
                isuser: o.data.isuser
            });
        }, n.detail);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});