import App, { Container } from 'next/app'
import { KeyUtils } from 'slate'
import React from 'react'
import { compose } from 'redux'

import { Provider as ReduxProvider } from 'react-redux'
import withReduxStore from '../lib/app/withReduxStore'

import { ApolloProvider } from 'react-apollo'
import withApolloClient from '../lib/app/withApolloClient'

let keysReset = false
const resetSlateKeys = () => {
  if (!keysReset) {
    KeyUtils.resetGenerator()
    keysReset = !!process.browser
  }
}

class MyApp extends App {
  render() {
    const {
      Component,
      pageProps,
      apolloClient,
      reduxStore,
    } = this.props
    resetSlateKeys()
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <ReduxProvider store={reduxStore}>
            <Component {...pageProps} />
          </ReduxProvider>
        </ApolloProvider>
      </Container>
    )
  }
}

export default compose(
  withApolloClient,
  withReduxStore
)(MyApp)
