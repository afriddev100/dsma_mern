import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { useNavigate, useParams } from 'react-router-dom';
import FormContainer from '../../components/FormContainer';

function NotificationForm() {
  const [message, setMessage] = useState('');
  const [expiry, setExpiry] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch notification details if in edit mode
  useEffect(() => {
    if (id) {
      const fetchNotification = async () => {
        try {
          setIsLoading(true);
          const { data } = await axios.get(`/api/notifications/${id}`);
          setMessage(data.message);
          setExpiry(data.expiry);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          setError('Failed to load notification');
        }
      };
      fetchNotification();
    }
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const notificationData = {
      message,
      expiry,
    };

    try {
      if (id) {
        // Update notification
        await axios.put(`/api/notifications/${id}`, notificationData);
        toast.success('Notification updated successfully');
      } else {
        // Create new notification
        await axios.post('/api/notifications', notificationData);
        toast.success('Notification created successfully');
      }
      setIsLoading(false);
     // history.push('/admin/notifications');  // Redirect after save
      navigate('/admin/notifications');
    } catch (error) {
      setIsLoading(false);
      toast.error('Failed to save notification');
    }
  };

  return (
    <Container className='shadow-box' >
        <FormContainer size={6}>
      <h1>{id ? 'Edit Notification' : 'Create Notification'}</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="message" className="my-3">
            <Form.Label>Message</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter notification message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="expiry" className="my-3">
            <Form.Label>Expiry Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter expiry date (YYYY-MM-DD)"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            {id ? 'Update' : 'Create'}
          </Button>
        </Form>
      )}
      </FormContainer>
    </Container>
  );
}

export default NotificationForm;
