import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { FetchActivityDTO } from '../api/fetchActivities';

interface Props {
  activity: FetchActivityDTO;
  setAddExpenseDialog: React.Dispatch<React.SetStateAction<null | FetchActivityDTO>>;
}

export const ActivityCard = (props: Props) => {
  const { activity, setAddExpenseDialog } = props;

  return (
    <Col className="col-4">
      <Card>
        <Card.Body>
          <Card.Title>{activity.data.title}</Card.Title>
          <Card.Text>
            members:
            {activity.data.members?.map(function(member, key){
              return <span key={key}>{member} </span>;
            })}
          </Card.Text>
          <Card.Text>{activity.data.description}</Card.Text>
          <Button variant="primary" onClick={() => {setAddExpenseDialog(activity)}}>Add expense</Button>
          <Button variant="danger">Delete</Button>
        </Card.Body>
      </Card>
  </Col>
  );
}