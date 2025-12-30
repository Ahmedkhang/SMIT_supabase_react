
import { BrowserRouter, Route, Routes } from 'react-router'
import StudentForm from '../components/StudentForm'
import Home from '../pages/Home'
import Attendance from '../components/Attendance'
import SignupPage from '../components/SignupPage'
// import Home from '../pages/Home'
// import Dashboard from '../pages/dashboardpages/Dashboard'
// import ProtectedRoutes from '../components/ProtectedRoutes'
// import Login from '../pages/Login'
// import DashboardLayout from '../layouts/DashboardLayout'
// // import Users from '../pages/dashboardpages/users'
// import Posts from '../pages/dashboardpages/Posts'
// import Todos from '../pages/dashboardpages/Todos'
// import Users from '../pages/dashboardpages/Users'
// import Users from '../pages/dashboardpages/users'

const AppRouter = () => {
  return (
    <BrowserRouter>
    <Routes>
        
    <Route element={<Home />} path="/" />
    <Route element={<StudentForm />} path="/form" />
    <Route element={<Attendance />} path="/attendance" />
    <Route element={<SignupPage />} path="/signup" />
    {/* <Route element={<Users />} path="/dashboard/users" /> */}
    {/* <Route element={<ProtectedRoutes />}>
      <Route path='/dashboard' element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path='users' element={<Users />} />
        <Route path='posts' element={<Posts />} />
        <Route path='todos' element={<Todos />} /> */}
      {/* </Route> */}
    {/* </Route> */}
    </Routes>
    </BrowserRouter>
  )
}

export default AppRouter