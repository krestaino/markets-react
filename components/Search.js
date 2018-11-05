import React, { Component } from "react";
import { connect } from "react-redux";
import { Icon, Item, Input, View } from "native-base";

import { fetchStock, setSymbol } from "../reducer";
import Symbols from "./Symbols";

class Search extends Component {
  componentDidUpdate = () => {
    console.log(this.props.symbol)
  }

  render() {
    return (
      <View>
        <Item searchBar style={{ paddingLeft: 10 }}>
          <Icon name="ios-search" />
          <Input
            autoCorrect={false}
            autoFocus={true}
            onChangeText={symbol => this.props.setSymbol(symbol)}
            onEndEditing={() => this.props.fetchStock(this.props.symbol)}
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
  fetchStock,
  setSymbol
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
