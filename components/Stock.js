import React, { Component } from "react";
import "../styles/Stock.css";

class Stock extends Component {
  render() {
    const {
      companyName,
      symbol,
      latestPrice,
      changePercent,
      change,
      closeTime
    } = this.props.stockData.quote;

    return (
      <div className="stock-card">
        <h1 className="companyName">
          {companyName}
          <span className="symbol">({symbol})</span>
        </h1>
        <div className="price">
          <span className="latestPrice">{latestPrice}</span>
          <span className="currency">USD</span>
          <span className={changePercent < 0 ? "negative" : "positive"}>
            <span className="change">{change}</span>
            <span className="changePercent">
              ({(changePercent * 100).toFixed(2)})
            </span>
          </span>
        </div>
        <span className="closeTime">{closeTime}</span>
      </div>
    );
  }
}

export default Stock;
