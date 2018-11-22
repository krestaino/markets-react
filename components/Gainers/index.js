import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getGainers } from '../../store/actions/'

import List from '../List'

class Gainers extends Component {
  onRefresh = () => this.props.getGainers()

  componentDidMount = () => this.props.getGainers()

  render() {
    const { data, loading } = this.props.gainers

    return (
      <List loading={loading} list={data} />
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
