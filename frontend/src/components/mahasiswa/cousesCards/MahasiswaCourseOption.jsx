import { FiArrowUpLeft } from "react-icons/fi";
import { NavLink } from "react-router";

export default function MahasiswaCourseOption({course_name, path}) {
  return(
    <NavLink 
      to={path}
      className="
        gap-1 flex w-fit flex-row text-lg font-semibold text-stone-600 
        hover:text-blue-600 hover:underline items-center cursor-pointer">
      <FiArrowUpLeft size={20}/>
      <span>{course_name}</span>
    </NavLink>
  )
}