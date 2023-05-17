import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "../Styles/FromReserva.css";
import axios from "axios";
import io from "socket.io-client";
import FormModal from "./FormModal";

function FormReserva() {
  const [restaurantes, setRestaurantes] = useState([]);
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState("");
  const [restaurantesFiltrados, setRestaurantesFiltrados] = useState([]);

  const [mostrarComponente, setMostrarComponente] = useState(false);

  const mostrarOCultarComponente = () => {
    setMostrarComponente(!mostrarComponente);
  };

  useEffect(() => {
    axios
      .get("http://localhost:1000/restaurantes")
      .then((response) => {
        setRestaurantes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setRestaurantesFiltrados(
      restaurantes.filter(
        (restaurante) => restaurante.ubicacion === ciudadSeleccionada
      )
    );
  }, [restaurantes, ciudadSeleccionada]);

  const handleSubmit = (event) => {
    event.preventDefault(); // Evita que se ejecute el comportamiento por defecto del formulario (enviar una solicitud GET)
    const formData = new FormData(document.querySelector("form")); // Crea un objeto FormData a partir de los datos del formulario
    const reserva = {
      usuario: formData.get("formGridUser"),
      dni: formData.get("formGridDni"),
      fecha: formData.get("formGridDate"),
      hora: formData.get("formGridHora"),
      numeroPersonas: formData.get("formGridPers"),
      nombreRestaurante: formData.get("formGridRest"),
      confirmada: true,
    };
    // const reserva = {
    //   usuario:"Juan",
    //   dni: "13544536",
    //   fecha: "12/10/2023",
    //   hora: "12:40",
    //   numeroPersonas: 10,
    //   nombreRestaurante: "fsdafsa",
    //   confirmada: true
    // };
    console.log("aa", reserva);
    axios
      .post("http://localhost:1000/reservas", reserva)
      .then((response) => {
        console.log("La reserva se ha guardado exitosamente:", response.data);
        // Aquí podrías mostrar un mensaje al usuario indicando que la reserva se ha guardado exitosamente
      })
      .catch((error) => {
        console.error("Ha ocurrido un error al guardar la reserva:", error);
        // Aquí podrías mostrar un mensaje al usuario indicando que ha ocurrido un error al guardar la reserva
      });
  };

  const opcionesRestaurantes = restaurantes
    .filter((restaurante) => restaurante.ubicacion === ciudadSeleccionada)
    .map((restaurante) => (
      <option key={restaurante.nombre} value={restaurante.id}>
        {restaurante.nombre}
      </option>
    ));

  const opcionesRestaurantesCiudad = restaurantes
    .map((restaurante) => restaurante.ubicacion)
    .filter((ubicacion, index, array) => array.indexOf(ubicacion) === index)
    .map((ubicacion) => (
      <option key={ubicacion} value={ubicacion}>
        {ubicacion}
      </option>
    ));

  const handleCiudadSeleccionada = (event) => {
    const ciudad = event.target.value;
    setCiudadSeleccionada(ciudad);
  };

  return (
    <div className="container">
      <Form
        style={{
          backgroundColor: "white",
          borderRadius: "5px",
          padding: "20px",
        }}
        onSubmit={handleSubmit}
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

          <Form.Group as={Col} controlId="formGridHora">
            <Form.Label>Hora</Form.Label>
            <Form.Control placeholder="14:30" />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Select
              defaultValue="Choose..."
              onChange={handleCiudadSeleccionada}
            >
              <option>Choose...</option>
              {opcionesRestaurantesCiudad}
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridRest">
            <Form.Label>Restaurant</Form.Label>
            <Form.Control
              plaintext
              readOnly
              defaultValue={
                opcionesRestaurantes.length > 0
                  ? opcionesRestaurantes[0].key
                  : ""
              }
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group
            as={Col}
            controlId="formGridPers"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Form.Label>Personas</Form.Label>
            <Form.Control
              style={{
                width: "100px",
              }}
            />
          </Form.Group>
        </Row>

        <Button
          variant="primary"
          type="submit"
          onClick={mostrarOCultarComponente}
        >
          Reservar
        </Button>
        {mostrarComponente && 
        <div className="superponer-componente">
          <FormModal cerrar={mostrarComponente} />
        </div>
      }
      </Form>
    </div>
  );
}

export default FormReserva;
