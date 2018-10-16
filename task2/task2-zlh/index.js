class Page {
  constructor(options, page) {
    /* 建议多用ES6的解构赋值 很好用  const { defaultCurrent, pageSize, total } = init */
    const { defaultCurrent, pageSize, total, onChange } = options;
    this.current = defaultCurrent || 1; // 当前页数
    this.pageSize = pageSize || 5; // 每页条数
    this.total = total; // 总数
    this.pageNum = Math.ceil(this.total / this.pageSize);
    this.onChange = onChange;
    /* 没必要new Function  onChange已经是一个function了 你写的那个‘console.log()’实在是不能看。。。
       你可以看一下我的 我觉得还算实现的比较优雅
    
    */
    this.page = page;
    this.prev = this.createItem({ text: '<', className: 'z__page-prev', type: 'button' });
    this.next = this.createItem({ text: '>', className: 'z__page-next', type: 'button' });
    this.init();
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
  createItem(options) {
    const { text, className, type } = options;
    let tmp = document.createElement(type);
    tmp.appendChild(document.createTextNode(text));
    if (type === 'div') {
      tmp.setAttribute('data-index', text);
    } else {
      text === '<' ? tmp.setAttribute('data-index', 'prev') : tmp.setAttribute('data-index', 'next');
    }
    tmp.classList.add(className);
    return tmp;
  }
  init() {
    this.page.appendChild(this.prev);
    for (let i = 0; i < this.pageNum; i++) {
      let num = i + 1;
      let tmp = this.createItem({ text: num, className: 'z__page-item', type: 'div' });
      if (num === this.current) {
        tmp.classList.add('active');
      }
      this.page.appendChild(tmp);
    }
    this.page.appendChild(this.next);

    if(this.current === 1) {
      this.prev.setAttribute("disabled", true);
    }
    if (this.current === this.pageNum) {
      this.next.setAttribute("disabled", true);
    }
    // this.currentChange();
    this.page.addEventListener('click', (evt) => {
      let target = evt.target || evt.srcElement;
      let cur = target.getAttribute('data-index');
      if(!cur) return; // 没有点击到按钮
      let btnList = this.page.querySelectorAll('.z__page-item');
      const prev = this.current;  // 保存当前页码 
      /*  用class作为标识判断点击的是哪个元素 效果虽然达到了但是不规范 不够优雅，建议用data-*   */
      if (cur === 'prev') {
        if (this.current > 1) this.current--;
      } else if (cur === 'next') {
        if (this.current < this.pageNum) this.current++;
      } else {
        this.current = parseInt(cur);
      }
      if(prev === this.current) return;
      this.next.removeAttribute("disabled");
      this.prev.removeAttribute("disabled");
      if (this.current === 1) {
        this.prev.setAttribute("disabled", true);
      } else if (this.current === this.pageNum) {
        this.next.setAttribute("disabled", true);
      }
      btnList.forEach(item => {
        item.classList.remove('active');
      });
      btnList[this.current - 1].classList.add('active');
      this.onChange(prev, this.current);
    })
  }
}

document.querySelectorAll('z-page').forEach(item => {
  item.classList.add("z__page");
  /* init 我认为不够语义化，init是一个动词 你这里传的应该是一个名词 */
  let options = {
    pageSize: parseInt(item.attributes.pageSize.value),
    total: parseInt(item.attributes.total.value),
    onChange: (prev, next) => {
      console.log(`from: ${prev}`);
      console.log(`to: ${next}`);
    }
  }
  new Page(options, item);
})