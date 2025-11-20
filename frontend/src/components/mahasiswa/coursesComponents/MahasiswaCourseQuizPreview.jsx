import { FiArrowUpLeft, FiCheck } from "react-icons/fi"
import { useNavigate } from "react-router"

export default function MahasiswaCourseQuizNav({ children }) {
  return (
    <div>
      <ul>
        {children}
      </ul>
    </div>
  )
}

export function MahasiswaCourseQuizNavContent({ 
  quizName, 
  quizId, 
  openDate, 
  closeDate, 
  status, 
  note, 
  isCompleted, 
  courseId 
}) {
  const isDisabled = !status || isCompleted;
  const isActive = status && !isCompleted;
  const navigate = useNavigate();
  
  const handleQuiz = () => {
    if (!isDisabled) {
      navigate(`/mahasiswa/quiz/view?id=${quizId}&course=${courseId}`)
    }
  }

  // Get button styling based on state
  const getButtonClass = () => {
    if (isCompleted) {
      return "cursor-not-allowed bg-stone-50";
    }
    if (isActive) {
      return "cursor-pointer hover:bg-stone-50";
    }
    return "cursor-not-allowed";
  };

  // Get text styling based on state
  const getTextClass = () => {
    if (isCompleted) {
      return "text-stone-500";
    }
    if (isActive) {
      return "hover:underline text-blue-400";
    }
    return "text-stone-400";
  };

  // Get badge styling based on state
  const getBadgeClass = () => {
    if (isCompleted) {
      return "bg-blue-200 border-blue-400 text-blue-800";
    }
    if (status) {
      return "bg-green-200 border-emerald-400 text-lime-800";
    }
    return "bg-rose-200 border-red-400 text-red-900";
  };

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
      <button 
        onClick={handleQuiz} 
        disabled={isDisabled} 
        className={`flex w-full items-center border border-stone-300 px-3 py-3 rounded-md justify-between ${getButtonClass()}`}
      >
        <div className={`flex flex-row items-center gap-1 ${getTextClass()}`}>
          {isCompleted ? (
            <FiArrowUpLeft size={20} />
          ) : (
            <FiArrowUpLeft size={20} />
          )}
          <span>{quizName}</span>
        </div>
        <span className={`px-2 py-1 rounded-md border ${getBadgeClass()}`}>
          {isCompleted ? "Completed" : note}
        </span>
      </button>
    </li>
  )
}