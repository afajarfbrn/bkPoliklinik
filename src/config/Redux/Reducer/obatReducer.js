const initialState = {
  obat: [],
  obatById: {},
};

const obatReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_OBAT":
      return {
        ...state,
        obat: action.payload,
      };
    case "SET_OBAT_BY_ID":
      return {
        ...state,
        obatById: action.payload,
      };
    default:
      return state;
  }
};

export default obatReducer;
