import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Table, Button, Container } from "react-bootstrap";
import { Header } from "../components/Header";

export function AdminPanel() {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    fetchTrains();
  }, []);

  const fetchTrains = () => {
    axios
      .get("http://localhost:3005/trains")
      .then((response) => setTrains(response.data))
      .catch((error) => console.error("Error fetching trains:", error));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this train?")) {
      axios
        .delete(`http://localhost:3005/trains/${id}`)
        .then(() => {
          alert("Train deleted successfully!");
          fetchTrains();
        })
        .catch((error) => console.error("Error deleting train:", error));
    }
  };

  return (
    <div>

      <Header/>

    <Container className="mt-5">
      <h2 className="text-center mb-4">Admin Panel - Manage Trains</h2>

      <Link to="/AddTrain">
        <Button variant="success" className="mb-3">➕ Add New Train</Button>
      </Link>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Train Name</th>
            <th>From</th>
            <th>To</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th>Price</th>
            <th>Seats</th>
            <th>booked seats</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trains.map((train) => (
            <tr key={train.id}>
              <td>{train.id}</td>
              <td>{train.name}</td>
              <td>{train.from}</td>
              <td>{train.to}</td>
              <td>{train.departureTime}</td>
              <td>{train.arrivalTime}</td>
              <td>{train.price} EGP</td>
              <td>{train.seatsAvailable}</td>
              <td>{train.bookedSeats.length}</td>
              <td>
                <Link to={`/EditTrain/${train.id}`}>
                  <Button variant="warning" size="sm" className="me-2">✏ Edit</Button>
                </Link>
                <Button variant="danger" size="sm" onClick={() => handleDelete(train.id)}>🗑 Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
          </div>
  );
}
