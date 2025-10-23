import { FiArrowUpLeft } from "react-icons/fi";
import { NavLink } from "react-router";

export default function MahasiswaCourseOptions({ children }) {
  return (
    <>
      <ul className="">{children}</ul>
    </>
  )
}

export function MahasiswaCourseOptionsContent({ path, course_name }){
  return (
    <li>
      <NavLink 
        to={path}
        end
        className="
          gap-1 flex w-fit flex-row text-lg font-regular text-stone-500 
          hover:text-blue-600 hover:underline items-center cursor-pointer">
        <FiArrowUpLeft size={20}/>
        <span>{course_name}</span>
      </NavLink>
    </li>
  )
}