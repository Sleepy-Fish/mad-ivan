export const flameSettings = {
  alpha: {
    list: [
      {
        value: 1,
        time: 0,
      },
      {
        value: 0.6,
        time: 0.7,
      },
      {
        value: 0,
        time: 1,
      },
    ],
    isStepped: false,
  },
  scale: {
    list: [
      {
        value: 0.18,
        time: 0,
      },
      {
        value: 0.5,
        time: 1,
      },
    ],
    isStepped: false,
  },
  color: {
    list: [
      {
        value: 'fcdd55',
        time: 0,
      },
      {
        value: 'ff1900',
        time: 0.7,
      },
      {
        value: '000000',
        time: 0.9,
      },
      {
        value: '000000',
        time: 1,
      },
    ],
    isStepped: false,
  },
  speed: {
    list: [
      {
        value: 100,
        time: 0,
      },
      {
        value: 90,
        time: 0.5,
      },
      {
        value: 200,
        time: 1,
      },
    ],
    isStepped: false,
  },
  startRotation: {
    min: 255,
    max: 285,
  },
  rotationSpeed: {
    min: -110,
    max: 110,
  },
  lifetime: {
    min: 0.9,
    max: 1,
  },
  frequency: 0.09,
  maxParticles: 10,
  pos: {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  },
  addAtBack: false,
  spawnType: 'circle',
  spawnCircle: {
    x: 0,
    y: 0,
    r: 4,
  },
};

export const sparkSettings = {
  alpha: {
    list: [
      {
        value: 1,
        time: 0,
      },
      {
        value: 0.9,
        time: 1,
      },
    ],
    isStepped: false,
  },
  scale: {
    list: [
      {
        value: 0.2,
        time: 0,
      },
      {
        value: 0.1,
        time: 1,
      },
    ],
    isStepped: false,
  },
  color: {
    list: [
      {
        value: 'fff0d3',
        time: 0,
      },
      {
        value: 'ffc34f',
        time: 0.3,
      },
      {
        value: 'c94022',
        time: 1,
      },
    ],
    isStepped: false,
  },
  speed: {
    list: [
      {
        value: 180,
        time: 0,
      },
      {
        value: 40,
        time: 1,
      },
    ],
    isStepped: false,
  },
  startRotation: {
    min: 240,
    max: 300,
  },
  rotationSpeed: {
    min: -360,
    max: 360,
  },
  lifetime: {
    min: 2,
    max: 2,
  },
  frequency: 0.6,
  spawnChance: 0.6,
  maxParticles: 8,
  pos: {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  },
  addAtBack: false,
  spawnType: 'circle',
  spawnCircle: {
    x: 0,
    y: -20,
    r: 20,
  },
};
