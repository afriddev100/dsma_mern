import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const ResourcesPage = () => {
  const resources = [
    {
      title: 'Driving School Guide PDF',
      description: 'A comprehensive guide on the rules, regulations, and tips for new drivers.',
      downloadLink: '/resources/driving-school-guide.pdf',
    },
    {
      title: 'Road Safety Tips',
      description: 'Important tips and precautions to ensure your safety on the road.',
      downloadLink: '/resources/road-safety-tips.pdf',
    },
    {
      title: 'Sample Driving Test Papers',
      description: 'Practice with these sample driving test papers to prepare for your exam.',
      downloadLink: '/resources/sample-test-papers.pdf',
    },
    {
      title: 'Official Driver’s Manual',
      description: 'The official driver’s manual to understand all the rules and regulations.',
      downloadLink: '/resources/drivers-manual.pdf',
    },
    {
      title: 'Vehicle Maintenance Checklist',
      description: 'A checklist to ensure your vehicle is in good condition before hitting the road.',
      downloadLink: '/resources/vehicle-maintenance-checklist.pdf',
    },
  ];

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Driving School Learning Resources</h2>
      <p className="text-center mb-4">
        Download useful resources to help you on your journey to becoming a skilled and safe driver. All resources are free to download and designed to assist with your learning process.
      </p>

      <Row>
        {resources.map((resource, index) => (
          <Col md={6} lg={4} key={index} className="mb-4">
            <Card className="shadow">
              <Card.Body>
                <Card.Title>{resource.title}</Card.Title>
                <Card.Text>{resource.description}</Card.Text>
                <Button
                  variant="primary"
                  href={resource.downloadLink}
                  download
                >
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
