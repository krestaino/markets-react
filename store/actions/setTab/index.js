import { SET_TAB } from '../../constants'

export const setTab = index => {
  return {
    type: SET_TAB,
    payload: index
  }
}
