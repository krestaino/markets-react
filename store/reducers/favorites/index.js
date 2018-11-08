import { findIndex } from 'lodash'
import { TOGGLE_FAVORITE } from '../../constants'

const initialState = []

export const favorites = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const index = findIndex(state, action.payload.symbol)

      if (index !== -1) {
        return [...state.slice(0, index), ...state.slice(index + 1)]
      } else {
        return [...state, action.payload]
      }
    default:
      return state
  }
}
