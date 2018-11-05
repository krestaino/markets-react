import React, { Component } from 'react'
import { Dimensions } from 'react-native'
import { Content, Text, View } from 'native-base'
import { connect } from 'react-redux'
import { format } from 'date-fns'
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory-native'

class Stock extends Component {
  render() {
    const { width } = Dimensions.get('window')
    const { chart, quote } = this.props.stock.data

    return (
      <Content style={styles}>
        {chart &&
          quote && (
            <View>
              <Text>{quote.companyName}</Text>
              <Text>
                {quote.primaryExchange}: {quote.symbol}
              </Text>
              <Text>{quote.latestPrice} USD</Text>
              <Text>{format(new Date(quote.latestUpdate), 'MMM D, h:mm A [EST]')}</Text>
              <VictoryChart width={width} theme={VictoryTheme.material}>
                <VictoryLine data={chart} style={lineStyles} x="date" y="close" />
              </VictoryChart>
            </View>
          )}
      </Content>
    )
  }
}

styles = {
  display: 'flex',
  flex: 1,
  flexDirection: 'column'
}

lineStyles = {
  data: {
    stroke: '#c43a31',
    strokeWidth: 2
  },
  labels: {
    fill: 'transparent'
  }
}

const mapStateToProps = state => {
  return {
    stock: state.stock,
    symbols: state.symbols
  }
}

export default connect(mapStateToProps)(Stock)
