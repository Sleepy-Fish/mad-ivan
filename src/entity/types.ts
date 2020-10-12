export interface EntityOptions {
  x?: number;
  y?: number;
};

export interface ShipOptions extends EntityOptions {};

export interface ThrusterOptions {
  acceleration?: number;
  deceleration?: number;
  x?: number;
  y?: number;
  direction?: number;
}
