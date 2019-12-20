import Units from './Units';

class Soldiers extends Units {
  experience: number;
  type: string;
  life: boolean;
  constructor() {
    super();
    this.life = true;
    this.experience = 0;
    this.type = 'soldiers';
  }

  atackSuccess() {
    return (0.5 * (1 + this.health / 100) * this.randomInteger(50 + this.experience, 100)) / 100;
  }

  damage() {
    const damage: number = 0.05 + this.experience / 100;
    this.lvlUp();
    return damage;
  }

  lifeReduction(hp: number) {
    if (this.health - hp <= 0) {
      this.health = 0;
      this.life = false;
      return;
    }
    this.health -= hp;
  }

  lvlUp() {
    if (this.experience >= 50) return;
    this.experience += 1;
  }
}

export default Soldiers;
