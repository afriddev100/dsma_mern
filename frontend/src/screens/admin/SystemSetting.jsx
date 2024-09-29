import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, Button, Container } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';

function SystemSetting() {
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUpload, setIsLoadingUpload] = useState(false);
  const [error, setError] = useState(null);
  
  const [name, setName] = useState('');
  const [logo, setLogo] = useState('');

  useEffect(() => {
    const getCompany = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/api/systemSetting`);
        setName(data.name);
        setLogo(data.logo);
        setIsLoading(false);
      } catch (err) {
        toast.error(err?.response?.data?.message || err.message);
        setError(err?.response?.data?.message || err.message);
        setIsLoading(false);
      }
    };
    getCompany();
  }, []);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      setIsLoadingUpload(true);
      const { data } = await axios.post('/api/upload', formData);
      toast.success('Image uploaded successfully');
      setLogo(data.image);
      setIsLoadingUpload(false);
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
      setIsLoadingUpload(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setIsUpdating(true);
      const { data } = await axios.put(`/api/systemSetting`, { name, logo });
      toast.success('Company details updated');
      setIsUpdating(false);

    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
      setIsUpdating(false);
    }
  };

  return (
    <>
      <Container>
        <Link to='/admin/company' className='btn btn-light my-3'>
          Go Back
        </Link>
        <FormContainer size={6}>
          <h1>Update System Setting</h1>
          {isUpdating && <Loader />}
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter company name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='logo'>
                <Form.Label>Logo URL</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Select a logo'
                  value={logo}
                  readOnly
                  onChange={(e) => setLogo(e.target.value)}
                ></Form.Control>
                <Form.Control
                  type='file'
                  label='Choose File'
                  onChange={uploadFileHandler}
                ></Form.Control>
                {isLoadingUpload && <Loader />}
              </Form.Group>

              <Button type='submit' variant='primary' style={{ marginTop: '1rem' }}>
                Update
              </Button>
            </Form>
          )}
        </FormContainer>
      </Container>
    </>
  );
}

export default SystemSetting;
