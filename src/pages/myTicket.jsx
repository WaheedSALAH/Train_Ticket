import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Spinner, Alert } from "react-bootstrap";
import { Header } from "../components/Header";

export default function MyTicket() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  let userinfo = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const ticketinfo = async () => {
      if (!userinfo) {
        setError("User not logged in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:3005/tickets");
        const userTickets = response.data.filter(i => i.email === userinfo.email);
        setTickets(userTickets);
      } catch (error) {
        console.error("Error fetching tickets:", error);
        setError("Failed to fetch tickets.");
      } finally {
        setLoading(false);
      }
    };

    ticketinfo();
  }, [userinfo]);

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;

  return (
    <div>
        <Header/>
        <Container className="mt-5">
          <div className="text-center m-4">
             <h2 className="text-center mb-4 text-dark fw-bold shadow d-inline bg-danger rounded px-2">My Tickets</h2>
          </div>

      {error && <Alert variant="danger" className="text-center">{error}</Alert>}

      {tickets.length === 0 ? (
        <Alert variant="warning" className="text-center">You have no booked tickets.</Alert>
      ) : (
        tickets.map((i) => (
          <Card key={i.id} className="mb-4 shadow-lg border-0 rounded-3">
            <Card.Body className="p-4 d-flex flex-column align-items-center text-center">
              <img 
                src={i.imgUrl} 
                alt={i.trainName} 
                style={{ width: "280px", height: "170px", objectFit: "cover" }} 
                className="rounded shadow-sm mb-2"
              />
              <h4 className="text-dark fw-bold">{i.trainName}</h4>
              <p className="text-muted"><strong>Route:</strong> {i.from} → {i.to}</p>
              <p><strong>Departure:</strong> {new Date(i.bookingDate).toLocaleString()}</p>
              <p><strong>Seats:</strong> {i.selectedSeats.join(", ")}</p>
              <p className="text-success fw-bold"><strong>Total Price:</strong> {i.totalPrice} EGP</p>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>

      </div>
  );
}
