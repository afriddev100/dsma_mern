import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

function Dashboard() {
  return (
    <Container>
      {/* Main Content */}
      <Col md={10}>
        <h3 className="mb-4">Dashboard Overview</h3>
        <Row>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Total Users</Card.Title>
                <Card.Text>1234</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Total Sales</Card.Title>
                <Card.Text>$45,000</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Total Orders</Card.Title>
                <Card.Text>567</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <h4 className="mt-5">Recent Activity</h4>
        <Card className="mb-3">
          <Card.Body>
            <Card.Text>User John Doe made a purchase of $500</Card.Text>
          </Card.Body>
        </Card>
        <Card className="mb-3">
          <Card.Body>
            <Card.Text>User Jane Smith updated her profile.</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Container>
  );
}

export default Dashboard;
