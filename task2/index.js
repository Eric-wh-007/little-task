class Page {
  constructor(init, page) {
    /* 建议多用ES6的解构赋值 很好用  const { defaultCurrent, pageSize, total } = init */
    this.current = init.defaultCurrent || 1; // 当前页数
    this.pageSize = init.pageSize || 5; // 每页条数
    this.total = init.total; // 总数
    this.pageNum = Math.ceil(this.total / this.pageSize);
    /* 没必要new Function  onChange已经是一个function了 你写的那个‘console.log()’实在是不能看。。。
       你可以看一下我的 我觉得还算实现的比较优雅
    
    */
    this.onChange = new Function(init.onChange);
    this.page = page;

    this.prev = this.createItem('<', 'z__page-prev', 'button');
    this.next = this.createItem('>', 'z__page-next', 'button');
  }
  /*  像这种需要传多个参数的建议直接传一个option 
      类似下面这样, 
    creatItem({
      text:'<',
      className:'z__page-prev',
      type:'button',
    })

    createItem(option) {
      const { text, className, type } = option;
    }
    这样的话在写参数的时候无需关心每个参数的前后顺序，代码更健壮。
  */
  createItem(text, className, type) {
    let tmp = document.createElement(type);
    tmp.appendChild(document.createTextNode(text));
    tmp.classList.add(className);
    return tmp;
  }
  init() {
    this.page.appendChild(this.prev);
    for (let i = 0; i < this.pageNum; i++) {
      let num = i + 1;
      let tmp = this.createItem(num, 'z__page-item', 'div');
      this.page.appendChild(tmp);
    }
    this.page.appendChild(this.next);
  }
  currentChange() {
    this.next.removeAttribute("disabled");
    this.prev.removeAttribute("disabled");
    if (this.current === 1) {
      this.prev.setAttribute("disabled", true);
    } else if (this.current === this.pageNum) {
      this.next.setAttribute("disabled", true);
    }
    let tmp = this.page.querySelectorAll('.z__page-item');
    tmp.forEach(item => {
      item.classList.remove('active');
    });
    tmp[this.current - 1].classList.add('active');
    this.onChange(this.current);
  }
  /*  总感觉main这个方法名很别扭 这是一个名词 方法名一般为动词 属性一般为名词 */
  main() {
    this.init();
    this.currentChange();
    this.page.addEventListener('click', (evt) => {
      let target = evt.target || evt.srcElement;
      /*  用class作为标识判断点击的是哪个元素 效果虽然达到了但是不规范 不够优雅，建议用data-*   */
      if (target.attributes.class.value === 'z__page-item') {
        this.current = parseInt(target.textContent);
        this.currentChange();
      } else if (target.attributes.class.value === 'z__page-prev') {
        if (this.current > 1) this.current--;
        this.currentChange();
      } else if (target.attributes.class.value === 'z__page-next') {
        if (this.current < this.pageNum) this.current++;
        this.currentChange();
      }
    })
  }
}

let pages = document.querySelectorAll('z-page');
pages.forEach(item => {
  item.classList.add("z__page");
  /* init 我认为不够语义化，init是一个动词 你这里传的应该是一个名词 */
  let init = {
    pageSize: parseInt(item.attributes.pageSize.value),
    total: parseInt(item.attributes.total.value),
    onChange: item.attributes.onChange.value
  }
  const demo = new Page(init, item);
  demo.main();
})