import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Text, View } from 'native-base'
import { distanceInWords } from 'date-fns'

import { Colors } from '../../constants'

class ListHeader extends Component {
  state = {
    latestUpdate: null
  }

  capitalize = string => string.charAt(0).toUpperCase() + string.slice(1)

  formatTime = () => (this.state.latestUpdate ? this.capitalize(this.state.latestUpdate) + ' ago' : 'Just now')

  timer() {
    return setInterval(() => {
      this.setState({ latestUpdate: distanceInWords(new Date(), this.props.latestUpdate) })
    }, 5000)
  }

  componentDidMount() {
    this.timestamp = this.timer()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.latestUpdate !== this.props.latestUpdate) {
      clearInterval(this.timestamp)
      this.timestamp = this.timer()
      this.setState({ latestUpdate: null })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.title}</Text>
        {this.props.latestUpdate && <Text style={styles.text}>{this.formatTime()}</Text>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor: Colors.BLUE2,
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50
  },
  text: {
    color: Colors.TEXT_DARK,
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 50
  }
})

export default ListHeader
