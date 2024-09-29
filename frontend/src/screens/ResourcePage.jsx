import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ResourcesPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [resources, setResources] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchResources = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get("/api/resources");

        setResources(data);
        setIsLoading(false);
      } catch (error) {
        toast.error("Error fetching Details");
        setError(
          error?.data?.message || error?.error || "Error while calling api"
        );
        setIsLoading(false);
      }
    };

    fetchResources();
  }, []);
  if (isLoading) return <Loader />;
  if(error) return  <Message variant='danger'>{error}</Message>;
  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Driving School Learning Resources</h2>
      <p className="text-center mb-4">
        Download useful resources to help you on your journey to becoming a
        skilled and safe driver. All resources are free to download and designed
        to assist with your learning process.
      </p>

      <Row>
        {resources.map((resource, index) => (
          <Col md={6} lg={4} key={index} className="mb-4">
            <Card className="shadow">
              <Card.Body>
                <Card.Title>{resource.name}</Card.Title>
                <Card.Text>{resource.description}</Card.Text>
                <Button variant="primary" href={resource.fileUrl} download>
                  Download
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ResourcesPage;
