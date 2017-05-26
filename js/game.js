const PIXI = require( 'pixi.js');
const StageDirector = require( './objects/StageDirector.js');
const gamecss = require( '../sass/screen.scss');
const DEFAULT_WIDTH = 1024;
const DEFAULT_HEIGHT = 576;

module.exports = class Game {

  constructor( element ) {


    this.app = new PIXI.Application(DEFAULT_WIDTH, DEFAULT_HEIGHT, {backgroundColor: 0x1099bb});
    this._element = element;
    this._element.appendChild(this.app.view);
    this.app.stage.displayList = new PIXI.DisplayList();

    //this.renderer = PIXI.autoDetectRenderer(1024, 576,
      //    {antialias: false, transparent: false, resolution: 1});
    //this.renderer.backgroundColor = 0xffffff;
    this.app.view.id = 'game-canvas';

    //adjust hud size
    this.overlay = document.getElementById("game-overlay");

    this._element.addEventListener('click', this.onMouseDown.bind(this));

    this._lastFrameTime = 0;
    this.renderMe = false;

    this.config = {};
    this.assetloader = null;
    let configloader = new PIXI.loaders.Loader();
    configloader.add('config.json')
      .load(this._loadFromConfig.bind(this));
  }

  _loadFromConfig(loader, resources) {
    this.config = resources['config.json'].data;

    //change game size based off of config
    this.app.width = this.config.width || DEFAULT_WIDTH;
    this.app.height = this.config.height || DEFAULT_HEIGHT;
    this._element.style.width = this.app.width + "px";
    this._element.style.height = this.app.height + "px";

    this.assetloader = new PIXI.loaders.Loader();
    //load character sprites
    for (let character of this.config.characters) {
      for (let image of character.images) {
        this.assetloader.add(character.imagedir + image + '.png');
      }
    }

    //load views
    for (let view of this.config.views) {
      this.assetloader.add(view.url);
    }

    //load scripts
    for (let script of this.config.scripts) {
      this.assetloader.add({
        url: script.url,
        loadType: PIXI.loaders.Resource.LOAD_TYPE.XHR,
        xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.TEXT,
        isDataUrl: true});
    }

    this.assetloader.load(this._loadComplete.bind(this))
      .on("progress", function() {
        console.log(`load progress: ${loader.progress}`);
      });

  }

  _loadComplete () {
    this.stageDirector = new StageDirector(this);
    this.stageDirector.play();

    this.app.ticker.start();
  }

  onMouseDown(mouseData){
    this.stageDirector.advanceStory();
  }
/*
  _tick() {

    // render the next frame
    if (this.renderMe)
    {
      this.renderer.render( this.stage );
      console.log("rendered");
      this.renderMe = false;
    }

    // schedule the next tick
    requestAnimationFrame(this._tick.bind( this ));

  }
*/
  //keeping this around but I might not do it this way.
  _keyboard(keyCode) {
    var key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = function(event) {
      if (event.keyCode === key.code) {
        if (key.isUp && key.press) key.press();
        key.isDown = true;
        key.isUp = false;
      }
      event.preventDefault();
    };

    //The `upHandler`
    key.upHandler = function(event) {
      if (event.keyCode === key.code) {
        if (key.isDown && key.release) key.release();
        key.isDown = false;
        key.isUp = true;
      }
      event.preventDefault();
    };

    //Attach event listeners
    window.addEventListener(
      "keydown", key.downHandler.bind(key), false
    );
    window.addEventListener(
      "keyup", key.upHandler.bind(key), false
    );
    return key;
  }
}
