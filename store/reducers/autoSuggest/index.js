import { Actions } from '../../../constants'

const initialState = false

export const autoSuggest = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SHOW_AUTOSUGGEST:
      return action.payload
    default:
      return state
  }
}
