export default function Dashboard() {
  return(
    <>
      <div className="flex flex-col overflow-x-hidden overflow-y-auto">
        {/* title */}
        <h1 className="pl-5 p-4 font-semibold text-3xl relative text-stone-800">Good Afternoon</h1>
        
        {/* task card */}
        <div className="flex flex-col px-5 border">
          <h1 className="text-xl text-stone-800">My Task</h1>
          <div className="border p-5">
            <span>all contents will be on  mytasks </span>
          </div>
        </div>

        {/* course card */}
        <div className="">
          My Course
        </div>
      </div>
    </>
  )
}