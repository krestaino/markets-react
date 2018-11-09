import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Icon, Fab, Toast, View } from 'native-base'

import { toggleFavorite } from '../../store/actions/'

class Save extends Component {
  isFavorite = symbol => this.props.favorites.symbols.filter(favorite => favorite === symbol).length

  onPress = quote => {
    this.props.toggleFavorite(quote.symbol)

    const text = this.isFavorite(quote.symbol) ? 'removed from' : 'added to'

    Toast.show({
      text: `${quote.symbol} ${text} favorites.`,
      textStyle: styles.toast.text,
      position: 'top',
      style: styles.toast.self
    })
  }

  render() {
    const { quote } = this.props.stock.data

    return (
      <View>
        <Fab
          style={this.isFavorite(quote.symbol) ? styles.favorite : styles.notFavorite}
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
  },
  toast: {
    self: {
      backgroundColor: '#15191d',
      borderRadius: 6,
      marginTop: 16,
      marginRight: 16,
      marginLeft: 16,
      minHeight: 0,
      paddingTop: 16,
      paddingBottom: 16
    },
    text: {
      color: '#bcc6d9',
      fontSize: 13,
      textAlign: 'center'
    }
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
