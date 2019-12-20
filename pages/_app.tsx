import App from 'next/app';
import Head from 'next/head';
import { Provider } from 'mobx-react';

import initializeStore from '../stores/stores';

class CustomApp extends App {
  mobxStore: any;

  static async getInitialProps(appContext: any) {
    const mobxStore = initializeStore();
    appContext.ctx.mobxStore = mobxStore;
    const appProps = await App.getInitialProps(appContext);
    return {
      ...appProps,
      initialMobxState: mobxStore,
    };
  }

  constructor(props: any) {
    super(props);
    const isServer = typeof window === 'undefined';
    this.mobxStore = isServer ? props.initialMobxState : initializeStore();
  }

  public render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        </Head>
        <Provider {...this.mobxStore}>
          <Component {...pageProps} />
        </Provider>
      </>
    );
  }
}

export default CustomApp;
