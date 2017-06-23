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
      this.game = game;
      instance = this;
    }

    return instance;
  }

  execute(menuData) {
    this.question.innerHTML = menuData.question;
    menuData.options.forEach((option) => {
      const opel = this.menuOptionElement.cloneNode();
      opel.setAttribute('data', option.index);
      opel.innerHTML = `<h5>${option.text}</h5>`;
      opel.addEventListener('click', this.optionSelect.bind(this));
      this.menuElement.appendChild(opel);
    });
    this.show();
  }

  optionSelect(event) {
    if (!this.stageDirector) {
      this.stageDirector = this.game.stageDirector;
    }
    this.hide();
    // delete all options
    const oldOptions = this.menuElement.getElementsByClassName('menu-option');
    for (let i = 0; i < oldOptions.length;) {
      this.menuElement.removeChild(oldOptions[i]);
    }
    const optionIndex = parseInt(event.currentTarget.getAttribute('data'), 10);
    this.stageDirector.runMenuOption(optionIndex);
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
