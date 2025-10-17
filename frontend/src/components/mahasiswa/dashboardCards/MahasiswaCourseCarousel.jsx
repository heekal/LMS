import { MahasiwaCarouselCard } from "./MahasiswaCarouselCard"

export function MahasiswaCourseCarousel() {
  return (
    <>
      <div className="w-full h-full flex flex-row gap-5 items-center">
        <MahasiwaCarouselCard matakuliah={"DevSecOps"} kelas={"TK-GAB-02"} kode_dosen={"YDP"}/>
        <MahasiwaCarouselCard matakuliah={"Machine Learning"} kelas={"TK-46-03"} kode_dosen={"AHY"}/>
        <MahasiwaCarouselCard matakuliah={"Big Data"} kelas={"TK-GAB-04"} kode_dosen={"UMR"}/>
        <MahasiwaCarouselCard matakuliah={"Artificial Intelligence"} kelas={"TK-GAB-05"} kode_dosen={"FRW"}/>
        <MahasiwaCarouselCard matakuliah={"Proposal Tugas Akhir"} kelas={"TK-46-03"} kode_dosen={"ABO"}/>
      </div>
    </>
  )
}