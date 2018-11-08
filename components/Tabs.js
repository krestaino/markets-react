import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Dimensions } from 'react-native'
import { View } from 'native-base'
import { TabBar, TabView, SceneMap } from 'react-native-tab-view'
import { Constants } from 'expo'

import { setTab } from '../store/actions/'

import Search from './Search'
import Stock from './Stock'
import Favorites from './Favorites'

class Tabs extends Component {
  searchRoute = () => (
    <View style={styles.container}>
      <Search />
      <Stock />
    </View>
  )

  favoritesRoute = () => (
    <View style={styles.container}>
      <Favorites />
    </View>
  )

  render() {
    return (
      <View style={[styles.container, { paddingTop: Constants.statusBarHeight - 14 }]}>
        <TabView
          navigationState={this.props.tab}
          renderScene={SceneMap({
            search: this.searchRoute,
            favorites: this.favoritesRoute
          })}
          onIndexChange={index => this.props.setTab(index)}
          initialLayout={{ height: 0, width: Dimensions.get('window').width }}
          renderTabBar={props => (
            <TabBar
              {...props}
              indicatorStyle={styles.tabBar.indicatorStyle}
              labelStyle={styles.tabBar.labelStyle}
              pressColor={styles.tabBar.pressColor}
              style={styles.tabBar.self}
              useNativeDriver={true}
            />
          )}
        />
      </View>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column'
  },
  tabBar: {
    indicatorStyle: {
      backgroundColor: '#6d788c'
    },
    labelStyle: {
      color: '#bcc6d9'
    },
    pressColor: '#232f3a',
    self: {
      backgroundColor: '#182129'
    }
  }
}

const mapStateToProps = state => {
  return {
    tab: state.tab
  }
}

const mapDispatchToProps = {
  setTab
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tabs)
