import * as PIXI from 'pixi.js';

export default (app: PIXI.Application, cb: Function, handleProgress: Function): PIXI.Loader => {
  app.loader.baseUrl = 'assets/';
  app.loader.onProgress.add(handleProgress as any);
  app.loader.onComplete.add(cb as any);

  for (let i = 1; i <= 6; i++) {
    app.loader.add(`fire${i}`, `particles/fire/F${i}.png`);
  }
  app.loader.load();
  return app.loader;
};
