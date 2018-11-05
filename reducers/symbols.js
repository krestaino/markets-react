import { GET_SYMBOLS, GET_SYMBOLS_SUCCESS, GET_SYMBOLS_FAIL } from '../constants'

const initialState = {
  data: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SYMBOLS:
      return { ...state, loading: true };
    case GET_SYMBOLS_SUCCESS:
      return { ...state, loading: false, data: action.payload.data };
    case GET_SYMBOLS_FAIL:
      return {
        ...state,
        loading: false,
        error: "Error while fetching symbols."
      };
    default:
      return state;
  }
};
