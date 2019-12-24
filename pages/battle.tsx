import React from 'react';
import { inject, observer } from 'mobx-react';
import { Button, Divider } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';

import { IArmyToBattle, ITotalHealth, IDiedArmy } from '../interfaces/interface';
import Header from '../components/Header';
import Winner from '../components/Winner';

interface IProps {
  battleStore: {
    armyToBattle: IArmyToBattle[];
    diedArmy: IDiedArmy[];
    totalHealth: ITotalHealth[];
    startBattle(): void;
    winnerArmyName: string;
  };
}

@inject('battleStore')
@observer
class Battle extends React.Component<IProps, {}> {
  render() {
    const { totalHealth, startBattle, diedArmy, winnerArmyName } = this.props.battleStore;
    return (
      <div>
        <Header />
        <div className="battle">
          {winnerArmyName && <Winner />}
          <h3>Total health: </h3>
          {totalHealth &&
            totalHealth.map(({ name, health }, index) => {
              if (health !== 0) {
                return (
                  <div key={`countryKey-${index}`} className="battle__item">
                    <span style={{ width: 100 }}>{`${name}-`}</span>
                    <LinearProgress
                      style={{ width: '100%', height: 10 }}
                      variant="determinate"
                      value={health}
                      color="secondary"
                    />
                  </div>
                );
              }
            })}
          {!totalHealth.length && (
            <Button
              variant="outlined"
              style={{ marginBottom: 20, maxWidth: 200 }}
              color="primary"
              onClick={startBattle}
            >
              Start
            </Button>
          )}
        </div>
        <Divider />

        <div className="died__army">
          <h3>Died army: </h3>
          {diedArmy &&
            diedArmy.map(({ name }, index) => (
              <span key={`diedKey-${index}`}>{`${name} - 0`}</span>
            ))}
        </div>
        <style jsx>{`
          .battle,
          .died__army {
            display: flex;
            flex-direction: column;
            max-width: 300px;
          }
          .battle__item {
            display: flex;
            align-items: center;
          }
        `}</style>
      </div>
    );
  }
}

export default Battle;
