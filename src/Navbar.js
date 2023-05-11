import React from 'react'
import { Link } from "react-router-dom"

export default function Navbar() {
    return (
    <nav className='nav'>
        <Link to="/" className="site-name">Central Card Manager</Link>
        <ul>
            <li><Link to="/department">Department of LA County</Link></li>
            <li><Link to="/parking">Parking Lot Facilities</Link></li>
            <li><Link to ="/employees">Employees</Link></li>
            <li><Link to="/accessKeycards">Parking Access Keycards</Link></li>
            <li><Link to="/reports">Reports</Link></li>
            <li><Link to="/permitters">Permitters for All County Employees</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    </nav>
    )
}