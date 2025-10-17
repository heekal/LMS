import MahasiswaCourseQuiz from "./coursesCards/MahasiswaCourseQuiz";
import MahasiswaCourseSubject from "./coursesCards/MahasiswaCourseSubject";
import { useParams } from "react-router"

export default function MahasiswaCourseTemplate() {
  const { id } = useParams();
  
  const regex = (text) => {
    if (!text) return '';
    return text.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const name = regex(id);

  return (
    <div>
      <h1>{name}</h1>
      <MahasiswaCourseQuiz title={name} courseId={id}/>
      <MahasiswaCourseSubject title={name} courseId={id}/>
    </div>
  )
}