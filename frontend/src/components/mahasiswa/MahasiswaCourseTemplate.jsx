import MahasiswaCourseQuiz from "./coursesCards/MahasiswaCourseQuiz";
import MahasiswaCourseSubject from "./coursesCards/MahasiswaCourseSubject";
import { useParams } from "react-router"

export default function MahasiswaCourseTemplate() {
  const { id } = useParams();
  
  const regex = (text) => {
    if (!text) return '';
    return text.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const title = regex(id);

  return (
    <div className="h-full w-full overflow-x-hidden overflow-y-auto flex flex-col pl-8 pt-4">
      <h1 className="text-stone-800 text-4xl font-semibold mb-1">{title}</h1>
      <MahasiswaCourseQuiz title={title} courseId={id}/>
      <MahasiswaCourseSubject title={title} courseId={id}/>
    </div>
  )
}