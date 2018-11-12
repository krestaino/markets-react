import React, { Component } from 'react'
import { Platform } from 'react-native'
import { Icon, Fab, Toast, View } from 'native-base'
import { connect } from 'react-redux'

import { BLUE0, BLUE3, BLUE4, TEXT_NORMAL } from '../../../constants'
import { toggleFavorite } from '../../../store/actions/'

class Save extends Component {
  isFavorite = symbol => this.props.favorites.symbols.filter(favorite => favorite === symbol).length

  onPress = quote => {
    this.props.toggleFavorite(quote.symbol)
    this.toast(quote.symbol)
  }

  toast = symbol => {
    const text = this.isFavorite(symbol) ? 'removed from' : 'added to'

    Toast.show({
      text: `${symbol} ${text} favorites.`,
      textStyle: styles.toast.text,
      position: 'top',
      style: styles.toast.self
    })
  }

  render() {
    const { quote } = this.props.stock.data

    return (
      <View>
        {!this.props.autoSuggest && (
          <Fab
            style={this.isFavorite(quote.symbol) ? styles.favorite : styles.notFavorite}
            position="bottomRight"
            onPress={() => this.onPress(quote)}
          >
            <Icon ios="ios-heart" android="md-heart" style={styles.icon} />
          </Fab>
        )}
      </View>
    )
  }
}

const styles = {
  favorite: {
    backgroundColor: BLUE4
  },
  notFavorite: {
    backgroundColor: BLUE3
  },
  icon: {
    color: '#fff'
  },
  toast: {
    self: {
      backgroundColor: BLUE0,
      borderRadius: 6,
      fontSize: 13,
      marginLeft: 16,
      marginRight: 16,
      marginTop: Platform.OS === 'ios' ? -26 : 5,
      minHeight: 0,
      paddingHorizontal: 6
    },
    text: {
      color: TEXT_NORMAL,
      fontSize: 13,
      textAlign: 'center'
    }
  }
}

const mapStateToProps = state => ({
  autoSuggest: state.autoSuggest,
  favorites: state.favorites,
  stock: state.stock,
  symbol: state.symbol
})

const mapDispatchToProps = {
  toggleFavorite
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Save)
