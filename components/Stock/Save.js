import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Icon, Fab, Toast, View } from 'native-base'

import { toggleFavorite } from '../../store/actions/'

class Save extends Component {
  isFavorite = quote => this.props.favorites.filter(stock => stock.symbol === quote.symbol).length

  onPress = quote => {
    this.props.toggleFavorite({
      companyName: quote.companyName,
      symbol: quote.symbol
    })

    const text = this.isFavorite(quote) ? 'removed from' : 'added to'

    Toast.show({
      text: `${quote.symbol} ${text} favorites.`,
      textStyle: { textAlign: 'center' },
      position: 'top'
    })
  }

  render() {
    const { quote } = this.props.stock.data

    return (
      <View>
        <Fab
          style={this.isFavorite(quote) ? styles.favorite : styles.notFavorite}
          position="bottomRight"
          onPress={() => this.onPress(quote)}
        >
          <Icon ios="ios-heart" android="md-heart" style={styles.icon} />
        </Fab>
      </View>
    )
  }
}

const styles = {
  favorite: {
    backgroundColor: '#b257c5'
  },
  notFavorite: {
    backgroundColor: '#2f4356'
  },
  icon: {
    color: '#fff'
  }
}

const mapStateToProps = state => {
  return {
    favorites: state.favorites,
    stock: state.stock,
    symbol: state.symbol
  }
}

const mapDispatchToProps = {
  toggleFavorite
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Save)
