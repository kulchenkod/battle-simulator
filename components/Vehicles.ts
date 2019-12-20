import Soldiers from './Soldiers';
import Units from './Units';

const gavg = require('compute-gmean');

interface IOperators {
  health: number;
  reacharge: number;
  experience: number;
  atackSuccess(): void;
  lvlUp?(): void;
}

class Vehicles extends Units {
  private numberOperators: number;
  operators: IOperators[];
  type: string;
  life: boolean;
  constructor() {
    super();
    this.type = 'vehicles';
    this.reacharge = this.randomInteger(1000, 2000);
    this.numberOperators = this.randomInteger(1, 3);
    this.operators = [];
    this.life = true;
    for (let i: number = 0; i < this.numberOperators; i++) {
      const squad = new Soldiers();
      this.operators.push(squad);
    }
  }

  damage(): number {
    const totalExperience: number = this.operators
      .map(({ experience }) => experience)
      .reduce((start, acc) => start + acc, 0);
    this.operators.forEach((operator: any) => operator.lvlUp());
    return 0.1 + totalExperience / 100;
  }

  atackSuccess() {
    const operatorsAtackSucces = this.operators.map(operator => operator.atackSuccess());
    return 0.5 * (1 + this.health / 100) * gavg(operatorsAtackSucces);
  }

  lifeReduction(hp: number) {
    const damageToVehicles: number = (hp * 60) / 100;
    const damageToRandomSoldiers: number = (hp - damageToVehicles) / 2;
    const damageResidual: number = (hp - damageToVehicles - damageToRandomSoldiers) / 2;
    const totalDamageOperator = damageToRandomSoldiers + damageResidual + damageResidual;
    const randomSoldiers: number = this.randomInteger(0, this.numberOperators - 1);
    if (this.health - damageToVehicles <= 0) {
      this.health = 0;
      this.life = false;
      return;
    } else if (this.numberOperators > 1) {
      this.operators[randomSoldiers].health -= damageToRandomSoldiers;
      this.operators
        .filter((_sold, index) => index !== randomSoldiers)
        .forEach(soldier => {
          soldier.health -= damageResidual;
        });
    } else if (this.numberOperators === 1) {
      this.operators[0].health -= totalDamageOperator;
    }
    this.health -= damageToVehicles;
  }
}

export default Vehicles;
