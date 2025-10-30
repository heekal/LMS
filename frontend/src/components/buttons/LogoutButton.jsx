import { useNavigate } from "react-router-dom";
import { IoLogInOutline } from "react-icons/io5";
import axios from "../../api/axios";

export function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await axios.post('/api/auth/logout', {}, {withCredentials: true});
    alert(res.data.message);
    
    navigate("/login");
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
