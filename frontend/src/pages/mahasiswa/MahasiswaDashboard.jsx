import { MahasiswaCourseCarousel } from "../../components/mahasiswa/dashboardComponents/MahasiswaCourseCarousel"
import { MahasiswaTaskOverview } from "../../components/mahasiswa/dashboardComponents/MahasiswaTaskOverview"
import { IoIosList } from "react-icons/io";
import { BiCalendarExclamation } from "react-icons/bi";
import { FiBookOpen } from "react-icons/fi";

export default function Dashboard() {
  const Greetings = () => {
    let myDate = new Date();
    let hours = myDate.getHours();

    if (hours < 12) {
      return "Morning"
    } else if (hours <= 17) {
      return "Afternoon"
    } else {
      return "Night"
    }
  };

  let greet = Greetings();
  const User = 'Haikal';

  return(
    <div className="flex flex-col pb-54 pl-3 pr-5">
      <h1 className="pl-5 pt-4 pb-1 font-semibold text-4xl text-stone-800 cursor-default">Good {greet}, {User}! 👋</h1>
      <span className="ml-5 mb-5 text-md text-stone-800 cursor-default">Here are the learning activities you're engaged in.</span>
      <div className="flex flex-col px-5 mb-2">
        <h1 className="text-2xl font-semibold text-stone-800 pb-2">My Tasks</h1>
        <div className="rounded-md border border-stone-300 overflow-hidden bg-white">
          <div className="bg-stone-50">
            <div className="grid grid-cols-3 divided-y items-center px-7 py-3 border-b border-stone-300 text-stone-700">
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
          </div>
          <div className="max-h-[240px] min-h-[48px] overflow-y-auto divide-y divide-stone-200">
            <MahasiswaTaskOverview />
          </div>
        </div>
      </div>
      <div className="flex flex-col px-5 mt-5">
        <h1 className="text-2xl font-semibold text-stone-800">My Courses</h1>
        <div className="h-[200px] items-center overflow-x-auto overflow-y-hidden">
          <MahasiswaCourseCarousel />
        </div>
      </div>
    </div>
  )
}