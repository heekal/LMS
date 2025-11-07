export default function NotFoundComponents() {
  return (
    <div className="h-full w-full grid grid-cols">
      <div className="flex items-start pt-5 pl-3"> 
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-[50px] font-semibold text-stone-800 pb-3">404 Page Not Found</h1>
        <button>You are accessing link that either doesn't exist nor acessible yet, please back to dashboard!</button>
      </div>
    </div>
  )
}