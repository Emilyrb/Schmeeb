import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { FetchActivityDTO } from '../api/fetchActivities';
import { FetchExpenseDTO, fetchExpenses } from '../api/fetchExpenses';
import { useEffect, useState } from 'react';

interface Props {
  activity: FetchActivityDTO;
  setShowAddExpenseDialog: React.Dispatch<React.SetStateAction<null | FetchActivityDTO>>;
}

const initExpensesData: FetchExpenseDTO[] = [];

export const ActivityCard = (props: Props) => {
  const { activity, setShowAddExpenseDialog } = props;
  const [expensesData, setExpensesData] = useState(initExpensesData);

  useEffect(() => {
    fetchExpenses(setExpensesData, activity.id);
  }, [])

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
          {
            expensesData.length > 0 &&
            expensesData.map(function (expense, key) {
              return <>{expense.data.itemName} {expense.data.price} {expense.data.paidBy}</>;
            })
          }
          <Button variant="primary" onClick={() => { setShowAddExpenseDialog(activity) }}>Add expense</Button>
          <Button variant="danger">Delete</Button>
        </Card.Body>
      </Card>
    </Col>
  );
}