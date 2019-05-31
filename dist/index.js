"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var inquirer_1 = __importDefault(require("inquirer"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var child_process_1 = require("child_process");
var history_1 = require("./history");
run();
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var lernaFilePath, packages, history_2, choices, anwser, index, anwser3, index3, el_1, _a, comm, args, el, scripts, anwser2, index2, customScript, commArr, scriptName;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    lernaFilePath = recursiveFindLernaJson(process.cwd());
                    if (!lernaFilePath) return [3 /*break*/, 9];
                    packages = recursiveFindPackageJsonName(lernaFilePath);
                    history_2 = history_1.getHistory(lernaFilePath);
                    choices = packages.map(function (el, i) { return ({
                        name: el.name,
                        value: String(i),
                    }); });
                    if (history_2.length) {
                        choices.unshift({
                            name: 'HISTORY',
                            value: 'history',
                        });
                    }
                    return [4 /*yield*/, inquirer_1.default.prompt({
                            type: 'list',
                            name: '1. 请选择你要进入的项目',
                            choices: choices,
                        })];
                case 1:
                    anwser = _b.sent();
                    index = getValue(anwser);
                    if (!(index === 'history')) return [3 /*break*/, 3];
                    return [4 /*yield*/, inquirer_1.default.prompt({
                            type: 'list',
                            name: '2. 请选择历史命令',
                            choices: history_2.map(function (el, i) { return ({
                                name: path_1.default.basename(el.path) + ' | ' + el.command,
                                value: String(i),
                            }); }),
                        })];
                case 2:
                    anwser3 = _b.sent();
                    index3 = getValue(anwser3);
                    el_1 = history_2[index3];
                    _a = el_1.command.split(/\s+/), comm = _a[0], args = _a.slice(1);
                    runCommand(comm, args, el_1.path, lernaFilePath);
                    return [2 /*return*/];
                case 3:
                    el = packages[index];
                    scripts = getNpmScripts(path_1.default.resolve(el.path, 'package.json'));
                    return [4 /*yield*/, inquirer_1.default.prompt({
                            type: 'list',
                            name: '2. 请选择要执行的 script',
                            choices: [{ name: 'RUN_CUSTOM_SCRIPT', value: 'custom' }].concat(scripts.map(function (el, i) { return ({ name: el.name, value: String(i) }); })),
                        })];
                case 4:
                    anwser2 = _b.sent();
                    index2 = getValue(anwser2);
                    if (!!/\d/.test(String(index2))) return [3 /*break*/, 7];
                    if (!(index2 === 'custom')) return [3 /*break*/, 6];
                    return [4 /*yield*/, inquirer_1.default.prompt({
                            type: 'input',
                            name: '请输入自定义命令',
                        })];
                case 5:
                    customScript = _b.sent();
                    commArr = getValue(customScript).split(/\s+/);
                    runCommand(commArr[0], commArr.slice(1), el.path, lernaFilePath);
                    _b.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    scriptName = scripts[index2].name;
                    runCommand('npm', ['run', scriptName], el.path, lernaFilePath);
                    _b.label = 8;
                case 8: return [3 /*break*/, 10];
                case 9:
                    console.log('未找到 lerna 项目');
                    _b.label = 10;
                case 10: return [2 /*return*/];
            }
        });
    });
}
function runCommand(comm, args, cwd, rootPath) {
    history_1.saveHistory(comm + " " + args.join(' '), rootPath, cwd);
    var stdout = child_process_1.spawn(comm, args, { cwd: cwd, stdio: 'inherit' });
    stdout &&
        stdout
            .on('data', function (data) { return console.log(data.toString()); })
            .on('error', function (err) { return console.error(err.toString()); });
}
function recursiveFindLernaJson(curPath) {
    var lernaJsonPath = path_1.default.resolve(curPath, 'lerna.json');
    var isExisted = fs_1.default.existsSync(lernaJsonPath);
    if (curPath === '/')
        return null;
    return isExisted
        ? path_1.default.dirname(lernaJsonPath)
        : recursiveFindLernaJson(path_1.default.resolve(curPath, '..'));
}
function recursiveFindPackageJsonName(findPath, res) {
    if (res === void 0) { res = []; }
    var packageJsonPath = path_1.default.resolve(findPath, 'package.json');
    var isPackageJsonPath = fs_1.default.existsSync(packageJsonPath);
    var isNotLernaRoot = !fs_1.default.existsSync(path_1.default.resolve(findPath, 'lerna.json'));
    if (isPackageJsonPath) {
        res.push({
            name: isNotLernaRoot
                ? require(packageJsonPath).name
                : 'PROJECT ROOT',
            path: findPath,
        });
    }
    var dir = fs_1.default.readdirSync(findPath);
    for (var _i = 0, dir_1 = dir; _i < dir_1.length; _i++) {
        var d = dir_1[_i];
        d = path_1.default.resolve(findPath, d);
        var isDir = fs_1.default.lstatSync(d).isDirectory();
        var isNotNodeModules = !/node_modules/.test(d);
        if (isDir && isNotNodeModules) {
            recursiveFindPackageJsonName(d, res);
        }
    }
    return res;
}
function getNpmScripts(packageJsonPath) {
    var scripts = require(packageJsonPath).scripts;
    var scriptNames = Object.keys(scripts);
    return scriptNames.map(function (el) { return ({
        name: el,
        value: scripts[el],
    }); });
}
function getValue(anwser) {
    var obj = anwser[Object.keys(anwser)[0]];
    if (typeof obj === 'object')
        return getValue(obj);
    return obj;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNEQUFnQztBQUNoQywwQ0FBb0I7QUFDcEIsOENBQXdCO0FBQ3hCLCtDQUFzQztBQUN0QyxxQ0FBb0Q7QUFFcEQsR0FBRyxFQUFFLENBQUM7QUFFTixTQUFlLEdBQUc7Ozs7OztvQkFDUixhQUFhLEdBQUcsc0JBQXNCLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7eUJBQ3hELGFBQWEsRUFBYix3QkFBYTtvQkFDUCxRQUFRLEdBQUcsNEJBQTRCLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQ3ZELFlBQVUsb0JBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFDcEMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBQyxFQUFFLEVBQUUsQ0FBQyxJQUFLLE9BQUEsQ0FBQzt3QkFDckMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJO3dCQUNiLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO3FCQUNuQixDQUFDLEVBSHNDLENBR3RDLENBQUMsQ0FBQztvQkFDSixJQUFJLFNBQU8sQ0FBQyxNQUFNLEVBQUU7d0JBQ2hCLE9BQU8sQ0FBQyxPQUFPLENBQUM7NEJBQ1osSUFBSSxFQUFFLFNBQVM7NEJBQ2YsS0FBSyxFQUFFLFNBQVM7eUJBQ25CLENBQUMsQ0FBQztxQkFDTjtvQkFDbUIscUJBQU0sa0JBQVEsQ0FBQyxNQUFNLENBQUM7NEJBQ3RDLElBQUksRUFBRSxNQUFNOzRCQUNaLElBQUksRUFBRSxlQUFlOzRCQUNyQixPQUFPLFNBQUE7eUJBQ1YsQ0FBQyxFQUFBOztvQkFKSSxNQUFNLEdBQVEsU0FJbEI7b0JBQ0ksS0FBSyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQzt5QkFHM0IsQ0FBQSxLQUFLLEtBQUss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