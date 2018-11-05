import React, { Component } from "react";
import { connect } from "react-redux";
import { Icon, Item, Input, View } from "native-base";

import getStock from "../actions/getStock";
import setSymbol from "../actions/setSymbol";
import Symbols from "./Symbols";

class Search extends Component {
  render() {
    return (
      <View>
        <Item searchBar style={{ paddingLeft: 10 }}>
          <Icon name="ios-search" />
          <Input
            autoCorrect={false}
            autoFocus={true}
            onChangeText={symbol => this.props.setSymbol(symbol)}
            onEndEditing={() => this.props.getStock(this.props.symbol)}
            placeholder="Search by stock symbol"
            spellCheck={false}
          />
        </Item>
        <Symbols />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    stock: state.stock,
    symbol: state.symbol
  };
};

const mapDispatchToProps = {
  getStock,
  setSymbol
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
