import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";

export function AddTrain() {
  const [trainData, setTrainData] = useState({
    name: "",
    from: "",
    to: "",
    departureTime: "",
    arrivalTime: "",
    price: "",
    seatsAvailable: "",
    bookedSeats: [],
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTrainData((prevData) => ({
      ...prevData,
      [name]: name === "price" || name === "seatsAvailable" ? Number(value) : value, // Convert to number
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!trainData.name || !trainData.from || !trainData.to) {
      setError("Please fill all required fields.");
      return;
    }

    axios
      .post("http://localhost:3005/trains", trainData)
      .then(() => {
        alert("Train added successfully!");
        navigate("/admin"); // Redirect back to Admin Page
      })
      .catch(() => {
        setError("Something went wrong. Please try again.");
      });
  };

  return (
    <Container className="mt-5 w-50">
      <h2 className="text-center mb-4">Add Train</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Train Name</Form.Label>
          <Form.Control type="text" name="name" value={trainData.name} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>From</Form.Label>
          <Form.Control type="text" name="from" value={trainData.from} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>To</Form.Label>
          <Form.Control type="text" name="to" value={trainData.to} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Departure Time</Form.Label>
          <Form.Control type="time" name="departureTime" value={trainData.departureTime} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Arrival Time</Form.Label>
          <Form.Control type="time" name="arrivalTime" value={trainData.arrivalTime} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control type="number" name="price" value={trainData.price} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Seats Available</Form.Label>
          <Form.Control type="number" name="seatsAvailable" value={trainData.seatsAvailable} onChange={handleChange} required />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">Add Train</Button>
      </Form>
    </Container>
  );
}
