export default function MahasiswaGradeTable() {
  const data = [
    { class: "Big Data", q1: 90, q2: 85, q3: null, status: false},
    { class: "Artificial Intelligence", q1: 93, q2: 90, q3: null, status : true },
    { class: "Machine Learning", q1: 70, q2: 57, q3: null, status: false }
  ];

  return (
    <div className="w-full">
      <div className="w-full border border-stone-400 rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-stone-100 text-stone-700">
            <tr>
              <th className="py-3 px-4 text-left">Course</th>
              <th className="py-3 px-4 text-center">Quiz 1</th>
              <th className="py-3 px-4 text-center">Quiz 2</th>
              <th className="py-3 px-4 text-center">Quiz 3</th>
              <th className="py-3 px-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr
                key={row.class}
                className="border-t border-stone-400 hover:bg-stone-100 transition-colors"
              >
                <td className="py-3 px-4">{row.class}</td>
                <td className="py-2 px-4 text-center">
                  {row.q1 ?? <span className="text-gray-400">Not Finished Yet</span>}
                </td>
                <td className="py-2 px-4 text-center">
                  {row.q2 ?? <span className="text-gray-400">Not Finished Yet</span>}
                </td>
                <td className="py-2 px-4 text-center">
                  {row.q3 ?? <span className="text-gray-400">Not Finished Yet</span>}
                </td>
                <td className="py-2 px-4 text-center">
                  {row.status ? <span className="text-green-400 px-3 py-1 bg-emerald-100 rounded-4xl border border-green-200">Passed</span> : <span className="text-rose-400 bg-rose-100 px-3 py-1 rounded-4xl border border-red-200">Not Finished Yet</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs py-3 text-blue-400 italic cursor-default">Please Contact Your Lecturer If Data Wrong</p>
    </div>
  );
}
