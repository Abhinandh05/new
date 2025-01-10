import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './components/Home'
import { Job } from '../../backend/models/job.model'
import Jobs from './components/Jobs'
import GetCompany from './components/admin/GetCompany'
import RegisterCompany from './components/admin/RegisterCompany'
import CompanyDetails from './components/admin/CompanyDetails'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/jobs" element={<Jobs/>} />
          <Route path="/admin/companies" element={<GetCompany/>} />
          <Route path="/admin/companies/register" element={<RegisterCompany/>} />
          <Route path="/admin/companies/:id" element={<CompanyDetails/>} />
        </Routes>
      </div>
    </>
  )
}

export default App
