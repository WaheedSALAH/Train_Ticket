// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import axios from "axios";
// import { FormText } from "react-bootstrap";

// export function Login() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleEmail = () => {
//     const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

//     if (formData.email.trim() === "") {
//       setEmailError("Can't be empty");
//       return;
//     }

//     if (!emailRegex.test(formData.email)) {
//       setEmailError("Please enter a valid email address");
//     } else {
//       setEmailError("");
//     }
//   };

//   const handlePasswordBlur = () => {
//     if (formData.password.length < 8) {
//       setPasswordError("Password must be at least 8 characters");
//     } else {
//       setPasswordError("");
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError("");

//     if (!formData.email || !formData.password) {
//       setError("Please fill in all fields");
//       return;
//     }

//     axios
//       .get("http://localhost:3005/users")
//       .then((response) => {
//         const users = response.data;
//         const user = users.find(
//           (user) =>
//             user.email === formData.email && user.password === formData.password
//         );

//         if (user) {
//           // ✅ Store user data in localStorage
//           localStorage.setItem("user", JSON.stringify({ id: user.id, role: user.role,nationalId:user.nationalId ,email:user.email,username:user.username }));

//           alert("Login successful");

//           navigate("/"); 


//           if (user.role === "admin") {
//             // localStorage.setItem("isAdmin", true);
//             navigate("/admin");
//           // } else {
//           //   localStorage.setItem("isAdmin", false);
//           //   navigate("/");
//           }
//         } else {
//           setError("Invalid email or password");
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching users:", error);
//         setError("Something went wrong. Please try again later.");
//       });
//   };

//   return (
//     <Container fluid className="justify-content-center mt-5 w-50">
//       <Row className="justify-content-center">
//         <div className="border p-4 rounded shadow-lg">
//           <h2 className="text-center mb-4">Login</h2>

//           <Form onSubmit={handleSubmit}>
//             {error && <div className="alert alert-danger">{error}</div>}

//             <Form.Group className="mb-3" controlId="formBasicEmail">
//               <Form.Label>Email address</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 onBlur={handleEmail}
//               />
//               {emailError && <div className="alert alert-danger">{emailError}</div>}
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formBasicPassword">
//               <Form.Label>Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 placeholder="Password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 onBlur={handlePasswordBlur}
//               />
//               {passwordError && <div className="alert alert-danger">{passwordError}</div>}
//             </Form.Group>

//             <Button variant="primary" type="submit" className="w-100">
//               Login
//             </Button>
//             <div className="text-center mt-4">
//               <FormText className="">
//                 Don't have an account? <Link to="/register">Register</Link>
//               </FormText>
//             </div>
//           </Form>
//         </div>
//       </Row>
//     </Container>
//   );
// }


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Container, Row, Alert, FormText } from "react-bootstrap";
import axios from "axios";

export function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email.trim()) {
      setEmailError("Email can't be empty");
    } else if (!emailRegex.test(formData.email)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = () => {
    setPasswordError(formData.password.length < 8 ? "At least 8 characters" : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    try {
      const { data: users } = await axios.get("http://localhost:3005/users");
      const user = users.find((u) => u.email === formData.email && u.password === formData.password);

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        alert("Login successful");

        navigate(user.role === "admin" ? "/admin" : "/");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        background: "linear-gradient(to bottom, #2C3E50, #BDC3C7)",
      }}
    >
      <Row className="w-100" style={{ maxWidth: "400px" }}>
        <div
          className="border p-4 rounded shadow-lg bg-white"
          style={{
            borderRadius: "12px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
          }}
        >
          <h2 className="text-center mb-4 text-danger">Login</h2>

          <Form onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}

            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={validateEmail}
                className={`form-control ${emailError ? "border-danger" : ""}`}
                style={{ padding: "10px", borderRadius: "8px" }}
              />
              {emailError && <FormText className="text-danger">{emailError}</FormText>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={validatePassword}
                className={`form-control ${passwordError ? "border-danger" : ""}`}
                style={{ padding: "10px", borderRadius: "8px" }}
              />
              {passwordError && <FormText className="text-danger">{passwordError}</FormText>}
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100"
              style={{
                padding: "10px",
                borderRadius: "8px",
                backgroundColor: "#E74C3C",
                border: "none",
                fontWeight: "bold",
                transition: "0.3s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#C0392B")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#E74C3C")}
            >
              Login
            </Button>

            <div className="text-center mt-4">
              <FormText>
                Don't have an account? <Link className="text-danger" to="/register">Register</Link>
              </FormText>
            </div>
          </Form>
        </div>
      </Row>
    </Container>
  );
}
