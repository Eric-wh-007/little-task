class Pagination {
  // 默认button样式
  defaultStyles = {
    padding:'0 5px',
    margin:0,
    border:'1px solid #d9d9d9',
    color:'#000',
    borderRadius:'3px',
    minWidth:'30px',
    width:'auto',
    height:'30px',
    lineHeight:'30px',
    boxSizing:'border-box',
    outline:'none',
    cursor:'pointer',
  }
  // 激活button样式
  activeStyles = {
    color:'#1198ff',
    border:'1px solid #1198ff'
  }
  // 禁用button样式
  disableStyles = {
    color:'#d9d9d9',
    cursor:'not-allowed'
  }
  
  constructor(selector, options) {
    this.currPageIndex = 1; // 当前页码 默认为1
    this.btnList = []; // 保存页码元素的数组
    this.init(selector,options);
  }

  init = (selector, options) => {
    /* 
      1. 获取容器元素并插入根元素
      2. 创建分页所需button
      3. 设置button样式
      4. 绑定页面切换事件
    */
    const { defaultPageIndex, pageSize, total, onChange } = options;
    const container = document.querySelector(selector); // 获取分页容器
    const element = document.createElement('div'); // 创建分页根元素
    const btnCount = Math.ceil(total/pageSize); // 向上舍入 加上 '上一页' 与 '下一页' 按钮

    this.currPageIndex = defaultPageIndex?defaultPageIndex:this.currPageIndex; // 用户可能设置0为defaultPageindex 不合法
    
    this.setStyle(container,{display:'block'}); // 设置分页容器的display为block 避免用户设置内敛元素为分页容器
    this.setStyle(element, {display:'flex',justifyContent:'space-around'});

    // 设置上一页按钮
    const preBtn = document.createElement('button');
    preBtn.innerText = '上一页' // 设置上一页样式
    this.setStyle(preBtn, this.defaultStyles);
    preBtn.setAttribute('data-index', 'pre');
    element.appendChild(preBtn);

    // 生成 并保存 btnList
    this.btnList = this.createBtn(btnCount).map((btn,index) => {
      this.setStyle(btn,this.defaultStyles);
      btn.innerText = String(++index); // 设置页码
      btn.setAttribute('data-index',String(index))

      if(index === defaultPageIndex) { // 设置default默认页的样式
        this.setStyle(btn, this.activeStyles)
      }
      element.appendChild(btn); // 将每一个btn插入到根元素
      return btn;
    });
    // 设置下一页按钮
    const nextBtn = document.createElement('button');
    nextBtn.innerText = '下一页' // 设置下一页样式
    nextBtn.setAttribute('data-index', 'next');
    this.setStyle(nextBtn, this.defaultStyles)
    element.appendChild(nextBtn);


    element.addEventListener('click', (e) => {
      // 拿到前一页 将要转换的页
      let cur = e.target.getAttribute('data-index');

      if(!cur) return; // 没有点击到按钮
      const pre = this.currPageIndex; // 保存当前页面
      if(cur === 'pre') { // 点击了上一页
        this.currPageIndex === 1 ? this.currPageIndex = 1 : this.currPageIndex--; // this.cur最低只能为1
        if(preBtn.style.cursor === 'not-allowed') return;
      }else if(cur === 'next') { // 点击了下一页
        this.currPageIndex >= btnCount ? this.currPageIndex = btnCount : this.currPageIndex++; // 最高只能为最大页码
        if(nextBtn.style.cursor === 'not-allowed') return;
      }else { //点击了页码
        this.currPageIndex = Number(cur);
      }
      if(pre === this.currPageIndex)return; // 说明未发生换页 不触发onChange
      this.setStyle(preBtn, this.defaultStyles)
      this.setStyle(nextBtn, this.defaultStyles)

      
      if(this.currPageIndex === 1) { // 上一页禁用
        this.setStyle(preBtn,this.disableStyles)
      }
      if(this.currPageIndex === btnCount) { //下一页禁用
        this.setStyle(nextBtn,this.disableStyles)
      }
      this.setStyle(this.btnList[pre-1], this.defaultStyles);
      this.setStyle(this.btnList[this.currPageIndex-1], this.activeStyles);
      onChange(pre, this.currPageIndex) // 给用户设置的onChange回调传入pre 与 currPageIndex参数
    })
    container.appendChild(element); // 将根元素插入容器元素中
  }

  createBtn = (count) => {
    // 根据数量创建button
    const btnArr = []
    for(let i = 0; i < count; i++) {
      btnArr.push(document.createElement('button'));
    }
    return btnArr;
  }

  setStyle = (dom, styles) => {
    // TODO 设置dom样式
    for(const key in styles) {
      dom.style[key] = styles[key];
    }
  }
}

const pagination = new Pagination('#page', {
  defaultPageIndex:1,
  pageSize:5,
  total:11,
  onChange:(pre, next) => {
    console.log('pre: ', pre)
    console.log('next', next)
  }
})