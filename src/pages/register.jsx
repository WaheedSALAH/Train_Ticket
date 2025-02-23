// import { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import FormText from 'react-bootstrap/esm/FormText';
// import axios from 'axios';
// import {Link, useNavigate } from 'react-router-dom';

// export function Register() {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     nationalId: '',
//     checkBox: false,
//   });

//   const navigate = useNavigate(); // استخدام التوجيه


//   const [error, setError] = useState('');
//   const [emailError, setemailError] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [emailExistsError, setEmailExistsError] = useState('');
//   const [nationalIdExistsError, setNationalIdExistsError] = useState('');

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const handlePasswordBlur = () => {
//     if (formData.password.length < 8) {
//       setPasswordError('Password must be at least 8 characters');
//     } else {
//       setPasswordError('');
//     }
//   };

//   const handleEmail = () => {
//     const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     if (!emailRegex.test(formData.email)) {
//         setemailError('Please enter a valid email address');
//     } else {
//         setemailError('');
//     }
//   };
  


//   const handleConfirmPassword = () => {
//     if (formData.password !== formData.confirmPassword) {
//       setConfirmPassword(`Password doesn't match`);
//     } else {
//       setConfirmPassword('');
//     }
//   };

//   const handleNationalID = () => {
//     if (!formData.nationalId.match(/^\d{14}$/)) {
//       setError('National ID must be 14 digits');
//     } else {
//       setError('');
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     if (formData.password !== formData.confirmPassword) {
//       setConfirmPassword(`Password doesn't match`);
//       return;
//     }
  
//     if (formData.password.length < 8) {
//       setPasswordError('Password must be at least 8 characters');
//       return;
//     }
  
//     if (!formData.nationalId.match(/^\d{14}$/)) {
//       setError('National ID must be 14 digits');
//       return;
//     }
  
//     try {
//       const response = await axios.get('http://localhost:3005/users');
//       const users = response.data;
  
//       const emailExists = users.some((user) => user.email === formData.email);
//       const nationalIdExists = users.some((user) => user.nationalId === formData.nationalId);
  
//       if (emailExists) {
//         setEmailExistsError('Email is already registered');
//       } else {
//         setEmailExistsError('');
//       }
  
//       if (nationalIdExists) {
//         setNationalIdExistsError('National ID is already registered');
//       } else {
//         setNationalIdExistsError('');
//       }
  
//       // إذا كان هناك خطأ، لا تقم بإرسال الطلب
//       if (emailExists || nationalIdExists) return;
  
//       // تسجيل المستخدم في قاعدة البيانات
//       await axios.post('http://localhost:3005/users', formData);
//       alert('Registered successfully');
//       navigate('/login'); // ✅ سينتقل المستخدم إلى صفحة تسجيل الدخول
//     } catch (error) {
//       console.error('Error:', error);
//       setError('Something went wrong. Please try again later.');
//     }
//   };
  
//   return (
//     <Container fluid className=" justify-content-center align-items-center mt-5 w-50">
//       <Row className="justify-content-center">
//         <div className="border p-4 rounded shadow-lg">
//           <h2 className="text-center mb-4">Register</h2>

//           <Form onSubmit={handleSubmit}>
//           {nationalIdExistsError && <div className="alert alert-danger">{nationalIdExistsError}</div>}
//           {emailExistsError && <div className="alert alert-danger">{emailExistsError}</div>}


//             <Form.Group className="mb-3" controlId="formBasicUserName">
//               <Form.Label>User Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter user name"
//                 name="username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>

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
//                  <FormText>
//                 {emailError && <div className="alert alert-danger">{emailError}</div>}
//               </FormText>
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
//                 required
//               />
//               <FormText>
//                 {passwordError && <div className="alert alert-danger">{passwordError}</div>}
//               </FormText>

//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formConfirmPassword">
//               <Form.Label>Confirm Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 placeholder="Confirm password"
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 onBlur={handleConfirmPassword}
//                 required
//               />
//               <FormText>
//                 {confirmPassword && <div className="alert alert-danger">{confirmPassword}</div>}
//               </FormText>
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formNationalId">
//               <Form.Label>National ID</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter National ID"
//                 name="nationalId"
//                 value={formData.nationalId}
//                 onChange={handleChange}
//                 onBlur={handleNationalID}
//                 required
//               />
//               {error && <div className="alert alert-danger">{error}</div>}
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formBasicCheckbox">
//               <Form.Check
//                 type="checkbox"
//                 label="I agree to the terms and conditions"
//                 name="checkBox"
//                 checked={formData.checkBox}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>

//               <div className='text-center'>

//             <Button variant="primary" type="submit" className="w-50">
//               Register
//             </Button>
//               </div>
//                 <div className='text-center mt-4'> 

//               <FormText>already have account ? <Link to="/login">Login</Link></FormText>
//                 </div>

//           </Form>
//         </div>
//       </Row>
//     </Container>
//   );
// }

import { useState } from "react";
import { Button, Form, Container, Row, Alert, FormText } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    nationalId: "",
    checkBox: false,
  });

  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [emailExistsError, setEmailExistsError] = useState("");
  const [nationalIdExistsError, setNationalIdExistsError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const [usernameError, setUsernameError] = useState("");

const validateUsername = () => {
  const usernameRegex = /^[a-zA-Z0-9]{4,15}$/; 
  if (!usernameRegex.test(formData.username)) {
    setUsernameError("Username must be 4-15 letters or numbers");
  } else {
    setUsernameError("");
  }
};


  const validateEmail = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setEmailError(emailRegex.test(formData.email) ? "" : " Invalid email address");
  };

  const validatePassword = () => {
    setPasswordError(formData.password.length >= 8 ? "" : " At least 8 characters");
  };

  const validateConfirmPassword = () => {
    setConfirmPasswordError(
      formData.password === formData.confirmPassword ? "" : "Passwords do not match"
    );
  };

  const validateNationalID = () => {
    setError(/^\d{14}$/.test(formData.nationalId) ? "" : " National ID must be 14 digits");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (passwordError || confirmPasswordError || emailError || error) return;
  
    try {
      const response = await axios.get("http://localhost:3005/users");
      const users = response.data;
  
      const emailExists = users.some((user) => user.email === formData.email);
      const nationalIdExists = users.some((user) => user.nationalId === formData.nationalId);
  
      if (emailExists) setEmailExistsError("Email is already registered");
      if (nationalIdExists) setNationalIdExistsError("National ID is already registered");
  
      if (emailExists || nationalIdExists) return;
  
      await axios.post("http://localhost:3005/users", formData);
      alert("✅ Registered successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
      setError("⚠️ Something went wrong. Please try again later.");
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{ background: "linear-gradient(to bottom,rgb(38, 36, 31), #fff)" }}
    >
      <Row className="w-100" style={{ maxWidth: "450px" }}>
        <div
          className="border p-4 rounded shadow-lg bg-white text-center"

        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQUmUDn9WZD5uXSW9FNekZ4iigNP7PQaFAvA&s"
            alt="Egyptian Railways"
            className="img-fluid mb-3"
            style={{ width: "100px" }}
          />

          <h2 className="text-danger mb-4">Train Ticket Registration</h2>

          <Form onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}
            {emailExistsError && <Alert variant="danger">{emailExistsError}</Alert>}
            {nationalIdExistsError && <Alert variant="danger">{nationalIdExistsError}</Alert>}

            <Form.Group className="mb-3">
  <Form.Label className="fw-bold">Username</Form.Label>
  <Form.Control
    type="text"
    placeholder="Enter username"
    name="username"
    value={formData.username}
    onChange={handleChange}
    onBlur={validateUsername}
    required
  />
  {usernameError && <FormText className="text-danger">{usernameError}</FormText>}
</Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={validateEmail}
              />
              {emailError && <FormText className="text-danger">{emailError}</FormText>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={validatePassword}
              />
              {passwordError && <FormText className="text-danger">{passwordError}</FormText>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={validateConfirmPassword}
              />
              {confirmPasswordError && <FormText className="text-danger">{confirmPasswordError}</FormText>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">National ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter 14-digit National ID"
                name="nationalId"
                value={formData.nationalId}
                onChange={handleChange}
                onBlur={validateNationalID}
              />
              {error && <FormText className="text-danger">{error}</FormText>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="I agree to the terms and conditions"
                name="checkBox"
                checked={formData.checkBox}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button
              variant="danger"
              type="submit"
              className="w-100 fw-bold"
              style={{
                backgroundColor: "#d32f2f",
                borderColor: "#d32f2f",
                transition: "0.3s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#b71c1c")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#d32f2f")}
            >
              Register
            </Button>

            <div className="text-center mt-4">
              <FormText>
                Already have an account?{" "}
                <Link to="/login" className="text-danger fw-bold">
                  Login
                </Link>
              </FormText>
            </div>
          </Form>
        </div>
      </Row>
    </Container>
  );
}
