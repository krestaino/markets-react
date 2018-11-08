import { DELETE_FAVORITE } from '../../constants'

export const deleteFavorite = symbol => {
  return {
    type: DELETE_FAVORITE,
    payload: symbol
  }
}
