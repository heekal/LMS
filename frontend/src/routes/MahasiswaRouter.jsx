import { GrHomeRounded } from "react-icons/gr";
import { FaRegFolderOpen } from "react-icons/fa";
import { IoSchoolOutline } from "react-icons/io5";
import { Routes, Route } from 'react-router-dom'
import Navbar, { NavbarContent, NavbarContentTree } from "../common/Navbar"
import Dashboard from '../pages/mahasiswa/MahasiswaDashboard'
import Courses from '../pages/mahasiswa/MahasiswaCourses'
import Grades from '../pages/mahasiswa/MahasiswaGrade'
import Breadcrumb from "../common/Breadcrumb";
import MahasiswaCourseTemplate from "../components/mahasiswa/coursesCards/MahasiswaCourseTemplate";
import MahasiswaQuizLanding from "../components/mahasiswa/quizCards/MahasiswaQuizLanding";
import MahasiswaQuizStart from "../components/mahasiswa/quizCards/MahasiswaQuizStart";
import MahasiswaQuizPreview from "../components/mahasiswa/quizCards/MahasiswaQuizPreview";


export default function MahasiswaRouter() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Navbar>
        <NavbarContent text="Dashboard" path="/mahasiswa" icon={<GrHomeRounded size={17} />} />
        <NavbarContentTree text="Courses" path="/mahasiswa/course" icon={<FaRegFolderOpen size={20} />} />
        <NavbarContent text="Grades" path="/mahasiswa/grade" icon={<IoSchoolOutline size={20} />} />
      </Navbar>
      <main className="flex-1 relative overflow-y-auto">
        <Breadcrumb />
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="course">
            <Route index element={<Courses />} />
            <Route path=":courseId" element={<MahasiswaCourseTemplate />} />
            <Route path=":courseId">
              <Route path=":assignId" element={<MahasiswaQuizLanding />} />
              <Route path=":assignId/start" element={<MahasiswaQuizStart />} />
              <Route path=":assignId/preview" element={<MahasiswaQuizPreview />} />
            </Route>
          </Route>
          <Route path="grade" element={<Grades />} />
        </Routes>
      </main>
    </div>
  );
}
