import React, { Component } from 'react'
import { Icon, Item, Input, View } from 'native-base'
import { connect } from 'react-redux'

import { getStock, setSymbol } from '../../store/actions/'

import Symbols from './Symbols'

class Search extends Component {
  componentDidUpdate = () => {
    if (this.props.stock.error) {
      this.input._root.focus()
    }
  }

  onSubmitEditing = () => {
    if (this.props.symbol) {
      this.props.getStock(this.props.symbol)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Item searchBar style={styles.input}>
          <Icon name="ios-search" style={styles.icon} />
          <Input
            autoCapitalize="characters"
            autoCorrect={false}
            autoFocus={true}
            clearButtonMode="always"
            keyboardAppearance="dark"
            onChangeText={symbol => this.props.setSymbol(symbol)}
            onSubmitEditing={this.onSubmitEditing}
            placeholder="Search by stock symbol"
            ref={ref => (this.input = ref)}
            returnKeyType="search"
            spellCheck={false}
            value={this.props.symbol}
          />
        </Item>
        <Symbols />
      </View>
    )
  }
}

const styles = {
  container: {
    zIndex: 1
  },
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
