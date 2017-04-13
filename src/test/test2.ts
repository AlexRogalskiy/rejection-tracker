require("../lib/index").main(__dirname, "..", "..");

import { exec } from "child_process";

function run(command: string): Promise<string> {

    return new Promise<string>((resolve, reject) => {

        exec(command, (error, stdout) => {

            if (error) {
                reject(error);
                return;
            }

            resolve(stdout);

        });

    });

}

(async function main() {

    await run("dummy");

})();