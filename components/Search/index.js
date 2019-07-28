import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Icon, Item, Input, View } from 'native-base'
import { connect } from 'react-redux'

import { Colors, Ranges } from '../../constants'
import { getStock, setSymbol, showAutoSuggest } from '../../store/actions'

class Search extends Component {
  state = { hideAutoSuggest: false }

  onChangeText = symbol => {
    this.props.setSymbol(symbol)
    this.props.showAutoSuggest(true)
  }

  onSubmitEditing = () => {
    if (this.props.symbol) {
      this.props.getStock(this.props.symbol, Ranges.ONE_MONTH)
      this.props.showAutoSuggest(false)
    }
  }

  componentDidUpdate = () => {
    if (this.props.stock.error) {
      this.input._root.focus()
    }
    if (!this.props.symbol) {
      this.props.showAutoSuggest(false)
    }
  }

  render = () => (
    <View style={styles.container}>
      <Item searchBar style={styles.item}>
        <Icon name="md-search" style={styles.icon} />
        <Input
          autoCapitalize="characters"
          autoCorrect={false}
          clearButtonMode="always"
          keyboardAppearance="dark"
          onChangeText={symbol => this.onChangeText(symbol)}
          onSubmitEditing={this.onSubmitEditing}
          placeholder="Search by stock symbol"
          ref={ref => (this.input = ref)}
          returnKeyType="search"
          selectionColor={Colors.TEXT_NORMAL}
          spellCheck={false}
          style={[styles.input, { color: '#ffffff' }]}
          value={this.props.symbol}
        />
        {this.props.symbol ? (
          <TouchableOpacity onPress={() => this.onChangeText('')}>
            <Icon name="md-close" style={styles.icon} />
          </TouchableOpacity>
        ) : null}
      </Item>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: 1,
    height: 50,
    paddingLeft: 20,
    paddingRight: 10,
    marginLeft: 0
  },
  icon: {
    color: Colors.TEXT_NORMAL
  },
  input: {
    color: Colors.TEXT_DARK,
    fontSize: 13,
    fontWeight: '400'
  }
})

const mapStateToProps = state => ({
  stock: state.stock,
  symbol: state.symbol
})

const mapDispatchToProps = {
  getStock,
  setSymbol,
  showAutoSuggest
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)
