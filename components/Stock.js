import React, { Component } from 'react'
import { Content, Text, Spinner, View } from 'native-base'
import { KeyboardAvoidingView, Platform, RefreshControl } from 'react-native'
import { connect } from 'react-redux'

import { getStock } from '../store/actions/'

import Info from './Stock/Info'
import Chart from './Stock/Chart'
import Details from './Stock/Details'

class Stock extends Component {
  constructor(props) {
    super(props)

    this.state = {
      refreshing: false
    }
  }

  onRefresh = () => {
    this.setState({ refreshing: true })
    this.props.getStock(this.props.symbol).then(() => {
      this.setState({ refreshing: false })
    })
  }

  render() {
    const { chart, quote } = this.props.stock.data
    const { error, loading } = this.props.stock

    const isLoading = !error && loading
    const isSucess = !error && !loading && chart && quote
    const isError = error && !loading

    return (
      <View style={styles.container}>
        {isSucess && (
          <Content refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />}>
            <Info />
            <Chart />
            <Details />
          </Content>
        )}
        {isError && (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'position' : null}
            style={[styles.container, styles.center]}
          >
            <Text>{error}</Text>
          </KeyboardAvoidingView>
        )}
        {isLoading && (
          <View style={[styles.container, styles.center]}>
            <Spinner color="#6d788c" />
          </View>
        )}
      </View>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column'
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  }
}

const mapStateToProps = state => {
  return {
    stock: state.stock,
    symbol: state.symbol
  }
}

const mapDispatchToProps = {
  getStock
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stock)
