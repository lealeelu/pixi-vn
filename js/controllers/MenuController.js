import { TweenLite, Power4 } from 'gsap';

let instance = null;

export default class MenuController {
  constructor(game) {
    if (!instance) {
      this.menuElement = game.element.getElementsByClassName('menu')[0];
      this.question = game.element.getElementsByClassName('menu-question-text')[0];
      const originalMenuOptionElement = game.element.getElementsByClassName('menu-option')[0];
      this.menuOptionElement = originalMenuOptionElement.cloneNode();
      this.menuElement.removeChild(originalMenuOptionElement);
      instance = this;
    }

    return instance;
  }

  execute(menuData) {
    this.question.innerHTML = menuData.question;
    menuData.options.forEach((option) => {
      const opel = this.menuOptionElement.cloneNode();
      opel.innerHTML = `<h5>${option.text}</h5>`;
      this.menuElement.appendChild(opel);
    });
    this.show();
  }

  show() {
    TweenLite.from(this.menuElement, 0.15, { y: '+=50', autoAlpha: 0, ease: Power4.easeOut });
    if (this.menuElement.classList.contains('hidden')) {
      this.menuElement.classList.remove('hidden');
    }
  }

  hide() {
    TweenLite.from(this.menuElement, 0.15, { y: '+=50', autoAlpha: 1, ease: Power4.easeOut });
    if (!this.menuElement.classList.contains('hidden')) {
      this.menuElement.classList.add('hidden');
    }
  }
}
