import { SAVE_FAVORITE } from '../../constants'

const initialState = []

export const favorites = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_FAVORITE:
      return [...state, action.payload]
    default:
      return state
  }
}
