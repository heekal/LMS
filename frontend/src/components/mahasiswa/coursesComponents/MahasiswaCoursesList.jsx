import MahasiswaCourseOptions, { MahasiswaCourseOptionsContent } from "./MahasiswaCourseOptions"
import { useLocation } from "react-router-dom"

export default function MahasiswaCoursesList() {
  const curr = useLocation();
  const pathnames = curr.pathname;

  return (
    <MahasiswaCourseOptions>
      <MahasiswaCourseOptionsContent course_name="Machine Learning" path={`${pathnames}/machine-learning`} />
      <MahasiswaCourseOptionsContent course_name="Big Data" path={`${pathnames}/big-data`} />
      <MahasiswaCourseOptionsContent course_name="Artificial Intelligence" path={`${pathnames}/artificial-intelligence`} />
    </MahasiswaCourseOptions>
  )
}