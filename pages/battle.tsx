import React from 'react';
import { inject, observer } from 'mobx-react';

import { IArmyToBattle, ITotalHealth, IDiedArmy } from '../interfaces/interface';
import Header from '../components/Header';

interface IProps {
  battleStore: {
    armyToBattle: IArmyToBattle[];
    diedArmy: IDiedArmy[];
    totalHealth: ITotalHealth[];
    startBattle(): void;
  };
}

@inject('battleStore')
@observer
class Battle extends React.Component<IProps, {}> {
  render() {
    const { totalHealth, startBattle, diedArmy } = this.props.battleStore;
    return (
      <div>
        <Header />
        <div className="battle">
          <h1>TOTAL HEALTH: </h1>
          {totalHealth &&
            totalHealth.map(({ name, health }) => <span>{`${name} - ${health}`}</span>)}
          <button className="battle__start" onClick={startBattle}>
            Start
          </button>
        </div>
        <div className="died__army">
          <h1>Died army: </h1>
          {diedArmy && diedArmy.map(({ name }) => <span>{`${name} - 0`}</span>)}
        </div>
        <style jsx>{`
          .battle,
          .died__army {
            display: flex;
            flex-direction: column;
            max-width: 300px;
          }
          battle__start {
            min-width: 150px;
            padding: 5px 0;
            margin: auto;
          }
        `}</style>
      </div>
    );
  }
}

export default Battle;
