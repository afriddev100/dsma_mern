import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Table, Form } from 'react-bootstrap';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { LinkContainer } from 'react-router-bootstrap';
import { toast } from 'react-toastify';

function EnrollmentEditList() {
  const [enrollments, setEnrollments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const { data } = await axios.get("/api/enrollments");
        setEnrollments(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError({ data: { message: "Error while calling API" } });
      }
    };
    fetchEnrollments();
  }, []);

  const deleteHandler = async (id) => {
    try {
      await axios.delete(`/api/enrollments/${id}`);
      toast.success("Deleted Successfully");
      const { data } = await axios.get("/api/enrollments");
      setEnrollments(data);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error deleting enrollment");
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredEnrollments = enrollments.filter(enrollment => {
    const fullName = `${enrollment.firstName} ${enrollment.lastName}`.toLowerCase();
    const packageName = enrollment.trainingPackage.name.toLowerCase();
    return (
      enrollment.registrationNo.toString().includes(searchTerm.toLowerCase()) ||
      fullName.includes(searchTerm.toLowerCase()) ||
      packageName.includes(searchTerm.toLowerCase()) ||
      enrollment.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Verified':
        return 'text-success';
      case 'In-Session':
        return 'text-warning';
      case 'Completed':
        return 'text-primary';
      case 'Cancelled':
        return 'text-danger';
      default:
        return '';
    }
  };

  return (
    <>
      <Container>
        <Row className='align-items-center'>
          <Col>
            <h1>Enrollments</h1>
          </Col>
      
        </Row>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="Search by Reg No, Name, Package, or Status"
              value={searchTerm}
              onChange={handleSearch}
            />
          </Col>
        </Row>

        {isLoading ? <Loader /> : error ? <Message variant='danger'>{error.data.message}</Message>
          : (
            <Table striped hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>Date Created</th>
                  <th>Reg. No</th>
                  <th>Full Name</th>
                  <th>Package</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredEnrollments.map((enrollment) => (
                  <tr key={enrollment._id}>
                    <td>{new Date(enrollment.createdAt).toLocaleDateString()}</td>
                    <td>{enrollment.registrationNo}</td>
                    <td>{`${enrollment.firstName} ${enrollment.lastName}`}</td>
                    <td>{enrollment.trainingPackage.name}</td>
                    <td className={getStatusColor(enrollment.status)}>
                      {enrollment.status}
                    </td>
                    <td>
                      <LinkContainer to={`/admin/enroll/${enrollment._id}`}>
                        <Button variant='light' className='btn-md mx-2'>
                        <FaEye />
                        </Button>
                      </LinkContainer>
                      <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(enrollment._id)}>
                        <FaTrash style={{ color: "white" }} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
      </Container>
    </>
  );
}

export default EnrollmentEditList;
