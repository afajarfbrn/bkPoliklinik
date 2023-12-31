import { combineReducers } from "redux";
import adminReducer from "./adminReducer";
import obatReducer from "./obatReducer";
import dokterReducer from "./dokterReducer";
import pasienReducer from "./pasienReducer";
import poliReducer from "./poliReducer";
import jadwalPeriksaReducer from "./jadwalPeriksaReducer";
import daftarPoliReducer from "./daftarPoliReducer";
import periksaReducer from "./periksaReducer";
import detailPeriksaReducer from "./detailPeriksaReducer";

const reducer = combineReducers({
  adminReducer,
  obatReducer,
  dokterReducer,
  pasienReducer,
  poliReducer,
  jadwalPeriksaReducer,
  daftarPoliReducer,
  periksaReducer,
  detailPeriksaReducer,
});

export default reducer;
