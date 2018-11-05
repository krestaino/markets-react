export const GET_STOCK = "stock-check/stock/GET";
export const GET_STOCK_SUCCESS = "stock-check/stock/GET_SUCCESS";
export const GET_STOCK_FAIL = "stock-check/stock/GET_FAIL";
export const GET_SYMBOLS = "stock-check/stock/GET_SYMBOLS";
export const GET_SYMBOLS_SUCCESS = "stock-check/stock/GET_SYMBOLS_SUCCESS";
export const GET_SYMBOLS_FAIL = "stock-check/stock/GET_SYMBOLS_FAIL";
export const SET_SYMBOL = "stock-check/stock/SET_SYMBOL";

const initialState = {
  stock: {},
  symbol: '',
  symbols: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_STOCK:
      return { ...state, loading: true };
    case GET_STOCK_SUCCESS:
      return { ...state, loading: false, stock: action.payload.data };
    case GET_STOCK_FAIL:
      return {
        ...state,
        loading: false,
        error: "Error while fetching symbol."
      };

    case GET_SYMBOLS:
      return { ...state, loading: true };
    case GET_SYMBOLS_SUCCESS:
      return { ...state, loading: false, symbols: action.payload.data };
    case GET_SYMBOLS_FAIL:
      return {
        ...state,
        loading: false,
        error: "Error while fetching symbols."
      };

    case SET_SYMBOL:
      return { ...state, symbol: action.payload };
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
};

export const fetchSymbols = () => {
  return {
    type: GET_SYMBOLS,
    payload: {
      request: {
        url: 'ref-data/symbols'
      }
    }
  };
};

export const setSymbol = symbol => {
  return {
    type: SET_SYMBOL,
    payload: symbol
  };
};
