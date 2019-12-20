import React, { Component } from 'react';

import ArmyConfig from '../components/ArmyConfig';
import Header from '../components/Header';

class Home extends Component {
  render() {
    return (
      <>
        <Header />
        <main>
          <ArmyConfig />
        </main>
      </>
    );
  }
}

export default Home;
