import React, { Component } from 'react'
import { Dimensions } from 'react-native'
import { Content, Text, Spinner, View } from 'native-base'
import { connect } from 'react-redux'
import { format } from 'date-fns'
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory-native'

class Stock extends Component {
  render() {
    const { chart, quote } = this.props.stock.data
    const { error, loading } = this.props.stock

    const isLoading = !error && loading
    const isSucess = !error && !loading && chart && quote
    const isError = error && !loading

    const { width } = Dimensions.get('window')

    return (
      <Content style={styles}>
        {isSucess && (
          <View>
            <Text>{quote.companyName}</Text>
            <Text>
              {quote.primaryExchange}: {quote.symbol}
            </Text>
            <Text>{quote.latestPrice} USD</Text>
            <Text>{format(new Date(quote.latestUpdate), 'MMM D, h:mm A [EST]')}</Text>
            <VictoryChart width={width} theme={VictoryTheme.material}>
              <VictoryLine data={chart} style={lineStyles} x="date" y="close" />
            </VictoryChart>
          </View>
        )}
        {isError && (
          <View>
            <Text>{error}</Text>
          </View>
        )}
        {isLoading && (
          <View>
            <Spinner color="#333" />
          </View>
        )}
      </Content>
    )
  }
}

styles = {
  display: 'flex',
  flex: 1,
  flexDirection: 'column'
}

lineStyles = {
  data: {
    stroke: '#c43a31',
    strokeWidth: 2
  },
  labels: {
    fill: 'transparent'
  }
}

const mapStateToProps = state => {
  return {
    stock: state.stock,
    symbols: state.symbols
  }
}

export default connect(mapStateToProps)(Stock)
