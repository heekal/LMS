import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import axios from "../../../api/axios";
import NotFoundComponents from "../../buttons/NotFoundComponents";

export default function MahasiswaQuizLanding() {
  const navigate = useNavigate();
  let params = useParams();
  const [error, setError] = useState("")
  const [quiz, setQuiz] = useState([]);

  const handleStart = () => {
    navigate(`start`);
  };

  useEffect(() => {
    const fetchQuizLanding = async() => {
      try {
        const res = await axios.get(`api/mahasiswa/course/${params.courseUuid}/${params.assignmentUuid}`);
        setQuiz(res.data.data[0])
      } catch (error) {
        setError(error);
      }
    };
    fetchQuizLanding();
  }, [])

  if (error) {
    return(
      <NotFoundComponents />
    )
  }

  return (
    <div className="flex flex-col px-8 pt-4">
      <h1 className="font-semibold text-4xl text-stone-800 mb-5">{quiz.quizName}</h1>
      <p className="mt-1 text-stone-700 pb-1">{quiz.quizDesc}</p>
      <div className="flex flex-row gap-1 mb-4 pb-3 border-b border-stone-300">
        <p className="text-stone-700">Max Score:</p>
        <p className="text-red-500">{quiz.maxScore}</p>
      </div>
      <div className="border border-stone-300 rounded-xl pt-4 pb-5 px-5 bg-white shadow-sm w-fit">
        <h2 className="text-lg font-semibold text-stone-800 mb-3">Please Read the Following Rules</h2>
        <ul className="list-disc list-inside text-sm text-stone-600 mb-5 flex flex-col justify-evenly">
          <li>Do not refresh the page during the quiz.</li>
          <li>Changing link during quiz will result in failure, your score will automatically be 0</li>
          <li>Click “Start” only when you're ready.</li>
        </ul>
        <button onClick={handleStart} className="bg-[#6395EE] text-white font-semibold text-sm px-5 py-2 rounded-lg hover:bg-[#4c7cd8] hover:shadow-md active:scale-[0.98] transition-all duration-150">Start</button>
      </div>
    </div>
  );
}
