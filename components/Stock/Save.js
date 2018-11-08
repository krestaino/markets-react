import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Icon, Fab, View } from 'native-base'

import { toggleFavorite } from '../../store/actions/'

class Save extends Component {
  render() {
    const { quote } = this.props.stock.data

    return (
      <View>
        <Fab
          style={
            this.props.favorites.filter(stock => stock.symbol === quote.symbol).length
              ? styles.favorite
              : styles.notFavorite
          }
          position="bottomRight"
          onPress={() =>
            this.props.toggleFavorite({
              companyName: quote.companyName,
              symbol: quote.symbol
            })
          }
        >
          <Icon ios="ios-heart" android="md-heart" style={styles.icon} />
        </Fab>
      </View>
    )
  }
}

const styles = {
  favorite: {
    backgroundColor: '#a163ae'
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
