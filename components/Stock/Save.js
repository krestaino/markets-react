import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Icon, Fab, View } from 'native-base'

class Save extends Component {
  render() {
    return (
      <View>
        <Fab style={styles} position="bottomRight" onPress={() => console.log(this.props.stock.data.quote.symbol)}>
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

export default connect(mapStateToProps)(Save)
