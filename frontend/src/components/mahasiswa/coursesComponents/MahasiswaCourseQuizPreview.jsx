

import { FiArrowUpLeft } from "react-icons/fi"
import { NavLink, useNavigate } from "react-router"

export default function MahasiswaCourseQuizNav({ children }) {
  return (
    <div>
      <ul>
        {children}
      </ul>
    </div>
  )
}

export function MahasiswaCourseQuizNavContent({ quizName , quizId, openDate, closeDate, status, note, courseId }) {
  const navigate = useNavigate();
  const handleQuiz = () => {
    navigate(`/mahasiswa/quiz/view?id=${quizId}&course=${courseId}`)
  }

  return (
    <li className="mb-2">
      <div className="flex flex-col py-1 px-2 mb-2 bg-stone-100 rounded-sm">
        <div>
          <span className="text-sm font-bold text-stone-800">Opened: </span>
          <span className="text-sm text-stone-700">{openDate}</span>
        </div>
        <div>
          <span className="text-sm font-bold text-stone-800">Due: </span>
          <span className="text-sm text-stone-700">{closeDate}</span>
        </div>
      </div>
      <button onClick={handleQuiz} disabled={!status} className={`flex w-full items-center border border-stone-300 px-3 py-3 rounded-md justify-between ${status ? "cursor-pointer" : "cursor-not-allowed"}`}>
        <div className={`flex flex-row ${status ?  "hover:underline text-blue-400 " : "text-stone-400"}`}>
          <FiArrowUpLeft size={20} />
          <span>{quizName}</span>
        </div>
        <span className={`px-2 py-1 rounded-md border 
          ${status 
            ? "bg-green-200 border-emerald-400 text-lime-800"
            : "bg-rose-200 border-red-400 text-red-900"}`}>{note}</span>
      </button>
    </li>
  )
}