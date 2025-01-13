import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './components/Home'


import GetCompany from './components/admin/GetCompany'
import RegisterCompany from './components/admin/RegisterCompany'
import CompanyDetails from './components/admin/CompanyDetails'
import JobTable from './components/admin/JobTable'
import PostJobForm from './components/admin/PostJobForm'
import ViewApplicants from './components/admin/ViewApplicants'
import Job from './components/Job'
import JobDetails from './components/JobDetails'


function App() {


  return (
    <>
      <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/jobs" element={<Job/>} />
          <Route path="/admin/companies" element={<GetCompany/>} />
          <Route path="/admin/companies/register" element={<RegisterCompany/>} />
          <Route path="/admin/companies/:id" element={<CompanyDetails/>} />
          <Route path="/admin/jobs" element={<JobTable/>} />
          <Route path="/admin/jobs/createJob" element={<PostJobForm/>} />
          <Route path="/admin/jobs/view-applicants/:id" element={<ViewApplicants/>} />
          <Route path="/description/:id" element={<JobDetails/>} />
        </Routes>
      </div>
    </>
  )
}

export default App
