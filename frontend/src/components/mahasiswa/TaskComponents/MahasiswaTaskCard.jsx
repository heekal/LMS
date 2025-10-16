export function MahasiswaTaskCard({ taskname, deadline, course }) {
  return (
    <div className="flex items-center w-full h-[48px] bg-white border-b border-stone-200 hover:bg-zinc-100 transition-colors">
      <div className="grid grid-cols-3 w-full text-stone-700 text-sm px-8">
        <span className="text-left">{taskname}</span>
        <span className="text-center">{deadline}</span>
        <span className="text-right">{course}</span>
      </div>
    </div>
  );
}
