import { Actions } from '../../../constants'

const initialState = { data: [], loading: null, error: false }

export const sectors = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_SECTORS:
      return { ...state, loading: true, error: false }
    case Actions.GET_SECTORS_SUCCESS:
      return { ...state, loading: false, data: action.payload.data }
    case Actions.GET_SECTORS_FAIL:
      return { ...state, loading: false, error: 'No results found.' }
    default:
      return state
  }
}
