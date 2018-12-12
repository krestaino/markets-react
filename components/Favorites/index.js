import React, { Component } from 'react'
import { connect } from 'react-redux'
import { clearFavorites, getFavorites } from '../../store/actions'
import { TextStrings } from '../../constants'

import List from '../List'

class Favorites extends Component {
  onRefresh = () => this.props.getFavorites(this.props.favorites.symbols)

  componentDidMount() {
    this.props.getFavorites(this.props.favorites.symbols)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.favorites.symbols !== this.props.favorites.symbols) {
      this.props.favorites.symbols.length
        ? this.props.getFavorites(this.props.favorites.symbols)
        : this.props.clearFavorites()
    }
  }

  render() {
    const { data, latestUpdate, loading } = this.props.favorites

    return <List headerTitle="Favorites" latestUpdate={latestUpdate} loading={loading} list={data} noListData={TextStrings.NO_FAVORITES} onRefresh={this.onRefresh} />
  }
}

const mapStateToProps = state => ({
  favorites: state.favorites
})

const mapDispatchToProps = {
  clearFavorites,
  getFavorites
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favorites)
