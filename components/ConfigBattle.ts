import { IConfig, ICountry } from '../interfaces/interface';

class ConfigBattle {
  config: IConfig;
  private static instance: any;
  static getCountry: () => any;

  private constructor() {
    const configDefault = {
      nameAndStrategy: [],
      numberOfUnits: [5, 6, 7, 8, 9, 10],
    };
    this.config = configDefault;
  }

  public static getConfigBattle(): ConfigBattle {
    if (!ConfigBattle.instance) {
      ConfigBattle.instance = new ConfigBattle();
    }

    return ConfigBattle.instance;
  }

  public setConfig(arr: ICountry[]) {
    this.config.nameAndStrategy = arr;
  }

  public getCountry(): any {
    const length = this.config.nameAndStrategy.length - 1;
    const randomIndex = Math.round(0 - 0.5 + Math.random() * (length - 0 + 1));
    const randomCountry = this.config.nameAndStrategy[randomIndex];
    const deleteIndex = this.config.nameAndStrategy.findIndex(
      ({ country }) => country === randomCountry.country
    );

    this.config.nameAndStrategy.splice(deleteIndex, 1);

    return randomCountry;
  }
}

export default ConfigBattle;
