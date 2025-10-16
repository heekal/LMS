import { createContext } from "react"
import { NavLink } from "react-router-dom"
import { LogoutButton } from "../components/buttons/LogoutButton"

export default function Navbar({ children }) {
  return (
    <>
      <div className="flex flex-col h-screen w-[265px] relative border-r border-stone-200 bg-[#F5F5F7] "> {/* 265 px */}
        <div className="flex flex-row border-b border-stone-200 pt-4 pb-3 pl-4">
          <h1 className="pl-1 pr-1 text-lg  ">📂</h1>
          <h1 className="font-regular text-lg font-bold text-stone-800 pl-2">Your Workspace</h1>
        </div>
        <ul className="pt-3">{children}</ul>
        <div className="absolute bottom-0 border-t border-stone-200 flex justify-end w-full p-3">
          <LogoutButton />
        </div>
      </div>
    </>
  )
}

export function NavbarContent({ text, path, icon }) {

  return (
    <li className="mx-2 my-1">
      <NavLink
        to={path}
        end // Prop 'end' penting untuk dashboard agar tidak aktif di path lain
        className={({ isActive }) => `
          flex flex-row items-center gap-4 rounded-md
          cursor-pointer py-2 pl-4
          text-sm transition-colors group
          ${isActive
            ? "bg-[#CBCBCB] font-semibold text-stone-800"
            : "font-regular text-stone-400 hover:bg-[#CBCBCF] hover:text-stone-700"
          }`
        }
      >
        {icon}
        <span>{text}</span>
      </NavLink>
    </li>
  );
}