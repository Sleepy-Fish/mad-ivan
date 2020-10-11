import * as PIXI from 'pixi.js';

export default (cb: Function, handleProgress: Function): PIXI.Loader => {
  const loader = new PIXI.Loader('assets/');
  loader.onProgress.add(handleProgress as any);
  loader.onComplete.add(cb as any);

  for (let i = 1; i <= 6; i++) {
    loader.add(`fire${i}`, `particles/fire/F${i}.png`);
  }
  loader.load();
  return loader;
};
