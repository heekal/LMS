import { MahasiwaCarouselCard } from "./MahasiswaCarouselCard"
import axios from "../../../api/axios"
import { useEffect, useState } from "react"

export function MahasiswaCourseCarousel() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const courseFetched = async () => {
      try {
        const res = await axios.get('/api/mahasiswa/dashboard/enrolled', { withCredentials: true });
        setCourses(res.data.courses); 
      } catch (error) {
        alert(error.response.data.error);
      }
    };
    courseFetched();
  }, []);

  const toPath = ( path ) => {
    return path.toLowerCase().replace(/\s+/g, '-');
  }

  return (
    <>
      <div className="w-full h-full flex flex-row gap-5 items-center pl-1">
        {courses.map((course) => (
        <MahasiwaCarouselCard matakuliah={course.courseName} kelas={course.courseCode} kode_dosen={""} path={`${course.courseUuid}/${toPath(course.courseName)}`}/>
        ))}
      </div>
    </>
  )
}