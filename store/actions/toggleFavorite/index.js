import { TOGGLE_FAVORITE } from '../../../constants'

export const toggleFavorite = stock => {
  return {
    type: TOGGLE_FAVORITE,
    payload: stock
  }
}
