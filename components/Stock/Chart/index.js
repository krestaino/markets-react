import React, { Component } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { Text, View } from 'native-base'
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

  activeRangeStyles = range => (this.props.stock.range === range ? styles.rangesActive : null)

  positiveOrNegativeOverTime = (x, y) =>
    x > y ? { ...svgStyles.chartLine, ...svgStyles.negative } : { ...svgStyles.chartLine, ...svgStyles.positive }

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

    const _chart = chart
      .filter(interval => interval.close || interval.marketClose)
      .map(interval => ({
        close: interval.close || interval.marketClose,
        label: interval.label
      }))

    const highestClosePrice = Math.max.apply(Math, _chart.map(o => o.close))
    const label = <VictoryLabel style={svgStyles.chartLabel} />
    const lineSegment = <LineSegment style={svgStyles.chartGrid} type={'grid'} />

    return (
      <View>
        <View style={styles.rangesContainer}>
          {this.state.ranges.map((range, index) => (
            <Touchable
              background={Touchable.Ripple(BLUE2)}
              key={index}
              onPress={() => this.props.getStock(quote.symbol, range.query)}
              style={styles.rangesButton}
            >
              <Text style={[styles.rangesLabel, this.activeRangeStyles(range.query)]}>{range.label}</Text>
            </Touchable>
          ))}
        </View>
        <View
          pointerEvents="none"
          style={[styles.chart, { marginLeft: this.chartWidth(highestClosePrice, width).marginLeft }]}
        >
          <VictoryChart
            height={250}
            width={this.chartWidth(highestClosePrice, width).width}
            theme={VictoryTheme.material}
          >
            <VictoryAxis
              crossAxis
              gridComponent={lineSegment}
              tickCount={4}
              tickLabelComponent={<VictoryLabel style={svgStyles.chartLabel} />}
            />
            <VictoryAxis
              dependentAxis
              gridComponent={lineSegment}
              tickLabelComponent={label}
              tickFormat={t => t.toLocaleString('en-US')}
            />
            <VictoryLine
              data={_chart}
              style={this.positiveOrNegativeOverTime(_chart[0].close, _chart[_chart.length - 1].close)}
              y="close"
              x="label"
            />
          </VictoryChart>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  chart: {
    marginBottom: -10,
    marginTop: -36
  },
  rangesActive: {
    color: TEXT_NORMAL
  },
  rangesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 16
  },
  rangesButton: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 12
  },
  rangesLabel: {
    color: TEXT_DARK,
    fontSize: 12
  }
})

const svgStyles = {
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
  chartGrid: {
    stroke: BLUE2
  },
  chartLabel: {
    fill: TEXT_DARK,
    fontSize: '11',
    stroke: 'transparent'
  },
  chartLine: {
    labels: {
      fill: 'transparent'
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
