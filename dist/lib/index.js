"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rejectionTracker_1 = require("./rejectionTracker");
module.exports = function () {
    var modulePaths = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        modulePaths[_i] = arguments[_i];
    }
    return rejectionTracker_1.rejectionTracker(modulePaths, false);
};
module.exports.main = function () {
    var modulePaths = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        modulePaths[_i] = arguments[_i];
    }
    return rejectionTracker_1.rejectionTracker(modulePaths, true);
};
//# sourceMappingURL=index.js.map