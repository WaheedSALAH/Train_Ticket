import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../style/header.css";

export function Header() {
    const loggedInUser = JSON.parse(localStorage.getItem("user")) || null;

    return (
        <Navbar expand="lg" bg="dark" variant="dark" className="shadow-lg">
            <Container>
                <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center">
  <img
    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQUmUDn9WZD5uXSW9FNekZ4iigNP7PQaFAvA&s"
    alt="Logo"
    style={{ width: "80px", height: "50px", objectFit: "cover" }}
    className="rounded me-2"
  />
  <span className="text-warning fw-bold fs-3 shadow-sm">
    Train Ticket
  </span>
</Navbar.Brand>


                <Navbar.Toggle aria-controls="navbar-nav" />

                <Navbar.Collapse id="navbar-nav">
                    <Nav className="ms-auto">
                        {loggedInUser && loggedInUser.role === "admin" && (
                            <NavLink
                                className={({ isActive }) =>
                                    isActive ? "text-danger nav-link" : "text-light nav-link"
                                }
                                to="/admin"
                            >
                                Dashboard
                            </NavLink>
                        )}

                        <NavLink
                            className={({ isActive }) =>
                                isActive ? "text-danger nav-link" : "text-light nav-link"
                            }
                            to="/"
                        >
                            Home
                        </NavLink>

                        {loggedInUser && loggedInUser.role !== "admin" && (
                            <NavLink
                                className={({ isActive }) =>
                                    isActive ? "text-danger nav-link" : "text-light nav-link"
                                }
                                to="/ticket-details"
                            >
                                My Ticket
                            </NavLink>
                        )}

                        {loggedInUser ? (
                            <NavLink
                                className={({ isActive }) =>
                                    isActive ? "text-danger nav-link" : "text-light nav-link"
                                }
                                to="/login"
                            >
                                Logout
                            </NavLink>
                        ) : (
                            <NavLink
                                className={({ isActive }) =>
                                    isActive ? "text-danger nav-link" : "text-light nav-link"
                                }
                                to="/login"
                            >
                                Login
                            </NavLink>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
