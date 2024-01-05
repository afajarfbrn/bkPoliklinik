const initialState = {
  jadwalPeriksa: [],
  jadwalPeriksaById: [],
  loading: false,
  error: null,
};

const jadwalPeriksaReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_JADWAL_PERIKSA":
      return {
        ...state,
        jadwalPeriksa: action.payload,
      };
    case "SET_JADWAL_PERIKSA_BY_ID":
      return {
        ...state,
        jadwalPeriksaById: action.payload,
      };
    default:
      return state;
  }
};

export default jadwalPeriksaReducer;
