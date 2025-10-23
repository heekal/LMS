export default function MahasiswaQuizLanding() {
  return (
    <div className="flex flex-col px-8 pt-4">
      <h1 className="font-semibold text-4xl text-stone-800">
        Quiz
      </h1>
      <p className="mt-1 mb-6 text-stone-700 pb-3 border-b border-stone-300">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
      <div className="border border-stone-300 rounded-xl pt-6 pb-5 px-4 bg-white shadow-sm w-fit">
        <h2 className="text-lg font-semibold text-stone-800 mb-3">
          Please Read the Following Rules
        </h2>
        <ul className="list-disc list-inside text-sm text-stone-600 mb-5 flex flex-col justify-evenly">
          <li>Do not refresh the page during the quiz.</li>
          <li>Click “Start” only when you're ready.</li>
        </ul>
        <button className="bg-[#6395EE] text-white font-semibold text-sm px-5 py-2 rounded-lg hover:bg-[#4c7cd8] hover:shadow-md active:scale-[0.98] transition-all duration-150">Start</button>
      </div>
    </div>
  );
}
