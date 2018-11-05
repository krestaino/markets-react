import React, { Component } from "react";
import { connect } from "react-redux";
import { Icon, Item, Input } from "native-base";

import { fetchStock } from "../reducer";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stockTicker: null
    };
  }

  render() {
    return (
      <Item searchBar style={{ paddingLeft: 10 }}>
        <Icon name="ios-search" />
        <Input
          autoCorrect={false}
          autoFocus={true}
          onChangeText={stockTicker => this.props.fetchStock(stockTicker)}
          placeholder="Search by stock symbol"
          spellCheck={false}
          value={this.state.stockTicker}
        />
      </Item>
    );
  }
}

const mapStateToProps = state => {
  return {
    stock: state.stock
  };
};

const mapDispatchToProps = {
  fetchStock
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
