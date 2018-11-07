import React, { Component } from 'react'
import { Text, View } from 'native-base'
import { connect } from 'react-redux'
import { format } from 'date-fns'

class Info extends Component {
  upOrDownSymbol = x => (x > 0 ? '▲' : '▼')

  formatPercentage = x => (x * 100).toFixed(2)

  positiveOrNegative = x => (x > 0 ? styles.positive : styles.negative)

  render() {
    const { quote } = this.props.stock.data

    return (
      <View style={styles.container}>
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
      </View>
    )
  }
}

const styles = {
  container: {
    padding: 16
  },
  companyName: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  primaryExchange: {
    color: '#6d788c',
    marginBottom: 6
  },
  latestPrice: {
    fontWeight: 'bold',
    fontSize: 24
  },
  positive: {
    color: '#0f9d58'
  },
  negative: {
    color: '#d23f31'
  },
  latestUpdate: {
    color: '#6d788c',
    fontSize: 12
  }
}

const mapStateToProps = state => {
  return {
    stock: state.stock
  }
}

export default connect(mapStateToProps)(Info)
