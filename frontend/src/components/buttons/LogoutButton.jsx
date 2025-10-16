import { useNavigate } from "react-router-dom";
import { IoLogInOutline } from "react-icons/io5";

export function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); // hapus user
    navigate("/login");              // redirect ke login
  };

  return (
    <button
      onClick={handleLogout}
      className="flex flex-row gap-2 py-1 px-3 text-sm font-regular text-slate-600 rounded-md hover:underline cursor-pointer"
    >
      Log out
      <IoLogInOutline size={20}/>
    </button>
  );
}
