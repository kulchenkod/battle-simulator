class Units {
  health: number;
  reacharge: number;
  constructor() {
    this.health = 100;
    this.reacharge = this.randomInteger(100, 2000);
  }

  randomInteger(min: number, max: number): number {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }
}

export default Units;
