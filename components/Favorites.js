import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Content, Text } from 'native-base'

import { getStock, setSymbol, setTab } from '../store/actions/'

class Favorites extends Component {
  onPress = symbol => {
    this.props.getStock(symbol)
    this.props.setSymbol(symbol)
    this.props.setTab(0)
  }

  render() {
    return (
      <Content style={styles.list}>
        {this.props.favorites.map((stock, index) => {
          return (
            <Button key={index} full style={styles.button} onPress={() => this.onPress(stock.symbol)}>
              <Text>{stock}</Text>
            </Button>
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
    justifyContent: 'flex-start',
    height: 48
  },
  list: {
    marginTop: 8
  }
}

const mapStateToProps = state => {
  return {
    favorites: state.favorites,
    symbol: state.symbol
  }
}

const mapDispatchToProps = {
  getStock,
  setSymbol,
  setTab
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favorites)
