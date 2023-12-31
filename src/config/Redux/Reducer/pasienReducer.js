const initialState = {
  pasien: {},
  isLogin: false,
  errorMessagePasien: "",
};

const pasienReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PASIEN":
      return {
        ...state,
        pasien: action.payload,
      };
    case "SET_IS_LOGIN":
      return {
        ...state,
        isLogin: action.payload,
      };
    case "SET_ERROR_MESSAGE_PASIEN":
      return {
        ...state,
        errorMessagePasien: action.payload,
      };
    default:
      return state;
  }
};

export default pasienReducer;
