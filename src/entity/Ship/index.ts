import * as PIXI from 'pixi.js';
import Entity from '../Entity';
import Thruster from './Thruster';
import { ShipOptions } from '../types';

export default class Ship extends Entity {
  readonly app: PIXI.Application;
  readonly container: PIXI.Container;
  private readonly leftForeThruster: Thruster;
  private readonly leftAftThruster: Thruster;
  private readonly rightForeThruster: Thruster;
  private readonly rightAftThruster: Thruster;
  private readonly thrusters: Thruster[];

  constructor (app: PIXI.Application, options?: ShipOptions) {
    super(app, options);
    this.leftForeThruster = new Thruster(this, 'KeyW', {
      x: -150,
      y: -10,
      direction: 270,
    });
    this.leftAftThruster = new Thruster(this, 'KeyS', {
      x: -150,
      y: 10,
      direction: 90,
    });
    this.rightForeThruster = new Thruster(this, 'KeyI', {
      x: 150,
      y: -10,
      direction: 270,
    });
    this.rightAftThruster = new Thruster(this, 'KeyK', {
      x: 150,
      y: 10,
      direction: 90,
    });
    this.thrusters = [
      this.leftForeThruster,
      this.leftAftThruster,
      this.rightForeThruster,
      this.rightAftThruster,
    ];
  }

  run (delta: number): void {
    super.run(delta);
    this.thrusters.forEach(t => t.run(delta));
  }

  position (val?: PIXI.Point): PIXI.Point | Entity {
    const output = super.position(val);
    return output;
  }

  activate (): Ship {
    super.activate();
    this.thrusters.forEach(t => t.activate());
    return this;
  }

  deactivate (): Ship {
    super.deactivate();
    this.thrusters.forEach(t => t.deactivate());
    return this;
  }
}
