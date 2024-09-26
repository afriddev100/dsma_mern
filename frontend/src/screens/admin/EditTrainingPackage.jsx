import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, Button, Container } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';

function EditTrainingPackage() {
  const [isEdit,setIsEdit]=useState(false);
  const { id: packageId } = useParams();
  const navigate = useNavigate();
  const [isUpdating,setIsUpdating]=useState(false);
  const [isLoading,setIsLoading]=useState(false);
  const [isLoadingUpload,setIsLoadingUpload]=useState(false);
  const [error , setError]=useState();
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');

  useEffect(()=>{
      if(packageId!=undefined && packageId!=null){
        const getPackageById=async ()=>{
          try{
            setIsLoading(true);
            const {data}= await axios.get(`/api/trainingPackages/${packageId}`);
            setName(data.name);
            setPrice(data.price);
            setImage(data.image);
            setDuration(data.duration);
            setDescription(data.description);
            setIsEdit(true);
            setIsLoading(false);
          }
          catch(err){
            toast.error(err?.data?.message || err.error);
            setError(err?.data?.message || err.error);
          }
       

        };
        getPackageById();
      }
  },[])

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      setIsLoadingUpload(true);
      const {data} = await  axios.post('/api/upload',formData);
      toast.success(data.message);
      setImage(data.image);
      setIsLoadingUpload(false);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {

      setIsUpdating(true);

      if(isEdit){
        const {data}= await axios.put(`/api/trainingPackages/${packageId}`,
          {
            name:name,
            price:price,
            image:image,
            duration:duration,
            description:description

          }
        )
        toast.success('Training package updated');
      }
      else{
        const {data}= await axios.post('/api/trainingPackages',
          {
            name:name,
            price:price,
            image:image,
            duration:duration,
            description:description

          })
          toast.success('Training package added');

      }

      setIsUpdating(false);
      navigate('/admin/packagelist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
      setIsUpdating(false);
    }
  };

  const validateInputs = ()=>{
    if(name==null || name==undefined){
      toast.error("Name is not set")
    }
  }

  return (
    <>
    <Container>
    <Link to='/admin/packagelist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer size={6}>
      {isEdit ? (
        <h1>Edit Training Package</h1>):(<h1>Add Training Package</h1>)}

        {isUpdating && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error.data.message}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                readOnly
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                label='Choose File'
                onChange={uploadFileHandler}
                type='file'
              ></Form.Control>
              {isLoadingUpload && <Loader />}
            </Form.Group>


            <Form.Group controlId='countInStock'>
              <Form.Label>Duration in No of Days</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Duration'
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                as="textarea" 
                rows={5}
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button
              type='submit'
              variant='primary'
              style={{ marginTop: '1rem' }}
            >
              {isEdit?("EDIT"):("ADD")}
            </Button>
          </Form>
        )}
      </FormContainer>
    </Container>
       
    </>
  )
}

export default EditTrainingPackage