import React, { Component } from "react";
import { connect } from "react-redux";
import { List, ListItem, Text } from "native-base";

import getSymbols from "../actions/getSymbols";

class Symbols extends Component {
  componentDidMount = () => {
    this.props.getSymbols();
  };

  render() {
    return (
      <List>
        <ListItem>
          <Text>{this.props.symbols.data.length}</Text>
        </ListItem>
        <ListItem>
          <Text>{JSON.stringify(this.props.symbol)}</Text>
        </ListItem>
        <ListItem>
          <Text>{JSON.stringify(this.props.stock)}</Text>
        </ListItem>
      </List>
    );
  }
}

const mapStateToProps = state => {
  return {
    symbol: state.symbol,
    symbols: state.symbols
  };
};

const mapDispatchToProps = {
  getSymbols
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Symbols);
