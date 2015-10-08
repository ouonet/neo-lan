/**
 * Created by neo on 2015/10/7.
 */
'use strict';
module.exports.extend = (function () {
    // inline overrides
    var ua = typeof navigator == "object" && (typeof navigator.userAgent == 'string' )
            ? navigator.userAgent.toLowerCase() : "",
        check = function (r) {
            return r.test(ua);
        },
        isOpera = check(/opera/),
        isIE = !isOpera && check(/msie/),
        apply = function (o, c, defaults) {
            // no "this" reference for friendly out of scope calls
            if (defaults) {
                apply(o, defaults);
            }
            if (o && c && typeof c == 'object') {
                for (var p in c) {
                    o[p] = c[p];
                }
            }
            return o;
        },
        io = function (o) {
            for (var m in o) {
                this[m] = o[m];
            }
        },
        override = function (origclass, overrides) {
            if (overrides) {
                var p = origclass.prototype;
                apply(p, overrides);
                if (isIE && overrides.hasOwnProperty('toString')) {
                    p.toString = overrides.toString;
                }
            }
        },
        oc = Object.prototype.constructor;

    return function (sb, sp, overrides) {
        if (typeof sp == 'object') {
            overrides = sp;
            sp = sb;
            sb = overrides.constructor != oc ? overrides.constructor : function () {
                sp.apply(this, arguments);
            };
        }
        var F = function () {
            },
            sbp,
            spp = sp.prototype;

        F.prototype = spp;
        sbp = sb.prototype = new F();
        sbp.constructor = sb;
        sb.superclass = spp;
        if (spp.constructor == oc) {
            spp.constructor = sp;
        }
        sb.override = function (o) {
            override(sb, o);
        };
        sbp.superclass = sbp.supr = (function () {
            return spp;
        });
        sbp.override = io;
        override(sb, overrides);
        sb.extend = function (o) {
            return extend(sb, o);
        };
        return sb;
    };
})();
