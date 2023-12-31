import axios from "axios";

export const getDaftarPoli = () => {
  return async (dispatch) => {
    dispatch({ type: "SET_IS_LOADING", payload: true });
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}api/daftar_poli/`
      );

      dispatch({ type: "SET_DAFTAR_POLI", payload: data.data });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getDaftarPoliById = (id) => {
  return async (dispatch) => {
    dispatch({ type: "SET_IS_LOADING", payload: true });
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}api/daftar_poli/${id}`
      );

      dispatch({ type: "SET_DAFTAR_POLI_BY_ID", payload: data.data });
    } catch (err) {
      console.log(err);
    }
  };
};

export const addDaftarPoli = (data, nav) => {
  return async (dispatch) => {
    dispatch({ type: "SET_IS_LOADING", payload: true });
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}api/daftar_poli/`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
      nav("/admin/daftar-poli");
      dispatch(getDaftarPoli());
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateDaftarPoli = (id, data, nav) => {
  return async (dispatch) => {
    dispatch({ type: "SET_IS_LOADING", payload: true });
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}api/daftar_poli/${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
      nav("/admin/daftar-poli");
      dispatch(getDaftarPoli());
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteDaftarPoli = (id, nav) => {
  return async (dispatch) => {
    dispatch({ type: "SET_IS_LOADING", payload: true });
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}api/daftar_poli/${id}`
      );
      console.log(res);
      nav("/admin/daftar-poli");
      dispatch(getDaftarPoli());
    } catch (err) {
      console.log(err);
    }
  };
};
