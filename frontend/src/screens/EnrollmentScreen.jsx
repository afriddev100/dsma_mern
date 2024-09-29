import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Form, Button, Row, Col, Modal, Card } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

export default function EnrollmentScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState();
  const { packageId } = useParams();

  // Form values
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [trainingPackage, setTrainingPackage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [trainingPackages, setTrainingPackages] = useState([]);


  //After success return
  const [registrationNo, setRegistrationNo] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
    navigate("/");

};



  // Fetch training packages and populate the dropdown
  useEffect(() => {
    const getPackages = async () => {
      try {
        const { data } = await axios.get("/api/trainingPackages");
        setTrainingPackages(data);

        if (packageId !== undefined) {
          setTrainingPackage(packageId);
        }
      } catch (err) {
        setError("Failed to load packages");
        setIsLoading(false);
      }
    };
    getPackages();
  }, [packageId]);

  // Validation method
  const validateInputs = () => {
    if (!firstName.trim()) return "First name is required";
    if (!lastName.trim()) return "Last name is required";
    if (!gender) return "Gender is required";
    if (!dob) return "Date of birth is required";
    if (!phone || !/^\d{10}$/.test(phone))
      return "Phone number must be 10 digits";
    if (!email || !/\S+@\S+\.\S+/.test(email))
      return "A valid email is required";
    if (!address.trim()) return "Address is required";
    if (!trainingPackage) return "Training package selection is required";
    if (!startDate) return "Start date is required";
    if (!preferredTime) return "Preferred time is required";

    return null;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const validationError = validateInputs();

    if (validationError) {
      toast.error(validationError);
      return;
    }

    try {
      setIsUpdating(true);

   const {data} =  await axios.post("/api/enrollments", {
        firstName,
        lastName,
        gender,
        dob,
        phone,
        email,
        address,
        trainingPackage,
        startDate,
        preferredTime,
      });
      setRegistrationNo(data.registrationNo);
        setShowModal(true);
      toast.success("Enrollment successful");
      setIsUpdating(false);
   
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error during enrollment");
      setIsUpdating(false);
    }
  };

  return (
    <>
      <FormContainer size={10}>
        {isUpdating && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (

            <Card className="shadow-lg  mb-5 bg-white rounded mt-4">
          <Card.Body>
          <Form onSubmit={submitHandler}>
         {/* Enrollee Information */}
          <h2>Enrollee Information</h2>
            <Row>
              <Col md={6}>
                <Form.Group controlId="firstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="lastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                {/* Gender */}
                <Form.Group controlId="gender">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                {/* Date of Birth */}
                <Form.Group controlId="dob">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                {/* Phone */}
                <Form.Group controlId="phone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                {/* Email */}
                <Form.Group controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            {/* Address (Single Column) */}
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>

            {/* Enrollment Information */}
          <h2 className="my-3">Enrollment Information</h2>
            <Form.Group controlId="trainingPackage">
              <Form.Label>Training Package</Form.Label>
              <Form.Select
                value={trainingPackage}
                onChange={(e) => setTrainingPackage(e.target.value)}
              >
                <option value="">Select Training Package</option>
                {trainingPackages &&
                  trainingPackages.map((pkg) => (
                    <option key={pkg._id} value={pkg._id}>
                      {pkg.name} - ${pkg.price}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>

            <Row>
              <Col md={6}>
                {/* Start Date */}
                <Form.Group controlId="startDate">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                {/* Preferred Time */}
                <Form.Group controlId="preferredTime">
                  <Form.Label>Preferred Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

         
               {/* Centered Submit Button */}
          <Row className="mt-3">
            <Col className="d-flex justify-content-center">
              <Button type="submit" variant="primary">
                Submit Enrollment
              </Button>
            </Col>
          </Row>
          
          </Form>
          </Card.Body>
          </Card>
        )}
      </FormContainer>

          {/* Success Modal */}
      <Modal show={showModal} onHide={handleClose} centered 
       backdrop="static"   
       keyboard={false} >
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Your Driving School Enrollment has been successfully submitted and we will confirm your application as soon as possible.</p>
          <p><strong>Your registration number is: {registrationNo}</strong></p>
          <p>Thank you!</p>
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
