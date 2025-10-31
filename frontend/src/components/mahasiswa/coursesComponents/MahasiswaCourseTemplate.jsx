import { useEffect, useState } from "react";
import MahasiswaCourseSubject from "./MahasiswaCourseSubject";
import { useLocation } from "react-router"
import axios from "../../../api/axios";

export default function MahasiswaCourseTemplate() {
  const location = useLocation();
  const [info, setInfo] = useState([]);

  useEffect(() => {
    const fetchetSubject = async() => {
      try {
        const res = await axios.get(`/api${location.pathname}`, { withCredentials: true});
        setInfo(res.data.data?.[0]);
      } catch (error) {
        alert(res.error.Error);
      }
    };
    fetchetSubject();
  }, [])

  return (
    <div className="flex flex-col pl-8 pt-4 pr-8 pb-40 overflow-x-hidden">
      <div className="flex flex-col border-b mb-11 pb-3 mb-1 border-stone-300">
        <h1 className="text-stone-800 text-4xl font-semibold mb-3">{info.courseCode} - {info.courseName}</h1>
        <span className="text-stone-700">About This Course:</span>
        <span className="text-stone-700 mb-3">{info.courseDesc}</span>
        <span className="text-stone-700">Instructor:</span>
        <span className="text-stone-700 mb-3">{info.InstructorName}</span>
      </div>
      
      <div className="flex flex-col gap-10">
        {info?.Data?.map((item, idx) => (
          <MahasiswaCourseSubject
            key={idx}
            title={item.subjectName}
            quizName={item.quizName}
            quizId={item.quizUuid}
            status={true}
          />
        ))}
      </div>
    </div>
  )
}