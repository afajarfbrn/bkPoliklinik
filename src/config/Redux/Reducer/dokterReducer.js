const initialState = {
  dokter: {},
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
    default:
      return state;
  }
};

export default dokterReducer;
