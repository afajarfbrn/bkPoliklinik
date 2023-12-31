const initialState = {
  admin: {},
  isLogin: false,
  errorMessageAdmin: "",
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ADMIN":
      return {
        ...state,
        admin: action.payload,
      };
    case "SET_IS_LOGIN":
      return {
        ...state,
        isLogin: action.payload,
      };
    case "SET_ERROR_MESSAGE_ADMIN":
      return {
        ...state,
        errorMessageAdmin: action.payload,
      };
    default:
      return state;
  }
};

export default adminReducer;
