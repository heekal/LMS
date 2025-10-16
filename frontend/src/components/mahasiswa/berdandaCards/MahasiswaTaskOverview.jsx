import { IoIosList } from "react-icons/io"
import { BiCalendarExclamation } from "react-icons/bi"
import { FiBookOpen } from "react-icons/fi"
import { MahasiswaTaskCard } from "../TaskComponents/MahasiswaTaskCard"

export function MahasiswaTaskOverview() {
  return (
    <>
      <div className="flex flex-col w-full h-[300px] border-1 border-stone-300 rounded-lg">
        <div className="flex flex-row justify-between mt-5 border-b border-stone-300 shadow-xs pb-5 text-stone-600">
          <div className="flex flex-row ml-9 items-center gap-2">
            <IoIosList size={17}/> 
            <span className="flex">Task Name</span>
          </div>
          <div className="flex flex-row items-center gap-2 mr-10">
            <BiCalendarExclamation size={18} color="#B31B1B"/>
            <span>Deadline</span>
          </div>
          <div className="flex flex-row items-center gap-2 mr-1">
            <FiBookOpen />
            <span className="pr-8">Course</span>
          </div>
        </div>
        <MahasiswaTaskCard taskname={"Remedial"} deadline={"22/12/2025"} course={"KWU"}/>
        <MahasiswaTaskCard taskname={"Quiz 1"} deadline={"20/12/2025"} course={"DevSecOps"}/>
        <MahasiswaTaskCard taskname={"Quiz 3"} deadline={"19/12/2025"} course={"Machine Learning"}/>
      </div>
    </>
  )
}