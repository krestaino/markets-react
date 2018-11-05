import React, { Component } from "react";
import { Content, Text, View } from "native-base";
import { connect } from "react-redux";
import { format } from 'date-fns'

class Stock extends Component {
  render() {
    const { stock } = this.props;

    return (
      <Content style={styles}>
        {stock.quote && <View>
          <Text>{stock.quote.companyName}</Text>
          <Text>{stock.quote.primaryExchange}: {stock.quote.symbol}</Text>
          <Text>{stock.quote.latestPrice} USD</Text>
          <Text>{format(new Date(stock.quote.latestUpdate), 'MMM D, h:mm A [EST]')}</Text>
        </View>}
      </Content>
    );
  }
}

styles = {
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
