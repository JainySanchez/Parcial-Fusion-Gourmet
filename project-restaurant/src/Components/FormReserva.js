import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "../Styles/FromReserva.css";
import axios from "axios";

function FormReserva() {
    const [restaurantes, setRestaurantes] = useState([]);

    const [ciudadSeleccionada, setCiudadSeleccionada] = useState("");
    const [restauranteSeleccionado, setRestauranteSeleccionado] = useState("");
  
    useEffect(() => {
      axios
        .get("http://localhost:2000/restaurantes")
        .then((response) => {
          setRestaurantes(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  
    const opcionesRestaurantes = restaurantes
      .filter((restaurante) => restaurante.ubicacion === ciudadSeleccionada)
      .map((restaurante) => (
        <option key={restaurante.nombre} value={restaurante.nombre}>
          {restaurante.nombre}
        </option>
      ));
      const opcionesRestaurantescity = restaurantes.map(restaurante => (
        <option key={restaurante.ubicacion} value={restaurante.ubicacion}>
          {restaurante.ubicacion}
        </option>
      ));
  
    const handleCiudadSeleccionada = (event) => {
      const ciudad = event.target.value;
      setCiudadSeleccionada(ciudad);
      const restaurante = restaurantes.find(
        (restaurante) => restaurante.ubicacion === ciudad
      );
      if (restaurante) {
        setRestauranteSeleccionado(restaurante.nombre);
      } else {
        setRestauranteSeleccionado("");
      }
    };
  return (
    <div className="container">
      <Form
        style={{
          backgroundColor: "white",
          borderRadius: "5px",
          padding: "20px",
        }}
      >
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridUser">
            <Form.Label>User</Form.Label>
            <Form.Control placeholder="Enter user" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridDni">
            <Form.Label>DNI</Form.Label>
            <Form.Control placeholder="DNI" />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridDate">
            <Form.Label>Fecha</Form.Label>
            <Form.Control placeholder="12/05/2023" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridAddress2">
            <Form.Label>Hora</Form.Label>
            <Form.Control placeholder="14:30" />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Select
              defaultValue="Choose..."
              onChange={(event) => console.log(event.target.value)}
            >
              <option>Choose...</option>
              {opcionesRestaurantescity}
            </Form.Select>
            
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Restaurant</Form.Label>
            <Form.Select defaultValue="Choose..." onChange={handleCiudadSeleccionada}>
              <option>Choose...</option>
              {opcionesRestaurantes}
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Personas</Form.Label>
            <Form.Control />
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit">
          Reservar
        </Button>
      </Form>
    </div>
  );
}

export default FormReserva;
