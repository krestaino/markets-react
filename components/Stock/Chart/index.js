import React, { Component } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { Text, View } from 'native-base'
import { connect } from 'react-redux'
import { LineSegment, VictoryChart, VictoryAxis, VictoryLabel, VictoryLine, VictoryTheme } from 'victory-native'
import Touchable from 'react-native-platform-touchable'

import { Colors, Ranges } from '../../../constants'
import { getStock } from '../../../store/actions/getStock'

class Chart extends Component {
  state = {
    ranges: [
      { label: '1d', range: Ranges.ONE_DAY },
      { label: '1m', range: Ranges.ONE_MONTH },
      { label: '3m', range: Ranges.THREE_MONTHS },
      { label: '6m', range: Ranges.SIX_MONTHS },
      { label: 'YTD', range: Ranges.YEAR_TO_DATE },
      { label: '1y', range: Ranges.ONE_YEAR },
      { label: '2y', range: Ranges.TWO_YEARS },
      { label: '5y', range: Ranges.FIVE_YEARS }
    ]
  }

  activeRangeStyles = range => (this.props.stock.range.query === range ? styles.rangesActive : null)

  positiveOrNegativeOverTime = (x, y) =>
    x > y ? { ...svgStyles.chartLine, ...svgStyles.negative } : { ...svgStyles.chartLine, ...svgStyles.positive }

  chartWidth = (highestClosePrice, width) => {
    const length = Math.round(highestClosePrice).toString().length

    switch (length) {
      case 6:
        return { marginLeft: 18, width: width + 2 }
      case 5:
        return { marginLeft: 12, width: width + 8 }
      case 4:
        return { marginLeft: 6, width: width + 14 }
      case 3:
        return { marginLeft: 2, width: width + 20 }
      case 2:
        return { marginLeft: -2, width: width + 24 }
      case 1:
        return { marginLeft: -10, width: width + 32 }
      default:
        return { marginLeft: 0, width: width }
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

    const highestClosePrice = Math.max.apply(Math, _chart.map(interval => interval.close))
    const label = <VictoryLabel style={svgStyles.chartLabel} />
    const lineSegment = <LineSegment style={svgStyles.chartGrid} type={'grid'} />

    return (
      <View>
        <View style={styles.rangesContainer}>
          {this.state.ranges.map((range, index) => (
            <Touchable
              background={Touchable.Ripple(Colors.BLUE2)}
              key={index}
              onPress={() => this.props.getStock(quote.symbol, range.range)}
              style={styles.rangesButton}
            >
              <Text style={[styles.rangesLabel, this.activeRangeStyles(range.range.query)]}>{range.label}</Text>
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
    color: Colors.TEXT_NORMAL
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
    color: Colors.TEXT_DARK,
    fontSize: 12
  }
})

const svgStyles = {
  positive: {
    data: {
      stroke: Colors.GREEN
    }
  },
  negative: {
    data: {
      stroke: Colors.RED
    }
  },
  chartGrid: {
    stroke: Colors.BLUE2
  },
  chartLabel: {
    fill: Colors.TEXT_DARK,
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
