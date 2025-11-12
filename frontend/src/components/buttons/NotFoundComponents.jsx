export default function NotFoundComponents({ msg }) {
  return (
    <div className="h-screen w-full grid grid-cols">
      <div className="flex items-start pt-5 pl-3"> 
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-[50px] font-semibold text-stone-800 pb-3">404 Page Not Found</h1>
        <span>{msg}</span>
      </div>
    </div>
  )
}