export const initialState = {
  loading: false,
  error: null,
  response: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "SET_RESPONSE":
      return {
        ...state,
        loading: false,
        response: action.payload,
      };
    default:
      return state;
  }
};
