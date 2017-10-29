"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var nock = require("nock");
var querystring_1 = require("querystring");
var path_1 = require("path");
var lodash_1 = require("lodash");
var bind = function (f) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return f.bind.apply(f, [null].concat(args));
};
var join = function (str1) { return function (str2) { return path_1.join(str1, str2); }; };
var isHex = function (str) { return /^[0-9A-Fa-f]{2,}$/.test(str); };
var definePersistent = function (defs) {
    return nock.define(defs).map(function (m) { return m.persist(); });
};
var skipAsterisk = function (s) {
    if (s === '*')
        return true;
};
var pathMatcher = function (path, queries, matching) {
    var _a = matching.split('?'), matchingPath = _a[0], matchingQueries = _a[1];
    if (path !== matchingPath)
        return false;
    var equality = lodash_1.isEqualWith(queries, querystring_1.parse(matchingQueries), skipAsterisk);
    return equality;
};
var asteriskToRx = function (value) {
    if (value === '*')
        return /.*/gi;
    if (lodash_1.isArray(value))
        return value.map(asteriskToRx);
    if (lodash_1.isPlainObject(value))
        return lodash_1.mapValues(value, asteriskToRx);
    return value;
};
var defineMatchers = function (_a) {
    var queries = _a.queries, response = _a.response, def = __rest(_a, ["queries", "response"]);
    return Object.assign(def, {
        response: lodash_1.isString(response) && isHex(response) ? Buffer.from(response, 'hex') : response,
        path: bind(pathMatcher, def.path, queries),
        body: asteriskToRx(def.body)
    });
};
var readFile = function (filePath) {
    return fs.readFileSync(filePath, { encoding: 'utf8' });
};
var readRecord = function (recordPath) {
    return JSON.parse(readFile(recordPath));
};
var recordsByScope = function (scopeName) {
    return fs.readdirSync(scopeName)
        .map(join(scopeName))
        .filter(function (path) {
        return !~path.toLowerCase().indexOf('.ds_store');
    })
        .map(readRecord)
        .map(defineMatchers);
};
exports.default = (function (playbacksPath) {
    return fs.readdirSync(playbacksPath)
        .map(join(playbacksPath))
        .filter(function (path) {
        return fs.statSync(path).isDirectory();
    })
        .map(recordsByScope)
        .map(definePersistent);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheWJhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcGxheWJhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSx1QkFBd0I7QUFDeEIsMkJBQTRCO0FBQzVCLDJDQUFtQztBQUNuQyw2QkFBbUM7QUFDbkMsaUNBT2U7QUFJZixJQUFNLElBQUksR0FBRyxVQUFDLENBQVc7SUFBRSxjQUFjO1NBQWQsVUFBYyxFQUFkLHFCQUFjLEVBQWQsSUFBYztRQUFkLDZCQUFjOztJQUFLLE9BQUEsQ0FBQyxDQUFDLElBQUksT0FBTixDQUFDLEdBQU0sSUFBSSxTQUFLLElBQUk7QUFBcEIsQ0FBcUIsQ0FBQTtBQUNuRSxJQUFNLElBQUksR0FBRyxVQUFDLElBQVksSUFBSyxPQUFBLFVBQUMsSUFBWSxJQUFLLE9BQUEsV0FBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBaEIsQ0FBZ0IsRUFBbEMsQ0FBa0MsQ0FBQTtBQUNqRSxJQUFNLEtBQUssR0FBRyxVQUFDLEdBQVcsSUFBSyxPQUFBLG1CQUFtQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBN0IsQ0FBNkIsQ0FBQTtBQUU1RCxJQUFNLGdCQUFnQixHQUFHLFVBQUMsSUFBMkI7SUFDbkQsT0FBQSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBWCxDQUFXLENBQUM7QUFBdkMsQ0FBdUMsQ0FBQTtBQUV6QyxJQUFNLFlBQVksR0FBRyxVQUFDLENBQU07SUFDMUIsSUFBSSxDQUFDLEtBQUssR0FBRztRQUFFLE9BQU8sSUFBSSxDQUFBO0FBQzVCLENBQUMsQ0FBQTtBQUVELElBQU0sV0FBVyxHQUFHLFVBQUMsSUFBWSxFQUFFLE9BQVksRUFBRSxRQUFnQjtJQUN6RCxJQUFBLHdCQUFxRCxFQUFwRCxvQkFBWSxFQUFFLHVCQUFlLENBQXVCO0lB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