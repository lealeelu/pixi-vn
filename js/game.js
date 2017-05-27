import * as PIXI from 'pixi.js';
import 'pixi-display';
import StageDirector from './objects/StageDirector';
import '../sass/screen.scss';
import config from '../config.json';

const DEFAULT_WIDTH = 1024;
const DEFAULT_HEIGHT = 576;

export default class Game {
  constructor(element) {
    this.app = new PIXI.Application(DEFAULT_WIDTH, DEFAULT_HEIGHT, { backgroundColor: 0x1099bb });
    this.element = element;
    this.element.appendChild(this.app.view);
    this.app.stage.displayList = new PIXI.DisplayList();

    this.app.view.id = 'game-canvas';

    this.overlay = document.getElementById('game-overlay');

    this.element.addEventListener('click', this.onMouseDown.bind(this));

    this.lastFrameTime = 0;
    this.renderMe = false;

    this.config = config;
    this.assetloader = null;

    this.loadFromConfig();
  }

  loadFromConfig() {
    // change game size based off of config
    this.app.width = this.config.width || DEFAULT_WIDTH;
    this.app.height = this.config.height || DEFAULT_HEIGHT;
    this.element.style.width = `${this.app.width}px`;
    this.element.style.height = `${this.app.height}px`;

    this.assetloader = new PIXI.loaders.Loader();
    // load character sprites
    for (const character of this.config.characters) {
      for (const image of character.images) {
        this.assetloader.add(`${character.imagedir}${image}.png`);
      }
    }

    // load views
    for (const view of this.config.views) {
      this.assetloader.add(view.url);
    }

    // load scripts
    for (const script of this.config.scripts) {
      this.assetloader.add({
        url: script.url,
        loadType: PIXI.loaders.Resource.LOAD_TYPE.XHR,
        xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.TEXT,
        isDataUrl: true });
    }

    this.assetloader.load(this.loadComplete.bind(this))
      .on('progress', function reportprogress() {
        console.log(`load progress: ${this.progress}%`);
      });
  }

  loadComplete() {
    this.stageDirector = new StageDirector(this);
    this.stageDirector.play();

    this.app.ticker.start();
  }

  onMouseDown() {
    this.stageDirector.advanceStory();
  }
}
