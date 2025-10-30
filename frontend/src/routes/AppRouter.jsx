import { Routes, Route, Navigate} from "react-router-dom"
import Login from "../pages/auth/Login"
import DosenRouter from "./DosenRouter"
import MahasiswaRouter from "./MahasiswaRouter"
import VerificateRouter from "./VerificateRouter"

function PrivateRoute({ children, role }){
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/login" />;
  return children;
}

export default function AppRouter(){
  return(
    <Routes>
      <Route path="/" element={<Navigate to ="/login" />} />
      <Route path="/login" element={<Login />} />

      {/* Router Dosen */}
      <Route path="/dosen/*" element={<DosenRouter />} />

      {/* Router Mahasiswa */}
      <Route path="/mahasiswa/*" element={<MahasiswaRouter />} />

      {/* Router Verificate */}
      <Route path="/verify/*" element={<VerificateRouter />} />
    </Routes>
  )
}