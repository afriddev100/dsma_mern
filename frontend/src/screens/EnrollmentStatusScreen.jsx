import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Modal, Row, Col, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer";

export default function EnrollmentStatusScreen() {
  const [identifier, setIdentifier] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [enrollmentDetails, setEnrollmentDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
    setIdentifier("");
    setEnrollmentDetails([]);
  };

  const validateInput = () => {
    if (!identifier.trim()) return "Please enter a registration number, phone number, or email.";
    return null;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const validationError = validateInput();

    if (validationError) {
      toast.error(validationError);
      return;
    }

    try {
      setIsLoading(true);
      const { data } = await axios.get(`/api/enrollments/status/${identifier}`);
      setEnrollmentDetails(data);
      setShowModal(true);
      setIsLoading(false);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error fetching enrollment status");
      setIsLoading(false);
    }
  };

  return (
    <>

      <FormContainer size={6}>

      <Card className="shadow-lg  mb-5 bg-white rounded mt-4">
      <Card.Body>

        <h2>Check Enrollment Status</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="identifier">
            <Form.Label>Registration No, Phone, or Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Registration No, Phone, or Email"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
          </Form.Group>

          <Row className="mt-3">
            <Col className="d-flex justify-content-center">
              <Button type="submit" variant="primary" disabled={isLoading}>
                {isLoading ? "Loading..." : "Check Status"}
              </Button>
            </Col>
          </Row>
        </Form>
        </Card.Body>
        </Card>
      </FormContainer>

      {/* Success Modal */}
      <Modal show={showModal} onHide={handleClose} centered backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Enrollment Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {enrollmentDetails.length > 0 ? (
            <ul>
              {enrollmentDetails.map((enrollment) => (
                <li key={enrollment.registrationNo}>
                  <strong>Registration No:</strong> {enrollment.registrationNo} <br />
                  <strong>Training Package:</strong> {enrollment.trainingPackageName} <br />
                  <strong>Status:</strong> {enrollment.status}
                </li>
              ))}
            </ul>
          ) : (
            <p>No enrollments found with the provided information.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
