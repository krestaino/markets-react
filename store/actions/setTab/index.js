import { Actions } from '../../../constants'

export const setTab = index => {
  return {
    type: Actions.SET_TAB,
    payload: index
  }
}
