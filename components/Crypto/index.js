import React, { Component } from 'react'
import { Image, RefreshControl, StyleSheet } from 'react-native'
import { Content, Text, View } from 'native-base'
import { connect } from 'react-redux'
import Touchable from 'react-native-platform-touchable'

import { Colors, Ranges } from '../../constants'
import { getCrypto, getStock, setSymbol, setTab, showAutoSuggest } from '../../store/actions/'
import { upOrDownSymbol, formatPercentage, positiveOrNegative } from '../../helpers/priceFormat'
import { cryptoLogos } from '../../helpers/cryptoLogos'

class Crypto extends Component {
  onPress = symbol => {
    this.props.getStock(symbol, Ranges.ONE_MONTH)
    this.props.setSymbol(symbol)
    this.props.showAutoSuggest(false)
    this.props.setTab(0)
  }

  onRefresh = () => this.props.getCrypto()

  componentDidMount = () => this.props.getCrypto()

  render() {
    const { data, loading } = this.props.crypto

    return (
      <Content refreshControl={<RefreshControl refreshing={loading} onRefresh={this.onRefresh} />} style={styles.list}>
        {data.map((stock, index) => {
          return (
            <Touchable
              background={Touchable.Ripple(Colors.BLUE2)}
              key={index}
              style={styles.button}
              onPress={() => this.onPress(stock.symbol)}
            >
              <View style={styles.rowContainer}>
                <Image source={cryptoLogos(stock.symbol)} style={styles.image} />
                <View style={styles.textContainer}>
                  <View style={styles.textInnerContainer}>
                    <Text>{stock.symbol}</Text>
                    <Text>{stock.latestPrice} USD</Text>
                  </View>
                  <View style={styles.textInnerContainer}>
                    <Text ellipsizeMode="tail" numberOfLines={1} style={styles.companyName}>
                      {stock.companyName}
                    </Text>
                    <Text>
                      <Text style={[styles.stockChange, positiveOrNegative(stock.change)]}>{stock.change}</Text>
                      <Text style={[styles.stockChange, positiveOrNegative(stock.change)]}>
                        {' '}
                        ({formatPercentage(stock.changePercent)}
                        %) {upOrDownSymbol(stock.changePercent)}
                      </Text>
                    </Text>
                  </View>
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
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: '100%'
  },
  rowContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%'
  },
  textContainer: {
    flexGrow: 1
  },
  textInnerContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexGrow: 1
  },
  image: {
    height: 28,
    marginRight: 16,
    width: 28
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
  crypto: state.crypto,
  symbol: state.symbol
})

const mapDispatchToProps = {
  getCrypto,
  getStock,
  setSymbol,
  setTab,
  showAutoSuggest
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Crypto)
