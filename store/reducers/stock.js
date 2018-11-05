import { GET_STOCK, GET_STOCK_SUCCESS, GET_STOCK_FAIL } from "../constants";

const initialState = {
  data: {}
};

export const stock = (state = initialState, action) => {
  switch (action.type) {
    case GET_STOCK:
      return { ...state, loading: true };
    case GET_STOCK_SUCCESS:
      return { ...state, loading: false, data: action.payload.data };
    case GET_STOCK_FAIL:
      return {
        ...state,
        loading: false,
        error: "Error while fetching symbol."
      };
    default:
      return state;
  }
}
