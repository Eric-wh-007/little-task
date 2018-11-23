// eventBus
class EventBus {
  constructor() {
    this.events = {}
  }
  on(eventName, callback) {
    if(typeof eventName !== 'string') throw new Error('eventName expected string');
    if(typeof callback !=='function') throw new Error('callback expected function');
    if (this.events[eventName]) {
      this.events[eventName].push(callback)
    } else {
      this.events[eventName] = [callback]
    }
  }

  fire(eventName, ...args) {
    if(typeof eventName !== 'string') throw new Error('eventName expected string');
    if(Reflect.has(this.events, eventName)) {
      this.events[eventName].forEach(fn => {
        fn.call(this, ...args);
      });
    }
  }

  remove(eventName, fnName) {
    const fns = this.events[eventName];
    const targetIndex = fns.findIndex(fn => (fn.name === fnName));
    fns.splice(targetIndex, 1); // 删除指定回调
  }

  removeAll(eventName) {
    Reflect.deleteProperty(this.events, eventName)
  }
}

module.exports = new EventBus();


