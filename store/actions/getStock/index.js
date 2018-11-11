import { GET_STOCK } from '../../../constants'

export const getStock = (symbol, range) => {
  let _range = {}

  switch (range) {
    case '1d':
      _range = { query: '1d', interval: 6 }
      break
    case '1m':
      _range = { query: '1m', interval: 1 }
      break
    case '3m':
      _range = { query: '3m', interval: 1 }
      break
    case '6m':
      _range = { query: '6m', interval: 1 }
      break
    case 'ytd':
      _range = { query: 'ytd', interval: 2 }
      break
    case '1y':
      _range = { query: '1y', interval: 2 }
      break
    case '2y':
      _range = { query: '2y', interval: 4 }
      break
    case '5y':
      _range = { query: '5y', interval: 8 }
      break
    default:
      _range = { query: '1m', interval: 1 }
      break
  }

  return {
    type: GET_STOCK,
    payload: {
      range: _range.query,
      request: {
        url: `/stock/${symbol}/batch?types=quote,news,chart&range=${_range.query}&chartInterval=${_range.interval}`
      }
    }
  }
}
