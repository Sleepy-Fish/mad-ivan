import * as PIXI from 'pixi.js';

export default class Entity {
  app: PIXI.Application;
  active: boolean;
  container: PIXI.Container;

  constructor (app: PIXI.Application) {
    this.app = app;
    this.active = false;
    this.container = new PIXI.Container();
    this.container.visible = false;
    app.stage.addChild(this.container);
  }

  run (delta: number): void {

  }

  activate (): Entity {
    this.active = true;
    this.container.visible = true;
    return this;
  }

  deactivate (): Entity {
    this.active = false;
    this.container.visible = false;
    return this;
  }
};
