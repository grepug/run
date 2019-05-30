"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = __importDefault(require("path"));
var util_1 = require("./util");
var FILE_NAME = 'run.json';
var MAX_HISTORY = 30;
var getHistoryJson = function (dir) {
    try {
        return require(path_1.default.resolve(dir, FILE_NAME));
    }
    catch (e) {
        return { history: [] };
    }
};
exports.saveHistory = function (script, rootPath, dir) {
    var historyJson = getHistoryJson(rootPath);
    historyJson.history.unshift({ path: dir, command: script });
    historyJson.history = util_1.uniq(historyJson.history);
    if (historyJson.history.length > MAX_HISTORY) {
        historyJson.history.pop();
    }
    fs_1.writeFileSync(rootPath + "/" + FILE_NAME, JSON.stringify(historyJson), 'utf8');
};
exports.getHistory = function (rootPath) {
    var historyJson = getHistoryJson(rootPath);
    return historyJson.history;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9oaXN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEseUJBQW1DO0FBQ25DLDhDQUF3QjtBQUN4QiwrQkFBOEI7QUFFOUIsSUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDO0FBQzdCLElBQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQztBQVN2QixJQUFNLGNBQWMsR0FBRyxVQUFDLEdBQVc7SUFDL0IsSUFBSTtRQUNBLE9BQU8sT0FBTyxDQUFDLGNBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7S0FDaEQ7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNSLE9BQU8sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLENBQUM7S0FDMUI7QUFDTCxDQUFDLENBQUM7QUFFVyxRQUFBLFdBQVcsR0FBRyxVQUFDLE1BQWMsRUFBRSxRQUFnQixFQUFFLEdBQVc7SUFDckUsSUFBTSxXQUFXLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzdDLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUM1RCxXQUFXLENBQUMsT0FBTyxHQUFHLFdBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEQsSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxXQUFXLEVBQUU7UUFDMUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztLQUM3QjtJQUNELGtCQUFhLENBQ04sUUFBUSxTQUFJLFNBQVcsRUFDMUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsRUFDM0IsTUFBTSxDQUNULENBQUM7QUFDTixDQUFDLENBQUM7QUFFVyxRQUFBLFVBQVUsR0FBRyxVQUFDLFFBQWdCO0lBQ3ZDLElBQU0sV0FBVyxHQUFHLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM3QyxPQUFPLFdBQVcsQ0FBQyxPQUFPLENBQUM7QUFDL0IsQ0FBQyxDQUFDIn0=