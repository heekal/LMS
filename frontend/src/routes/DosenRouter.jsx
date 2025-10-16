import { GrHomeRounded } from "react-icons/gr";
import { FaRegFolderOpen } from "react-icons/fa";
import { IoSchoolOutline } from "react-icons/io5";
import { Routes, Route } from 'react-router-dom'
import Navbar, { NavbarContent } from "../common/Navbar"
import Dashboard from '../pages/dosen/DosenBeranda'
import Classes from '../pages/dosen/DosenKelas'
import Grades from '../pages/dosen/DosenNilai'
import Breadcrumb from "../common/Breadcrumb";

export default function DosenRouter() {
  return (
    <>
      <div className='flex h-screen overflow-hidden'>
        <Navbar>
          <NavbarContent text='Dashboard' path='/dosen' icon={<GrHomeRounded size={18} />} />
          <NavbarContent text='Classes' path='/dosen/class' icon={<FaRegFolderOpen size={20}/>} />
          <NavbarContent text='Grades' path='/dosen/grade' icon={<IoSchoolOutline size={20}/>} />
        </Navbar>

        <main className='flex-1 relative overflow-y-auto'>
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
