import MahasiswaCourseSubject from "./MahasiswaCourseSubject";
import { useLocation } from "react-router"

// seluruh materi pada subject akan di render di sini
// formatnya adalah Judul Subject - File - Quiz
// oversimplified

export default function MahasiswaCourseTemplate() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const regex = (text) => {
    if (!text) return '';
    return text
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const title = regex(pathnames[pathnames.length - 1]);

  return (
    <div className="flex flex-col pl-8 pt-4 pr-8 pb-40 overflow-x-hidden">
      <div className="border-b mb-11 pb-3 border-stone-300">
        <h1 className="text-stone-800 text-4xl font-semibold mb-1">{title}</h1>
        <span className="mb-3 text-stone-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
          quissss nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
          irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span>
      </div>
      
      <div className="flex flex-col gap-10">
        <MahasiswaCourseSubject title={`Week 1 - Introduction To ${title}`} quizName="Quiz 1" quizId={title}/>
        <MahasiswaCourseSubject title={`Week 2 - Middle-Term Exam ${title}`} quizName="Quiz 2" quizId={title+"MT"}/>
        <MahasiswaCourseSubject title={`Week 3 - Final Exam ${title}`} quizName="Quiz 3" quizId={title+"FE"}/>
      </div>
    </div>
  )
}