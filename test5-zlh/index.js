// eventBus
class EventBus {
  constructor() {
    this.events = {}
  }
  emit(name, data) {
    if (!name) return;
    let result;
    data ? result = { name, data } : result = true;
    this.events[name] = result;
  }
  on(name, fn) {
    if (!this.events[name]) throw `${name}不存在`;
    let data = this.events[name].data;
    data ? fn(data) : fn();
  }
}
const eventBus = new EventBus;

eventBus.emit('doSomeThing', 123);

eventBus.on('doSomeThing', (data) => {
  console.log('2333', data)
})