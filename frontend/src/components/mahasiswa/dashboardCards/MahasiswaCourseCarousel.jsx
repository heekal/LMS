import { MahasiwaCarouselCard } from "./MahasiswaCarouselCard"

export function MahasiswaCourseCarousel() {
  return (
    <>
      <div className="w-full h-full flex flex-row gap-5 items-center pl-1">
        <MahasiwaCarouselCard matakuliah={"Machine Learning"} kelas={"TK-46-03"} kode_dosen={"BAH"}/>
        <MahasiwaCarouselCard matakuliah={"Big Data"} kelas={"TK-GAB-04"} kode_dosen={"LIL"}/>
        <MahasiwaCarouselCard matakuliah={"Artificial Intelligence"} kelas={"TK-GAB-05"} kode_dosen={"PRB"}/>
      </div>
    </>
  )
}