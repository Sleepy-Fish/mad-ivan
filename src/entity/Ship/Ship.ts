import * as PIXI from 'pixi.js';
import Entity from '@/entity/Entity';
import Thruster from './Thruster';
import { ShipOptions } from './types';

export default class Ship extends Entity {
  readonly parent: PIXI.Container;
  readonly container: PIXI.Container;
  private readonly leftForeThruster: Thruster;
  private readonly leftAftThruster: Thruster;
  private readonly rightForeThruster: Thruster;
  private readonly rightAftThruster: Thruster;
  private readonly thrusters: Thruster[];

  constructor (parent: PIXI.Container, options?: ShipOptions) {
    super(parent, options);
    this.leftForeThruster = new Thruster(this, 'KeyW', {
      x: -150,
      y: -10,
      direction: 270,
      scale: options?.scale,
    });
    this.leftAftThruster = new Thruster(this, 'KeyS', {
      x: -150,
      y: 10,
      direction: 90,
      scale: options?.scale,
    });
    this.rightForeThruster = new Thruster(this, 'KeyI', {
      x: 150,
      y: -10,
      direction: 270,
      scale: options?.scale,
    });
    this.rightAftThruster = new Thruster(this, 'KeyK', {
      x: 150,
      y: 10,
      direction: 90,
      scale: options?.scale,
    });
    this.thrusters = [
      this.leftForeThruster,
      this.leftAftThruster,
      this.rightForeThruster,
      this.rightAftThruster,
    ];
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0x3498db);
    graphics.drawEllipse(0, -100, 100, 300);
    graphics.endFill();
    graphics.beginFill(0x3498db);
    graphics.drawRect(-200, -50, 120, 100);
    graphics.endFill();
    graphics.beginFill(0x3498db);
    graphics.drawRect(80, -50, 120, 100);
    graphics.endFill();
    this.container.addChild(graphics);
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
