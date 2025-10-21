import { FiArrowUpLeft } from "react-icons/fi";
import { FaRegFile } from "react-icons/fa";

export default function MahasiswaCourseSubject ({ title, courseId }) {  
  return (
    <div className="flex flex-col">
      <div className="mb-2 text-2xl font-semibold text-stone-700">{title} {courseId}</div>
      <div className="flex flex-col border border-stone-300 shadow-md shadow-stone-200 rounded-md pt-3 pb-6 px-5 gap-3">
        <div className="pb-2 text-stone-600 pt-1">
          <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
          quissss nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</span>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold mb-2">File</h1>
            <div className="flex flex-row border border-stone-300 p-3 gap-2 rounded-md hover:bg-stone-100 cursor-pointer text-stone-500">
              <div className="flex flex-row gap-2 items-center">
                <FaRegFile />
                <h1>File.pdf</h1>
              </div>
              <span className="text-xs pt-1 text-stone-500">Click To Download The File</span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col gap-1 mb-2 flex-wrap">
              <h1 className="text-lg font-semibold">Assignment</h1>
              <div className="flex flex-col max-w-[170px] py-1 px-2 bg-stone-100 rounded-sm">
                <div>
                  <span className="text-sm font-bold text-stone-800">Opened: </span>
                  <span className="text-sm text-stone-700">20/12/2025</span>
                </div>
                <div>
                  <span className="text-sm font-bold text-stone-800">Due: </span>
                  <span className="text-sm text-stone-700">22/12/2025</span>
                </div>
              </div>
            </div>
            <div className="flex items-center border border-stone-300 px-3 py-3 rounded-md justify-between">
              <div className="flex flex-row text-blue-400 hover:underline cursor-pointer">
                <FiArrowUpLeft size={20}/>
                <span>Quiz Link</span>
              </div>

              {/* untuk quiz status ada 2 opsi yaitu done dan not done yet */}
              {/* color untuk not done yet bg-rose-200 border-red-400 text-red-900 */}
              {/* color untuk done bg-green-200 border-emerald-400 text-lime-800*/}
              <span className="px-2 py-1 bg-green-200 rounded-md border border-emerald-400 text-lime-800">Done</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}