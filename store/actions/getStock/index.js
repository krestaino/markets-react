import { GET_STOCK } from "../../constants";

export const getStock = symbol => {
  return {
    type: GET_STOCK,
    payload: {
      request: {
        url: `/stock/${symbol}/batch?types=quote,news,chart&range=1m&last=1`
      }
    }
  };
};
