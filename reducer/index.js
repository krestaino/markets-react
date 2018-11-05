export const GET_STOCK = "my-awesome-app/stock/LOAD";
export const GET_STOCK_SUCCESS = "my-awesome-app/stock/LOAD_SUCCESS";
export const GET_STOCK_FAIL = "my-awesome-app/stock/LOAD_FAIL";

export default function reducer(state = { stock: {} }, action) {
  switch (action.type) {
    case GET_STOCK:
      return { ...state, loading: true };
    case GET_STOCK_SUCCESS:
      return { ...state, loading: false, stock: action.payload.data };
    case GET_STOCK_FAIL:
      return {
        ...state,
        loading: false,
        error: "Error while fetching stock"
      };
    default:
      return state;
  }
}

export const fetchStock = symbol => {
  return {
    type: GET_STOCK,
    payload: {
      request: {
        url: `/stock/${symbol}/batch?types=quote,news,chart&range=1m&last=1`
      }
    }
  };
}
