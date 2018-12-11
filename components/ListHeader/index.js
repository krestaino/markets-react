import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Text, View } from 'native-base'

import { Colors } from '../../constants'

class ListHeader extends Component {
  render() {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerContainer}>{this.props.title}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    borderBottomColor: Colors.BLUE2,
    borderBottomWidth: 1,
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: Colors.TEXT_DARK,
    fontSize: 13,
    fontWeight: '400',
    height: 50,
    lineHeight: 50,
    textAlign: 'center'
  }
})

export default ListHeader
