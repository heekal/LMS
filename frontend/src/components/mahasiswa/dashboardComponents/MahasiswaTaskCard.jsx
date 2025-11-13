import { useNavigate } from "react-router";

export function MahasiswaTaskCard({ taskname, deadline, course, courseUuid, quizUuid }) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/mahasiswa/quiz/view?id=${quizUuid}&course=${courseUuid}`);
  };

  const toCourse = (course) => {
    return course.split('-').join(' ');
  };

  return (
    <button onClick={handleNavigate} className="flex items-center w-full h-[48px] bg-white border-t border-stone-200 hover:bg-zinc-100 transition-colors cursor-pointer">
      <div className="grid grid-cols-3 w-full text-stone-700 text-sm px-8 cursor-pointer">
        <span className="text-left">{taskname}</span>
        <span className="text-center">{deadline}</span>
        <span className="text-right capitalize">{toCourse(course)}</span>
      </div>
    </button>
  );
}