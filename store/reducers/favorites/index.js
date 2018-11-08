import { TOGGLE_FAVORITE } from '../../constants'

const initialState = []

export const favorites = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const index = state.findIndex(symbol => symbol === action.payload)

      if (index !== -1) {
        return [...state.slice(0, index), ...state.slice(index + 1)]
      } else {
        return [...state, action.payload]
      }
    default:
      return state
  }
}
