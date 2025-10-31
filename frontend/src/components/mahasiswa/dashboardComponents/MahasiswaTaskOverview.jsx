import { MahasiswaTaskCard } from "./MahasiswaTaskCard";
import axios from "../../../api/axios";
import { useEffect, useState } from "react";

export function MahasiswaTaskOverview({ owner }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchedTask = async() => {
      try {
        const res = await axios.get('/api/mahasiswa/dashboard/tasks', { withCredentials : true});
        setTasks(res.data.Data);
      } catch (error) {
        alert(error.response.data.error);
      }
    };
    fetchedTask();
  }, [])
  
  return (
    <>
      <div className="flex relative flex-col w-full rounded-lg shadow-sm cursor-default">
        <div className="flex flex-col overflow-y-auto scrollbar-thin">
          {tasks.map((course) => 
            course.quizzes.map ((quiz) => (
              <MahasiswaTaskCard key={`${course.course}-${quiz.quizName}`} taskname={ quiz.quizName } deadline={ quiz.closeDate } course={ course.courseName } courseUuid={ course.courseUuid } quizUuid={ quiz.quizUuid }/>
            ))
          )}
        </div>
      </div>
    </>
  );
}