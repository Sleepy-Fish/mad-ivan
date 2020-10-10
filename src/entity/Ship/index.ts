import * as PIXI from 'pixi.js';
import * as PIXI_PARTICLES from 'pixi-particles';
import Entity from '../Entity.ts';
import { flameSettings, sparkSettings } from './emitter-settings.ts';

export default class Ship extends Entity {
  app: PIXI.Application;
  container: PIXI.Container;
  elapsed: number;
  flameContainer: PIXI_PARTICLES.LinkedListContainer;
  flameEmitter: PIXI_PARTICLES.Emitter;
  sparkContainer: PIXI_PARTICLES.LinkedListContainer;
  sparkEmitter: PIXI_PARTICLES.Emitter;

  constructor (app: PIXI.Application, resources: Object) {
    super(app);
    this.elapsed = Date.now();
    this.flameContainer = new PIXI_PARTICLES.LinkedListContainer();
    this.sparkContainer = new PIXI_PARTICLES.LinkedListContainer();

    const fireTextures = Object
      .entries(resources)
      .filter(entry => entry[0].startsWith('fire'))
      .map(entry => entry[1].texture);

    this.flameEmitter = new PIXI_PARTICLES.Emitter(
      this.flameContainer,
      fireTextures,
      flameSettings,
    );
    this.sparkEmitter = new PIXI_PARTICLES.Emitter(
      this.sparkContainer,
      [PIXI.Texture.WHITE],
      sparkSettings,
    );
    this.container.addChild(this.flameContainer, this.sparkContainer);
    window.addEventListener('resize', () => {
      this.flameEmitter.spawnPos.x = window.innerWidth / 2;
      this.flameEmitter.spawnPos.y = window.innerHeight / 2;
      this.sparkEmitter.spawnPos.x = window.innerWidth / 2;
      this.sparkEmitter.spawnPos.y = window.innerHeight / 2;
    });
  }

  run (delta: number): void {
    super.run(delta);
    const now = Date.now();
    this.flameEmitter.update((now - this.elapsed) * 0.001);
    this.sparkEmitter.update((now - this.elapsed) * 0.001);
    this.elapsed = now;
  }

  activate (): Ship {
    super.activate();
    this.flameEmitter.emit = true;
    this.sparkEmitter.emit = true;
    return this;
  }

  deactivate (): Ship {
    super.deactivate();
    this.flameEmitter.emit = false;
    this.sparkEmitter.emit = false;
    this.flameEmitter.cleanup();
    this.sparkEmitter.cleanup();
    return this;
  }
}
