import * as PIXI from 'pixi.js';
import loader from './loader/index.ts';
import { Ship } from './entity/index.ts';

let type = 'WebGL';
if (!PIXI.utils.isWebGLSupported()) {
  type = 'canvas';
}
PIXI.utils.sayHello(type);
const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x1b112e,
});
window.addEventListener('resize', () => {
  app.renderer.resize(window.innerWidth, window.innerHeight);
});
document.body.appendChild(app.view);

loader(
  (loader: PIXI.Loader, resources: Object) => {
    const ship = new Ship(app, resources);
    ship.activate();
    app.ticker.add(delta => ship.run(delta));
  },
  (loader: any) => {
    console.info(`${Math.round(loader.progress)}% Loaded`);
  },
);
