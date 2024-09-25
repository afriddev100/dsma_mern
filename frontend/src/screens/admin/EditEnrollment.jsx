import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Row, Col, Modal, Form, Table } from "react-bootstrap";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { FaSave, FaMoneyBillWave, FaPrint, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ReactToPrint from 'react-to-print';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const EditEnrollment = () => {
  const { id } = useParams(); // Get enrollment ID from the URL
  const [enrollment, setEnrollment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentRemarks, setPaymentRemarks] = useState("");
  const [payments, setPayments] = useState([]);
  const [balance, setBalance] = useState(0);

  const validStatuses = ["Verified", "In-Session", "Completed", "Cancelled"];

  useEffect(() => {
    const fetchEnrollment = async () => {
      try {
        const { data } = await axios.get(`/api/enrollments/${id}`);
        setEnrollment(data);
        const { data:paymentData } = await axios.get(
          `/api/payments/enrollment/${data._id}`
        );
        setPayments(paymentData);
        setBalance(data.balance); // Calculate initial balance
        setIsLoading(false);
      } catch (err) {
        console.log(error);
        setIsLoading(false);
        setError(
          err.response?.data?.message || "Error fetching enrollment data"
        );
      }
    };

    fetchEnrollment();
  }, [id]);

  const handleUpdateStatus = async () => {
    try {
      await axios.put(`/api/enrollments/${id}`, { status: newStatus });
      setShowStatusModal(false);
      setNewStatus("");
      // Refresh the enrollment data
      const { data } = await axios.get(`/api/enrollments/${id}`);
      setEnrollment(data);
      toast.success("Status Update Successful");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Error fetching enrollment status"
      );
    }
  };

  const handleAddPayment = async () => {
    try {
      await axios.post("/api/payments", {
        enrollmentId: enrollment._id,
        amount: paymentAmount,
        remarks: paymentRemarks,
      });
      setShowPaymentModal(false);
      setPaymentAmount("");
      setPaymentRemarks("");
      // Refresh data
      const { data } = await axios.get(`/api/enrollments/${id}`);
      setEnrollment(data);
      const { data:paymentData } = await axios.get(
        `/api/payments/enrollment/${data._id}`
      );
      setPayments(paymentData);
      setBalance(data.balance);
      toast.success("Payment Successful");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Error fetching enrollment status"
      );
    }
  };

  const handleDeletePayment = async (paymentId) => {
    try {
      await axios.delete(`/api/payments/${paymentId}`);
       // Refresh data
       const { data } = await axios.get(`/api/enrollments/${id}`);
       setEnrollment(data);
       const { data:paymentData } = await axios.get(
         `/api/payments/enrollment/${data._id}`
       );
       setPayments(paymentData);
       setBalance(data.balance);
       toast.success("Deleted successfully")
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Error fetching enrollment status"
      );
    }
  };


  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Enrollment Report", 10, 12);
    doc.autoTable({
      head: [['Field', 'Value']],
      body: [
        ['First Name', enrollment.firstName],
        ['Last Name', enrollment.lastName],
        ['Gender', enrollment.gender],
        ['Date of Birth', new Date(enrollment.dob).toLocaleDateString()],
        ['Phone', enrollment.phone],
        ['Email', enrollment.email],
        ['Address', enrollment.address],
        ['Training Package', enrollment.trainingPackage.name],
        ['Start Date', new Date(enrollment.startDate).toLocaleDateString()],
        ['Preferred Time', enrollment.preferredTime],
        ['Status', enrollment.status],
        ['Registration No', enrollment.registrationNo],
        ['Balance', balance]
      ],
    });
    
    // Add Payment History
    const paymentData = payments.map(payment => [
      new Date(payment.createdAt).toLocaleString(),
      payment.remarks,
      payment.paidAmount,
      payment.balance,
    ]);

    doc.autoTable({
      head: [['Date & Time', 'Remarks', 'Paid Amount', 'Balance']],
      body: paymentData,
      startY: doc.autoTable.previous.finalY + 10,
    });

    doc.save(`enrollment_report_${id}.pdf`);
  };

  if (isLoading) return <Loader />;
  if (error) return <Message variant="danger">{error}</Message>;

  return (
    <div className="container mt-4">
      <h1>Enrollee's Details</h1>
      <Card className="mt-3">
        <Card.Body>
          <Card.Title>Enrollee's Details</Card.Title>
          <Row className="mb-3">
            <Col md={6}>
              <strong>First Name:</strong> {enrollment.firstName}
            </Col>
            <Col md={6}>
              <strong>Last Name:</strong> {enrollment.lastName}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <strong>Gender:</strong> {enrollment.gender}
            </Col>
            <Col md={6}>
              <strong>Date of Birth:</strong>{" "}
              {new Date(enrollment.dob).toLocaleDateString()}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <strong>Phone:</strong> {enrollment.phone}
            </Col>
            <Col md={6}>
              <strong>Email:</strong> {enrollment.email}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <strong>Address:</strong> {enrollment.address}
            </Col>
            <Col md={6}>
              <strong>Training Package:</strong>{" "}
              {enrollment.trainingPackage.name}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <strong>Start Date:</strong>{" "}
              {new Date(enrollment.startDate).toLocaleDateString()}
            </Col>
            <Col md={6}>
              <strong>Preferred Time:</strong> {enrollment.preferredTime}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <strong>Status:</strong> {enrollment.status}
            </Col>
            <Col md={6}>
              <strong>Registration No:</strong> {enrollment.registrationNo}
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer className="text-center">
          <Button
            variant="primary"
            className="mx-2"
            onClick={() => setShowStatusModal(true)}
          >
            <FaSave /> Update Status
          </Button>
          <Button
            variant="success"
            className="mx-2"
            onClick={() => setShowPaymentModal(true)}
          >
            <FaMoneyBillWave /> Payment
          </Button>
          <Button variant="info" className="mx-2" onClick={generatePDF}>
            <FaPrint /> Print
          </Button>
        </Card.Footer>
      </Card>

      {/* Payment History */}
      {enrollment.status !== "Pending" && (
        <>
          <h2 className="mt-4">Payment History</h2>
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Remarks</th>
                <th>Paid Amount</th>
                <th>Balance</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {payments?.map((payment) => (
                <tr key={payment._id}>
                  <td>{new Date(payment.createdAt).toLocaleString()}</td>
                  <td>{payment.remarks}</td>
                  <td>{payment.paidAmount}</td>
                  <td>{payment.balance}</td>
                  <td>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => handleDeletePayment(payment._id)}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}

      {/* Update Status Modal */}
      <Modal
        show={showStatusModal}
        onHide={() => setShowStatusModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Enrollment Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="statusSelect">
            <Form.Label>Select New Status</Form.Label>
            <Form.Select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <option value="">Select Status</option>
              {validStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowStatusModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateStatus}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Payment Modal */}
      <Modal
        show={showPaymentModal}
        onHide={() => setShowPaymentModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Current Balance: ${balance}</p>
          <Form.Group controlId="paymentAmount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter amount"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="paymentRemarks">
            <Form.Label>Remarks</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter remarks"
              value={paymentRemarks}
              onChange={(e) => setPaymentRemarks(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowPaymentModal(false)}
          >
            Close
          </Button>
          <Button variant="primary" onClick={handleAddPayment}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditEnrollment;
