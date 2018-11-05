import React, { Component } from "react";
import { Dimensions } from "react-native";
import { Content, Text, View } from "native-base";
import { connect } from "react-redux";
import { format } from "date-fns";
import { VictoryChart, VictoryLabel, VictoryLine, VictoryTheme } from "victory-native";

class Stock extends Component {
  render() {
    const { stock } = this.props;
    const { height, width } = Dimensions.get("window");

    return (
      <Content style={styles}>
        {stock.quote && (
          <View>
            <Text>{stock.quote.companyName}</Text>
            <Text>
              {stock.quote.primaryExchange}: {stock.quote.symbol}
            </Text>
            <Text>{stock.quote.latestPrice} USD</Text>
            <Text>
              {format(
                new Date(stock.quote.latestUpdate),
                "MMM D, h:mm A [EST]"
              )}
            </Text>
            <VictoryChart width={width} theme={VictoryTheme.material}>
              <VictoryLine data={stock.chart} style={lineStyles} x="date" y="close" />
            </VictoryChart>
          </View>
        )}
      </Content>
    );
  }
}

styles = {
  display: "flex",
  flex: 1,
  flexDirection: "column"
};

lineStyles = {
  data: {
    stroke: "#c43a31", strokeWidth: 2
  },
  labels: {
    fill: 'transparent'
  }
}

const mapStateToProps = state => {
  return {
    stock: state.stock
  };
};

export default connect(mapStateToProps)(Stock);
