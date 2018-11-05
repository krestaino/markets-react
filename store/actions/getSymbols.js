import { GET_SYMBOLS } from '../constants'

export default function() {
  return {
    type: GET_SYMBOLS,
    payload: {
      request: {
        url: "ref-data/symbols"
      }
    }
  };
}
