import { useEffect, useState } from "react";
import MahasiswaCourseOptions, { MahasiswaCourseOptionsContent } from "./MahasiswaCourseOptions"
import axios from "../../../api/axios";

export default function MahasiswaCoursesList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourseList = async() => {
      try {
        const res = await axios.get('/api/mahasiswa/course', { withCredentials: true});
        setCourses(res.data.data.courses);
      } catch (error) {
        alert(res.error.Error);
      }
    };
    fetchCourseList();
  }, [])

  const toPath = ( path ) => {
    return path.toLowerCase().replace(/\s+/g, '-');
  }
  return (
    <MahasiswaCourseOptions>
      {courses.map((course) => (
        <MahasiswaCourseOptionsContent key={course.courseUuid} course_name={course.courseName} path={`${course.courseUuid}/${toPath(course.courseName)}`} />  
      ))}
    </MahasiswaCourseOptions>
  )
}