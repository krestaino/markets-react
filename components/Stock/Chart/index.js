import React, { Component } from 'react'
import { Dimensions, View } from 'react-native'
import { Text } from 'native-base'
import { connect } from 'react-redux'
import { LineSegment, VictoryChart, VictoryAxis, VictoryLabel, VictoryLine, VictoryTheme } from 'victory-native'
import Touchable from 'react-native-platform-touchable'

import { BLUE2, GREEN, RED, TEXT_DARK, TEXT_NORMAL } from '../../../constants'
import { getStock } from '../../../store/actions/getStock'

class Chart extends Component {
  state = {
    ranges: [
      { label: '1d', query: '1d' },
      { label: '1m', query: '1m' },
      { label: '3m', query: '3m' },
      { label: '6m', query: '6m' },
      { label: 'YTD', query: 'ytd' },
      { label: '1y', query: '1y' },
      { label: '2y', query: '2y' },
      { label: '5y', query: '5y' }
    ]
  }

  activeRangeStyles = range => (this.props.stock.range === range ? styles.ranges.activeRange : null)

  positiveOrNegativeOverTime = (x, y) =>
    x > y ? { ...styles.chart.line, ...styles.negative } : { ...styles.chart.line, ...styles.positive }

  chartWidth = (highestClosePrice, width) => {
    const length = Math.round(highestClosePrice).toString().length

    if (length > 5) {
      return { width: width + 18, marginLeft: 14 }
    } else if (length > 4) {
      return { width: width + 24, marginLeft: 8 }
    } else if (length > 3) {
      return { width: width + 30, marginLeft: 2 }
    } else if (length > 2) {
      return { width: width + 36, marginLeft: -4 }
    } else if (length > 1) {
      return { width: width + 40, marginLeft: -8 }
    } else {
      return { width: width + 48, marginLeft: -14 }
    }
  }

  render() {
    const { chart, quote } = this.props.stock.data
    const { width } = Dimensions.get('window')

    const _chart = chart.map(interval => {
      return {
        close: interval.close || interval.marketClose || 0,
        label: interval.label
      }
    })

    const highestClosePrice = Math.max.apply(Math, _chart.map(o => o.close))
    const label = <VictoryLabel style={styles.chart.label} />
    const lineSegment = <LineSegment style={styles.chart.grid} type={'grid'} />

    return (
      <View>
        <View style={styles.ranges.container}>
          {this.state.ranges.map((range, index) => (
            <Touchable
              background={Touchable.Ripple(BLUE2)}
              key={index}
              onPress={() => this.props.getStock(quote.symbol, range.query)}
              style={styles.ranges.button}
            >
              <Text style={[styles.ranges.label, this.activeRangeStyles(range.query)]}>{range.label}</Text>
            </Touchable>
          ))}
        </View>
        <View
          pointerEvents="none"
          style={[styles.chart.parent, { marginLeft: this.chartWidth(highestClosePrice, width).marginLeft }]}
        >
          <VictoryChart
            height={250}
            width={this.chartWidth(highestClosePrice, width).width}
            theme={VictoryTheme.material}
          >
            <VictoryLine
              data={_chart}
              style={this.positiveOrNegativeOverTime(_chart[0].close, _chart[chart.length - 1].close)}
              y="close"
              x="label"
            />
            <VictoryAxis
              crossAxis
              gridComponent={lineSegment}
              tickCount={4}
              tickLabelComponent={<VictoryLabel style={styles.chart.label} />}
            />
            <VictoryAxis
              dependentAxis
              gridComponent={lineSegment}
              tickLabelComponent={label}
              tickFormat={t => t.toLocaleString('en-US')}
            />
          </VictoryChart>
        </View>
      </View>
    )
  }
}

const styles = {
  positive: {
    data: {
      stroke: GREEN
    }
  },
  negative: {
    data: {
      stroke: RED
    }
  },
  ranges: {
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
      paddingHorizontal: 16
    },
    activeRange: {
      color: TEXT_NORMAL
    },
    button: {
      alignItems: 'center',
      flex: 1,
      paddingVertical: 12
    },
    label: {
      color: TEXT_DARK,
      fontSize: 12
    }
  },
  chart: {
    grid: {
      stroke: BLUE2
    },
    label: {
      fill: TEXT_DARK,
      fontSize: '11',
      stroke: 'transparent'
    },
    line: {
      labels: {
        fill: 'transparent'
      }
    },
    parent: {
      marginBottom: -10,
      marginTop: -36
    }
  }
}

const mapStateToProps = state => {
  return {
    stock: state.stock
  }
}

const mapDispatchToProps = {
  getStock
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chart)
