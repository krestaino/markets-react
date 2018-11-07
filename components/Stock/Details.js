import React, { Component } from 'react'
import { Text, View } from 'native-base'
import { connect } from 'react-redux'

class Details extends Component {
  formatMarketCap = x => {
    if (x < 1000000000) {
      return (x / 1000000).toFixed(2) + 'M'
    } else {
      return (x / 1000000000).toFixed(2) + 'B'
    }
  }

  render() {
    const { quote } = this.props.stock.data

    return (
      <View style={styles.container}>
        <View style={[styles.column, styles.columnFirst]}>
          <View style={styles.row}>
            <Text>Open</Text>
            <Text style={styles.value}>{quote.open}</Text>
          </View>
          <View style={styles.row}>
            <Text>High</Text>
            <Text style={styles.value}>{quote.high}</Text>
          </View>
          <View style={styles.row}>
            <Text>Low</Text>
            <Text style={styles.value}>{quote.low}</Text>
          </View>
          <View style={styles.row}>
            <Text>Mkt cap</Text>
            <Text style={styles.value}>{this.formatMarketCap(quote.marketCap)}</Text>
          </View>
          <View style={styles.row}>
            <Text>P/E ratio</Text>
            <Text style={styles.value}>{quote.peRatio}</Text>
          </View>
        </View>
        <View style={[styles.column, styles.columnSecond]}>
          <View style={styles.row}>
            <Text>Prev close</Text>
            <Text style={styles.value}>{quote.previousClose}</Text>
          </View>
          <View style={styles.row}>
            <Text>52-wk high</Text>
            <Text style={styles.value}>{quote.week52High}</Text>
          </View>
          <View style={styles.row}>
            <Text>52-wk low</Text>
            <Text style={styles.value}>{quote.week52Low}</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12
  },
  value: {
    color: '#6d788c'
  }
}

const mapStateToProps = state => {
  return {
    stock: state.stock
  }
}

export default connect(mapStateToProps)(Details)
