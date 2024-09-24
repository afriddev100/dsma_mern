import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const AboutUs = () => {
  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">About Us</h1>
      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Our Mission</Card.Title>
              <Card.Text>
                At [Driving School Name], our mission is to provide comprehensive and high-quality driving training that prepares our students for safe and confident driving. We believe that everyone deserves to become a skilled driver, and we are committed to making that a reality.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Our Vision</Card.Title>
              <Card.Text>
                We envision a world where every driver on the road is knowledgeable and responsible. By offering a variety of training packages, from automatic to manual driving, we aim to create a community of safe drivers who contribute to road safety.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Card>
            <Card.Body>
              <Card.Title>Our Values</Card.Title>
              <Card.Text>
                We prioritize safety, professionalism, and excellence in all our training programs. Our values guide our instructors and students alike, fostering an environment of respect, teamwork, and continuous improvement. Together, we strive for success on every journey!
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;
