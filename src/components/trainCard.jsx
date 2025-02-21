import React from 'react';
import { Card, Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function TrainCard({ train }) {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate(`/ticket-details/${train.id}`); // 👈 Pass only the train ID in the URL
  };

  return (
    <Col key={train.id} lg={3} md={4} sm={12} className="mb-3 text-center w-100">
      <Card className="shadow">
        <Card.Body>
          <Card.Title>{train.name}</Card.Title>
          <Card.Img variant="top" src={train.img} />
          <Card.Text className="mt-3">
            <strong>Departure:</strong> {train.departureTime} <br />
          </Card.Text>
          <Card.Text>
            <strong>Arrival:</strong> {train.arrivalTime} <br />
          </Card.Text>
          <Card.Text>
            <strong>Price:</strong> {train.price} EGP <br />
          </Card.Text>
          <Card.Text>
            <strong>Seats Available:</strong> {train.seatsAvailable}
          </Card.Text>
          <Button variant="success" onClick={handleBookNow}>Book Now</Button>
        </Card.Body>
      </Card>
    </Col>
  );
}
