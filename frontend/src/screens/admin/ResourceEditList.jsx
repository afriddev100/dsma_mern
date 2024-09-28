import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { LinkContainer } from 'react-router-bootstrap';
import { toast } from 'react-toastify';

function ResourceEditList() {
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const { data } = await axios.get("/api/resources");
        setResources(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError({ data: { message: "Error while calling API" } });
      }
    };
    fetchResources();
  }, []);

  const deleteHandler = async (id) => {
    try {
      await axios.delete(`/api/resources/${id}`);
      toast.success("Deleted Successfully");
      const { data } = await axios.get("/api/questions");
      setResources(data);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error deleting resource");
    }
  };

  return (
    <>
      <Container>
        <Row className='align-items-center'>
          <Col>
            <h1>Resources</h1>
          </Col>
          <Col className="text-end">
            <LinkContainer to="/admin/resourceedit">
              <Button className='btn-sm m-3'>
                <FaEdit /> Create Resource
              </Button>
            </LinkContainer>
          </Col>
        </Row>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error.data.message}</Message>
        ) : (
          <>
            <Table striped hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>name</th>
                  <th>description</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {resources.map((resource) => (
                  <tr key={resource._id}>
                    <td>{resource._id}</td>
                        {/* Display Image Column */}
                        <td>
                      {resource.fileUrl ? (
                        <a
                          href={resource.fileUrl}
                          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        > {resource.name}</a>
                      ) : (
                        'No File'
                      )}
                    </td>
                    <td>{resource.description}</td>
                    <td>
                      <LinkContainer to={`/admin/resourceedit/${resource._id}`}>
                        <Button variant='light' className='btn-sm mx-2'>
                          <FaEdit />
                        </Button>
                      </LinkContainer>

                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(resource._id)}
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
      </Container>
    </>
  );
}

export default ResourceEditList;
