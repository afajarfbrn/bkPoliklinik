const initialState = {
  dokter: {},
  allDokter: [],
  dokterById: {},
  isLoginDokter: false,
};

const dokterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_DOKTER":
      return {
        ...state,
        dokter: action.payload,
      };
    case "SET_IS_LOGIN":
      return {
        ...state,
        isLoginDokter: action.payload,
      };
    case "SET_ALL_DOKTER":
      return {
        ...state,
        allDokter: action.payload,
      };
    case "SET_DOKTER_BY_ID":
      return {
        ...state,
        dokterById: action.payload,
      };
    default:
      return state;
  }
};

export default dokterReducer;
