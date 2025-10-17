import MahasiswaCourseOption from "./MahasiswaCourseOption"
import { useLocation } from "react-router-dom"

export default function MahasiswaCoursesList() {
  const curr = useLocation();
  const pathnames = curr.pathname;

  return(
    <div>
      <MahasiswaCourseOption course_name="DevSecOps" path={`${pathnames}/developer-security-operations`} />
      <MahasiswaCourseOption course_name="Machine Learning" path={`${pathnames}/machine-learning`} />
      <MahasiswaCourseOption course_name="Big Data" path={`${pathnames}/big-data`} />
      <MahasiswaCourseOption course_name="Artificial Intelligence" path={`${pathnames}/artificial-intelligence`} />
      <MahasiswaCourseOption course_name="Proposal Tugas Akhir" path={`${pathnames}/proposal-tugas-akhir`} />
    </div>
  )
}