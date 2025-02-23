import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Form, Button, Row, Col, Alert, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";



export function TicketDetails() {
  const { id } = useParams();
  const [train, setTrain] = useState(null);
  const [numSeats, setNumSeats] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [booked, setBooked] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchTrainData = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/trains/${id}`);
        setTrain(response.data);
      } catch (error) {
        console.error("Error fetching train details:", error);
      }
    };

    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setUser(loggedInUser);
    } else {
      setError("User not logged in.");
    }

    fetchTrainData();
  }, [id]);

  if (!train) return <h2 className="text-center mt-5">Loading train details...</h2>;

  const fetchTrainData = async () => {
    try {
      const response = await axios.get(`http://localhost:3005/trains/${id}`);
      setTrain(response.data);
    } catch (error) {
      console.error("Error fetching updated train details:", error);
    }
  };

  const handleSeatSelection = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else {
      if (selectedSeats.length < numSeats) {
        setSelectedSeats([...selectedSeats, seat]);
      } else {
        setError("You can only select the number of seats you booked.");
        setTimeout(() => setError(""), 3000);
      }
    }
  };

  const isSeatBooked = (seat) => train.bookedSeats.includes(seat);

  const handleConfirmBooking = async () => {
    if (user.role === "admin") {
      setError("Sorry, you act as admin");
      return;
    }
  
    if (!user) {
      setError("Please log in before booking.");
      return;
    }
  
    if (selectedSeats.length !== numSeats) {
      setError("Please select the exact number of seats.");
      return;
    }
  
    if (booked) {
      setError("You have already booked this ticket.");
      return;
    }
  
    setLoading(true);
    setError("");
    setSuccess("");
  
    const ticketData = {
      id: Date.now().toString(),
      trainId: train.id,
      trainName: train.name,
      from: train.from,
      to: train.to,
      selectedSeats: selectedSeats,
      totalPrice: numSeats * train.price,
      bookingDate: new Date().toISOString(),
      userId: user.id,
      username: user.username,
      email: user.email,
      nationalId: user.nationalId,
      imgUrl: train.img,
    };
  
    try {
      const response = await axios.get("http://localhost:3005/tickets");
      const tickets = response.data;
  
      // البحث عن تذكرة للمستخدم ولكن فقط لهذا القطار
      let existingTicket = tickets.find((t) => t.email === user.email && t.trainId === train.id);
  
      if (existingTicket) {
        // تحديث المقاعد في نفس التذكرة بدلاً من إنشاء واحدة جديدة
        let updatedSeats = [...new Set([...existingTicket.selectedSeats, ...ticketData.selectedSeats])];
  
        await axios.put(`http://localhost:3005/tickets/${existingTicket.id}`, {
          ...existingTicket,
          selectedSeats: updatedSeats,
          totalPrice: updatedSeats.length * train.price, // تحديث السعر بناءً على عدد المقاعد الجديدة
        });
      } else {
        // إنشاء تذكرة جديدة فقط إذا كان الحجز لقطار مختلف
        await axios.post("http://localhost:3005/tickets", ticketData);
      }
  
      // تحديث حالة القطار بحجز المقاعد
      await axios.patch(`http://localhost:3005/trains/${id}`, {
        seatsAvailable: train.seatsAvailable - numSeats,
        bookedSeats: [...train.bookedSeats, ...selectedSeats],
      });
  
      await fetchTrainData();
  
      setSuccess(`Booking successful! Seats: ${selectedSeats.join(", ")}`);
      setSelectedSeats([]);
      setBooked(true);
    } catch (err) {
      setError("Booking failed. Please try again.");
      console.error("Booking error:", err);
    } finally {
      setLoading(false);
    }
  };
    
  const totalSeats = train.seatsAvailable + train.bookedSeats.length;
  const availableSeats = Array.from({ length: totalSeats }, (_, i) => i + 1);
  const seatRows = [];
  for (let i = 0; i < availableSeats.length; i += 4) {
    seatRows.push(availableSeats.slice(i, i + 4));
  }

  return (
    <Container className="mt-5">

<div className="text-center m-3">
  <motion.div 
    whileTap={{ scale: 0.9 }} 
    whileHover={{ scale: 1.05 }} 
  >
    <Link to="/" className="btn btn-dark px-3 py-2 shadow-sm">
      Back to home
    </Link>
  </motion.div>
</div>

      <Card className="shadow-lg p-4 border-0 rounded-4">
        <Card.Body>
          <h2 className="text-center mb-4 text-primary fw-bold shadow-sm">🚆 {train.name} - Ticket Booking</h2>
          
          <div className="text-center mb-4">
            <img 
              src={train.img} 
              alt={train.name} 
              className="img-fluid rounded-3 shadow-sm" 
              style={{ maxWidth: "300px", height: "auto" }}
            />
          </div> 

          <p className="fs-5"><strong> Route:</strong> {train.from} → {train.to}</p>
          <p className="fs-5"><strong>⏳ Departure:</strong> {train.departureTime}</p>
          <p className="fs-5 text-success"><strong>Price per Seat:</strong> {train.price} EGP</p>

          {user && (
            <div className="bg-light p-3 rounded-3 shadow-sm">
              <h5 className="text-primary">👤 Passenger Details</h5>
              <p><strong>Name:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>National ID:</strong> {user.nationalId}</p>
            </div>
          )}

          <Form.Group className="mb-3">
            <Form.Label className="fs-5"><strong>Number of Seats:</strong></Form.Label>
            <Form.Control
              as="select"
              className="form-select shadow-sm"
              value={numSeats}
              onChange={(e) => {
                setNumSeats(Number(e.target.value));
                setSelectedSeats([]);
              }}
            >
              {[...Array(Math.min(5, train.seatsAvailable))].map((_, i) => (
                <option key={i} value={i + 1}>{i + 1}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <p className="fs-5"><strong>🪑 Select Your Seats:</strong></p>
          <div className="d-flex flex-wrap justify-content-center gap-2">
  {seatRows.flat().map((seat) => (
    <Button
      key={seat}
      variant={isSeatBooked(seat) ? "secondary" : selectedSeats.includes(seat) ? "success" : "outline-primary"}
      className="fw-bold"
      onClick={() => handleSeatSelection(seat)}
      disabled={isSeatBooked(seat)}
    >
      {seat}
    </Button>
  ))}
</div>


          {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
          {success && <Alert variant="success" className="mt-3">{success}</Alert>}

          <h4 className="mt-3 text-center text-dark"><strong>💵 Total Price:</strong> {numSeats * train.price} EGP</h4>
          <Button variant="primary" className="w-100 mt-3 fs-5 fw-bold rounded-3" onClick={handleConfirmBooking} disabled={loading || booked}>
            {loading ? <Spinner animation="border" size="sm" /> : booked ? "✅ Booking Confirmed" : "Confirm Booking"}
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}
