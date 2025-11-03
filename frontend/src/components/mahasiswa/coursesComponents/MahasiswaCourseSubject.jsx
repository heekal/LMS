import { FaRegFile } from "react-icons/fa";
import MahasiswaCourseQuizNav, { MahasiswaCourseQuizNavContent } from "./MahasiswaCourseQuizPreview";


export default function MahasiswaCourseSubject ({ title, desc, quizData }) {
  return (
    <div className="flex flex-col">
      <div className="mb-2 text-2xl font-semibold text-stone-700">{title}</div>
      <div className="flex flex-col border border-stone-300 shadow-md shadow-stone-200 rounded-md pt-3 pb-6 px-5 gap-3">
        <div className="pb-2 text-stone-600 pt-1">
          <span>{desc}</span>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold mb-2">File</h1>
            <div className="flex flex-row border border-stone-300 hover:text-blue-500 p-3 gap-2 rounded-md hover:bg-stone-100 cursor-pointer text-stone-500">
              <div className="flex flex-row gap-2 items-center">
                <FaRegFile color="#79716b"/>
                <h1>File.pdf</h1>
              </div>
              <span className="text-xs pt-1 text-stone-500">Click To Download The File</span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col gap-1 mb-1">
              <h1 className="text-lg font-semibold">Assignment</h1>
            </div>
            <MahasiswaCourseQuizNav>
              {quizData.map((quiz, idx) => (
                <MahasiswaCourseQuizNavContent key={idx} quizName={quiz.quizName} quizId={quiz.quizUuid} openDate={quiz.openDate} closeDate={quiz.closeDate} status={quiz.isActive} note={quiz.status}/>
              ))}
            </MahasiswaCourseQuizNav>
          </div>
        </div>
      </div>
    </div>
  )
}