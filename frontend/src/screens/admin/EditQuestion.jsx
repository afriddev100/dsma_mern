import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, Button, Container } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';

function EditQuestion() {
  const [isEdit, setIsEdit] = useState(false);
  const { id: questionId } = useParams();
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUpload, setIsLoadingUpload] = useState(false);
  const [error, setError] = useState();
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(''); // Comma-separated options
  const [rightAnswer, setRightAnswer] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (questionId) {
      const getQuestionById = async () => {
        try {
          setIsLoading(true);
          const { data } = await axios.get(`/api/questions/${questionId}`);
          setQuestion(data.question);
          setOptions(data.options); // options as comma-separated string
          setRightAnswer(data.rightAnswer);
          setImage(data.image);
          setIsEdit(true);
          setIsLoading(false);
        } catch (err) {
          toast.error(err?.response?.data?.message || err.message);
          setError(err?.response?.data?.message || err.message);
        }
      };
      getQuestionById();
    }
  }, [questionId]);

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
      toast.error(err?.response?.data?.message || err.message);
      setIsLoadingUpload(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setIsUpdating(true);
      const questionData = {
        question,
        options,
        rightAnswer,
        image, // Send image, backend will handle the URL
      };

      if (isEdit) {
        await axios.put(`/api/questions/${questionId}`, questionData);
        toast.success('Question updated successfully');
      } else {
        await axios.post('/api/questions', questionData);
        toast.success('Question added successfully');
      }
      setIsUpdating(false);
      navigate('/admin/questioneditlist');
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
      setIsUpdating(false);
    }
  };

  return (
    <>
      <Container>
        <Link to='/admin/questioneditlist' className='btn btn-light my-3'>
          Go Back
        </Link>
        <FormContainer size={6}>
          {isEdit ? <h1>Edit Question</h1> : <h1>Add Question</h1>}
          {isUpdating && <Loader />}
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='question'>
                <Form.Label>Question</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter question'
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='options'>
                <Form.Label>Options (comma-separated)</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter options, separated by commas'
                  value={options}
                  onChange={(e) => setOptions(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='rightAnswer'>
                <Form.Label>Right Answer</Form.Label>
                <Form.Control
                  as='select'
                  value={rightAnswer}
                  onChange={(e) => setRightAnswer(e.target.value)}
                >
                  <option value=''>Select correct answer</option>
                  {options.split(',').map((opt, index) => (
                    <option key={index} value={opt.trim()}>
                      {opt.trim()}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Upload image below'
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

              <Button type='submit' variant='primary' style={{ marginTop: '1rem' }}>
                {isEdit ? 'Edit Question' : 'Add Question'}
              </Button>
            </Form>
          )}
        </FormContainer>
      </Container>
    </>
  );
}

export default EditQuestion;
