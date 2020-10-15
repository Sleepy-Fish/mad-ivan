import * as PIXI from 'pixi.js';
import { GAME } from '@';

export default (cb: Function, handleProgress: Function): PIXI.Loader => {
  GAME.LOADER.baseUrl = 'assets/';
  GAME.LOADER.onProgress.add(handleProgress as any);
  GAME.LOADER.onComplete.add(cb as any);

  for (let i = 1; i <= 6; i++) {
    GAME.LOADER.add(`fire${i}`, `particles/fire/F${i}.png`);
  }
  GAME.LOADER.load();
  return GAME.LOADER;
};
