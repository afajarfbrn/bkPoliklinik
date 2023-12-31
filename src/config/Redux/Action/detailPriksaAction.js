import axios from "axios";

export const getDetailPriksa = () => {
  return async (dispatch) => {
    dispatch({ type: "SET_IS_LOADING", payload: true });
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}api/detail_periksa/`
      );

      dispatch({ type: "SET_DETAIL_PRIKSA", payload: data.data });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getDetailPriksaByPeriksaId = (id) => {
  return async (dispatch) => {
    dispatch({ type: "SET_IS_LOADING", payload: true });
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}api/detail_periksa/periksa/${id}`
      );

      dispatch({ type: "SET_DETAIL_PRIKSA_BY_PERIKSA_ID", payload: data.data });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getDetailPriksaById = (id) => {
  return async (dispatch) => {
    dispatch({ type: "SET_IS_LOADING", payload: true });
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}api/detail_periksa/${id}`
      );

      dispatch({ type: "SET_DETAIL_PRIKSA_BY_ID", payload: data.data });
    } catch (err) {
      console.log(err);
    }
  };
};

export const addDetailPriksa = (values) => {
  return async (dispatch) => {
    dispatch({ type: "SET_IS_LOADING", payload: true });
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}api/detail_periksa/`,
        values
      );

      dispatch(getDetailPriksa());
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateDetailPriksa = (id, values) => {
  return async (dispatch) => {
    dispatch({ type: "SET_IS_LOADING", payload: true });
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}api/detail_periksa/${id}`,
        values
      );

      dispatch({ type: "SET_DETAIL_PRIKSA", payload: data.data });
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteDetailPriksa = (id) => {
  return async (dispatch) => {
    dispatch({ type: "SET_IS_LOADING", payload: true });
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_URL}api/detail_periksa/${id}`
      );

      dispatch({ type: "SET_DETAIL_PRIKSA", payload: data.data });
    } catch (err) {
      console.log(err);
    }
  };
};
