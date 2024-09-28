import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { LinkContainer } from 'react-router-bootstrap';
import { toast } from 'react-toastify';

function NotificationList() {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  // Fetch notifications from API
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data } = await axios.get("/api/notifications");
        setNotifications(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError({ data: { message: "Error while fetching notifications" } });
      }
    };
    fetchNotifications();
  }, []);

  // Handler to delete a notification
  const deleteHandler = async (id) => {
    try {
      await axios.delete(`/api/notifications/${id}`);
      toast.success("Deleted Successfully");
      
      // Refresh the notification list after deletion
      const { data } = await axios.get("/api/notifications");
      setNotifications(data);
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    }
  };

  return (
    <>
      <Container>
        <Row className='align-items-center'>
          <Col>
            <h1>Notifications</h1>
          </Col>
          <Col className="text-end">
            <LinkContainer to="/admin/notificationCreate">
              <Button className='btn-sm m-3'>
                <FaEdit /> Create Notification
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
                  <th>Message</th>
                  <th>Expiry Date</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {notifications.map((notification) => (
                  <tr key={notification._id}>
                    <td>{notification._id}</td>
                    <td>{notification.message}</td>
                    <td>{notification.expiry}</td>
                    <td>{new Date(notification.createdAt).toLocaleDateString()}</td>
                    <td>
                      <LinkContainer to={`/admin/notificationCreate/${notification._id}`}>
                        <Button variant='light' className='btn-sm mx-2'>
                          <FaEdit />
                        </Button>
                      </LinkContainer>
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(notification._id)}
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

export default NotificationList;
