import * as path from "path";
import "colors";

export function rejectionTracker(...projectPaths: string[]): void {

    let projectPath= path.join.apply(path, projectPaths);

    console.log("add rejection handler", projectPath);

    process.on("unhandledRejection", error => {


        if (!(error instanceof Error) || !error.stack )
            return;

        let split = error.stack!.split("\n");

        let regExp = /^at\ (?:[^\ ]+\ \()?(.*)(?:\:[0-9]+){2}\)?$/;

        let match = split[1].trim().match(regExp);

        let filePath = match![1];


        let relativePath= path.relative(projectPath, filePath);

        /*
        filePath= "/home/pi/github/test.js";
        filePath= "/home/pi/github/rejection-tracker/node_modules/m/test.js";

        console.log("filePath: ",filePath);
        console.log("projectPath: ", projectPath);

        console.log("relativePath: ", relativePath);

        console.log(relativePath.match(/^(?:\.\.|node_modules)/));
        */

        if (relativePath.match(/^(?:\.\.|node_modules)/) )
            return;

        console.log(`${projectPath.split(path.sep).pop()} internal error`.red);

        console.log(error.stack);

        process.exit(-1);

    });


}