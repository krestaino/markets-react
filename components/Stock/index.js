import React, { Component } from 'react'
import { Platform, RefreshControl, StyleSheet } from 'react-native'
import { Content, Text, View } from 'native-base'
import { connect } from 'react-redux'

import { Colors } from '../../constants'
import { getStock } from '../../store/actions'

import Search from '../Search'
import AutoSuggest from '../AutoSuggest'
import Info from './Info'
import Chart from './Chart'
import Details from './Details'
import News from './News'
import Save from './Save'

class Stock extends Component {
  onRefresh = () => {
    if (this.props.stock.data.quote) {
      this.props.getStock(this.props.stock.data.quote.symbol, this.props.stock.range)
    }
  }

  render() {
    const { error, loading } = this.props.stock
    const isError = error && !loading

    return (
      <View style={styles.container}>
        <Search />
        <AutoSuggest />
        <View style={styles.container}>
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
            <Info />
            <Chart />
            <Details />
            <News />
          </Content>
          <Save />
        </View>
        {isError && (
          <View behavior={Platform.OS === 'ios' ? 'position' : null} style={[styles.container, styles.center]}>
            <Text>{error}</Text>
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  center: {
    alignItems: 'center',
    paddingTop: 32
  }
})

const mapStateToProps = state => ({
  stock: state.stock,
  symbol: state.symbol
})

const mapDispatchToProps = {
  getStock
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stock)
