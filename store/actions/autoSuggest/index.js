import { Actions } from '../../../constants'

export const showAutoSuggest = symbol => {
  return {
    type: Actions.SHOW_AUTOSUGGEST,
    payload: symbol
  }
}
