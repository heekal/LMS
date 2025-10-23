import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router";

export default function CertificateVerificator() {
  const navigate = useNavigate();
  
  const handleAuthenticating = () => {
    return;
  };
  
  const handleBackToLogin = () => {
    navigate("/");
  };

  return (
    <div className="h-screen w-screen bg-stone-50 grid grid-cols">
      <div className="flex items-start pt-5 pl-3">
        <button onClick={handleBackToLogin} className="text-sm flex flex-row items-center gap-2 hover:underline cursor-pointer">
          <IoChevronBackOutline size={20}/>
          Login Page
        </button>
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-[50px] font-semibold text-stone-800 pb-3">University Diploma Authenticator</h1>
        <span className="text-md text-zinc-700 italic pb-3">please input your credentials below</span>
        <form onSubmit={handleAuthenticating} className="cursor-pointer flex flex-col flex-grow-y outline rounded-3xl py-1 pl-5 pr-1 bg-slate-50 outline-stone-500">
          <div className="flex flex-row">
            <input className="cursor-pointer font-regular placeholder-blue-300 w-[500px]" placeholder="Diploma Number"/>
            <button type="submit" className="cursor-pointer text-stone-700 py-3 px-5 transition-colors hover:bg-indigo-200 rounded-4xl"><FaMagnifyingGlass /></button>
          </div>
        </form>
      </div>
      <span className="flex items-end justify-center text-xs pb-4 text-stone-600 bottom-0">Powered by advanced blockchain verification — your diploma data remains authentic, traceable, and immutable across time.</span>
    </div>
  )
}