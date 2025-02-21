import { Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

export function Header() {
    return (
        <Navbar bg="dark"  data-bs-theme="light">
            <Container>
                <Navbar.Brand href="/" className='text-warning fs-1 shadow-sm font-weight-bold'>Train Ticket</Navbar.Brand>
                <Nav className="ms-auto ">
                    <NavLink className={( { isActive } ) => isActive ? "text-danger nav-link" : "text-light nav-link"} to="/">Home</NavLink>
                    <NavLink className={( { isActive } ) => isActive ? "text-danger nav-link" : "text-light nav-link"} to="/ticket-details">My Ticket</NavLink>
                    <NavLink className={( { isActive } ) => isActive ? "text-danger nav-link" : "text-light nav-link"} to="/login">Login</NavLink>
                </Nav>
            </Container>
        </Navbar>
    )
}
