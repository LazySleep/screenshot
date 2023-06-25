export class Event {
  public listeners: { [key: string]: Array<(...args: any) => void> } = {};

  addListener(name: string, fn: (...args: any) => void) {
    if (!this.listeners[name]) {
      this.listeners[name] = [];
    }
    this.listeners[name].push(fn);
  }

  removeListener(name: string, fn: (...args: any) => void) {
    const index = this.listeners[name].findIndex(fn);
    if (index >= 0) {
      this.listeners[name].splice(index, 1);
    }
  }

  emit(name: string, ...args: any) {
    if (this.listeners[name]) {
      this.listeners[name].forEach((fn: (...args: any) => void) => fn(...args));
    }
  }
}
