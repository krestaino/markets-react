import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";

import { fetchStock } from "../reducer";

class RepoList extends Component {
  componentDidMount() {
    this.props.fetchStock("aapl");
  }
  render() {
    const { stock } = this.props;

    return (
      <View>
        {stock.quote && <Text>{stock.quote.companyName}</Text>}
      </View>
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
)(RepoList);
