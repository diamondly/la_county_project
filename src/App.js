import Navbar from "./Navbar"
import React from "react"
import Home from "./pages/Home"
import Department from "./pages/Department"
import Parking from "./pages/Parking"
import Employee from "./pages/Employee"
import AccessKeycards from "./pages/AccessKeycards"
import Reports from "./pages/Reports"
import Permits from "./pages/Permits"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Forgotpass from "./pages/Forgotpass"
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <>
      <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/department" element={<Department />} />
            <Route path="/parking" element={<Parking />} />
            <Route path="/employees" element={<Employee />} />
            <Route path="/accessKeycards" element={<AccessKeycards />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/permitters" element={<Permits />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotPass" element={<Forgotpass />} />
          </Routes>
        </div>
    </>

  )
}

export default App;