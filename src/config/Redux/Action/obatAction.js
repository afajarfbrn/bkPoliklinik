import axios from "axios";
import Swal from "sweetalert2";

export const getObat = () => {
  return async (dispatch) => {
    dispatch({ type: "SET_IS_LOADING", payload: true });
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}api/obat/`
      );
      dispatch({ type: "SET_OBAT", payload: data.data });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getObatById = (id) => {
  return async (dispatch) => {
    dispatch({ type: "SET_IS_LOADING", payload: true });
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}api/obat/${id}`
      );
      dispatch({ type: "SET_OBAT_BY_ID", payload: data.data });
    } catch (err) {
      console.log(err);
    }
  };
};

export const storeObat = (data) => {
  return async (dispatch) => {
    dispatch({ type: "SET_IS_LOADING", payload: true });
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}api/obat/`,
        {
          nama_obat: data.nama_obat,
          kemasan: data.kemasan,
          harga: data.harga,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(getObat());
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateObat = (id, data) => {
  return async (dispatch) => {
    dispatch({ type: "SET_IS_LOADING", payload: true });
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}api/obat/${id}`,
        {
          nama_obat: data.nama_obat,
          kemasan: data.kemasan,
          harga: data.harga,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(getObat());
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteObat = (id) => {
  return async (dispatch) => {
    dispatch({ type: "SET_IS_LOADING", payload: true });
    try {
      Swal.fire({
        title: "Apakah anda yakin?",
        text: "Obat akan dihapus secara permanen",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(`${import.meta.env.VITE_API_URL}api/obat/${id}`);
          dispatch(getObat());
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
};
