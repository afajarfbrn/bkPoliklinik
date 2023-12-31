import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import DashboardAdmin from "./pages/Admin/DashboardAdmin";
import Dokter from "./pages/Admin/Dokter";
import Pasien from "./pages/Admin/Pasien";
import Poli from "./pages/Admin/Poli";
import Obat from "./pages/Admin/Obat";
import JadwalPeriksa from "./pages/Dokter/JadwalPeriksa/JadwalPeriksa";
import DaftarPeriksa from "./pages/Dokter/PeriksaPasien/DaftarPeriksa";
import RiwayatPasien from "./pages/Dokter/RiwayatPasien";
import ProfileDokter from "./pages/Dokter/ProfileDokter";
import KelolaJadwalPeriksa from "./pages/Dokter/JadwalPeriksa/KelolaJadwalPeriksa";
import PeriksaPasien from "./pages/Dokter/PeriksaPasien/PeriksaPasien";
import Home from "./pages/Home";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import LoginPortal from "./pages/Auth/LoginPortal";
import { Provider } from "react-redux";
import { store } from "./config";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<Home />} />
            <Route path="/login" element={<LoginPortal />} />
            <Route path="/admin" element={<Sidebar />}>
              <Route path=":id" element={<DashboardAdmin />} />
              <Route path="doctors/:id" element={<Dokter />} />
              <Route path="pasien/:id" element={<Pasien />} />
              <Route path="poli/:id" element={<Poli />} />
              <Route path="obat/:id" element={<Obat />} />
            </Route>
            <Route path="/dokter" element={<Sidebar />}>
              <Route path=":id" element={<DashboardAdmin />} />
              <Route path="jadwal-periksa/:id" element={<JadwalPeriksa />} />
              <Route
                path="jadwal-periksa/kelola-jadwal/:id"
                element={<KelolaJadwalPeriksa />}
              />
              <Route
                path="jadwal-periksa/kelola-jadwal/:idJadwal/:id"
                element={<KelolaJadwalPeriksa />}
              />
              <Route path="daftar-periksa/:id" element={<DaftarPeriksa />} />
              <Route
                path="daftar-periksa/periksa/:idPasien/:id"
                element={<PeriksaPasien />}
              />
              <Route path="riwayat-pasien/:id" element={<RiwayatPasien />} />
              <Route path="profile/:id" element={<ProfileDokter />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
