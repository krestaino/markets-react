import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCrypto } from '../../store/actions/'
import { preLoad } from '../../helpers/preLoad'

import List from '../List'

class Crypto extends Component {
  onRefresh = () => this.props.getCrypto()

  componentDidUpdate = prevProps => {
    const { crypto, tabs } = this.props

    if (tabs.index !== prevProps.tabs.index) {
      if (crypto.loading === null && preLoad(6)) {
        this.props.getCrypto()
      }
    }
  }

  render() {
    const { data, loading } = this.props.crypto

    return (
      <List header="CRYPTOCURRENCIES" loading={loading} list={data} />
    )
  }
}

const mapStateToProps = state => ({
  crypto: state.crypto,
  tabs: state.tab
})

const mapDispatchToProps = {
  getCrypto
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Crypto)
