export interface IUnits {
  health: number;
  reacharge: number;
}

export interface ISoldiers extends IUnits {
  life: boolean;
  type: string;
  experience: number;
  damage(): number;
  lifeReduction(totalHP: number): void;
  atackSuccess(): number;
}

export interface IVehicles extends ISoldiers {
  numberOperators: number;
  operators: ISoldiers[];
}

export interface IArmyToBattle {
  defaultConfig: {
    config: IConfig;
  };
  strategy: string;
  name: string;
  army: IArmy[];
  totalHealthArmy: number;
  checkingTotalHealthArmy(): void;
}

export interface INameAndStrategyArmy {
  name: string;
  strategy: string;
}

export interface IDiedArmy extends IArmyToBattle {}

export interface ITotalHealth {
  health: number;
  name: string;
}

export interface IConfig {
  nameAndStrategy: ICountry[];
  numberOfUnits: number[];
}

export interface ICountry {
  config: any;
  country: string;
  strategy: string;
}

export interface IArmy {
  units: Array<IVehicles | ISoldiers>;
  defaultConfig: {
    config: IConfig;
  };
  lifeReduction(hp: number): void;
  totalDamage(): number;
  totalAtackSuccess(): number;
}
