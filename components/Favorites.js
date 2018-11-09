import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Content, Text } from 'native-base'

import { getFavorites, getStock, setSymbol, setTab } from '../store/actions/'
import { upOrDownSymbol, formatPercentage, positiveOrNegative } from '../helpers/priceFormat'

class Favorites extends Component {
  onPress = symbol => {
    this.props.getStock(symbol)
    this.props.setSymbol(symbol)
    this.props.setTab(0)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.favorites.symbols !== this.props.favorites.symbols) {
      this.props.getFavorites(this.props.favorites.symbols)
    }
  }

  render() {
    const { data } = this.props.favorites

    return (
      <Content style={styles.list}>
        {data &&
          data.map((stock, index) => {
            return (
              <Button key={index} full style={styles.button} onPress={() => this.onPress(stock.quote.symbol)}>
                <Text>{stock.quote.symbol}</Text>
                <Text>
                  <Text style={styles.latestPrice}>{stock.quote.latestPrice}</Text>
                  <Text> USD</Text>
                  <Text>
                    <Text style={positiveOrNegative(stock.quote.change)}> {stock.quote.change} </Text>
                    <Text style={positiveOrNegative(stock.quote.change)}>
                      ({formatPercentage(stock.quote.changePercent)}
                      %) {upOrDownSymbol(stock.quote.changePercent)}
                    </Text>
                  </Text>
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
    justifyContent: 'space-between',
    height: 48
  },
  list: {
    marginTop: 8
  }
}

const mapStateToProps = state => {
  return {
    favorites: state.favorites,
    symbol: state.symbol
  }
}

const mapDispatchToProps = {
  getFavorites,
  getStock,
  setSymbol,
  setTab
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favorites)
