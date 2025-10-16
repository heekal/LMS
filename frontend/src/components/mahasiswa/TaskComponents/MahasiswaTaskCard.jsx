export function MahasiswaTaskCard ({taskname, deadline, course}) {
  return(
    <>
      <div className="flex w-full h-[50px] bg-white flex items-center px-10 border-b border-stone-200 hover:bg-zinc-100">
        <div className="flex flex-row justify-stretch border w-full text-stone-700 text-sm ">
          <span>{taskname}</span>
          <span>{deadline}</span>
          <span>{course}</span>
        </div>
      </div>
    </>
  )
}