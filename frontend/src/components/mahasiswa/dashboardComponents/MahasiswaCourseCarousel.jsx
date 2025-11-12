import { MahasiwaCarouselCard } from "./MahasiswaCarouselCard"
import axios from "../../../api/axios"
import { useEffect, useState } from "react"

export function MahasiswaCourseCarousel() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const courseFetched = async () => {
      try {
        const res = await axios.get('/api/mahasiswa/dashboard/enrolled', { withCredentials: true });
        setCourses(res.data.Data); 
      } catch (error) {
        alert(error.response.data.error);
      }
    };
    courseFetched();
  }, []);
  
  return (
    <>
      <div className="w-full h-full flex flex-row gap-5 items-center pl-1">
        {courses.map((course) => (
          <MahasiwaCarouselCard key={course.courseUuid} matakuliah={course.courseName} kelas={course.courseCode} path={`${course.courseUuid}`}/>
        ))}
      </div>
    </>
  )
}