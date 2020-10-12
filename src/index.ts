import * as PIXI from 'pixi.js';
import loader from './loader';
import { Ship } from './entity';

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
const helpText = new PIXI.Text('Press and hold W/S and I/K to control thrusters.');
helpText.position.x = 10;
helpText.position.y = 10;
helpText.style.fill = 0xffffff;
app.stage.addChild(helpText);

loader(
  app,
  (loader: PIXI.Loader, resources: Object) => {
    const ship = new Ship(app, {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });
    ship.activate();
    app.ticker.add(delta => ship.run(delta));
  },
  (loader: any) => {
    console.info(`${Math.round(loader.progress)}% Loaded`);
  },
);
