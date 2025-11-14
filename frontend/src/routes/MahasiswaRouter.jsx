import { GrHomeRounded } from "react-icons/gr";
import { FaRegFolderOpen } from "react-icons/fa";
import { IoSchoolOutline } from "react-icons/io5";
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar, { NavbarContent, NavbarContentTree } from "../common/Navbar"
import Dashboard from '../pages/mahasiswa/MahasiswaDashboard'
import Courses from '../pages/mahasiswa/MahasiswaCourses'
import Grades from '../pages/mahasiswa/MahasiswaGrade'
import MahasiswaCourseTemplate from "../components/mahasiswa/coursesComponents/MahasiswaCourseTemplate";
import MahasiswaQuizLanding from "../components/mahasiswa/quizComponents/MahasiswaQuizLanding";
import MahasiswaQuizStart from "../components/mahasiswa/quizComponents/MahasiswaQuizStart";
import NotFoundComponents from "../components/buttons/NotFoundComponents";

export default function MahasiswaRouter() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Navbar className="flex-0">
        <NavbarContent text="Dashboard" path="/mahasiswa" icon={<GrHomeRounded size={20} />} />
        <NavbarContentTree text="Courses" path="/mahasiswa/course" icon={<FaRegFolderOpen size={20} />} />
        <NavbarContent text="Grades" path="/mahasiswa/grade" icon={<IoSchoolOutline size={20} />} />
      </Navbar>
      <main className="flex-1 overflow-y-auto pt-13">
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="course">
            <Route index element={<Courses />} />
            <Route path="view" element={<MahasiswaCourseTemplate />} />
            <Route path="*" element={<NotFoundComponents />} />
          </Route>
          <Route path="quiz">
            <Route index element={<Navigate to ="/mahasiswa/course" />} />
            <Route path="view" element={<MahasiswaQuizLanding />} />
            <Route path="start" element={<MahasiswaQuizStart />} />
            <Route path="*" element={<NotFoundComponents />} />
          </Route>
          <Route path="grade" element={<Grades />} />
          <Route path="*" element={<NotFoundComponents />} />
        </Routes>
      </main>
    </div>
  );
}
