import React, { Component } from 'react'
import { Image, RefreshControl, StyleSheet } from 'react-native'
import { Content, Text, View } from 'native-base'
import { connect } from 'react-redux'
import { format } from 'date-fns'
import Touchable from 'react-native-platform-touchable'

import { Colors, Ranges } from '../../constants'
import { getCrypto, getStock, setSymbol, setTab, showAutoSuggest } from '../../store/actions/'
import { upOrDownSymbol, formatPercentage, positiveOrNegative } from '../../helpers/priceFormat'
import { cryptoLogos } from '../../helpers/cryptoLogos'
import { globalStyles } from '../../styles'

class List extends Component {
  onPress = symbol => {
    this.props.getStock(symbol, Ranges.ONE_MONTH)
    this.props.setSymbol(symbol)
    this.props.showAutoSuggest(false)
    this.props.setTab(1)
  }

  render() {
    return (
      <Content
        refreshControl={<RefreshControl refreshing={this.props.loading} onRefresh={this.onRefresh} />}
        style={styles.list}
      >
        <View style={globalStyles.headerContainer}>
          <Text style={globalStyles.headerContainer}>{this.props.header}</Text>
        </View>
        {this.props.list.map((stock, index) => {
          const logo = cryptoLogos(stock.symbol)

          return (
            <Touchable
              background={Touchable.Ripple(Colors.BLUE2)}
              key={index}
              style={styles.button}
              onPress={() => this.onPress(stock.symbol)}
            >
              <View style={styles.rowContainer}>
                {logo && <Image source={logo} style={styles.image} />}
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
  companyName: {
    color: Colors.TEXT_DARK,
    flex: 1,
    fontSize: 13,
    paddingRight: 8
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
)(List)
