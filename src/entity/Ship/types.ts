import { EntityOptions } from '@/entity/types';

export interface ShipOptions extends EntityOptions {};

export interface ThrusterOptions extends EntityOptions {
  acceleration?: number;
  deceleration?: number;
  direction?: number;
}
