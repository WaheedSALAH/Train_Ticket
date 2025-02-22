import { Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import '../style/header.css'

export function Header() {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    console.log(loggedInUser.role)

    return (
        <Navbar bg="dark"  data-bs-theme="light">
            <Container>
                <Navbar.Brand href="/" className='text-warning fs-1 shadow-sm font-weight-bold'>Train Ticket</Navbar.Brand>
                <Nav className="ms-auto ">
                    {loggedInUser.role == 'admin' && (
                    <NavLink className={({ isActive }) => isActive ? "text-danger nav-link" : "text-light nav-link"} 
                    to="/admin">Dashboard</NavLink>)}
                    <NavLink className={( { isActive } ) => isActive ? "text-danger nav-link" : "text-light nav-link"} to="/">Home</NavLink>
                    {/* <NavLink className={( { isActive } ) => isActive ? "text-danger nav-link" : "text-light nav-link"} to="/ticket-details">My Ticket</NavLink> */}
                    {loggedInUser && loggedInUser.role !== 'admin' && (
                    <NavLink className={({ isActive }) => isActive ? "text-danger nav-link" : "text-light nav-link"} 
                    to="/ticket-details">My Ticket</NavLink>)}
                    {loggedInUser && (
                    <NavLink className={({ isActive }) => isActive ? "text-danger nav-link" : "text-light nav-link"} 
                    to="/login">Logout</NavLink>)}
                    {!loggedInUser && (
                    <NavLink className={({ isActive }) => isActive ? "text-danger nav-link" : "text-light nav-link"} 
                    to="/login">Login</NavLink>)}
                </Nav>
            </Container>
        </Navbar>
    )
}
