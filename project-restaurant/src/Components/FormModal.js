import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';

function FormModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true); // Cambia el estado de "show" a "true" cuando se monta el componente
  }, []);

  const handleClose = () => setShow(false); // Función para cerrar el modal

  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Reservación</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Su reservación fue exitosa</p>
        </Modal.Body>

        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
}

export default FormModal;
