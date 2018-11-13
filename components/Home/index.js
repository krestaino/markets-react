import React, { Component } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { View } from 'native-base'
import { connect } from 'react-redux'
import { TabBar, TabView, SceneMap } from 'react-native-tab-view'

import { Colors } from '../../constants'
import { getFavorites, setTab } from '../../store/actions/'

import Search from '../Search'
import AutoSuggest from '../AutoSuggest'
import Stock from '../Stock'
import Favorites from '../Favorites'

class Home extends Component {
  favoritesTab = () => (
    <View style={styles.container}>
      <Favorites />
    </View>
  )

  stockTab = () => (
    <View style={styles.container}>
      <Search />
      <AutoSuggest />
      <Stock />
    </View>
  )

  sceneMap = SceneMap({
    favorites: this.favoritesTab,
    search: this.stockTab
  })

  tabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicatorStyle}
      labelStyle={styles.labelStyle}
      pressColor={Colors.BLUE2}
      style={styles.tabBar}
      useNativeDriver={true}
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
    backgroundColor: Colors.TEXT_DARK
  },
  labelStyle: {
    color: Colors.TEXT_NORMAL
  },
  tabBar: {
    backgroundColor: Colors.BLUE1,
    elevation: 0
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
