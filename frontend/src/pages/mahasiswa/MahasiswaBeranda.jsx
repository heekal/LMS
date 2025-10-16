import { MahasiswaCourseOverview } from "../../components/mahasiswa/berdandaCards/MahasiswaCourseOverview"
import { MahasiswaTaskOverview } from "../../components/mahasiswa/berdandaCards/MahasiswaTaskOverview"

export default function Dashboard() {
  return(
    <>
      <div className="flex flex-col pb-6 pl-3 pr-5">
        {/* title */}
        <h1 className="pl-5 p-4 font-semibold text-3xl text-stone-800">Good Afternoon</h1>
        
        {/* task card */}
        <div className="flex flex-col px-5 mb-2 gap-2">
          <h1 className="text-2xl font-semibold text-stone-800 pb-2">My Tasks</h1>
          <MahasiswaTaskOverview />
        </div>

        {/* course card */}
        <div className="flex flex-col px-5 mt-5">
          <h1 className="text-2xl font-semibold text-stone-800 pb-2">My Courses</h1>
          <MahasiswaCourseOverview />
        </div>
      </div>
    </>
  )
}