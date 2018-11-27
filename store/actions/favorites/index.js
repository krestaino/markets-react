import { Actions } from '../../../constants'

export const clearFavorites = () => {
  return {
    type: Actions.CLEAR_FAVORITES
  }
}

export const getFavorites = symbols => {
  return {
    type: Actions.GET_FAVORITES,
    payload: {
      request: {
        url: `/stock/market/batch?symbols=${symbols.join()}&types=quote`
      }
    }
  }
}

export const toggleFavorite = stock => {
  return {
    type: Actions.TOGGLE_FAVORITE,
    payload: stock
  }
}
