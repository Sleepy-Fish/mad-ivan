import * as PIXI from 'pixi.js';
import * as PIXI_PARTICLES from 'pixi-particles';
import Ship from '.';
import { ThrusterOptions } from '../types';
import { flameSettings, sparkSettings } from './emitter-settings';

export default class ShipFlame {
  readonly ship: Ship;
  readonly key: string;
  private readonly flameContainer: PIXI_PARTICLES.LinkedListContainer;
  private readonly sparkContainer: PIXI_PARTICLES.LinkedListContainer;
  private flameEmitter: PIXI_PARTICLES.Emitter;
  private sparkEmitter: PIXI_PARTICLES.Emitter;
  private _thrust: number;
  private _powered: boolean;
  acceleration: number;
  deceleration: number;

  constructor (ship: Ship, key: string, options?: ThrusterOptions) {
    this.ship = ship;
    this.key = key;
    this.acceleration = options?.acceleration ?? 0.01;
    this.deceleration = options?.deceleration ?? 0.05;
    this._powered = false;
    this._thrust = 0;
    this.flameContainer = new PIXI_PARTICLES.LinkedListContainer();
    this.sparkContainer = new PIXI_PARTICLES.LinkedListContainer();
    const fireTextures = Object
      .entries(ship.app.loader.resources)
      .filter(entry => entry[0].startsWith('fire'))
      .map(entry => entry[1].texture);
    this.flameEmitter = new PIXI_PARTICLES.Emitter(
      this.flameContainer,
      fireTextures,
      Object.assign(flameSettings, {
        pos: { x: options?.x ?? 0, y: options?.y ?? 0 },
        startRotation: { min: (options?.direction ?? 90) - 10, max: (options?.direction ?? 90) + 10 },
      }),
    );
    this.sparkEmitter = new PIXI_PARTICLES.Emitter(
      this.sparkContainer,
      [PIXI.Texture.WHITE],
      Object.assign(sparkSettings, {
        pos: { x: options?.x ?? 0, y: options?.y ?? 0 },
        startRotation: { min: (options?.direction ?? 90) - 20, max: (options?.direction ?? 90) + 20 },
      }),
    );
    ship.container.addChild(this.flameContainer, this.sparkContainer);
    window.addEventListener('keydown', (e) => {
      if (e.code === this.key) this._powered = true;
    });
    window.addEventListener('keyup', (e) => {
      if (e.code === this.key) this._powered = false;
    });
  }

  run (delta: number): void {
    this.flameEmitter.update(delta * 0.1);
    this.sparkEmitter.update(delta * 0.1);
    if (this._powered) {
      this.inc(this.acceleration);
    } else if (this._thrust !== 0) {
      this.dec(this.deceleration);
    }
  }

  thrust (val?: number): number {
    if (val !== undefined) this._thrust = Math.min(Math.max(val, 0), 1);
    this.flameEmitter.maxParticles = 100 * this._thrust;
    this.sparkEmitter.maxParticles = 200 * this._thrust;
    this.flameEmitter.minLifetime = 5 * this._thrust;
    this.sparkEmitter.minLifetime = 3 * this._thrust;
    this.flameEmitter.maxLifetime = this.flameEmitter.minLifetime + 0.1;
    this.sparkEmitter.maxLifetime = this.sparkEmitter.minLifetime + 0.5;
    return this._thrust;
  }

  inc (step: number = 0.01): number {
    if (this._thrust === 1) return 1;
    this.thrust(this._thrust + step);
    return this._thrust;
  }

  dec (step: number = 0.05): number {
    if (this._thrust === -1) return 0;
    this.thrust(this._thrust - step);
    return this._thrust;
  }

  activate (): void {
    this.flameEmitter.emit = true;
    this.sparkEmitter.emit = true;
  }

  deactivate (): void {
    this.thrust(0);
    this.flameEmitter.emit = false;
    this.sparkEmitter.emit = false;
    this.flameEmitter.cleanup();
    this.sparkEmitter.cleanup();
  }
};
