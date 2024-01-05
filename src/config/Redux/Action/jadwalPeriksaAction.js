import axios from "axios";
import Swal from "sweetalert2";

export const getJadwalPeriksa = () => {
  return async (dispatch) => {
    dispatch({ type: "SET_IS_LOADING", payload: true });
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}api/jadwal_periksa/`
      );

      dispatch({ type: "SET_JADWAL_PERIKSA", payload: data.data });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getJadwalPeriksaById = (id) => {
  return async (dispatch) => {
    dispatch({ type: "SET_IS_LOADING", payload: true });
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}api/jadwal_periksa/${id}`
      );

      dispatch({ type: "SET_JADWAL_PERIKSA_BY_ID", payload: data.data });
    } catch (err) {
      console.log(err);
    }
  };
};

export const addJadwalPeriksa = (data, nav) => {
  return async (dispatch) => {
    dispatch({ type: "SET_IS_LOADING", payload: true });
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}api/jadwal_periksa/`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
      nav("/dokter/jadwal-periksa/" + data.id_dokter);
      dispatch(getJadwalPeriksa());
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateJadwalPeriksa = (id, data, nav) => {
  return async (dispatch) => {
    dispatch({ type: "SET_IS_LOADING", payload: true });
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}api/jadwal_periksa/${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
      nav("/dokter/jadwal-periksa/" + data.id_dokter);
      dispatch(getJadwalPeriksa());
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteJadwalPeriksa = (id) => {
  return async (dispatch) => {
    dispatch({ type: "SET_IS_LOADING", payload: true });
    try {
      Swal.fire({
        title: "Apakah anda yakin?",
        text: "Data yang dihapus tidak dapat dikembalikan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axios.delete(
            `${import.meta.env.VITE_API_URL}api/jadwal_periksa/${id}`
          );
          console.log(res);
          dispatch(getJadwalPeriksa());
          Swal.fire("Terhapus!", "Data berhasil dihapus.", "success");
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
};
