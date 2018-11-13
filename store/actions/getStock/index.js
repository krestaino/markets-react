import { GET_STOCK } from '../../../constants'

export const getStock = (symbol, range) => {
  return {
    type: GET_STOCK,
    payload: {
      range: range,
      request: {
        url: `/stock/${symbol}/batch?types=quote,news,chart&range=${range.query}&chartInterval=${range.interval}`
      }
    }
  }
}
