import React, { Component } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import Fuse from 'fuse.js'

import { getSymbols } from '../store/actions'

class Symbols extends Component {
  constructor(props) {
    super(props)

    this.state = {
      filteredSearch: []
    }
  }
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
      threshold: 0.1
    })
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.filteredSearch}
          keyExtractor={item => item.symbol}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    symbol: state.symbol,
    symbols: state.symbols
  }
}

const mapDispatchToProps = {
  getSymbols
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Symbols)
