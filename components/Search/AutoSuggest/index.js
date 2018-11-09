import React, { Component } from 'react'
import { FlatList, Keyboard, TouchableOpacity } from 'react-native'
import { Text, View } from 'native-base'
import { connect } from 'react-redux'

import { getStock, getSymbols } from '../../../store/actions'

class AutoSuggest extends Component {
  state = { filteredSearch: [] }

  componentDidMount = () => this.props.getSymbols()

  componentWillReceiveProps(nextProps) {
    if (nextProps.symbol.length > 0) {
      const matches = this.props.symbols.data.filter(stock => stock.symbol.startsWith(nextProps.symbol)).slice(0, 20)
      this.setState({ filteredSearch: matches })
    } else {
      this.setState({ filteredSearch: [] })
    }
  }

  onPress = symbol => {
    this.props.getStock(symbol)
    this.setState({ filteredSearch: [] })
    Keyboard.dismiss()
  }

  render() {
    if (!this.state.filteredSearch.length) {
      return <View />
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.filteredSearch}
          keyboardShouldPersistTaps="always"
          keyExtractor={item => item.symbol}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => this.onPress(item.symbol)} style={styles.item}>
              <Text ellipsizeMode="tail" numberOfLines={1}>
                {item.symbol} – {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    )
  }
}

const styles = {
  container: {
    backgroundColor: '#232f3a',
    borderTopColor: '#182129',
    borderTopWidth: 1,
    height: '100%',
    width: '100%',
    paddingBottom: 16
  },
  item: {
    paddingHorizontal: 16,
    paddingVertical: 12
  }
}

const mapStateToProps = state => {
  return {
    symbol: state.symbol,
    symbols: state.symbols
  }
}

const mapDispatchToProps = {
  getStock,
  getSymbols
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AutoSuggest)
