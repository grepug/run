export const uniq = (arr: any[]) =>
    arr.filter(
        (el, i) =>
            i ===
            arr.findIndex(obj => JSON.stringify(obj) === JSON.stringify(el)),
    );
