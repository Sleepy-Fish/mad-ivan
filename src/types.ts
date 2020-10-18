import * as PIXI from 'pixi.js';
import { World } from 'bogie';

export interface Game {
  APP: PIXI.Application;
  LOADER: PIXI.Loader;
  WORLD: World;
}
