import MahasiswaCoursesList from "../../components/mahasiswa/coursesComponents/MahasiswaCoursesList";

export default function Courses() {
  return (
    <>
      <div className="flex flex-col overflow-x-hidden overflow-y-auto pl-8 pt-4">
        <h1 className="font-semibold pb-1 text-4xl relative text-stone-800 cursor-default">My Courses 📝</h1>
        <span className="text-md mb-5 text-800 text-stone-800">What will you learn today?</span>
        <div>
          <MahasiswaCoursesList />
        </div>
      </div>
    </>
  )
}
