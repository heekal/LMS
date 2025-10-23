import { MahasiwaCarouselCard } from "./MahasiswaCarouselCard"

export function MahasiswaCourseCarousel() {
  return (
    <>
      <div className="w-full h-full flex flex-row gap-5 items-center pl-1">
        <MahasiwaCarouselCard matakuliah={"Machine Learning"} kelas={"TK-46-03"} kode_dosen={"BAH"} path="machine-learning"/>
        <MahasiwaCarouselCard matakuliah={"Big Data"} kelas={"TK-GAB-04"} kode_dosen={"LIL"} path="big-data"/>
        <MahasiwaCarouselCard matakuliah={"Artificial Intelligence"} kelas={"TK-GAB-05"} kode_dosen={"PRB"} path="artificial-intelligence"/>
      </div>
    </>
  )
}