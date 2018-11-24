import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getLosers } from '../../store/actions/'

import List from '../List'

class Losers extends Component {
  onRefresh = () => this.props.getLosers()

  componentDidUpdate = prevProps => {
    const { losers, tabs } = this.props

    if (tabs.index !== prevProps.tabs.index) {
      if (losers.loading === null && tabs.index === 4) {
        this.props.getLosers()
      }
    }
  }

  render() {
    const { data, loading } = this.props.losers

    return <List header="LOSERS" loading={loading} list={data} />
  }
}

const mapStateToProps = state => ({
  losers: state.losers,
  tabs: state.tab
})

const mapDispatchToProps = {
  getLosers
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Losers)
