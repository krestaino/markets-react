import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Icon, Item, Input, View } from 'native-base'

import { getStock, setSymbol } from '../store/actions/'
import Symbols from './Symbols'

class Search extends Component {
  render() {
    return (
      <View>
        <Item searchBar style={{ paddingLeft: 10 }}>
          <Icon name="ios-search" />
          <Input
            autoCapitalize={'characters'}
            autoCorrect={false}
            autoFocus={true}
            clearButtonMode={'always'}
            onChangeText={symbol => this.props.setSymbol(symbol)}
            onEndEditing={() => this.props.getStock(this.props.symbol)}
            placeholder="Search by stock symbol"
            returnKeyType="search"
            spellCheck={false}
          />
        </Item>
        {/* <Symbols /> */}
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    stock: state.stock,
    symbol: state.symbol
  }
}

const mapDispatchToProps = {
  getStock,
  setSymbol
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)
