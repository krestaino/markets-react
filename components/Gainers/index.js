import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getGainers } from '../../store/actions'

import List from '../List'

class Gainers extends Component {
  onRefresh = () => this.props.getGainers()

  componentDidMount() {
    this.props.getGainers()
  }

  render() {
    const { data, latestUpdate, loading } = this.props.gainers

    return (
      <List
        headerTitle="Gainers"
        latestUpdate={latestUpdate}
        loading={loading}
        list={data}
        onRefresh={this.onRefresh}
      />
    )
  }
}

const mapStateToProps = state => ({
  gainers: state.gainers
})

const mapDispatchToProps = {
  getGainers
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Gainers)
