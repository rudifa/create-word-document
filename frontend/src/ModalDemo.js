import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

// code from https://www.pluralsight.com/guides/how-to-trigger-modal-for-react-bootstrap

function ModalDemo() {
  const [showModal, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "10vh", background: "#eee", border: "1px solid gray"}}
      >
        <Button variant="primary" onClick={handleShow}>
          Launch Modal Demo
        </Button>
      </div>
      <Modal size='xl' show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>You're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDemo;