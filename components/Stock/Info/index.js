import React, { Component } from 'react'
import { Image, StyleSheet } from 'react-native'
import { Text, View } from 'native-base'
import { connect } from 'react-redux'
import { format } from 'date-fns'

import { Colors } from '../../../constants'
import { upOrDownSymbol, formatPercentage, positiveOrNegative } from '../../../helpers'

class Info extends Component {
  render() {
    const { quote } = this.props.stock.data

    if (!quote) return null
    const logo = `https://storage.googleapis.com/iex/api/logos/${quote.symbol}.png`

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View>
            <Text style={styles.companyName}>{quote.companyName}</Text>
            <Text style={styles.primaryExchange}>
              {quote.primaryExchange}: {quote.symbol}
            </Text>
          </View>
          <Image source={{ uri: logo }} style={styles.image} />
        </View>
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
        <Text style={styles.latestUpdate}>{format(quote.latestUpdate, 'MMM D, h:mm A')}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  image: {
    borderRadius: 3,
    height: 48,
    marginRight: 10,
    resizeMode: 'contain',
    width: 48
  },
  companyName: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  primaryExchange: {
    color: Colors.TEXT_DARK,
    marginBottom: 6
  },
  latestPrice: {
    fontWeight: 'bold',
    fontSize: 24
  },
  latestUpdate: {
    color: Colors.TEXT_DARK,
    fontSize: 12
  }
})

const mapStateToProps = state => ({
  stock: state.stock
})

export default connect(mapStateToProps)(Info)
