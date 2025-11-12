import { FaRegDotCircle } from "react-icons/fa";

export default function MahasiswaQuizStart() {
  const quizName = "Machine Learning Quiz 3";

  const data = [
    {id : "qml01", question: "Lorem ipsum dolor sit amet", option: { a : "Lorem", b : "Ipsum", c : "Dolor", d : "Sit" }},
    {id : "qml02", question: "Consectetur adipiscing elit", option: { a : "Lorem", b : "Ipsum", c : "Dolor", d : "Sit" }},
    {id : "qml03", question: "Sed do eiusmod tempor incididunt", option: { a : "Lorem", b : "Ipsum", c : "Dolor", d : "Sit" }},
    {id : "qml04", question: "Ut labore et dolore magna aliqua", option: { a : "Lorem", b : "Ipsum", c : "Dolor", d : "Sit" }},
    {id : "qml05", question: "Ut enim ad minim veniam", option: { a : "Lorem", b : "Ipsum", c : "Dolor", d : "Sit" }},
    {id : "qml06", question: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", option: { a : "Lorem", b : "Ipsum", c : "Dolor", d : "Sit" }}
  ];

  return (
    <div className="flex flex-col px-8 py-4 justify-evenly items-center">
      <h1 className="text-4xl font-semibold mb-2 text-stone-700 border-b border-stone-400 pb-3">{quizName}</h1>
      <div className="flex flex-col pt-2">
        {data.map(( q, index ) => (
          <div key={q.id} className="flex flex-col border w-[600px] border-stone-400 pl-2 pr-3 py-2 rounded-md mb-4 shadow">
            <div className="flex flex-row mb-3 mr-1 mt-1 pt-1">
              <span className="px-3 text-md">{index + 1}.</span>
              <p>{q.question}</p>
            </div>
            <span className="pl-9 text-xs text-stone-600 mb-2 italic">Answer:</span>
            <div className="pl-6 flex flex-col mb-2 mr-1 cursor-pointer">
              <div className="flex flex-row items-center gap-2 text-stone-500 border-stone-300 py-1 px-3 rounded-4xl transition-colors">
                <FaRegDotCircle />
                <span>{q.option.a}</span>
              </div>
              <div className="flex flex-row items-center gap-2 text-stone-500 py-1 px-3 rounded-4xl transition-colors">
                <FaRegDotCircle />
                <span>{q.option.b}</span>
              </div>
              <div className="flex flex-row items-center gap-2 text-stone-500 py-1 px-3 rounded-4xl  transition-colors">
                <FaRegDotCircle />
                <span>{q.option.c}</span>
              </div>
              <div className="flex flex-row items-center gap-2 text-stone-500 py-1 px-3 rounded-4xl  transition-colors">
                <FaRegDotCircle />
                <span>{q.option.d}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}