export class Event {
    constructor() {
        this.listeners = {};
    }
    addListener(name, fn) {
        if (!this.listeners[name]) {
            this.listeners[name] = [];
        }
        this.listeners[name].push(fn);
    }
    removeListener(name, fn) {
        const index = this.listeners[name].findIndex(fn);
        if (index >= 0) {
            this.listeners[name].splice(index, 1);
        }
    }
    emit(name, ...args) {
        if (this.listeners[name]) {
            this.listeners[name].forEach((fn) => fn(...args));
        }
    }
}
//# sourceMappingURL=Event.js.map