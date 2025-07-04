import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { TrainCard } from "../components/trainCard";
import { Header } from "../components/Header";

export function Home() {
  const [trains, setTrains] = useState([]);
  const [stations, setStations] = useState([]);
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");
  const [filteredTrains, setFilteredTrains] = useState([]);
  const [noTrainsFound, setNoTrainsFound] = useState(false);

  useEffect(() => {
    axios.get("https://084006fe-6ca9-4e8a-ad36-e9114730c2c1-00-385jtlgaq1lot.janeway.replit.dev/trains")
      .then((response) => {
        setTrains(response.data);

        const uniqueStations = [
          ...new Set(response.data.flatMap(train => [train.from, train.to]))
        ];
        setStations(uniqueStations);
      })
      .catch((error) => console.error("Error fetching train data:", error));
  }, []);

  const handleSearch = () => {
    setFilteredTrains([]);
    const results = trains.filter(train => 
      train.from === fromStation && train.to === toStation
    );
    setFilteredTrains(results);

    setNoTrainsFound(results.length === 0 && fromStation && toStation);
  };

  return (
    <div className="">
      <Header/>

    <Container className="mt-4">
      <div className="text-center m-5">
      <h2 className="text-center mb-4 bg-light d-inline shadow rounded p-2">Search for Trains</h2>
      </div>
      <Row className="justify-content-center text-center">
        <Col md={5}>
          <Form.Group controlId="fromStation">
            <Form.Label className="bg-dark text-light rounded p-1">From</Form.Label>
            <Form.Select value={fromStation} onChange={(e) => setFromStation(e.target.value)}>
              <option value="">Select Departure Station</option>
              {stations.map((station, index) => (
                <option key={index} value={station}>{station}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={5}>
          <Form.Group controlId="toStation">
            <Form.Label className="bg-dark text-light rounded py-1 px-3">To</Form.Label>
            <Form.Select 
              value={toStation} 
              onChange={(e) => setToStation(e.target.value)}
              disabled={!fromStation}
            >
              <option value="">Select Destination</option>
              {stations
                .filter(station => station !== fromStation)
                .map((station, index) => (
                  <option key={index} value={station}>{station}</option>
                ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <Col md={3}>
          <Button variant="primary" className="w-100" onClick={handleSearch} disabled={!fromStation || !toStation}>
            Search
          </Button>
        </Col>
      </Row>

      <Row className="mt-4">
        {noTrainsFound && <p className="text-center text-danger">No trains available for this route.</p>}
        {filteredTrains.map((train) => (
          <Col key={train.id} lg={3} md={4} sm={12} className="mb-3">
            <TrainCard train={train} />
          </Col>
        ))}
      </Row>
    </Container>
        </div>
  );
}
