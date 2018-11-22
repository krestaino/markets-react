import React, { Component } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { Icon, View, Text } from 'native-base'
import { connect } from 'react-redux'
import { TabBar, TabView, SceneMap } from 'react-native-tab-view'

import { Colors } from '../../constants'
import { getFavorites, setTab } from '../../store/actions/'

import Stock from '../Stock'
import Favorites from '../Favorites'
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

  newTab1 = () => (
    <View style={styles.container}>
      <Text>1</Text>
    </View>
  )

  newTab2 = () => (
    <View style={styles.container}>
      <Text>2</Text>
    </View>
  )

  newTab3 = () => (
    <View style={styles.container}>
      <Text>3</Text>
    </View>
  )

  renderIcon = ({ route }) => (
    <Icon name={route.icon} style={{ fontSize: 20, color: Colors.TEXT_DARK }} />
  )

  sceneMap = SceneMap({
    search: this.stockTab,
    favorites: this.favoritesTab,
    gainers: this.gainersTab,
    losers: this.losersTab,
    mostActive: this.mostActiveTab,
    crypto: this.cryptoTab,
    newTab1: this.newTab1,
    newTab2: this.newTab2,
    newTab3: this.newTab3
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

  componentDidMount = () => this.props.getFavorites(this.props.favorites.symbols)


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
    flexDirection: 'column',
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
    backgroundColor: Colors.BLUE2,
    elevation: 0,
    height: 65
  }
})

const mapStateToProps = state => ({
  favorites: state.favorites,
  tab: state.tab
})

const mapDispatchToProps = {
  getFavorites,
  setTab
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
