import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Content, Text } from 'native-base'

import { getStock, setTab } from '../store/actions/'

class Favorites extends Component {
  state = {
    stocks: [
      { symbol: 'AAPL', name: 'Apple Inc.' },
      { symbol: 'AMD', name: 'Advanced Micro Devices, Inc.' },
      { symbol: 'BRK.A', name: 'Berkshire Hathaway Inc. Class A' },
      { symbol: 'DVMT', name: 'Dell Technologies Inc' },
      { symbol: 'F', name: 'Ford Motor Company' },
      { symbol: 'GOOG', name: 'Alphabet Inc Class C' },
      { symbol: 'IBM', name: 'IBM Common Stock' },
      { symbol: 'INTC', name: 'Intel Corporation' },
      { symbol: 'TSLA', name: 'Tesla Inc' },
      { symbol: 'WDC', name: 'Western Digital Corp' },
      { symbol: 'XOM', name: 'Exxon Mobil Corporation' }
    ]
  }

  onPress = symbol => {
    this.props.getStock(symbol)
    this.props.setTab(0)
  }

  render() {
    return (
      <Content style={styles.list}>
        {this.state.stocks.map((stock, index) => {
          return (
            <Button key={index} full style={styles.button} onPress={() => this.onPress(stock.symbol)}>
              <Text>
                {stock.symbol} – {stock.name}
              </Text>
            </Button>
          )
        })}
      </Content>
    )
  }
}

const styles = {
  button: {
    backgroundColor: 'transparent',
    elevation: 0,
    justifyContent: 'flex-start',
    height: 48
  },
  list: {
    marginTop: 8
  }
}

const mapStateToProps = state => {
  return {
    symbol: state.symbol
  }
}

const mapDispatchToProps = {
  getStock,
  setTab
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favorites)
