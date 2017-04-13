import * as path from "path";
import "colors";

import * as stackTrace from "stack-trace";

function prependOnceListener(
    eventEmitter: NodeJS.EventEmitter,
    eventName: string,
    listener: Function
) {

    let listeners= eventEmitter.listeners(eventName);

    eventEmitter.removeAllListeners(eventName);

    eventEmitter.once(eventName, listener);

    for( let listener of listeners )
        eventEmitter.on(eventName, listener);

}



export function rejectionTracker(modulePaths: string[], isMain: boolean): void {

    process.setMaxListeners(Infinity);
    Error.stackTraceLimit = Infinity;

    let modulePath= modulePaths.length?path.join.apply(path,modulePaths):undefined;

    if (!modulePath || isMain ) {

        process.once("unhandledRejection", error =>{

            console.log("Untraceable rejection".red);

            if( error instanceof Error && error.stack )
                console.log(error.stack);
            else{

                console.log("Rejection was not an error object");

                console.log(error);

            }

            process.exit(-1);

        });


    }

    if( !modulePath ) return;

    let moduleName = modulePath.split(path.sep).pop();

    prependOnceListener(process, "unhandledRejection", error => {

        if (!(error instanceof Error) || !error.stack) return;

        let fileName: string | undefined = undefined;

        for (let stackFrame of stackTrace.parse(error)) {

            let currentFileName = stackFrame.getFileName();

            if (path.isAbsolute(currentFileName)) {

                fileName = currentFileName;

                break;

            }

        }

        if (!fileName) return;

        let relativePath = path.relative(modulePath, fileName);

        if (relativePath.match(/^(?:\.\.|node_modules)/)) return;

        console.log(`${moduleName} internal error`.red);

        console.log(error.stack);

        process.exit(-1);

    });


}