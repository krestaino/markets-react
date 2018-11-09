import { SHOW_AUTOSUGGEST } from '../../constants'

const initialState = false

export const autoSuggest = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_AUTOSUGGEST:
      return action.payload
    default:
      return state
  }
}
