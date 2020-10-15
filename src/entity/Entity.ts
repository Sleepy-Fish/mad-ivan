import * as PIXI from 'pixi.js';
import { EntityOptions } from './types';

export default class Entity {
  readonly parent: PIXI.Container;
  readonly container: PIXI.Container;
  protected _position: PIXI.Point;
  protected _scale: number;
  active: boolean;

  constructor (parent: PIXI.Container, options?: EntityOptions) {
    this.active = false;
    this.container = new PIXI.Container();
    this.container.visible = false;
    this._position = new PIXI.Point(options?.x ?? 0, options?.y ?? 0);
    this._scale = options?.scale ?? 1;
    this.container.position = this._position;
    this.container.scale = new PIXI.Point(this._scale, this._scale);
    parent.addChild(this.container);
  }

  run (delta: number): void {

  }

  position (val?: PIXI.Point): PIXI.Point | Entity {
    if (val === undefined) return this._position;
    this._position = val;
    this.container.position = this._position;
    return this;
  }

  scale (val?: number): number {
    if (val !== undefined) {
      this._scale = val;
      this.container.scale = new PIXI.Point(val, val);
    }
    return this._scale;
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
