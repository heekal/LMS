import { Routes, Route, Navigate} from "react-router-dom"
import Login from "../pages/auth/Login"
import DosenRouter from "./DosenRouter"
import MahasiswaRouter from "./MahasiswaRouter"
import VerificateRouter from "./VerificateRouter"
import PrivateRoute from "../pages/auth/PrivateRouteHandler"
import NotFoundPage from "../pages/auth/NotFoundPage"

export default function AppRouter(){
  return(
    <Routes>
      <Route path="/" element={<Navigate to ="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dosen/*" element={<PrivateRoute role="dosen"><DosenRouter /></PrivateRoute>} />
      <Route path="/mahasiswa/*" element={<PrivateRoute role="mahasiswa"><MahasiswaRouter /></PrivateRoute>} />
      <Route path="/verify" element={<VerificateRouter />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}