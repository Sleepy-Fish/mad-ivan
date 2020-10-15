import * as PIXI from 'pixi.js';
import loader from './loader';
import { Game } from './types';
import { Ship } from './entity';

/* ==== Setup PIXI ==== */
let type = 'WebGL';
if (!PIXI.utils.isWebGLSupported()) {
  type = 'canvas';
}
PIXI.utils.sayHello(type);

/* ==== Setup App  ==== */
const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x1b112e,
});
export const GAME: Game = {
  APP: app,
  LOADER: app.loader,
};
document.body.appendChild(app.view);

/* ==== Setup Game ==== */
const helpText = new PIXI.Text('Press and hold W/S and I/K to control thrusters.');
helpText.position.x = 10;
helpText.position.y = 10;
helpText.style.fill = 0xffffff;
app.stage.addChild(helpText);

/* ==== Run Loader ==== */
loader(
  () => {
    const ship = new Ship(app.stage, {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      scale: 0.2,
    });
    window.addEventListener('resize', () => {
      app.renderer.resize(window.innerWidth, window.innerHeight);
      ship.position(new PIXI.Point(window.innerWidth / 2, window.innerHeight / 2));
    });
    ship.activate();
    app.ticker.add(delta => ship.run(delta));
  },
  (loader: any) => {
    console.info(`${Math.round(loader.progress)}% Loaded`);
  },
);
