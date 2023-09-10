import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { FetchActivityDTO } from '../api/fetchActivities';

interface Props {
  activity: FetchActivityDTO;
}

export const ActivityCard = (props: Props) => {
  const { activity } = props;

  return (
    <Col className="col-3">
      <Card>
        <Card.Body>
          <Card.Title>{activity.data.title}</Card.Title>
          <Card.Text>
            members:
            {activity.data.members?.map(function(member, key){
              return <span key={key}>{member} </span>;
            })}
          </Card.Text>
          <Button variant="danger">Delete</Button>
        </Card.Body>
      </Card>
  </Col>
  );
}