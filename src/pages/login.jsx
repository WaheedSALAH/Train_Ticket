import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { FormText } from "react-bootstrap";

export function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEmail = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordBlur = () => {
    if (formData.password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    axios
      .get("http://localhost:3005/users")
      .then((response) => {
        const users = response.data;
        const user = users.find(
          (user) =>
            user.email === formData.email && user.password === formData.password
        );

        if (user) {
          // ✅ Store user data in localStorage
          localStorage.setItem("user", JSON.stringify(user));

          alert("Login successful");
          navigate("/"); // Redirect to homepage
        } else {
          setError("Invalid email or password");
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setError("Something went wrong. Please try again later.");
      });
  };

  return (
    <Container fluid className="justify-content-center mt-5 w-50">
      <Row className="justify-content-center">
        <div className="border p-4 rounded shadow-lg">
          <h2 className="text-center mb-4">Login</h2>

          <Form onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger">{error}</div>}

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleEmail}
              />
              {emailError && <div className="alert alert-danger">{emailError}</div>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handlePasswordBlur}
              />
              {passwordError && <div className="alert alert-danger">{passwordError}</div>}
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
            <FormText>already have account ? <Link to="/register">Register</Link></FormText>
          </Form>
        </div>
      </Row>
    </Container>
  );
}
