"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
require("colors");
var stackTrace = require("stack-trace");
function prependOnceListener(eventEmitter, eventName, listener) {
    var listeners = eventEmitter.listeners(eventName);
    eventEmitter.removeAllListeners(eventName);
    eventEmitter.once(eventName, listener);
    for (var _i = 0, listeners_1 = listeners; _i < listeners_1.length; _i++) {
        var listener_1 = listeners_1[_i];
        eventEmitter.on(eventName, listener_1);
    }
}
function rejectionTracker(modulePaths, isMain) {
    process.setMaxListeners(Infinity);
    Error.stackTraceLimit = Infinity;
    var modulePath = modulePaths.length ? path.join.apply(path, modulePaths) : undefined;
    if (!modulePath || isMain) {
        process.once("unhandledRejection", function (error) {
            console.log("Untraceable rejection".red);
            if (error instanceof Error && error.stack)
                console.log(error.stack);
            else {
                console.log("Rejection was not an error object");
                console.log(error);
            }
            process.exit(-1);
        });
    }
    if (!modulePath)
        return;
    var moduleName = modulePath.split(path.sep).pop();
    prependOnceListener(process, "unhandledRejection", function (error) {
        if (!(error instanceof Error) || !error.stack)
            return;
        var fileName = undefined;
        for (var _i = 0, _a = stackTrace.parse(error); _i < _a.length; _i++) {
            var stackFrame = _a[_i];
            var currentFileName = stackFrame.getFileName();
            if (currentFileName && path.isAbsolute(currentFileName)) {
                fileName = currentFileName;
                break;
            }
        }
        if (!fileName)
            return;
        var relativePath = path.relative(modulePath, fileName);
        if (relativePath.match(/^(?:\.\.|node_modules)/))
            return;
        console.log((moduleName + " internal error").red);
        console.log(error.stack);
        process.exit(-1);
    });
}
exports.rejectionTracker = rejectionTracker;
//# sourceMappingURL=rejectionTracker.js.map