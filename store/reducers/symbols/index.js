import { Actions } from '../../../constants'

const initialState = { data: [], loading: null, error: false }

export const symbols = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_SYMBOLS:
      return { ...state, loading: true }
    case Actions.GET_SYMBOLS_SUCCESS:
      return { ...state, loading: false, data: action.payload.data }
    case Actions.GET_SYMBOLS_FAIL:
      return { ...state, loading: false, error: 'Error while fetching symbols.' }
    default:
      return state
  }
}
