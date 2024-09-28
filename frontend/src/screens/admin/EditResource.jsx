import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, Button, Container } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';

function EditResource() {
  const [isEdit, setIsEdit] = useState(false);
  const { id: resourceId } = useParams();
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUpload, setIsLoadingUpload] = useState(false);
  const [error, setError] = useState();
  const [name, setName] = useState('');
  const [file, setFile] = useState(''); // Comma-separated options
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (resourceId) {
      const getResourceById = async () => {
        try {
          setIsLoading(true);
          const { data } = await axios.get(`/api/resources/${resourceId}`);
          setName(data.name);
          setDescription(data.description); // options as comma-separated string
          setFile(data.file);
          setIsEdit(true);
          setIsLoading(false);
        } catch (err) {
          toast.error(err?.response?.data?.message || err.message);
          setError(err?.response?.data?.message || err.message);
        }
      };
      getResourceById();
    }
  }, [resourceId]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    try {
      setIsLoadingUpload(true);
      const {data} = await  axios.post('/api/fileUpload',formData);
      toast.success(data.message);
      setFile(data.file);
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
      const resourceData = {
        name,
        file,
        description
         // Send image, backend will handle the URL
      };

      if (isEdit) {
        await axios.put(`/api/resources/${resourceId}`, resourceData);
        toast.success('Question updated successfully');
      } else {
        await axios.post('/api/resources', resourceData);
        toast.success('Question added successfully');
      }
      setIsUpdating(false);
      navigate('/admin/resourceeditlist');
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
      setIsUpdating(false);
    }
  };

  return (
    <>
      <Container>
        <Link to='/admin/resourceeditlist' className='btn btn-light my-3'>
          Go Back
        </Link>
        <FormContainer size={6}>
          {isEdit ? <h1>Edit Resource</h1> : <h1>Add Resource</h1>}
          {isUpdating && <Loader />}
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='resource'>
                <Form.Label>Resource</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter name of file'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='resource'>
                <Form.Label>Resource Description</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Description of file'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>


              <Form.Group controlId='file'>
              <Form.Label>File</Form.Label>
              <Form.Control
                type='text'
                placeholder='Upload File below'
                value={file}
                readOnly
                onChange={(e) => setFile(e.target.value)}
              ></Form.Control>
              <Form.Control
                label='Choose File'
                onChange={uploadFileHandler}
                type='file'
              ></Form.Control>
              {isLoadingUpload && <Loader />}
            </Form.Group>

              <Button type='submit' variant='primary' style={{ marginTop: '1rem' }}>
                {isEdit ? 'Edit Resource' : 'Add Resource'}
              </Button>
            </Form>
          )}
        </FormContainer>
      </Container>
    </>
  );
}

export default EditResource;
