import { Card, Row,Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const TrainingPackage = ({ trainingPackage }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/packageDetails/${trainingPackage._id}`}>
        <Card.Img src={trainingPackage.imageUrl} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/packageDetails/${trainingPackage._id}`}>
          <Card.Title as='div' className='product-title'>
            <strong>{trainingPackage.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div' className='three-line-text'> 
        {trainingPackage.description}
        </Card.Text> 

        <Card.Text as='h5' className='mt-3'>

          <Row>
            <Col>
           Price: Rs {trainingPackage.price} 
            </Col>
            <Col>
          Duration:  {trainingPackage.duration} days
            </Col>
          </Row>
        </Card.Text>

      </Card.Body>
    </Card>
  );
};

export default TrainingPackage;
