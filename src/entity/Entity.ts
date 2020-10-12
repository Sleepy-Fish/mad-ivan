import * as PIXI from 'pixi.js';
import { EntityOptions } from './types';

export default class Entity {
  readonly app: PIXI.Application;
  readonly container: PIXI.Container;
  active: boolean;
  protected coordinates: PIXI.Point;

  constructor (app: PIXI.Application, options?: EntityOptions) {
    this.app = app;
    this.active = false;
    this.container = new PIXI.Container();
    this.container.visible = false;
    this.coordinates = new PIXI.Point(options?.x ?? 0, options?.y ?? 0);
    this.container.position = this.coordinates;
    app.stage.addChild(this.container);
  }

  run (delta: number): void {

  }

  position (val?: PIXI.Point): PIXI.Point | Entity {
    if (val === undefined) return this.coordinates;
    this.coordinates = val;
    this.container.position = this.coordinates;
    return this;
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
