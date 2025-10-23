import { MahasiswaTaskCard } from "./MahasiswaTaskCard";

export function MahasiswaTaskOverview() {
  return (
    <>
      <div className="flex relative flex-col w-full rounded-lg shadow-sm cursor-default">
        <div className="flex flex-col overflow-y-auto scrollbar-thin">
          <MahasiswaTaskCard taskname="Quiz 3" deadline="19/12/2025" course="Machine Learning" path=""/>
          <MahasiswaTaskCard taskname="Quiz 1" deadline="21/12/2025" course="Big Data" path=""/>
          <MahasiswaTaskCard taskname="Quiz 2" deadline="19/12/2025" course="Artificial Intelligence" path=""/>
        </div>
      </div>
    </>
  );
}