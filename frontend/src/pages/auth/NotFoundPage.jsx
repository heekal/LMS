import { useNavigate } from "react-router";
import { IoChevronBackOutline } from "react-icons/io5";
;
export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate("/mahasiswa/");
  };

  return(
    <div className="h-screen w-screen bg-stone-50 grid grid-cols">
      <div className="flex items-start pt-5 pl-3">
        <button onClick={handleBackToDashboard} className="text-sm flex flex-row items-center gap-2 hover:underline cursor-pointer">
          <IoChevronBackOutline size={20}/>
          Dashboard
        </button>
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-[50px] font-semibold text-stone-800 pb-3">404 Page Not Found</h1>
      </div>
    </div>
  )
}