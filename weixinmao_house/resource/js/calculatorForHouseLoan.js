var formatFloat = function(r, a) {
    return (Math.round(r * Math.pow(10, a)) / Math.pow(10, a)).toFixed(a);
}, loanFormula = {
    getRepayPerMouPriceAi: function(r, a, e) {
        var o = Math.pow(1 + a, e);
        return r * a * o / (o - 1);
    },
    getRepayInterestPerMouAi: function(r, a, e, o) {
        var t = [ Math.pow(1 + e, r), Math.pow(1 + e, o) ], p = t[0], A = t[1];
        return a * e * (p - A * (p - 1) / (A - 1));
    }
}, calculate = function(u, l, i) {
    var P = {
        repayPerMouObjAi: {
            repayInterestPerMouArrAi: [],
            repayPrincipalPerMouArrAi: [],
            balanceArrAi: [],
            totalRepaidArrAi: [],
            totalRepayPerMouArrAi: []
        },
        repayPerMouObjAp: {
            repayInterestPerMouArrAp: [],
            repayPerMouPriceArrAp: [],
            balanceArrAp: [],
            totalRepaidArrAp: [],
            totalRepayPerMouArrAp: []
        }
    }, M = loanFormula.getRepayPerMouPriceAi(u, l, i), y = u, n = 0, c = u / i, r = c * l, f = u, m = 0;
    !function() {
        for (var r = 0; r < i; r++) {
            var a = loanFormula.getRepayInterestPerMouAi(r, u, l, i), e = M - a, o = (y -= e) + (n += M);
            P.repayPerMouObjAi.repayInterestPerMouArrAi.push(formatFloat(a, 2)), P.repayPerMouObjAi.repayPrincipalPerMouArrAi.push(formatFloat(e, 2)), 
            P.repayPerMouObjAi.balanceArrAi.push(formatFloat(y, 2)), P.repayPerMouObjAi.totalRepaidArrAi.push(formatFloat(n, 2)), 
            P.repayPerMouObjAi.totalRepayPerMouArrAi.push(formatFloat(o, 2));
            var t = u * l * (1 - (r - 1) / i), p = c + t, A = (f -= c) + (m += p);
            P.repayPerMouObjAp.repayInterestPerMouArrAp.push(formatFloat(t, 2)), P.repayPerMouObjAp.repayPerMouPriceArrAp.push(formatFloat(p, 2)), 
            P.repayPerMouObjAp.balanceArrAp.push(formatFloat(f, 2)), P.repayPerMouObjAp.totalRepaidArrAp.push(formatFloat(m, 2)), 
            P.repayPerMouObjAp.totalRepayPerMouArrAp.push(formatFloat(A, 2));
        }
    }();
    var a = M * i, e = a - u, o = P.repayPerMouObjAp.totalRepaidArrAp[P.repayPerMouObjAp.totalRepaidArrAp.length - 1], t = o - u;
    return {
        loanTotal: formatFloat(u, 2),
        totalInterestAi: formatFloat(e, 2),
        totalRepayAi: formatFloat(a, 2),
        repayPerMouAi: formatFloat(M, 2),
        totalInterestAp: formatFloat(t, 2),
        totalRepayPriceAp: formatFloat(o, 2),
        repayPrincipalPerMouAp: formatFloat(c, 2),
        repayPerMouthAp: formatFloat(P.repayPerMouObjAp.repayPerMouPriceArrAp[0], 2),
        decreasePerMouAp: formatFloat(r, 2),
        repayPerMouObjAi: P.repayPerMouObjAi,
        repayPerMouObjAp: P.repayPerMouObjAp
    };
};

module.exports = {
    calculate: calculate
};