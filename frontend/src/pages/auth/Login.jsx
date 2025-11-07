import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "../../api/axios"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('/api/auth/login', {email, password}, {withCredentials: true});
      navigate(`/${response.data.user.role}`);
    } catch (error) {
      const errorMessage = error.response?.data?.error;
      alert(errorMessage);
    }
  };
 
  const handleVerification = (e) => {
    e.preventDefault;
    navigate("/verify");
  };

  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center h-screen bg-stone-100">
      <h1 className="text-[50px] font-semibold text-stone-800 mt-10">Hi, Welcome to University LMS</h1>
      <span className="mt-2 pb-5 text-stone-800 italic">Enter your details to login into your account</span>
      <form onSubmit={handleLogin} className="w-[300px] flex flex-col outline pt-3 px-6 rounded-md pb-5 bg-slate-50 outline-stone-500">
        <div className="flex flex-col mt-2 justify-center">
          <label className="pr-3 pb-2 text-sm">SSO Account</label>
          <input className="italic border-b text-sm border-stone-300 py-1" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@univ.ac.id"/>
        </div>
        <div className="flex flex-col mt-5 justify-center">
          <label className="pr-3 pb-2 text-sm">Password</label>
          <input className="italic border-b text-sm border-stone-300 py-1" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="***"/>
        </div>
        <button className="text-indigo-950 mt-7 py-2 px-3 flex-wrap rounded-lg cursor-pointer text-xs translation font-semibold bg-blue-200 hover:shadow-xl hover:shadow-sky-100/50" type="submit">Login</button>
      </form>
      <button onClick={handleVerification} className="mb-30 mt-3 text-sm italic font-regular text-stone-700 hover:text-blue-400 hover:underline cursor-pointer">verify your diploma?</button>
    </div>
  )
}