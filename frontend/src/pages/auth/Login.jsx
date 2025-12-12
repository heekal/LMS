import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "../../api/axios"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showLoginMsg, setShowLoginMsg] = useState(false);
  const [showErrLoginMsg, setShowErrLoginMsg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setShowErrLoginMsg(false);
    setShowLoginMsg(false);

    setIsLoading(true);

    try {
      const response = await axios.post('/auth/login', {email, password}, {withCredentials: true});
      handleSuccessLogin(response.data.user.name);
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Internal Server Error, Please Wait for Another Minutes!";
      handleErrorLogin(errorMessage);

      setIsLoading(false);
    }
  };
 
  const handleErrorLogin = (errorMessage) => {
    setErrorMsg(errorMessage);
    setShowErrLoginMsg(true);

    setTimeout(() => {
      setShowErrLoginMsg(false);
    }, 5000);
  }

  const handleSuccessLogin = (data) => {
    setSuccessMsg(data);
    setShowLoginMsg(true);

    setTimeout(() => {
      setShowLoginMsg(false);
      navigate("/mahasiswa");
    }, 1000);
  }

  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center h-screen bg-stone-100">
      <h1 className="text-[50px] font-semibold text-stone-800 mt-10">Hi, Welcome to University LMS</h1>
      <span className="mt-2 pb-5 text-stone-800 italic">Enter your details to login into your account</span>
      <form className="w-[300px] flex flex-col outline pt-3 px-6 rounded-md pb-5 bg-slate-50 outline-stone-500 mb-20">
        <div className="flex flex-col mt-2 justify-center">
          <label className={`pr-3 pb-2 text-sm ${showErrLoginMsg ? "text-red-500" : "text-black"}`}>SSO Account</label>
          <input className="italic border-b text-sm border-stone-300 py-1" type="text" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} placeholder="example@univ.ac.id"/>
        </div>
        <div className="flex flex-col mt-5 justify-center">
          <label className={`pr-3 pb-2 text-sm ${showErrLoginMsg ? "text-red-500" : "text-black"}`}>Password</label>
          <input className="italic border-b text-sm border-stone-300 py-1" type="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} placeholder="***"/>
        </div>
        <button 
          onClick={handleLogin} 
          disabled={isLoading} 
          className={`
            text-indigo-950 py-2 px-3 flex-wrap rounded-lg text-xs translation font-semibold mt-5
            ${isLoading
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-200 cursor-pointer hover:shadow-xl hover:shadow-sky-100/50"
            }
          `}
        
        >
          {isLoading? "Processing..." : "Login"}
        </button>
      </form>
      
      {showErrLoginMsg && (
          <div className="fixed top-10">
            <div className="flex px-2 py-1 items-center justify-evenly border rounded-sm text-xs bg-rose-100 border-red-400 text-red-700/80">
              {errorMsg}
            </div>
          </div>
        )}

      {showLoginMsg && (
        <div className="fixed top-10">
          <div className="px-2 py-1 border border-green-500 bg-green-200 rounded-md text-xs text-green-900">Hello! {successMsg}</div>
        </div>
      )}
    </div>
  )
}