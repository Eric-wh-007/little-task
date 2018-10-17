/**
 * events: {}
 * events.key @type string   事件名称
 * events.value @type array  事件注册时的回调函数组成的数组
 */

class EventBus {
  constructor() {
    this.events = {}
  }

  /**
   * 注册对事件的监听
   * @param {*} eventName 事件名称
   * @param {*} callback 监听程序
   * @memberof EventBus
   */
  on(eventName, callback) {
    if(typeof eventName !== 'string') {  
      throw new Error('eventName expected string');
    }
    if(typeof callback !=='function') {
      throw new Error('callback expected function');
    }
    // 可能同一个事件注册了不同的回调函数
    if(this.events[eventName]) { // 事件已经注册了一个回调
      this.events[eventName].push(callback);
    }else {
      this.events[eventName] = [callback]; //  此事件还未注册回调
    }
  }

  /**
   *触发事件
   *
   * @param {*} eventName 事件名称
   * @param {*} arg 传给监听程序的参数
   * @memberof EventBus
   */
  fire(eventName, ...arg) {
    if(typeof eventName !== 'string') {  
      throw new Error('eventName expected string');
    }
    const fns = this.events[eventName];
    if(fns) {
      fns.forEach(fn => {
        fn.call(this, ...arg);
        console.log(...arg);
      });
    }
  }

  /**
   * 取消监听指定函数的事件
   *
   * @param {*} eventName 事件名称
   * @param {*} fnName 监听程序的名称
   * @memberof EventBus
   */
  off(eventName, fnName) {
    const fns = this.events[eventName];
    const targetIndex = fns.findIndex(fn => (fn.name === fnName));
    fns.splice(targetIndex, 1); // 删除指定回调
  }

  /**
   *取消所有指定事件的监听
   *
   * @param {*} eventName 事件名称
   * @memberof EventBus
   */
  offAll(eventName) {
    delete this.events[eventName];
  }
}

module.exports = new EventBus();