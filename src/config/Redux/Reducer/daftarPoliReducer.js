const initialState = {
  daftarPoli: [],
  daftarPoliById: {},
  loading: false,
  error: null,
};

const daftarPoliReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_DAFTAR_POLI":
      return {
        ...state,
        daftarPoli: action.payload,
      };
    case "SET_DAFTAR_POLI_BY_ID":
      return {
        ...state,
        daftarPoliById: action.payload,
      };
    default:
      return state;
  }
};

export default daftarPoliReducer;
