import { Actions } from '../../../constants'

export const toggleFavorite = stock => {
  return {
    type: Actions.TOGGLE_FAVORITE,
    payload: stock
  }
}
