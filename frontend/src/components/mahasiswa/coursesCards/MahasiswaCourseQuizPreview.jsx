import { FiArrowUpLeft } from "react-icons/fi"
import { NavLink } from "react-router"

export default function MahasiswaCourseQuizNav({ children }) {
  return (
    <div>
      <div className="flex flex-col max-w-[170px] py-1 px-2 mb-2 bg-stone-100 rounded-sm">
        <div>
          <span className="text-sm font-bold text-stone-800">Opened: </span>
          <span className="text-sm text-stone-700">20/12/2025</span>
        </div>
        <div>
          <span className="text-sm font-bold text-stone-800">Due: </span>
          <span className="text-sm text-stone-700">22/12/2025</span>
        </div>
      </div>
      <ul>
        {children}
      </ul>
    </div>
  )
}

export function MahasiswaCourseQuizNavContent({ quizName , quizId, status }) {
  return (
    <li className="">
      <NavLink to={`${status ? "" : quizId}`} end className={`flex items-center border border-stone-300 px-3 py-3 rounded-md justify-between ${status ? "cursor-default" : "cursor-pointer"}`}>
        <div className={`flex flex-row ${status ? "text-stone-400" : "hover:underline text-blue-400 "}`}>
          <FiArrowUpLeft size={20} />
          <span>{quizName}</span>
        </div>
        <span className={`px-2 py-1 rounded-md border 
          ${status 
            ? "bg-green-200 border-emerald-400 text-lime-800"
            : "bg-rose-200 border-red-400 text-red-900"}`}>{`${status ? "Done" : "Not Yet"}`}</span>
      </NavLink>
    </li>
  )
}