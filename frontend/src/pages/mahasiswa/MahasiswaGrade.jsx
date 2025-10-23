import MahasiswaGradeTable from "../../components/mahasiswa/gradesComponents/MahasiswaGradeTable";

export default function Grades () {
  return (
    <>
      <div className="flex flex-col overflow-x-hidden overflow-y-auto px-8 pt-4 pb-13">
        <h1 className="font-semibold pb-1 text-4xl relative text-stone-800 cursor-default">My Grades 🎓</h1>
        <span className="text-md mb-5 text-800 text-stone-800">Your latest grades are displayed below.</span>
        <div>
          <MahasiswaGradeTable />
        </div>
      </div>
    </>
  )
}