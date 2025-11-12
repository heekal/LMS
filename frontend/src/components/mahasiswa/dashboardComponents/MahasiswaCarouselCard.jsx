import { useNavigate } from "react-router-dom"

export function MahasiwaCarouselCard({matakuliah, kelas, path}) {
  const navigate = useNavigate();
  
  const handleMove = () => {
    navigate(`/mahasiswa/course/view?id=${path}`);
  };
  
  return(
    <button onClick={handleMove} className="flex flex-col h-[175px] max-w-[140px] min-w-[140px] flex flex-col border border-1 border-stone-300 rounded-md hover:cursor-pointer hover:ring-2 hover:ring-blue-500/50 transition-shadow">
      <div className="h-[60px] w-full bg-zinc-100 rounded-t-md"></div>
      <span className="flex text-start text-sm font-semibold pl-2 pt-3">{matakuliah}</span>
      <span className="flex text-left text-xs pl-2 pt-1">{kelas}</span>
      <span className="flex text-xs ml-2 px-2 py-1 mt-2 bg-blue-200 w-fit rounded-md bottom-0"></span>
    </button>
  )
}