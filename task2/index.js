class Page {
  constructor(init, page) {
    this.current = init.defaultCurrent || 1; // 当前页数
    this.pageSize = init.pageSize || 5; // 每页条数
    this.total = init.total; // 总数
    this.pageNum = Math.ceil(this.total / this.pageSize);
    this.onChange = new Function(init.onChange);
    this.page = page;

    this.prev = this.createItem('<', 'z__page-prev', 'button');
    this.next = this.createItem('>', 'z__page-next', 'button');
  }
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
  main() {
    this.init();
    this.currentChange();
    this.page.addEventListener('click', (evt) => {
      let target = evt.target || evt.srcElement;
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
  let init = {
    pageSize: parseInt(item.attributes.pageSize.value),
    total: parseInt(item.attributes.total.value),
    onChange: item.attributes.onChange.value
  }
  const demo = new Page(init, item);
  demo.main();
})