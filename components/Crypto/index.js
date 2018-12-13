import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCrypto } from '../../store/actions'

import List from '../List'

class Crypto extends Component {
  onRefresh = () => this.props.getCrypto()

  componentDidMount() {
    this.props.getCrypto()
  }

  render() {
    const { data, latestUpdate, loading } = this.props.crypto

    return (
      <List
        headerTitle="Cryptocurrencies"
        latestUpdate={latestUpdate}
        loading={loading}
        list={data}
        onRefresh={this.onRefresh}
      />
    )
  }
}

const mapStateToProps = state => ({
  crypto: state.crypto
})

const mapDispatchToProps = {
  getCrypto
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Crypto)
