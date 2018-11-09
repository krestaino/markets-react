import { GET_FAVORITES } from '../../constants'

export const getFavorites = symbols => {
  return {
    type: GET_FAVORITES,
    payload: {
      request: {
        url: `/stock/market/batch?symbols=${symbols.join()}&types=quote`
      }
    }
  }
}
