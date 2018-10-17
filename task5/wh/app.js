const eventBus = require('./eventBus');


 /**  
  * Test Case 1
  * 注册 fuck事件 
  * 监听 fuck事件
 */
function testCase_1() {
  eventBus.on('fuck', () => {
    console.log(' 监听到了 fuck事件');
  });

  eventBus.fire('fuck'); // 触发事件
}

/**    
 * Test Case 2
 * 注册 fuck事件 
 * 触发fuck事件
 * 取消注册fuck事件
 * 测试是否取消成功
 */

 function testCase_2() {
   const fn = () => {
    console.log(' 监听到了 fuck事件');
   }
   eventBus.on('fuck', fn); // 注册

   eventBus.fire('fuck'); // 触发

   eventBus.off('fuck', 'fn'); // 取消
  
   eventBus.fire('fuck'); // 测试是否取消成功
 }

 /**    
 * Test Case 3 同一事件注册多个监听程序 然后取消指定监听程序
 * 注册 fuck事件 多个监听程序
 * 触发fuck事件
 * 取消注册fuck事件
 * 测试是否取消成功
 */

 function testCase_3() {
   const fuck1 = () => {
    console.log('监听到了 fuck1')
   }
   const fuck2 = () => {
    console.log('监听到了 fuck2')
   }
   eventBus.on('fuck',fuck1);
   eventBus.on('fuck',fuck2);
   eventBus.fire('fuck');


   eventBus.off('fuck', 'fuck1'); // 取消指定监听程序的监听
   eventBus.fire('fuck'); // 测试
 }

  /**    
 * Test Case 4 同一事件注册多个监听程序 然后取消所有监听程序
 * 注册 fuck事件 多个监听程序
 * 触发fuck事件
 * 取消注册fuck事件
 * 测试是否取消成功
 */

function testCase_4() {
  const fuck1 = () => {
   console.log('监听到了 fuck1')
  }
  const fuck2 = () => {
   console.log('监听到了 fuck2')
  }
  eventBus.on('fuck',fuck1);
  eventBus.on('fuck',fuck2);
  eventBus.fire('fuck');


  eventBus.offAll('fuck'); // 取消指定监听程序的监听
  eventBus.fire('fuck'); // 测试
}

 /**    
 * Test Case 5 在触发事件时 给监听程序传任意个数的参
 * 注册 fuck事件 
 * 触发fuck事件 并传参
 */

 function testCase_5() {
   const fuck = (name1, name2) => {
    console.log(`fuck${name1} and ${name2}`);
   }

   eventBus.on('fuck', fuck);
   eventBus.fire('fuck', 'zlh_1', 'zlh_2'); // 传多个参数
 }

