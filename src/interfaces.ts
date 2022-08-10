interface Car {
  name: string,
  color: string,
  id?: number,
  wins?: number,
  time?: number,
}

interface Winner {
  id?: null | number,
  wins: number,
  time: null | number,
}

interface SpeedParams {
  velocity: number,
  distance: number,
}

export { Car, Winner, SpeedParams };