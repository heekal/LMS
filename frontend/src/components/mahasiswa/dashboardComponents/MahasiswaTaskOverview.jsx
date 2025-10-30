import { MahasiswaTaskCard } from "./MahasiswaTaskCard";

export function MahasiswaTaskOverview({ owner }) {
  return (
    <>
      <div className="flex relative flex-col w-full rounded-lg shadow-sm cursor-default">
        <div className="flex flex-col overflow-y-auto scrollbar-thin">
          
          <MahasiswaTaskCard taskname={ owner } deadline="19/12/2025" course="machine-learning" path="finaltermexam"/>
          {/* <MahasiswaTaskCard taskname="Quiz 1" deadline="21/12/2025" course="big-data" path="finaltermexam"/>
          <MahasiswaTaskCard taskname="Quiz 2" deadline="19/12/2025" course="artificial-intelligence" path="finaltermexam"/> */}
        </div>
      </div>
    </>
  );
}