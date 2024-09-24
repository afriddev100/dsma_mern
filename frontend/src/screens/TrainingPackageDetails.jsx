import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Meta from '../components/Meta';
import { Link } from 'react-router-dom';
import {
    Row,
    Col,
    Image,
    ListGroup,
    Card,
    Button,
    Form,
    Container
  } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
function TrainingPackageDetails() {
  const { id: productId } = useParams();
  const  [isLoading,setIsLoading]=useState(true);
  const  [error,setError]=useState();
  const  [trainingPackge,setTrainingPackage]=useState({});

  useEffect(()=>{
    const getProductDetails=async ()=>{
        try{
            const {data}= await axios.get(`/api/trainingPackages/${productId}`);
            setTrainingPackage(data);
            setIsLoading(false);
        }
        catch(error){
            setIsLoading(false);
            setError({data:{message:"Error while calling API"}});
        }
       
        
    }
    
    getProductDetails();
    
  
   
  },[])


  return (
    <>
    <Container>

  
    <Link className='btn btn-light my-3' to='/'>
      Go Back
    </Link>
    {isLoading ? (
      <Loader />
    ) : error ? (
      <Message variant='danger'>
        {error?.data?.message || error.error}
      </Message>
    ) : (
      <>
        {/* <Meta title={trainingPackge?.name} description={trainingPackge?.description} /> */}
        <Row>
          <Col md={6}>
            <Image src={trainingPackge?.imageUrl} alt={trainingPackge?.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{trainingPackge?.name}</h3>
              </ListGroup.Item>
              {/* <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item> */}
              <ListGroup.Item>Price: Rs {trainingPackge?.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: {trainingPackge?.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>Rs {trainingPackge?.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Duration:</Col>
                    <Col>
                      {trainingPackge?.duration}
                    </Col>
                  </Row>
                </ListGroup.Item>


                <ListGroup.Item>
                <Link className="nav-link" to="/packageList">
                <Button
                    className='btn-block'
                    type='button'
                   
                  >
                   Enroll 
                  </Button>
                </Link>
              
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
        <Row className='review'>
          {/* <Col md={6}>
            <h2>Reviews</h2>
            {product.reviews.length === 0 && <Message>No Reviews</Message>}
            <ListGroup variant='flush'>
              {product.reviews.map((review) => (
                <ListGroup.Item key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating value={review.rating} />
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </ListGroup.Item>
              ))}
              <ListGroup.Item>
                <h2>Write a Customer Review</h2>

                {loadingProductReview && <Loader />}

                {userInfo ? (
                  <Form onSubmit={submitHandler}>
                    <Form.Group className='my-2' controlId='rating'>
                      <Form.Label>Rating</Form.Label>
                      <Form.Control
                        as='select'
                        required
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value=''>Select...</option>
                        <option value='1'>1 - Poor</option>
                        <option value='2'>2 - Fair</option>
                        <option value='3'>3 - Good</option>
                        <option value='4'>4 - Very Good</option>
                        <option value='5'>5 - Excellent</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group className='my-2' controlId='comment'>
                      <Form.Label>Comment</Form.Label>
                      <Form.Control
                        as='textarea'
                        row='3'
                        required
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Button
                      disabled={loadingProductReview}
                      type='submit'
                      variant='primary'
                    >
                      Submit
                    </Button>
                  </Form>
                ) : (
                  <Message>
                    Please <Link to='/login'>sign in</Link> to write a review
                  </Message>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col> */}
        </Row>
      </>
    )}
      </Container>
  </>
  )
}

export default TrainingPackageDetails