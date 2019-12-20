import { observable, action } from 'mobx';

import ConfigBattle from '../components/ConfigBattle';
import Army from '../components/Army';
import { IArmyToBattle, IDiedArmy, ITotalHealth, ICountry } from '../interfaces/interface';

class Battle {
  @observable armyToBattle: IArmyToBattle[] = [];
  @observable diedArmy: IDiedArmy[] = [];
  @observable totalHealth: ITotalHealth[] = [];
  @observable defaultConfig: any = ConfigBattle.getConfigBattle();
  @observable winnerArmy: string = '';
  @observable numbersOfArmy: string[] = ['', ''];
  @observable isDisableAdd: boolean = false;
  @observable isDisableDelete: boolean = true;
  nameAndStrategyArmy: ICountry[] = [];

  @action.bound setConfig(armys: ICountry[]) {
    this.nameAndStrategyArmy.length = 0;

    for (let key in armys) {
      this.nameAndStrategyArmy.push(armys[key]);
    }

    this.defaultConfig.setConfig(this.nameAndStrategyArmy);
  }

  @action.bound newArmy() {
    if (this.numbersOfArmy.length >= 9) {
      this.isDisableAdd = true;
    }
    this.numbersOfArmy.push('');
    this.isDisableDelete = false;
  }

  @action.bound deleteArmy() {
    if (this.numbersOfArmy.length <= 3) {
      this.isDisableDelete = true;
    }
    this.isDisableAdd = false;
    this.numbersOfArmy.pop();
  }

  @action.bound createArmys() {
    const numbersArmy = this.nameAndStrategyArmy.length;
    for (let i = 0; i < numbersArmy; i++) {
      const army = new Army();
      this.armyToBattle.push(army);
    }
  }

  @action.bound startBattle() {
    if (this.nameAndStrategyArmy.length < 1) {
      alert('First create config in Home page');
      return;
    }

    this.createArmys();

    this.winnerArmy = '';

    this.chekingTotalHealth();
    this.checkingStrategy(this.armyToBattle[0]);
  }

  @action.bound checkingGameOver() {
    return this.armyToBattle.length > 1;
  }

  @action.bound checkingStrategy(army: IArmyToBattle) {
    if (this.checkingGameOver()) {
      switch (army.strategy) {
        case 'random':
          return this.randomStrategy(army);
        case 'weakest':
          return this.weakestStrategy(army);
        case 'strongest':
          return this.strongestStrategy(army);
        default:
          return army;
      }
    }

    alert(this.armyToBattle[0].name);

    this.clearBattle();
  }

  @action.bound clearBattle() {
    this.numbersOfArmy = ['', ''];
    this.armyToBattle.length = 0;
    this.diedArmy.length = 0;
    this.totalHealth.length = 0;
    this.isDisableAdd = false;
    this.isDisableDelete = true;
  }

  @action.bound strongestStrategy(army: IArmyToBattle) {
    const sort = this.armyToBattle
      .filter(({ name }) => name !== army.name)
      .reduce((res, obj) => {
        return obj.totalHealthArmy > res.totalHealthArmy ? obj : res;
      });
    const defending = sort;
    const atacking = army;
    this.atacking(atacking, defending);
  }

  @action.bound weakestStrategy(army: IArmyToBattle) {
    const sort = this.armyToBattle
      .filter(({ name }) => name !== army.name)
      .reduce((res, obj) => {
        return obj.totalHealthArmy < res.totalHealthArmy ? obj : res;
      });
    const defending = sort;
    const atacking = army;

    this.atacking(atacking, defending);
  }

  @action.bound randomStrategy(army: IArmyToBattle) {
    const length = this.armyToBattle.length - 2;
    const randomIndex = Math.round(0.5 + Math.random() * (length + 1)) - 1;
    const defending = this.armyToBattle.filter(({ name }) => name !== army.name)[randomIndex];
    const atacking = army;
    this.atacking(atacking, defending);
  }

  @action.bound atacking(atacking: any, defending: any) {
    defending.army[0].lifeReduction(atacking.army[0].totalDamage());
    defending.checkingTotalHealthArmy();

    this.checkingDied();
    this.chekingTotalHealth();
    setTimeout(() => this.checkingStrategy(defending), 20);
  }

  @action.bound checkingDied() {
    this.armyToBattle.forEach(arm => {
      if (arm.army[0].units.length === 0) {
        const index = this.armyToBattle.findIndex(currentArmy => currentArmy.name === arm.name);

        this.diedArmy.push(arm);
        this.armyToBattle.splice(index, 1);
      }
    });
  }

  @action.bound chekingTotalHealth() {
    const armyArr = [...this.armyToBattle.map(army => army)];

    this.totalHealth.length = 0;

    armyArr.forEach(arm => {
      const totalCountryHealth = {
        health: Math.floor(arm.totalHealthArmy),
        name: arm.name,
      };

      this.totalHealth.push(totalCountryHealth);
    });
  }
}

export default Battle;
