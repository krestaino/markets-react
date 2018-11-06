import React, { Component } from 'react'
import { Dimensions } from 'react-native'
import { Content, Text, Spinner, View } from 'native-base'
import { connect } from 'react-redux'
import { format, subDays } from 'date-fns'
import { VictoryGroup, VictoryAxis, VictoryLine, VictoryTheme } from 'victory-native'

class Stock extends Component {
  convertXaxis = x => -x + 30

  upOrDownSymbol = x => (x > 0 ? '▲' : '▼')

  formatPercentage = x => (x * 100).toFixed(2)

  positiveOrNegative = x => (x > 0 ? styles.positive.text : styles.negative.text)

  positiveOrNegativeOverTime = (x, y) =>
    x > y ? { ...styles.chart.line, ...styles.negative.chart } : { ...styles.chart.line, ...styles.positive.chart }

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
            <Text style={styles.companyName}>{quote.companyName}</Text>
            <Text style={styles.primaryExchange}>
              {quote.primaryExchange}: {quote.symbol}
            </Text>
            <Text>
              <Text style={styles.latestPrice}>{quote.latestPrice}</Text>
              <Text> USD</Text>
              <Text>
                <Text style={this.positiveOrNegative(quote.change)}> {quote.change} </Text>
                <Text style={this.positiveOrNegative(quote.change)}>
                  ({this.formatPercentage(quote.changePercent)}
                  %) {this.upOrDownSymbol(quote.changePercent)}
                </Text>
              </Text>
            </Text>
            <Text style={styles.latestUpdate}>{format(new Date(quote.latestUpdate), 'MMM D, h:mm A [EST]')}</Text>
            <VictoryGroup height={250} width={width} theme={VictoryTheme.material}>
              <VictoryLine
                animate={{
                  duration: 1000,
                  onLoad: { duration: 500 }
                }}
                data={chart}
                style={this.positiveOrNegativeOverTime(chart[0].close, chart[chart.length - 1].close)}
                y="close"
              />
              <VictoryAxis
                crossAxis
                fixLabelOverlap={true}
                tickFormat={t => format(subDays(new Date(), this.convertXaxis(t)), 'MMM D')}
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
  companyName: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  primaryExchange: {
    color: '#666',
    marginBottom: 6
  },
  latestPrice: {
    fontWeight: 'bold',
    fontSize: 24
  },
  positive: {
    text: {
      color: '#0f9d58'
    },
    chart: {
      data: {
        stroke: '#0f9d58'
      }
    }
  },
  negative: {
    text: {
      color: '#d23f31'
    },
    chart: {
      data: {
        stroke: '#d23f31'
      }
    }
  },
  latestUpdate: {
    color: '#666',
    fontSize: 12
  },
  chart: {
    line: {
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
