import { rejectionTracker } from "./rejectionTracker";

module.exports = (...modulePaths: string[]) => rejectionTracker(modulePaths, false);

module.exports.main = (...modulePaths: string[]) => rejectionTracker(modulePaths, true);
