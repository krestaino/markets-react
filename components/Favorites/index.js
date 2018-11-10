import React, { Component } from 'react'
import { RefreshControl, TouchableOpacity } from 'react-native'
import { Content, Text, View } from 'native-base'
import { connect } from 'react-redux'

import { TEXT_DARK } from '../../constants'
import { getFavorites, getStock, setSymbol, setTab } from '../../store/actions/'
import { upOrDownSymbol, formatPercentage, positiveOrNegative } from '../../helpers/priceFormat'

class Favorites extends Component {
  onPress = symbol => {
    this.props.getStock(symbol)
    this.props.setSymbol(symbol)
    this.props.setTab(0)
  }

  onRefresh = () => this.props.getFavorites(this.props.favorites.symbols)

  componentDidUpdate(prevProps) {
    if (prevProps.favorites.symbols !== this.props.favorites.symbols) {
      this.props.getFavorites(this.props.favorites.symbols)
    }
  }

  render() {
    const { data } = this.props.favorites

    return (
      <Content
        refreshControl={<RefreshControl refreshing={this.props.favorites.loading} onRefresh={this.onRefresh} />}
        style={styles.list}
      >
        {data &&
          data.map((stock, index) => {
            return (
              <TouchableOpacity key={index} full style={styles.button} onPress={() => this.onPress(stock.quote.symbol)}>
                <View style={styles.container}>
                  <Text>{stock.quote.symbol}</Text>
                  <Text>{stock.quote.latestPrice} USD</Text>
                </View>
                <View style={styles.container}>
                  <Text ellipsizeMode="tail" numberOfLines={1} style={styles.companyName}>{stock.quote.companyName}</Text>
                  <Text>
                    <Text style={[styles.stockChange, positiveOrNegative(stock.quote.change)]}> {stock.quote.change} </Text>
                    <Text style={[styles.stockChange, positiveOrNegative(stock.quote.change)]}>
                      ({formatPercentage(stock.quote.changePercent)}
                      %) {upOrDownSymbol(stock.quote.changePercent)}
                    </Text>
                  </Text>
                </View>
              </TouchableOpacity>
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
    flexDirection: 'column',
    height: 48,
    paddingHorizontal: 16,
    paddingVertical: 8
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
    color: TEXT_DARK,
    flex: 1,
    fontSize: 13
  },
  stockChange: {
    fontSize: 13
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
