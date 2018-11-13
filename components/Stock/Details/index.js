import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Text, View } from 'native-base'
import { connect } from 'react-redux'

import { Colors } from '../../../constants'

class Details extends Component {
  formatMarketCap = x => (x < 1000000000 ? (x / 1000000).toFixed(2) + 'M' : (x / 1000000000).toFixed(2) + 'B')

  render() {
    const { quote } = this.props.stock.data

    return (
      <View style={styles.container}>
        <View style={[styles.column, styles.columnFirst]}>
          <View style={styles.row}>
            <Text style={styles.label}>Open</Text>
            <Text style={styles.value}>{quote.open}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>High</Text>
            <Text style={styles.value}>{quote.high}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Low</Text>
            <Text style={styles.value}>{quote.low}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Mkt cap</Text>
            <Text style={styles.value}>{this.formatMarketCap(quote.marketCap)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>P/E ratio</Text>
            <Text style={styles.value}>{quote.peRatio}</Text>
          </View>
        </View>
        <View style={[styles.column, styles.columnSecond]}>
          <View style={styles.row}>
            <Text style={styles.label}>Prev close</Text>
            <Text style={styles.value}>{quote.previousClose}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>52-wk high</Text>
            <Text style={styles.value}>{quote.week52High}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>52-wk low</Text>
            <Text style={styles.value}>{quote.week52Low}</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16
  },
  column: {
    width: '50%'
  },
  columnFirst: {
    paddingRight: 8
  },
  columnSecond: {
    paddingLeft: 8
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8
  },
  label: {
    fontSize: 14
  },
  value: {
    color: Colors.TEXT_DARK,
    fontSize: 14
  }
})

const mapStateToProps = state => ({
  stock: state.stock
})

export default connect(mapStateToProps)(Details)
