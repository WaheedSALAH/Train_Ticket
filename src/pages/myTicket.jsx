import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Spinner, Alert, Button } from "react-bootstrap";
import { Header } from "../components/Header";

export default function MyTicket() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  let userinfo = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchTickets = async () => {
      if (!userinfo) {
        setError("User not logged in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("https://084006fe-6ca9-4e8a-ad36-e9114730c2c1-00-385jtlgaq1lot.janeway.replit.dev/tickets");
        const userTickets = response.data.filter(i => i.email === userinfo.email);
        setTickets(userTickets);
      } catch (error) {
        console.error("Error fetching tickets:", error);
        setError("Failed to fetch tickets.");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [userinfo]);

  // Function to cancel a ticket and update train seats
  const cancelTicket = async (ticket) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this ticket?");
    if (!confirmCancel) return;
  
    try {
      // Fetch train data
      const trainResponse = await axios.get(`https://084006fe-6ca9-4e8a-ad36-e9114730c2c1-00-385jtlgaq1lot.janeway.replit.dev/trains/${ticket.trainId}`);
      const trainData = trainResponse.data;
  
      console.log("Train Data Before Update:", trainData);
  
      // Ensure selectedSeats is an array and check if it has data
      if (!ticket.selectedSeats || ticket.selectedSeats.length === 0) {
        setError("No seats selected for cancellation.");
        return;
      }
  
      // Update seatsAvailable by adding back the canceled seats
      const updatedSeatsAvailable = trainData.seatsAvailable + ticket.selectedSeats.length;
  
      // Remove canceled seats from bookedSeats
      const updatedBookedSeats = trainData.bookedSeats.filter(seat => !ticket.selectedSeats.includes(seat));
  
      // Update train data
      await axios.patch(`https://084006fe-6ca9-4e8a-ad36-e9114730c2c1-00-385jtlgaq1lot.janeway.replit.dev/trains/${ticket.trainId}`, {
        seatsAvailable: updatedSeatsAvailable,
        bookedSeats: updatedBookedSeats
      });
  
      console.log("Train Data After Update:", {
        seatsAvailable: updatedSeatsAvailable,
        bookedSeats: updatedBookedSeats
      });
  
      // Delete ticket from the database
      await axios.delete(`https://084006fe-6ca9-4e8a-ad36-e9114730c2c1-00-385jtlgaq1lot.janeway.replit.dev/tickets/${ticket.id}`);
  
      // Remove ticket from UI
      setTickets(prevTickets => prevTickets.filter(t => t.id !== ticket.id));
  
    } catch (error) {
      console.error("Error canceling ticket:", error);
      setError("Failed to cancel the ticket.");
    }
  };
  

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;

  return (
    <div>
      <Header />
      <Container className="mt-5">
        <div className="text-center m-4">
          <h2 className="text-center mb-4 text-dark fw-bold shadow d-inline rounded px-2">My Tickets</h2>
        </div>

        {error && <Alert variant="danger" className="text-center">{error}</Alert>}

        {tickets.length === 0 ? (
          <Alert variant="warning" className="text-center">You have no booked tickets.</Alert>
        ) : (
          tickets.map((ticket) => (
            <Card key={ticket.id} className="mb-4 shadow-lg border-0 rounded-3">
              <Card.Body className="p-4 d-flex flex-column align-items-center text-center">
                <img 
                  src={ticket.imgUrl} 
                  alt={ticket.trainName} 
                  style={{ width: "280px", height: "170px", objectFit: "cover" }} 
                  className="rounded shadow-sm mb-2"
                />
                <h4 className="text-dark fw-bold">{ticket.trainName}</h4>
                <p className="text-muted"><strong>Route:</strong> {ticket.from} → {ticket.to}</p>
                <p><strong>Departure:</strong> {new Date(ticket.bookingDate).toLocaleString()}</p>
                <p><strong>Seats:</strong> {ticket.selectedSeats.join(", ")}</p>
                <p className="text-success fw-bold"><strong>Total Price:</strong> {ticket.totalPrice} EGP</p>

                {/* Cancel Ticket Button */}
                <Button 
                  variant="danger" 
                  className="mt-3" 
                  onClick={() => cancelTicket(ticket)}
                >
                  Cancel Ticket
                </Button>
              </Card.Body>
            </Card>
          ))
        )}
      </Container>
    </div>
  );
}
