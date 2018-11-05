import React, { Component } from "react";
import { Content, Text, View } from "native-base";
import { connect } from "react-redux";

class Stock extends Component {
  render() {
    const { stock } = this.props;

    return (
      <Content style={this.styles}>
        {stock.quote && <View>
          <Text>{stock.quote.companyName}</Text>
          <Text>{stock.quote.primaryExchange}</Text>
        </View>}
      </Content>
    );
  }
}

const styles = {
  display: 'flex',
  flex: 1,
  flexDirection: 'column'
}

const mapStateToProps = state => {
  return {
    stock: state.stock
  };
};

export default connect(
  mapStateToProps
)(Stock);
