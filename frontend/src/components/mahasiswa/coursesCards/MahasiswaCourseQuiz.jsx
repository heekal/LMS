import { useParams } from "react-router"

export default function MahasiswaCourseQuiz() {
  const {id} = useParams();

  return (
    <div>
      Hello From Course Quiz {id}
    </div>
  )
}