"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
require("colors");
function rejectionTracker() {
    var projectPaths = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        projectPaths[_i] = arguments[_i];
    }
    var projectPath = path.join.apply(path, projectPaths);
    process.on("unhandledRejection", function (error) {
        if (!(error instanceof Error) || !error.stack)
            return;
        var split = error.stack.split("\n");
        var regExp = /^at\ (?:[^\ ]+\ \()?(.*)(?:\:[0-9]+){2}\)?$/;
        var match = split[1].trim().match(regExp);
        var filePath = match[1];
        var relativePath = path.relative(projectPath, filePath);
        /*
        filePath= "/home/pi/github/test.js";
        filePath= "/home/pi/github/rejection-tracker/node_modules/m/test.js";

        console.log("filePath: ",filePath);
        console.log("projectPath: ", projectPath);

        console.log("relativePath: ", relativePath);

        console.log(relativePath.match(/^(?:\.\.|node_modules)/));
        */
        if (relativePath.match(/^(?:\.\.|node_modules)/))
            return;
        console.log(("Unhandled Rejection error in module " + projectPath.split(path.sep).pop()).red);
        console.log(error.stack);
        process.exit(-1);
    });
}
exports.rejectionTracker = rejectionTracker;
//# sourceMappingURL=rejectionTracker.js.map