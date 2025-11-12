import { useEffect, useState } from "react";
import { useLocation,  useSearchParams } from "react-router"
import MahasiswaCourseSubject from "./MahasiswaCourseSubject";
import axios from "../../../api/axios";
import NotFoundComponents from "../../buttons/NotFoundComponents";

export default function MahasiswaCourseTemplate() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [info, setInfo] = useState([]);
  const [errMsg, seterrMsg] = useState("");

  useEffect(() => {
    const fetchetSubject = async() => {
      try {
        const id = searchParams.get("id") 
        const res = await axios.get(`/api/mahasiswa/course/${id}`, { withCredentials: true});

        setInfo(res.data.data);
      } catch (error) {
        seterrMsg(error.response?.data?.error);
      }
    };
    fetchetSubject();
  }, [location.pathname])

  if (errMsg) {
    return (
      <NotFoundComponents msg={errMsg}/>  
    )
  }

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
        {info?.subjectInfo?.map((item, idx) => (
          <MahasiswaCourseSubject key={idx} title={item.subjectName} desc={item.subjectDesc} quizData={item.quizzesInfo}/>
        ))}
      </div>
    </div>
  )
}