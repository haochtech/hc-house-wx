var _createClass = function() {
    function r(t, a) {
        for (var n = 0; n < a.length; n++) {
            var r = a[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(t, r.key, r);
        }
    }
    return function(t, a, n) {
        return a && r(t.prototype, a), n && r(t, n), t;
    };
}();

function _classCallCheck(t, a) {
    if (!(t instanceof a)) throw new TypeError("Cannot call a class as a function");
}

var GPSTransformWX = function() {
    function a(t) {
        _classCallCheck(this, a);
    }
    return _createClass(a, [ {
        key: "transform",
        value: function(t, a) {
            var n = 6378245, r = .006693421622965943;
            if (this.outOfChina(t, a)) return [ t, a ];
            var e = this.transformLat(a - 105, t - 35), s = this.transformLon(a - 105, t - 35), h = t / 180 * Math.PI, o = 1 - r * (o = Math.sin(h)) * o, i = Math.sqrt(o);
            e = 180 * e / (n * (1 - r) / (o * i) * Math.PI), s = 180 * s / (n / i * Math.cos(h) * Math.PI);
            var u = Number(t) + Number(e), M = Number(a) + Number(s);
            return console.log("纬度" + e + "**" + t + " ****" + u), console.log("经度" + s + "**" + a + " ****" + M), 
            [ u, M ];
        }
    }, {
        key: "outOfChina",
        value: function(t, a) {
            return a < 72.004 || 137.8347 < a || (t < .8293 || 55.8271 < t);
        }
    }, {
        key: "transformLat",
        value: function(t, a) {
            console.log("x=" + t + " y=" + a);
            var n = 2 * t - 100 + 3 * a + .2 * a * a + .1 * t * a + .2 * Math.sqrt(Math.abs(t));
            return n += 2 * (20 * Math.sin(6 * t * Math.PI) + 20 * Math.sin(2 * t * Math.PI)) / 3, 
            n += 2 * (20 * Math.sin(a * Math.PI) + 40 * Math.sin(a / 3 * Math.PI)) / 3, n += 2 * (160 * Math.sin(a / 12 * Math.PI) + 320 * Math.sin(a * Math.PI / 30)) / 3;
        }
    }, {
        key: "transformLon",
        value: function(t, a) {
            var n = 300 + t + 2 * a + .1 * t * t + .1 * t * a + .1 * Math.sqrt(Math.abs(t));
            return n += 2 * (20 * Math.sin(6 * t * Math.PI) + 20 * Math.sin(2 * t * Math.PI)) / 3, 
            n += 2 * (20 * Math.sin(t * Math.PI) + 40 * Math.sin(t / 3 * Math.PI)) / 3, n += 2 * (150 * Math.sin(t / 12 * Math.PI) + 300 * Math.sin(t / 30 * Math.PI)) / 3;
        }
    } ]), a;
}();

module.exports.GPSTransformWX = GPSTransformWX;