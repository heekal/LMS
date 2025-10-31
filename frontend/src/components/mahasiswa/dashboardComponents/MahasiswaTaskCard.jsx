import { useNavigate } from "react-router";

export function MahasiswaTaskCard({ taskname, deadline, course, courseUuid, quizUuid }) {
  const navigate = useNavigate();

  const toPath = ( path ) => {
    return path.toLowerCase().replace(/\s+/g, '-');
  }

  const handleNavigate = () => {
    navigate(`/mahasiswa/course/${courseUuid}/${toPath(course)}/${quizUuid}/${toPath(taskname)}`);
  };

  const toCourse = (course) => {
    return course.split('-').join(' ');
  };

  return (
    <div className="flex items-center w-full h-[48px] bg-white border-t border-stone-200 hover:bg-zinc-100 transition-colors cursor-pointer">
      <button onClick={handleNavigate} className="grid grid-cols-3 w-full text-stone-700 text-sm px-8">
        <span className="text-left">{taskname}</span>
        <span className="text-center">{deadline}</span>
        <span className="text-right capitalize">{toCourse(course)}</span>
      </button>
    </div>
  );
}