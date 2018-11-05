import { SET_SYMBOL } from '../../constants'

const initialState = ''

export const symbol = (state = initialState, action) => {
  switch (action.type) {
    case SET_SYMBOL:
      return action.payload
    default:
      return state
  }
}
