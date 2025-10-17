import { MahasiswaTaskCard } from "../taskCards/MahasiswaTaskCard";

export function MahasiswaTaskOverview() {
  return (
    <>
      <div className="flex relative flex-col w-full rounded-lg shadow-sm">
        <div className="flex flex-col divide-y divide-stone-200 overflow-y-auto scrollbar-thin">
          <MahasiswaTaskCard taskname="Quiz 1" deadline="20/12/2025" course="DevSecOps" />
          <MahasiswaTaskCard taskname="Quiz 3" deadline="19/12/2025" course="Machine Learning" />
          <MahasiswaTaskCard taskname="Remedial 1" deadline="21/12/2025" course="Big Data" />
          <MahasiswaTaskCard taskname="Laporan Praktikum 1" deadline="19/12/2025" course="Artificial Intelligence" />
          <MahasiswaTaskCard taskname="Laporan Tugas Akhir" deadline="28/12/2025" course="Proposal Tugas Akhir" />
        </div>
      </div>
    </>
  );
}
