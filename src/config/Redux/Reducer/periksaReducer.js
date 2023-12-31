const initialState = {
  periksa: [],
  periksaById: [],
  idDataAdd: "",
  periksaByDafPolId: {},
};

const periksaReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PERIKSA":
      return {
        ...state,
        periksa: action.payload,
      };
    case "SET_PERIKSA_BY_ID":
      return {
        ...state,
        periksaById: action.payload,
      };
    case "SET_ID_DATA_ADD":
      return {
        ...state,
        idDataAdd: action.payload,
      };
    case "SET_PERIKSA_BY_DAF_POL_ID":
      return {
        ...state,
        periksaByDafPolId: action.payload,
      };
    default:
      return state;
  }
};

export default periksaReducer;
