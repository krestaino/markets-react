import React, { Component } from 'react'
import { RefreshControl, StyleSheet } from 'react-native'
import { Content, Icon, Text, View } from 'native-base'
import { connect } from 'react-redux'

import { Colors } from '../../constants'
import { getSectors } from '../../store/actions'
import { formatPercentage, positiveOrNegative, sectorIcons, upOrDownSymbol } from '../../helpers'

import ListHeader from '../ListHeader'

class Sectors extends Component {
  onRefresh = () => this.props.getSectors()

  componentDidMount() {
    this.props.getSectors()
  }

  render() {
    const { data, latestUpdate, loading } = this.props.sectors

    return (
      <View style={{ flex: 1 }}>
        <ListHeader latestUpdate={latestUpdate} title="Sectors Performance" />
        <Content
          refreshControl={
            <RefreshControl
              colors={[Colors.TEXT_NORMAL]}
              onRefresh={this.onRefresh}
              progressBackgroundColor={Colors.BLUE3}
              refreshing={loading}
            />
          }
        >
          <View style={styles.container}>
            {data.map((sector, index) => {
              const icon = sectorIcons(sector.name)

              return (
                <View key={index} style={styles.sector}>
                  <Icon name={icon.name} style={{ fontSize: 48, height: 48, color: Colors.BLUE3 }} type={icon.type} />
                  <Text style={[styles.performance, positiveOrNegative(sector.performance)]}>
                    {formatPercentage(sector.performance)}%{upOrDownSymbol(sector.performance)}
                  </Text>
                  <Text style={styles.name}>{sector.name}</Text>
                </View>
              )
            })}
          </View>
        </Content>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16
  },
  sector: {
    alignItems: 'center',
    flexDirection: 'column',
    paddingHorizontal: 4,
    paddingVertical: 16,
    width: '33.33%'
  },
  performance: {
    fontSize: 13,
    marginTop: 8
  },
  name: {
    fontSize: 13,
    marginTop: 4,
    maxWidth: 110,
    textAlign: 'center'
  }
})

const mapStateToProps = state => ({
  sectors: state.sectors
})

const mapDispatchToProps = {
  getSectors
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sectors)
