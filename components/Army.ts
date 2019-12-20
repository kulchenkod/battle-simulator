import Squads from './Squads';
import ConfigBattle from './ConfigBattle';
import { IArmy, ICountry } from '../interfaces/interface';

class Army {
  army: IArmy[];
  totalHealthArmy: number;
  name: string;
  strategy: string;
  defaultConfig: ICountry;
  init: ConfigBattle;

  constructor() {
    this.init = ConfigBattle.getConfigBattle();
    this.totalHealthArmy = 0;
    this.defaultConfig = this.init.getCountry();
    this.strategy = this.defaultConfig.strategy;
    this.name = this.defaultConfig.country;
    this.army = [];
    this.createSquads();
    this.checkingTotalHealthArmy();
  }

  checkingTotalHealthArmy() {
    const totalHp = this.army[0].units.reduce((start: any, item: any) => {
      return start + item.health / this.army[0].units.length;
    }, 0);
    this.totalHealthArmy = Math.floor(totalHp);
  }

  createSquads() {
    const squad: any = new Squads();
    this.army.push(squad);
  }
}

export default Army;
