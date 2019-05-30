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
run();
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var lernaFilePath, packages, anwser, index, el, scripts, anwser2, index2, customScript, commArr, scriptName;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    lernaFilePath = recursiveFindLernaJson(process.cwd());
                    if (!lernaFilePath) return [3 /*break*/, 7];
                    packages = recursiveFindPackageJsonName(lernaFilePath);
                    return [4 /*yield*/, inquirer_1.default.prompt({
                            type: 'list',
                            name: '1. 请选择你要进入的项目',
                            choices: packages.map(function (el, i) { return ({ name: el.name, value: i }); }),
                        })];
                case 1:
                    anwser = _a.sent();
                    index = getValue(anwser);
                    el = packages[index];
                    scripts = getNpmScripts(path_1.default.resolve(el.path, 'package.json'));
                    return [4 /*yield*/, inquirer_1.default.prompt({
                            type: 'list',
                            name: '2. 请选择要执行的 script',
                            choices: [{ name: 'RUN_CUSTOM_SCRIPT', value: 'custom' }].concat(scripts.map(function (el, i) { return ({ name: el.name, value: String(i) }); })),
                        })];
                case 2:
                    anwser2 = _a.sent();
                    index2 = getValue(anwser2);
                    if (!!/\d/.test(String(index2))) return [3 /*break*/, 5];
                    if (!(index2 === 'custom')) return [3 /*break*/, 4];
                    return [4 /*yield*/, inquirer_1.default.prompt({
                            type: 'input',
                            name: '请输入自定义命令',
                        })];
                case 3:
                    customScript = _a.sent();
                    commArr = getValue(customScript).split(/\s+/);
                    runCommand(commArr[0], commArr.slice(1), el.path);
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    scriptName = scripts[index2].name;
                    runCommand('npm', ['run', scriptName], el.path);
                    _a.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    console.log('未找到 lerna 项目');
                    _a.label = 8;
                case 8: return [2 /*return*/];
            }
        });
    });
}
function runCommand(comm, args, cwd) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNEQUFnQztBQUNoQywwQ0FBb0I7QUFDcEIsOENBQXdCO0FBQ3hCLCtDQUFzQztBQUV0QyxHQUFHLEVBQUUsQ0FBQztBQUVOLFNBQWUsR0FBRzs7Ozs7O29CQUNSLGFBQWEsR0FBRyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQzt5QkFDeEQsYUFBYSxFQUFiLHdCQUFhO29CQUNQLFFBQVEsR0FBRyw0QkFBNEIsQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFDekMscUJBQU0sa0JBQVEsQ0FBQyxNQUFNLENBQUM7NEJBQ3RDLElBQUksRUFBRSxNQUFNOzRCQUNaLElBQUksRUFBRSxlQUFlOzRCQUNyQixPQUFPLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFDLEVBQUUsRUFBRSxDQUFDLElBQUssT0FBQSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQTdCLENBQTZCLENBQUM7eUJBQ2xFLENBQUMsRUFBQTs7b0JBSkksTUFBTSxHQUFRLFNBSWxCO29CQUNJLEtBQUssR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ3pCLEVBQUUsR0FBRyxRQUFRLENBQUMsS0FBZSxDQUFDLENBQUM7b0JBQy9CLE9BQU8sR0FBRyxhQUFhLENBQUMsY0FBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUM7b0JBQ3JELHFCQUFNLGtCQUFRLENBQUMsTUFBTSxDQUFDOzRCQUNsQyxJQUFJLEVBQUUsTUFBTTs0QkFDWixJQUFJLEVBQUUsbUJBQW1COzRCQUN6QixPQUFPLEVBQUUsQ0FBQyxFQUFFLElB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