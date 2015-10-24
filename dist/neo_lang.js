(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.neo_lang = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by neo on 2015/10/7.
 */
'use strict';
var extend = (function () {
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

module.exports.extend=extend;
},{}]},{},[1])(1)
});