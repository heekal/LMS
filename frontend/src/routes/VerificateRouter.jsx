import { Routes, Route } from "react-router";
import CertificateVerificator from "../pages/certificate/CertificateVerificator";
import { LogoutButton } from "../components/buttons/LogoutButton";

export default function VerificateRouter() {
  return(
    <main className="h-screen w-screen">
      <Routes>
        <Route index element={<CertificateVerificator />} />
      </Routes>
    </main>
  )
}