import { useEffect, useState } from "react";
import MahasiswaCourseOptions, { MahasiswaCourseOptionsContent } from "./MahasiswaCourseOptions"
import axios from "../../../api/axios";

export default function MahasiswaCoursesList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourseList = async() => {
      try {
        const res = await axios.get('/mahasiswa/courses', { withCredentials: true});
        setCourses(res.data.data.courses);
      } catch (error) {
        alert(res.error.Error);
      }
    };
    fetchCourseList();
  }, [])

  return (
    <MahasiswaCourseOptions>
      {courses.map((course) => (
        <MahasiswaCourseOptionsContent key={course.courseUuid} course_name={course.courseName} path={`${course.courseUuid}`} />  
      ))}
    </MahasiswaCourseOptions>
  )
}