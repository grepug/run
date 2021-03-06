import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { saveHistory, getHistory } from './history';

run();

async function run() {
    const lernaFilePath = recursiveFindLernaJson(process.cwd());
    if (lernaFilePath) {
        const packages = recursiveFindPackageJsonName(lernaFilePath);
        const history = getHistory(lernaFilePath);
        const choices = packages.map((el, i) => ({
            name: el.name,
            value: String(i),
        }));
        if (history.length) {
            choices.unshift({
                name: 'HISTORY',
                value: 'history',
            });
        }
        const anwser: any = await inquirer.prompt({
            type: 'list',
            name: '1. 请选择你要进入的项目',
            choices,
        });
        const index = getValue(anwser);

        // 历史
        if (index === 'history') {
            const anwser3 = await inquirer.prompt({
                type: 'list',
                name: '2. 请选择历史命令',
                choices: history.map((el, i) => ({
                    name: path.basename(el.path) + ' | ' + el.command,
                    value: String(i),
                })),
            });
            const index3 = getValue(anwser3);
            const el = history[index3 as number];
            const [comm, ...args] = el.command.split(/\s+/);
            runCommand(comm, args, el.path, lernaFilePath);
            return;
        }
        const el = packages[index as number];
        const scripts = getNpmScripts(path.resolve(el.path, 'package.json'));
        const anwser2 = await inquirer.prompt({
            type: 'list',
            name: '2. 请选择要执行的 script',
            choices: [{ name: 'RUN_CUSTOM_SCRIPT', value: 'custom' }].concat(
                scripts.map((el, i) => ({ name: el.name, value: String(i) })),
            ),
        });
        const index2 = getValue(anwser2);

        // custom script
        if (!/\d/.test(String(index2))) {
            if (index2 === 'custom') {
                const customScript = await inquirer.prompt({
                    type: 'input',
                    name: '请输入自定义命令',
                });
                const commArr = (getValue(customScript) as string).split(/\s+/);
                runCommand(
                    commArr[0],
                    commArr.slice(1),
                    el.path,
                    lernaFilePath,
                );
            }
        } else {
            const scriptName = scripts[index2 as number].name;
            runCommand('npm', ['run', scriptName], el.path, lernaFilePath);
        }
    } else {
        console.log('未找到 lerna 项目');
    }
}

function runCommand(
    comm: string,
    args: string[],
    cwd: string,
    rootPath: string,
) {
    saveHistory(`${comm} ${args.join(' ')}`, rootPath, cwd);
    const stdout = spawn(comm, args, { cwd, stdio: 'inherit' });
    stdout &&
        stdout
            .on('data', data => console.log(data.toString()))
            .on('error', err => console.error(err.toString()));
}

function recursiveFindLernaJson(curPath: string): string | null {
    const lernaJsonPath = path.resolve(curPath, 'lerna.json');
    const isExisted = fs.existsSync(lernaJsonPath);

    if (curPath === '/') return null;

    return isExisted
        ? path.dirname(lernaJsonPath)
        : recursiveFindLernaJson(path.resolve(curPath, '..'));
}

interface Res {
    name: string;
    path: string;
}
function recursiveFindPackageJsonName(
    findPath: string,
    res: Res[] = [],
): Res[] {
    const packageJsonPath = path.resolve(findPath, 'package.json');
    const isPackageJsonPath = fs.existsSync(packageJsonPath);
    const isNotLernaRoot = !fs.existsSync(path.resolve(findPath, 'lerna.json'));
    if (isPackageJsonPath) {
        res.push({
            name: isNotLernaRoot
                ? require(packageJsonPath).name
                : 'PROJECT ROOT',
            path: findPath,
        });
    }
    const dir = fs.readdirSync(findPath);
    for (let d of dir) {
        d = path.resolve(findPath, d);
        const isDir = fs.lstatSync(d).isDirectory();
        const isNotNodeModules = !/node_modules/.test(d);
        if (isDir && isNotNodeModules) {
            recursiveFindPackageJsonName(d, res);
        }
    }
    return res;
}

function getNpmScripts(
    packageJsonPath: string,
): {
    name: string;
    value: string;
}[] {
    const { scripts } = require(packageJsonPath);

    const scriptNames = Object.keys(scripts);

    return scriptNames.map(el => ({
        name: el,
        value: scripts[el],
    }));
}

function getValue(anwser: any): number | string {
    const obj = anwser[Object.keys(anwser)[0]];
    if (typeof obj === 'object') return getValue(obj);
    return obj;
}
