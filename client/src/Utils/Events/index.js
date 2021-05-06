const Events = {
  subscribers: new Map(),
  subscribe(name, fn) {
    if(typeof fn !== "function")
      throw new Error("Second parameter must be a function");
    if(typeof name !== "string")
      throw new Error("First parameter must be a string");

    if (!this.subscribers.has(name)) {
      this.subscribers.set(name, new Map());
    }
    this.subscribers.get(name).set(fn.name, fn)
  },
  unsubscribe(name, fnName) {
    if (this.subscribers.has(name)) {
      if (this.subscribers.get(name).get(fnName)) {
        this.subscribers.get(name).delete(fnName);
        // eslint-disable-next-line no-unused-expressions
        this.subscribers.get(name).size === 0 ? this.subscribers.delete(name) : null;
      } else {
        throw new Error(`Subscriber "${fnName}" not found`);
      }
    } else {
      throw new Error(`Publisher "${name}" not found`);
    }
  },
  publish(name) {
    if (this.subscribers.has(name)) {
      this.subscribers.get(name).forEach(fn => fn());
    } else {
      throw new Error(`Publisher "${name}" not found`)
    }
  }
};

export default Events;
