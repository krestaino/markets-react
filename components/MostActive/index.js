import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getMostActive } from '../../store/actions'
import { preLoad } from '../../helpers/preLoad'

import List from '../List'

class MostActive extends Component {
  onRefresh = () => this.props.getMostActive()

  componentDidUpdate = prevProps => {
    const { mostActive, tabs } = this.props

    if (tabs.index !== prevProps.tabs.index) {
      if (mostActive.loading === null && preLoad(5)) {
        this.props.getMostActive()
      }
    }
  }

  render() {
    const { data, loading } = this.props.mostActive

    return (
      <List header="MOST ACTIVE" loading={loading} list={data} />
    )
  }
}

const mapStateToProps = state => ({
  mostActive: state.mostActive,
  tabs: state.tabs
})

const mapDispatchToProps = {
  getMostActive
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MostActive)
