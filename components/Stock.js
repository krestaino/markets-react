import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Content, Text, Spinner, View } from 'native-base'
import { KeyboardAvoidingView, Platform, RefreshControl } from 'react-native'

import { getStock } from '../store/actions/'

import Info from './Stock/Info'
import Chart from './Stock/Chart'
import Details from './Stock/Details'
import News from './Stock/News'
import Save from './Stock/Save'

class Stock extends Component {
  onRefresh = () => this.props.getStock(this.props.symbol)

  render() {
    const { chart, quote } = this.props.stock.data
    const { error, loading } = this.props.stock

    const isLoading = !error && loading
    const isSucess = !error && !loading && chart && quote
    const isError = error && !loading

    return (
      <View style={styles.container}>
        {isSucess && (
          <View style={styles.container}>
            <Content
              refreshControl={<RefreshControl refreshing={this.props.stock.loading} onRefresh={this.onRefresh} />}
            >
              <Info />
              <Chart />
              <Details />
              <News />
            </Content>
            <Save />
          </View>
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
