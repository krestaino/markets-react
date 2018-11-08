import { SAVE_FAVORITE } from '../../constants'

export const saveFavorite = stock => {
  return {
    type: SAVE_FAVORITE,
    payload: stock
  }
}
