import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";

export function EditTrain() {
  const { id } = useParams();
  const [trainData, setTrainData] = useState({
    name: "",
    from: "",
    to: "",
    img: "",
    departureTime: "",
    arrivalTime: "",
    price: "",
    seatsAvailable: "",
    bookedSeats: [],
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3005/trains/${id}`)
      .then((response) => setTrainData(response.data))
      .catch((error) => console.error("Error fetching train:", error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTrainData((prevData) => ({
      ...prevData,
      [name]: name === "bookedSeats"
        ? value.split(",").map(seat => Number(seat.trim())).filter(seat => !isNaN(seat)) 
        : name === "seatsAvailable" || name === "price"
        ? Number(value) || 0  
        : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:3005/trains/${id}`, trainData)
      .then(() => {
        alert("Train updated successfully!");
        navigate("/admin");
      })
      .catch(() => setError("Something went wrong. Please try again."));
  };

  return (
    <Container className="mt-5 w-50">
      <h2 className="text-center mb-4">Edit Train</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Train Name</Form.Label>
          <Form.Control type="text" name="name" value={trainData.name} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Train Image URL</Form.Label>
          <Form.Control type="text" name="img" value={trainData.img} onChange={handleChange} required />
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

        <Form.Group className="mb-3">
          <Form.Label>Booked Seats</Form.Label>
          <Form.Control
            type="text"
            name="bookedSeats"
            value={trainData.bookedSeats.join(", ")} 
            onChange={handleChange}
          />
          <Button
            variant="warning"
            className="mt-2"
            onClick={() => setTrainData({ ...trainData, bookedSeats: [] })}
          >
            Reset Booked Seats
          </Button>
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Save Changes
        </Button>
      </Form>
    </Container>
  );
}
