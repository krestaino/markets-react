import React, { Component } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { Icon, View, Text } from 'native-base'
import { connect } from 'react-redux'
import { TabBar, TabView, SceneMap } from 'react-native-tab-view'

import { Colors } from '../../constants'
import { setTab } from '../../store/actions/'

import Stock from '../Stock'
import Favorites from '../Favorites'
import Sectors from '../Sectors'
import Gainers from '../Gainers'
import Losers from '../Losers'
import MostActive from '../MostActive'
import Crypto from '../Crypto'

class Home extends Component {
  favoritesTab = () => (
    <View style={styles.container}>
      <Favorites />
    </View>
  )

  stockTab = () => (
    <View style={styles.container}>
      <Stock />
    </View>
  )

  sectorsTab = () => (
    <View style={styles.container}>
      <Sectors />
    </View>
  )

  gainersTab = () => (
    <View style={styles.container}>
      <Gainers />
    </View>
  )

  losersTab = () => (
    <View style={styles.container}>
      <Losers />
    </View>
  )

  mostActiveTab = () => (
    <View style={styles.container}>
      <MostActive />
    </View>
  )

  cryptoTab = () => (
    <View style={styles.container}>
      <Crypto />
    </View>
  )

  ipoTab = () => (
    <View style={styles.container}>
      <Text style={{ padding: 16 }}>IPO</Text>
    </View>
  )

  earningsTab = () => (
    <View style={styles.container}>
      <Text style={{ padding: 16 }}>Earnings</Text>
    </View>
  )

  renderIcon = ({ route }) => <Icon name={route.icon} style={{ fontSize: 20, color: Colors.TEXT_DARK }} />

  sceneMap = SceneMap({
    search: this.stockTab,
    favorites: this.favoritesTab,
    sectors: this.sectorsTab,
    gainers: this.gainersTab,
    losers: this.losersTab,
    mostActive: this.mostActiveTab,
    crypto: this.cryptoTab,
    ipo: this.ipoTab,
    earnings: this.earningsTab
  })

  tabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicatorStyle}
      labelStyle={styles.labelStyle}
      pressColor={Colors.BLUE2}
      style={styles.tabBar}
      useNativeDriver={true}
      scrollEnabled={true}
      tabStyle={{ paddingHorizontal: 0, paddingVertical: 8, width: 84 }}
      renderIcon={this.renderIcon}
    />
  )

  componentDidUpdate() {
    console.log(this.props.tab.index)
  }

  render = () => (
    <View style={styles.container}>
      <TabView
        initialLayout={styles.initialLayout}
        navigationState={this.props.tab}
        onIndexChange={index => this.props.setTab(index)}
        renderScene={this.sceneMap}
        renderTabBar={props => this.tabBar(props)}
        tabBarPosition="bottom"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  initialLayout: {
    height: 0,
    width: Dimensions.get('window').width
  },
  indicatorStyle: {
    backgroundColor: Colors.TEXT_DARK,
    top: 0
  },
  labelStyle: {
    color: Colors.TEXT_NORMAL,
    fontSize: 10,
    height: 65,
    marginHorizontal: 0,
    marginBottom: 4,
    paddingVertical: 0
  },
  tabBar: {
    backgroundColor: Colors.BLUE1,
    borderTopColor: Colors.BLUE2,
    borderTopWidth: 1,
    elevation: 0,
    height: 65,
    paddingTop: 2
  }
})

const mapStateToProps = state => ({
  favorites: state.favorites,
  tab: state.tab
})

const mapDispatchToProps = {
  setTab
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
