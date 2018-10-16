class HelloWorld extends HTMLElement {

  constructor() {
    super();
    this.isActive = false; // 初始化组件自己的状态
    this.defaultColor = '#000'
    this.activeColor = this.getAttribute('activeColor');

    const shdowRoot = this.attachShadow({mode:'open'});
    const pElement = document.createElement('p');
    const propsText = this.getAttribute('text')
    
    
    pElement.style.color = this.defaultColor;
    pElement.textContent = `${propsText}'s ass hole`;
    // pElement.addEventListener('click',this.toggleColor(pElement))
    pElement.addEventListener('click', this.toggleColor.bind(this,pElement))

    shdowRoot.appendChild(pElement);
  }

  toggleColor(pElement) {
    
    this.isActive = !this.isActive;
      if(this.isActive) {
        pElement.style.color = this.activeColor;
      }else {
        pElement.style.color = this.defaultColor;
      }
      console.log(this.isActive)
  }
}

customElements.define('hello-world',HelloWorld);