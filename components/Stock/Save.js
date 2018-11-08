import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Icon, Fab, View } from 'native-base'

import { saveFavorite } from '../../store/actions/'

class Save extends Component {
  render() {
    const { quote } = this.props.stock.data
    return (
      <View>
        <Fab
          style={styles}
          position="bottomRight"
          onPress={() =>
            this.props.saveFavorite({
              companyName: quote.companyName,
              symbol: quote.symbol
            })
          }
        >
          <Icon ios="ios-heart" android="md-heart" />
        </Fab>
      </View>
    )
  }
}

const styles = {
  backgroundColor: '#5067FF',
  position: 'absolute'
}

const mapStateToProps = state => {
  return {
    stock: state.stock
  }
}

const mapDispatchToProps = {
  saveFavorite
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Save)
