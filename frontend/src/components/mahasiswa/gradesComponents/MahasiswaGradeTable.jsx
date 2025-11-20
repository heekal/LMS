import { useEffect, useState } from "react";
import axios from "../../../api/axios";

export default function MahasiswaGradeTable() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const res = await axios.get("api/mahasiswa/scores", { withCredentials: true });
        setScores(res.data.Data);
      } catch (error) {
        alert(error.response?.data?.error || "Failed to fetch data");
      }
    };
    fetchScores();
  }, []);

  // fungsi bantu buat menentukan status
  const getStatus = (scores) => {
    const finished = scores.every((q) => q.score !== null);
    return finished;
  };

  return (
    <div className="w-full">
      <div className="w-full border border-stone-400 rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-stone-100 text-stone-700">
            <tr>
              <th className="py-3 px-4 text-left">Course Name</th>
              <th className="py-3 px-4 text-center">Quiz 1</th>
              <th className="py-3 px-4 text-center">Quiz 2</th>
              <th className="py-3 px-4 text-center">Quiz 3</th>
              <th className="py-3 px-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((course) => (
              <tr
                key={course.courseName}
                className="border-t border-stone-400 hover:bg-stone-100 transition-colors cursor-pointer"
              >
                <td className="py-3 px-4">{course.courseName}</td>
                {course.scores.map((quiz, i) => (
                  <td key={i} className="py-2 px-4 text-center">
                    {quiz.score ?? (
                      <span className="text-gray-400">Not Finished Yet</span>
                    )}
                  </td>
                ))}

                <td className="py-2 px-4 text-center">
                  {getStatus(course.scores) ? (
                    <span className="text-green-400 px-3 py-1 bg-emerald-100 rounded-4xl border border-green-200">
                      Passed
                    </span>
                  ) : (
                    <span className="text-rose-400 bg-rose-100 px-3 py-1 rounded-4xl border border-red-200">
                      Not Finished Yet
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs py-3 text-blue-400 italic cursor-default">
        Please Contact Your Lecturer If Data Wrong
      </p>
    </div>
  );
}
