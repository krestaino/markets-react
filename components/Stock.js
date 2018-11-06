import React, { Component } from 'react'
import { Dimensions } from 'react-native'
import { Content, Text, Spinner, View } from 'native-base'
import { connect } from 'react-redux'
import { format, subDays } from 'date-fns'
import { VictoryGroup, VictoryAxis, VictoryLine, VictoryTheme } from 'victory-native'

class Stock extends Component {
  convert = x => -x + 30

  render() {
    const { chart, quote } = this.props.stock.data
    const { error, loading } = this.props.stock

    const isLoading = !error && loading
    const isSucess = !error && !loading && chart && quote
    const isError = error && !loading

    const { width } = Dimensions.get('window')

    return (
      <View style={styles.container}>
        {isSucess && (
          <Content>
            <Text>{quote.companyName}</Text>
            <Text>
              {quote.primaryExchange}: {quote.symbol}
            </Text>
            <Text>{quote.latestPrice} USD</Text>
            <Text>{format(new Date(quote.latestUpdate), 'MMM D, h:mm A [EST]')}</Text>
            <VictoryGroup width={width} theme={VictoryTheme.material}>
              <VictoryLine
                animate={{
                  duration: 1000,
                  onLoad: { duration: 500 }
                }}
                data={chart}
                style={styles.chart.line}
                y="close"
              />
              <VictoryAxis
                crossAxis
                fixLabelOverlap={true}
                tickFormat={t => format(subDays(new Date(), this.convert(t)), 'MMM D')}
              />
              <VictoryAxis dependentAxis fixLabelOverlap={true} />
            </VictoryGroup>
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

styles = {
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    padding: 10
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  chart: {
    line: {
      data: {
        stroke: '#c43a31',
        strokeWidth: 2
      },
      labels: {
        fill: 'transparent'
      }
    }
  }
}

const mapStateToProps = state => {
  return {
    stock: state.stock,
    symbols: state.symbols
  }
}

export default connect(mapStateToProps)(Stock)
