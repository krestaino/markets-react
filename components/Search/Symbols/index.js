import React, { Component } from 'react'
import { FlatList, TouchableOpacity } from 'react-native'
import { Text, View } from 'native-base'
import { connect } from 'react-redux'
import Fuse from 'fuse.js'

import { getStock, getSymbols } from '../../../store/actions'

class Symbols extends Component {
  state = { filteredSearch: [] }

  componentDidMount = () => {
    this.props.getSymbols()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.symbol.length > 1) {
      this.setState({
        filteredSearch: this.fuse()
          .search(this.props.symbol)
          .slice(1, 40)
      })
    } else {
      this.setState({ filteredSearch: [] })
    }
  }

  fuse = () => {
    return new Fuse(this.props.symbols.data, {
      keys: ['symbol'],
      threshold: 0
    })
  }

  onPress = symbol => {
    this.props.getStock(symbol)
    this.setState({ filteredSearch: [] })
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.filteredSearch}
          keyExtractor={item => item.symbol}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => this.onPress(item.symbol)} style={styles.item}>
              <Text ellipsizeMode="tail" numberOfLines={1}>{item.symbol} – {item.name}</Text>
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
    maxHeight: 200,
    position: 'absolute',
    top: 50,
    width: '100%',
    zIndex: 10
  },
  item: {
    paddingHorizontal: 16,
    paddingVertical: 8
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
)(Symbols)
