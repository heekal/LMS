import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
  
    let userData = null;
    if (username === "dosen" && password === "123") {
      userData = { username: "dosen", role: "dosen" };
    } else if (username === "mhs" && password === "123") {
      userData = { username: "mhs", role: "mahasiswa" };
    }

    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));

      if (userData.role === "dosen"){
        navigate("/dosen");
      } else if (userData.role === "mahasiswa"){
        navigate("/mahasiswa");
      }
    } 
    else {
      alert("Username atau Password Salah!");
    }
  };
 
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-stone-100">
      {/* title */}
      <h1 className="text-[50px] font-semibold text-stone-800 mt-10">Hi, Welcome to University LMS</h1>
      <span className="mt-2 pb-5 text-stone-800 italic">Enter your details to login into your account</span>
      
      {/* form */}
      <form onSubmit={handleLogin} className="mb-30 w-[300px] flex flex-col outline pt-3 px-6 rounded-md pb-5 bg-slate-50 outline-stone-500">
        <div className="flex flex-col mt-2 justify-center">
          <label className="pr-3 pb-2 text-sm">SSO Username</label>
          <input className="italic border-b text-sm border-stone-300 py-1" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="example@univ.com"/>
        </div>
        <div className="flex flex-col mt-5 justify-center">
          <label className="pr-3 pb-2 text-sm">Password</label>
          <input className="italic border-b text-sm border-stone-300 py-1" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="***"/>
        </div>
        <button 
        className="
          text-indigo-950 mt-7 py-2 px-3 flex-wrap
          rounded-lg cursor-pointer text-xs translation
          font-semibold bg-blue-200 hover:shadow-xl hover:shadow-sky-100/50
        " type="submit">Login</button>
      </form>
    </div>
  )
}