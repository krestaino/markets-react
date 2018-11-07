import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Icon, Item, Input, View } from 'native-base'

import { getStock, setSymbol } from '../store/actions/'
import Symbols from './Symbols'

class Search extends Component {
  render() {
    return (
      <View>
        <Item searchBar style={styles.input}>
          <Icon name="ios-search" style={styles.icon} />
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

const styles = {
  input: {
    backgroundColor: '#232f3a',
    paddingLeft: 20,
    marginLeft: 0
  },
  icon: {
    color: '#bcc6d9'
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
