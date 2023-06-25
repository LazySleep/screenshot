export declare class Event {
    listeners: {
        [key: string]: Array<(...args: any) => void>;
    };
    addListener(name: string, fn: (...args: any) => void): void;
    removeListener(name: string, fn: (...args: any) => void): void;
    emit(name: string, ...args: any): void;
}
