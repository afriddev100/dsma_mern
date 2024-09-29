import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  Container,
} from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
function TrainingPackageDetails() {
  const { id: productId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [trainingPackge, setTrainingPackage] = useState({});

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const { data } = await axios.get(`/api/trainingPackages/${productId}`);
        setTrainingPackage(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError({ data: { message: "Error while calling API" } });
      }
    };

    getProductDetails();
  }, []);

  return (
    <>
      <Container>
        <Link className="btn btn-light my-3" to="/packageDetails">
          Go Back
        </Link>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <>
            {/* <Meta title={trainingPackge?.name} description={trainingPackge?.description} /> */}
            <Row>
              <Col md={6}>
                <Image
                  src={trainingPackge?.imageUrl}
                  alt={trainingPackge?.name}
                  fluid
                />
              </Col>
              <Col md={3}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{trainingPackge?.name}</h3>
                  </ListGroup.Item>
                  {/* <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item> */}
                  <ListGroup.Item>
                    Price: Rs {trainingPackge?.price}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Description: {trainingPackge?.description}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup variant="flush">
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
                        <Col>{trainingPackge?.duration}</Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Link className="nav-link" to={`/enroll/${trainingPackge._id}`}>
                        <Button className="btn-block" type="button">
                          Enroll
                        </Button>
                      </Link>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col md={12}>
              
                {trainingPackge?.videoUrl ? (
                  
                  <div className="embed-responsive embed-responsive-16by9">
                      <h5>Watch Introductory Video</h5>
                    <iframe
                      width="100%"
                      height="400"
                      src={trainingPackge.videoUrl.replace(
                        "watch?v=",
                        "embed/"
                      )}
                      title="Training Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <p>No video available for this training package.</p>
                )}
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
}

export default TrainingPackageDetails;
