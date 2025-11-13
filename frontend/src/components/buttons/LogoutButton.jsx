import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoLogInOutline, IoCloseOutline } from "react-icons/io5";
import axios from "../../api/axios";

export function LogoutButton() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post('/api/auth/logout', {}, {withCredentials: true});
      navigate("/login");
      alert(res.data.message);
    } catch (error) {
      alert("Logout gagal, coba lagi");
      setShowModal(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button onClick={() => setShowModal(true)} className="flex flex-row gap-2 py-1 px-3 text-sm font-regular text-slate-600 rounded-md hover:underline cursor-pointer">
        Log out
        <IoLogInOutline size={20}/>
      </button>

      {showModal && (
        <div className="fixed bottom-10 right-10 z-50 animate-slide-left">
          <div className="rounded-md shadow-sm relative border border-stone-400 hover:shadow-lg">
            <button onClick={() => setShowModal(false)} className="cursor-pointer absolute -top-3 -right-2 bg-stone-200 hover:bg-stone-300 text-white rounded-full p-1 border border-stone-700" disabled={isLoading}>
              <IoCloseOutline size={15} color="black"/>
            </button>

            <div className="flex flex-col items-center">
              <h3 className="pt-2 px-5 mt-1 text-md text-stone-700 cursor-default">
                Make sure all of your jobs are 
              </h3>
              <h3 className="pb-2 px-5 mb-2 text-md text-stone-700 cursor-default">
                finished before logging out 🧐
              </h3>

              <div className="flex flex-col gap-2 pb-2 w-full px-2">
              <button onClick={handleLogout} className=" cursor-pointer text-xs text-black p-2 bg-green-200 hover:bg-green-300 rounded-md" disabled={isLoading}>
                {isLoading ? "Logging out..." : "Logout"}
              </button>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-md text-xs text-slate-500 hover:text-slate-700 cursor-pointer border-stone-300 hover:border-stone-500 border" disabled={isLoading}>
                Batal
              </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}