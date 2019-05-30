import { writeFileSync } from 'fs';
import path from 'path';
import { uniq } from './util';

const FILE_NAME = 'run.json';
const MAX_HISTORY = 30;

interface IHistory {
    history: {
        path: string;
        command: string;
    }[];
}

const getHistoryJson = (dir: string): IHistory => {
    try {
        return require(path.resolve(dir, FILE_NAME));
    } catch (e) {
        return { history: [] };
    }
};

export const saveHistory = (script: string, rootPath: string, dir: string) => {
    const historyJson = getHistoryJson(rootPath);
    historyJson.history.unshift({ path: dir, command: script });
    historyJson.history = uniq(historyJson.history);
    if (historyJson.history.length > MAX_HISTORY) {
        historyJson.history.pop();
    }
    writeFileSync(
        `${rootPath}/${FILE_NAME}`,
        JSON.stringify(historyJson),
        'utf8',
    );
};

export const getHistory = (rootPath: string) => {
    const historyJson = getHistoryJson(rootPath);
    return historyJson.history;
};
