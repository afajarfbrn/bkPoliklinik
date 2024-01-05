const initialState = {
  detailPriksa: [],
  detailPriksaById: [],
  detailPriksaByPriksaId: [],
};

const detailPeriksaReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_DETAIL_PRIKSA":
      return {
        ...state,
        detailPriksa: action.payload,
      };
    case "SET_DETAIL_PRIKSA_BY_ID":
      return {
        ...state,
        detailPriksaById: action.payload,
      };
    case "SET_DETAIL_PRIKSA_BY_PERIKSA_ID":
      return {
        ...state,
        detailPriksaByPriksaId: action.payload,
      };
    default:
      return state;
  }
};

export default detailPeriksaReducer;
