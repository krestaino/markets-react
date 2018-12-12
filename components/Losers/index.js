import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getLosers } from '../../store/actions'

import List from '../List'

class Losers extends Component {
  onRefresh = () => this.props.getLosers()

  componentDidMount() {
    this.props.getLosers()
  }

  render() {
    const { data, latestUpdate, loading } = this.props.losers

    return <List headerTitle="Losers" latestUpdate={latestUpdate} loading={loading} list={data} onRefresh={this.onRefresh} />
  }
}

const mapStateToProps = state => ({
  losers: state.losers
})

const mapDispatchToProps = {
  getLosers
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Losers)
