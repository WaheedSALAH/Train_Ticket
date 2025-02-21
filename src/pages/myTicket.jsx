// import axios from "axios";
// import { useEffect, useState } from "react";


// export default function MyTicket() {
          
// const [state,setstate] = useState(null)

// useEffect(() => {
//     const ticketinfo = async () => {
//         try {
//       const ticketinfo = await axios.get("http://localhost:3005/tickets");
//     //   console.log(ticketinfo.data)

//       for(let i of ticketinfo.data)
//       {
//         // console.log(i.email)
//         if (i.email == userinfo.email){
//             // console.log(i)
//             setstate(i)
//             break;
//         }
//     }

//         } catch (error) {
//           console.error("Error fetching updated train details:", error);
//         }
//       };
//       ticketinfo()
//     }, [userinfo]); 

//     console.log(state)



//       let userinfo = JSON.parse(localStorage.getItem('user'))
//     //   console.log(userinfo.email)
//     return (
//         <div>
//           <h2>🎟️ My Ticket</h2>
//           <p><strong>Train:</strong> {state.trainName}</p>
//           <p><strong>Route:</strong> {state.from} → {state.to}</p>
//           <p><strong>Seats:</strong> {state.selectedSeats.join(", ")}</p>
//           <p><strong>Total Price:</strong> {state.totalPrice} EGP</p>
//         </div>
//       );
// }



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

        if (userTickets.length === 0) {
          setError("No tickets found.");
        } else {
          setTickets(userTickets);
        }
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
      <h2 className="text-center mb-4">🎟️ My Tickets</h2>

      {error && <Alert variant="danger" className="text-center">{error}</Alert>}

      {tickets.map((i) => (
        <Card key={i.id} className="mb-3 shadow">
          <Card.Body>
            <div><img src={i.imgUrl} alt="" /></div>
            <h5 className="text-center">{i.trainName}</h5>
            <p><strong>Route:</strong> {i.from} → {i.to}</p>
            <p><strong>Departure:</strong> {new Date(i.bookingDate).toLocaleString()}</p>
            <p><strong>Seats:</strong> {i.selectedSeats.join(", ")}</p>
            <p><strong>Total Price:</strong> {i.totalPrice} EGP</p>
          </Card.Body>
        </Card>
      ))}
    </Container>
      </div>
  );
}
