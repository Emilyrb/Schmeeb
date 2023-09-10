import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

export const ActivityCard = () => {
  return (
    <Col className="col-3">
      <Card>
        <Card.Body>
          <Card.Title>title</Card.Title>
          <Card.Text>
            members
          </Card.Text>
          <Button variant="danger">Delete</Button>
        </Card.Body>
      </Card>
  </Col>
  );
}