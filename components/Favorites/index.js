import React, { Component } from 'react'
import { RefreshControl, StyleSheet } from 'react-native'
import { Content, Text, View } from 'native-base'
import { connect } from 'react-redux'
import Touchable from 'react-native-platform-touchable'

import { Colors, Ranges } from '../../constants'
import { clearFavorites, getFavorites, getStock, setSymbol, setTab, showAutoSuggest } from '../../store/actions/'
import { upOrDownSymbol, formatPercentage, positiveOrNegative } from '../../helpers/priceFormat'

class Favorites extends Component {
  onPress = symbol => {
    this.props.getStock(symbol, Ranges.ONE_MONTH)
    this.props.setSymbol(symbol)
    this.props.showAutoSuggest(false)
    this.props.setTab(0)
  }

  onRefresh = () => this.props.getFavorites(this.props.favorites.symbols)

  componentDidUpdate(prevProps) {
    if (prevProps.favorites.symbols !== this.props.favorites.symbols) {
      this.props.favorites.symbols.length
        ? this.props.getFavorites(this.props.favorites.symbols)
        : this.props.clearFavorites()
    }
  }

  render() {
    const { data, loading } = this.props.favorites

    return (
      <Content refreshControl={<RefreshControl refreshing={loading} onRefresh={this.onRefresh} />} style={styles.list}>
        {data.map((stock, index) => {
          return (
            <Touchable
              background={Touchable.Ripple(Colors.BLUE2)}
              key={index}
              style={styles.button}
              onPress={() => this.onPress(stock.quote.symbol)}
            >
              <View>
                <View style={styles.container}>
                  <Text>{stock.quote.symbol}</Text>
                  <Text>{stock.quote.latestPrice} USD</Text>
                </View>
                <View style={styles.container}>
                  <Text ellipsizeMode="tail" numberOfLines={1} style={styles.companyName}>
                    {stock.quote.companyName}
                  </Text>
                  <Text>
                    <Text style={[styles.stockChange, positiveOrNegative(stock.quote.change)]}>
                      {stock.quote.change}
                    </Text>
                    <Text style={[styles.stockChange, positiveOrNegative(stock.quote.change)]}>
                      {' '}
                      ({formatPercentage(stock.quote.changePercent)}
                      %) {upOrDownSymbol(stock.quote.changePercent)}
                    </Text>
                  </Text>
                </View>
              </View>
            </Touchable>
          )
        })}
      </Content>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    elevation: 0,
    flexDirection: 'column',
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%'
  },
  list: {
    marginTop: 8
  },
  companyName: {
    color: Colors.TEXT_DARK,
    flex: 1,
    fontSize: 13
  },
  stockChange: {
    fontSize: 13
  }
})

const mapStateToProps = state => ({
  favorites: state.favorites,
  symbol: state.symbol
})

const mapDispatchToProps = {
  clearFavorites,
  getFavorites,
  getStock,
  setSymbol,
  setTab,
  showAutoSuggest
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favorites)
