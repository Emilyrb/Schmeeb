import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { FetchActivityDTO } from '../api/fetchActivities';
import { fetchExpenses } from '../api/fetchExpenses';
import { useEffect, useState } from 'react';

interface Props {
  activity: FetchActivityDTO;
  setShowAddExpenseDialog: React.Dispatch<React.SetStateAction<null | FetchActivityDTO>>;
  setShowEditActivityDialog: React.Dispatch<React.SetStateAction<null | string>>;
}


export const ActivityCard = (props: Props) => {
  const { activity, setShowAddExpenseDialog, setShowEditActivityDialog } = props;

  return (
    <Col className="col-4">
      <Card>
        <Card.Body>
          <Card.Title>{activity.data.title}</Card.Title>
          <Card.Subtitle>{activity.data.description}</Card.Subtitle>
          <Card.Text>
            members:
            {activity.data.members?.map(function (member, key) {
              return <span key={key}>{member} </span>;
            })}
          </Card.Text>
          <Button variant="primary" onClick={() => {setShowAddExpenseDialog(activity)}}>Add expense</Button>
          <Button variant="secondary" onClick={() => {setShowEditActivityDialog(activity.id)}}>Edit</Button>
          <Button variant="danger">Delete</Button>
        </Card.Body>
      </Card>
    </Col>
  );
}