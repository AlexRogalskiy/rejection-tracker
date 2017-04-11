import * as path from "path";
import "colors";

process.setMaxListeners(Infinity);

export function rejectionTracker(...projectPaths: string[]): void {

    let projectPath = path.join.apply(path, projectPaths);

    process.on("unhandledRejection", error => {

        if (!(error instanceof Error)) return;

        let split = error.stack!.split("\n");

        let regExp = /^at\ (?:[^\ ]+\ \()?(.*)(?:\:[0-9]+){2}\)?$/;

        let match = split[1].trim().match(regExp);

        let filePath = match![1];

        let relativePath = path.relative(projectPath, filePath);

        if (relativePath.match(/^(?:\.\.|node_modules)/)) return;

        console.log(`${projectPath.split(path.sep).pop()} internal error`.red);

        if( error.stack ) console.log(error.stack);

        process.exit(-1);

    });

}