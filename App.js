import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Container, StyleProvider } from 'native-base'
import { Font, AppLoading } from 'expo'

import getTheme from './native-base-theme/components'
import platform from './native-base-theme/variables/platform'

import store from './store'
import Header from './components/Header'
import Search from './components/Search'
import Stock from './components/Stock'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = { loading: true }
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
    })
    this.setState({ loading: false })
  }

  render() {
    if (this.state.loading) {
      return (
        <Container>
          <AppLoading />
        </Container>
      )
    }
    return (
      <Provider store={store}>
        <StyleProvider style={getTheme(platform)}>
          <Container style={styles.container}>
            <Header />
            <Search />
            <Stock />
          </Container>
        </StyleProvider>
      </Provider>
    )
  }
}

const styles = {
  container: {
    backgroundColor: '#182129'
  }
}
