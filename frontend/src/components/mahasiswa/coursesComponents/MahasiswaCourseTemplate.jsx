import { useEffect, useState } from "react";
import MahasiswaCourseSubject from "./MahasiswaCourseSubject";
import { replace, useLocation, useNavigate, useParams } from "react-router"
import axios from "../../../api/axios";
import NotFoundComponents from "../../buttons/NotFoundComponents";

export default function MahasiswaCourseTemplate() {
  let params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [info, setInfo] = useState([]);
  const [errMsg, seterrMsg] = useState("");

  const handleBack = () => {
    navigate('/mahasiswa/course', { replace : true });
  };

  useEffect(() => {
    const fetchetSubject = async() => {
      try {
        const res = await axios.get(`/api/mahasiswa/course/${params.courseUuid}`, { withCredentials: true});
        const correctSlug = res.data.data.courseName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

        if (params.courseName !== correctSlug) {
          navigate(`/mahasiswa/course/${params.courseUuid}/${correctSlug}`);
        }

        setInfo(res.data.data);
      } catch (error) {
        seterrMsg(error.response?.data?.error);
      }
    };
    fetchetSubject();
  }, [location.pathname])

  if (errMsg) {
    return (
      <NotFoundComponents />
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