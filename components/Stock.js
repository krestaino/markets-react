import React, { Component } from 'react'
import { Content, Text, Spinner, View } from 'native-base'
import { connect } from 'react-redux'

import Info from './Stock/Info'
import Chart from './Stock/Chart'
import Details from './Stock/Details'

class Stock extends Component {
  render() {
    const { chart, quote } = this.props.stock.data
    const { error, loading } = this.props.stock

    const isLoading = !error && loading
    const isSucess = !error && !loading && chart && quote
    const isError = error && !loading

    return (
      <View style={styles.container}>
        {isSucess && (
          <Content>
            <Info />
            <Chart />
            <Details />
          </Content>
        )}
        {isError && (
          <View style={[styles.container, styles.center]}>
            <Text>{error}</Text>
          </View>
        )}
        {isLoading && (
          <View style={[styles.container, styles.center]}>
            <Spinner color="#333" />
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
    flexDirection: 'column',
    padding: 16
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  }
}

const mapStateToProps = state => {
  return {
    stock: state.stock
  }
}

export default connect(mapStateToProps)(Stock)
