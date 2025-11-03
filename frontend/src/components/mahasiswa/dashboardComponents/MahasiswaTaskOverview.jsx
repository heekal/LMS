import { MahasiswaTaskCard } from "./MahasiswaTaskCard";
import axios from "../../../api/axios";
import { useEffect, useState } from "react";

export function MahasiswaTaskOverview({ owner }) {
  const [tasks, setTasks] = useState([]);

  const taskCards = tasks?.flatMap(course => 
    course.quizzes?.map(quiz => ({
      ...quiz,
      courseName: course.courseName,
      courseUuid: course.courseUuid
    })) ?? []
  ) ?? [];

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
      <div className="flex relative flex-col w-full cursor-default">
        <div className="flex flex-col overflow-y-auto scrollbar-thin">
          {taskCards.length > 0 ? (
            taskCards.map(task => (
              <MahasiswaTaskCard key={`${task.courseUuid}-${task.quizUuid}`} taskname={task.quizName} deadline={task.closeDate} course={task.courseName} courseUuid={task.courseUuid} quizUuid={task.quizUuid} />
            ))
          ) : (
            <div className="h-full w-full flex justify-evenly items-center pt-3 text-sm text-stone-500">No Task Available</div>
          )}
        </div>
      </div>
    </>
  );
}