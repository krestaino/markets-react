import React, { Component } from 'react'
import { KeyboardAvoidingView, Platform, RefreshControl } from 'react-native'
import { Content, Text, Spinner, View } from 'native-base'
import { connect } from 'react-redux'

import { TEXT_DARK } from '../../constants'
import { getStock } from '../../store/actions/'

import Info from './Info'
import Chart from './Chart'
import Details from './Details'
import News from './News'
import Save from './Save'

class Stock extends Component {
  onRefresh = () => this.props.getStock(this.props.stock.data.quote.symbol, this.props.stock.range)

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
            <Spinner color={TEXT_DARK} />
          </View>
        )}
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  }
}

const mapStateToProps = state => ({
  stock: state.stock,
  symbol: state.symbol
})

const mapDispatchToProps = {
  getStock
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stock)
