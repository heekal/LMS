import { PiSealCheckDuotone } from "react-icons/pi";
import { useNavigate } from "react-router";

export default function MahasiswaQuizSubmitted ({ quizName }) {
   const navigate = useNavigate();

  const handleToGrade=()=>{
    navigate('/mahasiswa/grade');
  }

  const handleToThisCourse=()=>{
    navigate(`/mahasiswa/course`)
  }

  const handleToDashboard=()=>{
    navigate('/mahasiswa')
  }

  return (
    <div className="h-full flex flex-col items-center px-8 py-4 justify-center gap-4 pb-25 cursor-default">
      <div className="flex flex-row items-center gap-4 mb-4">
        <PiSealCheckDuotone size={50} color="green"/>
        <span className="text-4xl font-semibold text-stone-800">Assignment Submitted!</span>
      </div>
      <div className="flex flex-col items-center pt-7 pb-5 px-8 border rounded-lg border-stone-500 shadow-sm">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-regular text-stone-800 mb-7">{quizName} has successfully been submitted!</h1>
          <span className="text-stone-600 text-sm">Our system will be automatically grading your submission.</span>
        </div>
        <div className="flex flex-row text-sm">
          <span className="text-stone-600 text-sm">Please kindly wait until your grade is shown on your</span>
          <button className="ml-1 text-blue-500 hover:underline cursor-pointer text-sm" onClick={handleToGrade}>grades page.</button>
        </div>
        <div className="flex flex-row text-sm">
          <span className="text-stone-600" >In the meantime, you may want to check your another</span>
          <button className="text-blue-500 hover:underline cursor-pointer ml-1" onClick={handleToThisCourse}>courses.</button>
        </div>
        <div className="">
          <button onClick={handleToDashboard} className="px-5 py-1 rounded-md border border-blue-400 mt-7 bg-blue-400 hover:bg-blue-500 text-md hover:cursor-pointer text-white">Back To Dashboard</button>
        </div>
      </div>
    </div>
  )
}