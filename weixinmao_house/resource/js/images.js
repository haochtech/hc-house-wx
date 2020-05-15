function imageUtil(i) {
    var g = {}, l = i.detail.width, n = i.detail.height, a = n / l;
    return console.log("originalWidth: " + l), console.log("originalHeight: " + n), 
    wx.getSystemInfo({
        success: function(i) {
            var e = i.windowWidth, o = i.windowHeight, t = o / e;
            console.log("windowWidth: " + e), console.log("windowHeight: " + o), a < t ? (g.imageWidth = e, 
            g.imageHeight = e * n / l) : (g.imageHeight = o, g.imageWidth = o * l / n);
        }
    }), console.log("缩放后的宽: " + g.imageWidth), console.log("缩放后的高: " + g.imageHeight), 
    g;
}

module.exports = {
    imageUtil: imageUtil
};