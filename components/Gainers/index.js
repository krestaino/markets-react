import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getGainers } from '../../store/actions'
import { preLoad } from '../../helpers/preLoad'

import List from '../List'

class Gainers extends Component {
  onRefresh = () => this.props.getGainers()

  componentDidUpdate = prevProps => {
    const { gainers, tabs } = this.props

    if (tabs.index !== prevProps.tabs.index) {
      if (gainers.loading === null && preLoad(3)) {
        this.props.getGainers()
      }
    }
  }

  render() {
    const { data, loading } = this.props.gainers

    return <List header="GAINERS" loading={loading} list={data} />
  }
}

const mapStateToProps = state => ({
  gainers: state.gainers,
  tabs: state.tab
})

const mapDispatchToProps = {
  getGainers
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Gainers)
