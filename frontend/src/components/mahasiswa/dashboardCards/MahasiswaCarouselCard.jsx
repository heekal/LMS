export function MahasiwaCarouselCard({matakuliah, kelas, kode_dosen}) {
  return(
    <div className="h-[175px] max-w-[140px] min-w-[140px] flex flex-col border border-1 border-stone-300 rounded-md hover:cursor-pointer hover:ring-2 hover:ring-blue-500/50 transition-shadow">
      <div className="h-[60px] w-full bg-zinc-100 rounded-t-md"></div>
      <span className="text-sm font-semibold pl-2 pt-4">{matakuliah}</span>
      <span className="text-xs pl-2 pt-1">{kelas}</span>
      <span className="text-xs ml-2 px-2 py-1 mt-2 bg-green-200 w-fit rounded-xl bottom-0">{kode_dosen}</span>
    </div>
  )
}