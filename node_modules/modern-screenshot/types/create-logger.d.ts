export declare function createLogger(debug: boolean): {
    time: (label: string) => false | void;
    timeEnd: (label: string) => false | void;
    warn: (...args: any[]) => false | void;
};
