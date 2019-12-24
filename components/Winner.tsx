import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

interface IProps {
  winnerArmyName?: string;
  clearBattle?(): void;
}

@inject(({ battleStore: { winnerArmyName, clearBattle } }) => ({
  winnerArmyName,
  clearBattle,
}))
@observer
class Winner extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.clear = this.clear.bind(this);
  }

  clear({ target: { classList } }: any) {
    const { clearBattle } = this.props;
    if (classList.contains('winner')) {
      clearBattle!();
    }
  }

  render() {
    const { winnerArmyName } = this.props;
    return (
      <div className="winner" onClick={this.clear}>
        <div className="winner__body">
          <div className="winner__body-title">
            <h3>Winner army: {winnerArmyName}</h3>
          </div>
        </div>
        <style jsx>{`
          .winner {
            background: rgba(0, 0, 0, 0.5);
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            position: fixed;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .winner__body {
            background: white;
            border-radius: 10px;
            height: 150px;
            width: 300px;
          }
          .winner__body-title {
            text-align: center;
          }
        `}</style>
      </div>
    );
  }
}

export default Winner;
