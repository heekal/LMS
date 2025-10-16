import { IoIosList } from "react-icons/io";
import { BiCalendarExclamation } from "react-icons/bi";
import { FiBookOpen } from "react-icons/fi";
import { MahasiswaTaskCard } from "../TaskComponents/MahasiswaTaskCard";

export function MahasiswaTaskOverview() {
  return (
    <>
      <div className="flex flex-col w-full h-[300px] border border-stone-300 rounded-lg overflow-hidden shadow-sm">
        <div className="grid grid-cols-3 items-center px-8 py-3 border-b border-stone-300 text-stone-700 bg-stone-50">
          <div className="flex flex-row items-center gap-2">
            <IoIosList size={18} />
            <span className="font-medium text-sm">Task Name</span>
          </div>
          <div className="flex justify-center">
            <div className="flex flex-row w-fit justify-center items-center gap-2 bg-rose-100 border border-rose-200 px-3 py-1 rounded-full">
              <BiCalendarExclamation size={18} color="#B31B1B" />
              <span className="text-rose-800 font-medium text-sm">Deadline</span>
            </div>
          </div>
          <div className="flex flex-row justify-end items-center gap-2">
            <FiBookOpen />
            <span className="font-medium text-sm">Course</span>
          </div>
        </div>
        <div className="flex flex-col divide-y divide-stone-200">
          <MahasiswaTaskCard taskname="Remedial" deadline="22/12/2025" course="KWU" />
          <MahasiswaTaskCard taskname="Quiz 1" deadline="20/12/2025" course="DevSecOps" />
          <MahasiswaTaskCard taskname="Quiz 3" deadline="19/12/2025" course="Machine Learning" />
        </div>
      </div>
    </>
  );
}
