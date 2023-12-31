import axios from "axios";

export const registerPasien = (data, setPasien) => {
  return async (dispatch) => {
    dispatch({ type: "SET_IS_LOADING", payload: true });
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}api/auth/pasien/`,
        data
      );
      setPasien(false);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
};

export const getPasien = (token, isLogin = false, nav) => {
  return async (dispatch) => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}api/auth/pasien/me`
      );
      dispatch({ type: "SET_PASIEN", payload: res.data.data });
      dispatch({ type: "SET_IS_LOGIN", payload: true });
      localStorage.setItem("role", res.data.data.role);
      if (isLogin) {
        nav("/" + res.data.data.id);
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const loginPasien = (data, nav) => {
  return async (dispatch) => {
    dispatch({ type: "SET_IS_LOADING", payload: true });
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}api/auth/pasien/login`,
        data
      );
      localStorage.setItem("token", res.data.access_token);
      dispatch({ type: "SET_ERROR_MESSAGE_PASIEN", payload: "" });
      dispatch(getPasien(res.data.access_token, true, nav));
    } catch (err) {
      console.log(err.response.data.error);
      dispatch({
        type: "SET_ERROR_MESSAGE_PASIEN",
        payload: err.response.data.error,
      });
    }
  };
};

export const logoutPasien = (token, nav) => {
  return async (dispatch) => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await axios.post(`${import.meta.env.VITE_API_URL}api/auth/pasien/logout`);
      localStorage.removeItem("token");
      dispatch({ type: "SET_IS_LOGIN", payload: false });
      dispatch({ type: "SET_PASIEN", payload: {} });
      nav("/");
    } catch (err) {
      console.log(err);
    }
  };
};
