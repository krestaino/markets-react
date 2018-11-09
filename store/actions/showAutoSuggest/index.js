import { SHOW_AUTOSUGGEST } from '../../constants'

export const showAutoSuggest = symbol => {
  return {
    type: SHOW_AUTOSUGGEST,
    payload: symbol
  }
}
