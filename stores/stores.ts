import { useStaticRendering } from 'mobx-react';

import BattleStore from './BattleStore';

const isServer = typeof window === 'undefined';
useStaticRendering(isServer);

let store: any = null;

export default function initializeStore() {
  if (isServer) {
    return {
      battleStore: new BattleStore(),
    };
  }
  if (store === null) {
    store = {
      battleStore: new BattleStore(),
    };
  }

  return store;
}
