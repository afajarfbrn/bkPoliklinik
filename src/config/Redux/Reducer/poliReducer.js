const initialState = {
  poli: [],
  poliById: {},
  isLoading: false,
};

const poli = (state = initialState, action) => {
  switch (action.type) {
    case "SET_POLI":
      return {
        ...state,
        poli: action.payload,
      };
    case "SET_POLI_BY_ID":
      return {
        ...state,
        poliById: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
};

export default poli;
