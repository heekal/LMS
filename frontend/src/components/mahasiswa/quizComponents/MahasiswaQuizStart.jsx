import { use, useEffect, useState } from "react";
import { FaRegDotCircle, FaRegCircle } from "react-icons/fa";
import axios from "../../../api/axios";
import { useNavigate, useSearchParams } from "react-router";

export default function MahasiswaQuizStart() {
  const [searchParams] = useSearchParams();
  const [err, setErr] = useState("");
  const [quizzes, setQuizzes] = useState({ quizName: "", questions: [] });
  const [answer, setAnswer] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState("");
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [ErrorSubmitMessage, setErrorSubmitMessage] = useState("");
  const navigate = useNavigate();
  const id = searchParams.get("id");

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await axios.get(`/api/mahasiswa/quiz/start?id=${id}`);
        setQuizzes(res.data.data);
      } catch (error) {
        setErr(error.message || "Failed to fetch quiz");
      }
    };
    fetchQuestion();
  }, [searchParams]);

  const data = quizzes.questions.map(q => ({
    ...q,
    option: {
      a: q.option.find(o => o.label === 'A')?.option || '',
      b: q.option.find(o => o.label === 'B')?.option || '',
      c: q.option.find(o => o.label === 'C')?.option || '',
      d: q.option.find(o => o.label === 'D')?.option || ''
    }
  }));

  const triggerModal = () => {
    setShowSubmitError(true);
    setTimeout(() => {
      setShowSubmitError(false);
    }, 5000)
  };

  const handleSelect = (questionId, optionLabel) => {
    setAnswer(prev => ({
      ...prev,
      [questionId] : optionLabel
    }))
  };

  const handleSubmit = async() => {
    const payload = {
      quizId : quizzes.quizId,
      answer: Object.entries(answer).map(([questionId, option]) => ({
        questionId: parseInt(questionId, 10),
        option
      }))
    };

    try {
      const res = await axios.post(`/api/mahasiswa/quiz/post?id=${id}`, payload);
      setSubmitted(res.data.message);
    } catch (error) {
      setErrorSubmitMessage(error.response.data.error);
      triggerModal();
    }
  }

  const handleToGrade=()=>{
    navigate('/mahasiswa/grade');
  }

  const handleToThisCourse=()=>{
    const course = searchParams.get("course")
    navigate(`/mahasiswa/course/view?id=${course}`)
  }
  
  if (err) {
    return <div className="text-red-500 text-center mt-8">{err}</div>;
  }

  if (submitted) {
    return (
      <div className="flex flex-col px-8 py-4">
        <h1 className="text-4xl font-semibold text-stone-800 mb-3">{quizzes.quizName} has successfully been submitted!</h1>
        <span className="text-stone-800">Our system will be automatically grading your submission.</span>
        <div className="flex flex-row">
          <span className="text-stone-800">Please kindly wait until your grade is showing on your</span>
          <button className="ml-1 text-blue-500 underline cursor-pointer" onClick={handleToGrade}>grades page.</button>
        </div>
        <div className="flex flex-row">
          <span className="text-stone-800" >In the meantime, you may want to check your another</span>
          <button className="text-blue-500 underline cursor-pointer ml-1" onClick={handleToThisCourse}>assignment.</button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col px-8 py-4 justify-evenly items-center">
      <h1 className="text-4xl font-semibold mb-7 text-stone-800 border-b border-stone-400 pb-1">
        {quizzes.quizName}
      </h1>
      <div className="flex flex-col pt-2 gap-3">
        {data.map((q, index) => (
          <div key={q.id} className="flex flex-col border border-stone-400 pl-2 pr-3 py-2 rounded-md mb-4 shadow">
            <div className="flex flex-row mb-3 mr-1 mt-1 pt-1">
              <span className="px-3 text-md">{index + 1}.</span>
              <p className="text-stone-800">{q.question}</p>
            </div>
            <span className="pl-9 text-xs text-stone-600 mb-2 italic">Answer:</span>
            <div className="pl-6 flex flex-col mb-2 mr-1 cursor-pointer">
              <div className={`flex flex-row items-center gap-2 py-1 px-3 rounded-4xl transition-colors ${answer[q.id] === 'A' ? "text-blue-500" : "text-stone-500"}`} onClick={() => handleSelect(q.id, 'A')}>
                {answer[q.id] === 'A' ? <FaRegDotCircle /> : <FaRegCircle />}
                <span>{q.option.a}</span>
              </div>
              <div className={`flex flex-row items-center gap-2 py-1 px-3 rounded-4xl transition-colors ${answer[q.id] === 'B' ? "text-blue-500" : "text-stone-500"}`} onClick={() => handleSelect(q.id, 'B')}>
                {answer[q.id] === 'B' ? <FaRegDotCircle /> : <FaRegCircle />}
                <span>{q.option.b}</span>
              </div>
              <div className={`flex flex-row items-center gap-2 py-1 px-3 rounded-4xl transition-colors ${answer[q.id] === 'C' ? "text-blue-500" : "text-stone-500"}`} onClick={() => handleSelect(q.id, 'C')}>
                {answer[q.id] === 'C' ? <FaRegDotCircle /> : <FaRegCircle />}
                <span>{q.option.c}</span>
              </div>
              <div className={`flex flex-row items-center gap-2 py-1 px-3 rounded-4xl transition-colors ${answer[q.id] === 'D' ? "text-blue-500" : "text-stone-500"}`} onClick={() => handleSelect(q.id, 'D')}>
                {answer[q.id] === 'D' ? <FaRegDotCircle /> : <FaRegCircle />}
                <span>{q.option.d}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!showConfirm && (
      <div className="fixed top-5 right-10 z-40">
        <div onClick={() => setShowConfirm(true)} className="py-1 px-3 bg-blue-400 rounded-md cursor-pointer shadow-sm hover:shadow-md">
          <span className="text-sm text-white">Submit</span>
        </div>
      </div>
      )} 

      {showConfirm && (
        <div className="fixed top-5 right-10 z-50 flex flex-col border border-stone-400 rounded-lg shadow-sm hover:shadow-lg backdrop-blur-xs">
          <div className="flex flex-col items-center p-2 mb-1">
            <div className="mb-1 flex flex-row gap-2 items-center mr-4 mb-1">
              ⚠️ Warning !
            </div>
            <div className="text-sm text-slate-700">
              You can't edit your submission
            </div>
            <div className="text-sm text-slate-700 px-1">
              once you submit your assignment!
            </div>
          </div>
          <div className="flex flex-row justify-evenly pb-3 pt-1s">
            <div className="py-1 px-5 rounded-lg text-sm bg-red-300 border border-red-400 hover:bg-red-400 cursor-pointer text-red-500 hover:text-red-800 hover:shadow-sm" onClick={() => setShowConfirm(false)}>
              Wait
            </div>
            <div className="py-1 px-3 cursor-pointer text-sm text-slate-600 border border-slate-500 hover:text-slate-800 bg-green-300 rounded-lg hover:bg-green-400 hover:shadow-sm" onClick={handleSubmit}>
              Submit
            </div>
          </div>
        </div>
      )}

      {showSubmitError && (
        <div className="fixed bottom-5 right-10 z-50 flex flex-col px-3 py-1 border bg-rose-300/50 border-red-400 rounded-sm backdrop-blur-lg">
          <div className="text-sm text-red-700/70">
            <div>{ErrorSubmitMessage}</div>
          </div>
        </div>
      )}
    </div>
  );
}