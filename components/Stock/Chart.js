import React, { Component } from 'react'
import { Dimensions, View } from 'react-native'
import { connect } from 'react-redux'
import { format, subDays } from 'date-fns'
import { LineSegment, VictoryGroup, VictoryAxis, VictoryLabel, VictoryLine, VictoryTheme } from 'victory-native'

class Chart extends Component {
  convertXaxis = (x, chartLength) => -x + chartLength

  positiveOrNegativeOverTime = (x, y) =>
    x > y ? { ...styles.chart.line, ...styles.negative } : { ...styles.chart.line, ...styles.positive }

  render() {
    const { chart } = this.props.stock.data
    const { width } = Dimensions.get('window')

    const label = <VictoryLabel style={styles.chart.label} />
    const lineSegment = <LineSegment style={styles.chart.grid} type={'grid'} />

    return (
      <View pointerEvents="none">
        <VictoryGroup height={250} width={width} style={styles.chart} theme={VictoryTheme.material}>
          <VictoryLine
            data={chart}
            style={this.positiveOrNegativeOverTime(chart[0].close, chart[chart.length - 1].close)}
            y="close"
          />
          <VictoryAxis
            crossAxis
            gridComponent={lineSegment}
            tickCount={10}
            tickLabelComponent={<VictoryLabel angle={90} dx={13} dy={-6} style={styles.chart.label} />}
            tickFormat={t => format(subDays(new Date(), this.convertXaxis(t, chart.length)), 'MMM D')}
          />
          <VictoryAxis dependentAxis gridComponent={lineSegment} tickLabelComponent={label} />
        </VictoryGroup>
      </View>
    )
  }
}

const styles = {
  positive: {
    data: {
      stroke: '#0f9d58'
    }
  },
  negative: {
    data: {
      stroke: '#d23f31'
    }
  },
  chart: {
    grid: {
      stroke: '#222a38'
    },
    label: {
      fill: '#6d788c',
      fontSize: '11',
      stroke: 'transparent'
    },
    line: {
      labels: {
        fill: 'transparent'
      }
    },
    parent: {
      paddingLeft: 10,
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

export default connect(mapStateToProps)(Chart)
