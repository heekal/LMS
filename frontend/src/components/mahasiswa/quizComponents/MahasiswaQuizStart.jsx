import { useEffect, useState } from "react";
import { FaRegDotCircle } from "react-icons/fa";
import axiosInstance from "../../../api/axios";
import { useSearchParams } from "react-router";

export default function MahasiswaQuizStart() {
  const [searchParams] = useSearchParams();
  const [err, setErr] = useState("");
  const [quizzes, setQuizzes] = useState({ quizName: "", questions: [] });

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const id = searchParams.get("id");
        const res = await axiosInstance.get(`/api/mahasiswa/quiz/start?id=${id}`);
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

  if (err) {
    return <div className="text-red-500 text-center mt-8">{err}</div>;
  }

  return (
    <div className="flex flex-col px-8 py-4 justify-evenly items-center">
      <h1 className="text-4xl font-semibold mb-7 text-stone-700 border-b border-stone-400 pb-1">
        {quizzes.quizName}
      </h1>
      <div className="flex flex-col pt-2 gap-5">
        {data.map((q, index) => (
          <div key={q.id} className="flex flex-col border border-stone-400 pl-2 pr-3 py-2 rounded-md mb-4 shadow">
            <div className="flex flex-row mb-3 mr-1 mt-1 pt-1">
              <span className="px-3 text-md">{index + 1}.</span>
              <p className="text-stone-800">{q.question}</p>
            </div>
            <span className="pl-9 text-xs text-stone-600 mb-2 italic">Answer:</span>
            <div className="pl-6 flex flex-col mb-2 mr-1 cursor-pointer">
              <div className="flex flex-row items-center gap-2 text-stone-500 border-stone-300 py-1 px-3 rounded-4xl transition-colors">
                <FaRegDotCircle />
                <span>{q.option.a}</span>
              </div>
              <div className="flex flex-row items-center gap-2 text-stone-500 py-1 px-3 rounded-4xl transition-colors">
                <FaRegDotCircle />
                <span>{q.option.b}</span>
              </div>
              <div className="flex flex-row items-center gap-2 text-stone-500 py-1 px-3 rounded-4xl transition-colors">
                <FaRegDotCircle />
                <span>{q.option.c}</span>
              </div>
              <div className="flex flex-row items-center gap-2 text-stone-500 py-1 px-3 rounded-4xl transition-colors">
                <FaRegDotCircle />
                <span>{q.option.d}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}