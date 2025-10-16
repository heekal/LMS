import { GrHomeRounded } from "react-icons/gr";
import { FaRegFolderOpen } from "react-icons/fa";
import { IoSchoolOutline } from "react-icons/io5";
import { Routes, Route } from 'react-router-dom'
import Navbar, { NavbarContent } from "../common/Navbar"
import Dashboard from '../pages/mahasiswa/MahasiswaBeranda'
import Classes from '../pages/mahasiswa/MahasiswaKelas'
import Grades from '../pages/mahasiswa/MahasiswaNilai'
import Breadcrumb from "../common/Breadcrumb";

export default function MahasiswaRouter() {
  return (
    <>
      <div className='flex'>
        <Navbar>
          <NavbarContent text='Dashboard' path='/mahasiswa' icon={<GrHomeRounded size={18} />} />
          <NavbarContent text='Classes' path='/mahasiswa/class' icon={<FaRegFolderOpen size={20}/>} />
          <NavbarContent text='Grades' path='/mahasiswa/grade' icon={<IoSchoolOutline size={20}/>} />
        </Navbar>

        <main className='flex-1 relative'>
          <Breadcrumb />
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path='class' element={<Classes />} />
            <Route path='grade' element={<Grades />} />
          </Routes>
        </main>
      </div>
    </>
  )
}
