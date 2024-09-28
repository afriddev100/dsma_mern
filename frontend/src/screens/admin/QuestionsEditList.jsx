import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { LinkContainer } from 'react-router-bootstrap';
import { toast } from 'react-toastify';

function QuestionsEditList() {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data } = await axios.get("/api/questions");
        setQuestions(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError({ data: { message: "Error while calling API" } });
      }
    };
    fetchQuestions();
  }, []);

  const deleteHandler = async (id) => {
    try {
      await axios.delete(`/api/questions/${id}`);
      toast.success("Deleted Successfully");
      const { data } = await axios.get("/api/questions");
      setQuestions(data);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error deleting question");
    }
  };

  return (
    <>
      <Container>
        <Row className='align-items-center'>
          <Col>
            <h1>Questions</h1>
          </Col>
          <Col className="text-end">
            <LinkContainer to="/admin/questionedit">
              <Button className='btn-sm m-3'>
                <FaEdit /> Create Question
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
                  <th>Image</th>
                  <th>Question</th>
                  <th>Options</th>
                  <th>Right Answer</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {questions.map((question) => (
                  <tr key={question._id}>
                    <td>{question._id}</td>
                        {/* Display Image Column */}
                        <td>
                      {question.imageUrl ? (
                        <img
                          src={question.imageUrl}
                          alt={question.question}
                          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        />
                      ) : (
                        'No Image'
                      )}
                    </td>
                    <td>{question.question}</td>
                    <td>{question.options}</td>
                    <td>{question.rightAnswer}</td>
                    <td>
                      <LinkContainer to={`/admin/questionedit/${question._id}`}>
                        <Button variant='light' className='btn-sm mx-2'>
                          <FaEdit />
                        </Button>
                      </LinkContainer>

                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(question._id)}
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

export default QuestionsEditList;
