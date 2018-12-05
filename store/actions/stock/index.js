import { Actions } from '../../../constants'

export const getStock = (symbol, range) => {
  return {
    type: Actions.GET_STOCK,
    payload: {
      range: range,
      request: {
        url: `/stock/${symbol}/batch?types=quote,news,chart&range=${range.query}&chartInterval=${range.interval}`
      }
    }
  }
}

export const getStockChart = (symbol, range) => {
  return {
    type: Actions.GET_STOCK_CHART,
    payload: {
      range: range,
      request: {
        url: `/stock/${symbol}/batch?types=quote,news,chart&range=${range.query}&chartInterval=${range.interval}`
      }
    }
  }
}
