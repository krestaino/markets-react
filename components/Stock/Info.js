import React, { Component } from 'react'
import { Text, View } from 'native-base'
import { connect } from 'react-redux'
import { format } from 'date-fns'

import { upOrDownSymbol, formatPercentage, positiveOrNegative } from '../../helpers/priceFormat'

class Info extends Component {
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
            <Text style={positiveOrNegative(quote.change)}> {quote.change} </Text>
            <Text style={positiveOrNegative(quote.change)}>
              ({formatPercentage(quote.changePercent)}
              %) {upOrDownSymbol(quote.changePercent)}
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
