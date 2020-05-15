var _showdown = require("./showdown.js"), _showdown2 = _interopRequireDefault(_showdown), _html2json = require("./html2json.js"), _html2json2 = _interopRequireDefault(_html2json);

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function wxParse() {
    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "wxParseData", a = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "html", t = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : '<div class="color:red;">数据不能为空</div>', i = arguments[3], o = arguments[4], r = i, s = {};
    if ("html" == a) s = _html2json2.default.html2json(t, e), console.log(JSON.stringify(s, " ", " ")); else if ("md" == a || "markdown" == a) {
        var n = new _showdown2.default.Converter().makeHtml(t);
        s = _html2json2.default.html2json(n, e), console.log(JSON.stringify(s, " ", " "));
    }
    s.view = {}, void (s.view.imagePadding = 0) !== o && (s.view.imagePadding = o);
    var d = {};
    d[e] = s, r.setData(d), r.wxParseImgLoad = wxParseImgLoad, r.wxParseImgTap = wxParseImgTap;
}

function wxParseImgTap(e) {
    var a = e.target.dataset.src, t = e.target.dataset.from;
    void 0 !== t && 0 < t.length && wx.previewImage({
        current: a,
        urls: this.data[t].imageUrls
    });
}

function wxParseImgLoad(e) {
    var a = e.target.dataset.from, t = e.target.dataset.idx;
    void 0 !== a && 0 < a.length && calMoreImageInfo(e, t, this, a);
}

function calMoreImageInfo(e, a, t, i) {
    var o = t.data[i];
    if (0 != o.images.length) {
        var r = o.images, s = wxAutoImageCal(e.detail.width, e.detail.height, t, i);
        r[a].width = s.imageWidth, r[a].height = s.imageheight, o.images = r;
        var n = {};
        n[i] = o, t.setData(n);
    }
}

function wxAutoImageCal(t, i, o, r) {
    var s = 0, n = 0, d = 0, g = {};
    return wx.getSystemInfo({
        success: function(e) {
            var a = o.data[r].view.imagePadding;
            s = e.windowWidth - 2 * a, e.windowHeight, console.log("windowWidth" + s), s < t ? (n = s, 
            console.log("autoWidth" + n), d = n * i / t, console.log("autoHeight" + d), g.imageWidth = n, 
            g.imageheight = d) : (g.imageWidth = t, g.imageheight = i);
        }
    }), g;
}

function wxParseTemArray(e, a, t, i) {
    for (var o = [], r = i.data, s = null, n = 0; n < t; n++) {
        var d = r[a + n].nodes;
        o.push(d);
    }
    e = e || "wxParseTemArray", (s = JSON.parse('{"' + e + '":""}'))[e] = o, i.setData(s);
}

function emojisInit() {
    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "", a = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "/wxParse/emojis/", t = arguments[2];
    _html2json2.default.emojisInit(e, a, t);
}

module.exports = {
    wxParse: wxParse,
    wxParseTemArray: wxParseTemArray,
    emojisInit: emojisInit
};