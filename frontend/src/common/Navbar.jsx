import { NavLink, useSearchParams } from "react-router-dom"
import { LogoutButton } from "../components/buttons/LogoutButton"
import { useLocation } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import { useEffect, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp  } from "react-icons/md";
import axios from "../api/axios";

export default function Navbar({ children }) {
return (
    <>
      <div className="flex flex-col h-screen w-[265px] relative border-r border-stone-200 bg-[#F5F5F7]">
        <div className="flex flex-row border-b border-stone-200 pt-4 pb-3 pl-4 items-center">
          <h1 className="pl-1 pr-1 text-lg">📂</h1>
          <h1 className="font-regular text-xl font-semibold text-stone-800 pl-2">Your Workspace</h1>
        </div>

        <ul className="pt-2">{children}</ul>
        <div className="absolute bottom-0 border-t border-stone-200 flex justify-end w-full p-3">
          <LogoutButton />
        </div>
        
      </div>
    </>
  )
}

export function NavbarContent({ text, path, icon }) {
  return (
    <li className="mx-2 my-1">
      <NavLink
        to={path}
        end
        className={({ isActive }) => `flex flex-row items-center gap-4 rounded-md cursor-pointer py-2 pl-4 text-md transition-colors group ${isActive ? "bg-[#6395EE] text-zinc-100 font-regular" : "font-regular text-stone-400 hover:bg-[#CBCBCF] hover:text-stone-700"}`}>
        {icon}
        <span>{text}</span>
      </NavLink>
    </li>
  );
}

export function NavbarContentTree({ text, path, icon }) {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const isCourse = location.pathname.includes("/course");
  const isActive = location.pathname === path;
  const isQuiz = location.pathname.includes("/quiz");
  const [expanded, setExpanded] = useState(false);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const courseId = searchParams.get("id");
    const fetchCourse = async () => {
      try {
        const res = await axios.get("/api/mahasiswa/navbar", { withCredentials: true });
        setCourses(res.data.courses);
      } catch (error) {
        console.error(error.response?.data?.error || error.message);
      }
    } ;
    if (courseId) {
      fetchCourse();
    }
  }, [searchParams]);

  const regex = (text) => {
    if (!text) return "";
    return text.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  };

  const activeCourseId = isCourse ? searchParams.get("id") : searchParams.get("course");

  return (
    <>
      <li className="mx-2 my-1">
        <div className={`flex flex-row rounded-md justify-between transition-colors ${isActive || isCourse || isQuiz  ? "bg-[#6395EE] text-zinc-100 font-regular" : "font-regular text-stone-400 hover:bg-[#CBCBCF] hover:text-stone-700"}`}>
          <NavLink to={path} end className="flex flex-row items-center gap-4 rounded-md cursor-pointer py-2 pl-4 items-center text-md flex-grow">
            <div className="flex flex-row gap-4">
              <div>{icon}</div>
              <span>{text}</span>
            </div>
          </NavLink>
          <button onClick={(e) => {e.preventDefault(); setExpanded((curr) => !curr);}} className="rounded-md group pr-2">
            {(isActive || isCourse || isQuiz) && (expanded ? (<MdKeyboardArrowDown size={20} />) : (<MdKeyboardArrowUp size={20} />))}
          </button>
        </div>
      </li>

      {expanded && (isActive || isCourse || isQuiz) && (
        <ul className="px-2">
          {courses.map((course) => {
            const isCurrent = activeCourseId === course.courseUuid;
            return (
              <li className="flex flex-row items-center" key={`${course.courseUuid}-${course.courseName}`}>
                <NavLink key={course.courseUuid + location.search} to={`${path}/view?id=${course.courseUuid}`} className={`flex flex-row items-center gap-6 rounded-md cursor-pointer py-2 px-5 mb-1 text-xs transition-colors group w-full ${isCurrent ? "bg-[#CBCBCF] font-regular text-stone-800" : "font-regular text-stone-400 hover:bg-[#CBCBCF] hover:text-stone-700"}`}>
                  <GoDotFill size={10} />
                  <span>{regex(course.courseName)}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
