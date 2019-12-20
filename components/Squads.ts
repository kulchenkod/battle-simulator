import Vehicles from './Vehicles';
import Soldiers from './Soldiers';
import ConfigBattle from './ConfigBattle';
import { IVehicles, ISoldiers } from '../interfaces/interface';

const gavg = require('compute-gmean');

class Squads {
  units: Array<IVehicles | ISoldiers>;
  private defaultConfig: any;

  constructor() {
    this.units = [];
    this.defaultConfig = ConfigBattle.getConfigBattle();
    this.createUnits();
  }

  createUnits() {
    const length = this.defaultConfig.config.numberOfUnits.length - 1;
    const random = Math.round(0.5 + Math.random() * (length + 1)) - 1;
    const number = this.defaultConfig.config.numberOfUnits[random];
    for (let i = 0; i < number; i++) {
      const randomNumber = Math.round(Math.random() * 1);
      if (randomNumber) {
        this.createSoldiers();
      } else {
        this.createVehicles();
      }
    }
  }

  totalAtackSuccess() {
    const atackSucces = this.units.map(unit => unit.atackSuccess());
    return gavg(atackSucces);
  }

  totalDamage() {
    const damage: number = this.units
      .map(unit => unit.damage())
      .reduce((start, acc) => start + acc, 0);

    return damage;
  }

  checkedLifeUnit() {
    const liveUnit = this.units.filter(({ life }) => life === true);
    this.units = liveUnit;
  }

  lifeReduction(hp: number): void {
    const totalHp: number = hp / this.units.length;
    this.units.forEach(unit => {
      unit.lifeReduction(totalHp);
    });
    this.checkedLifeUnit();
  }

  private createVehicles() {
    const vehicles: any = new Vehicles();
    this.units.push(vehicles);
  }
  private createSoldiers() {
    const soldier = new Soldiers();
    this.units.push(soldier);
  }
}

export default Squads;
