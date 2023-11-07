import { Button, Dropdown, DropdownButton, Form, InputGroup, Modal} from "react-bootstrap";
import { FetchExpenseDTO, fetchExpenses } from "../api/fetchExpenses";
import { useEffect, useState } from "react";
import Accordion from 'react-bootstrap/Accordion';
import { ExpenseForm } from "./ExpenseForm";
// import styled from "styled-components";

interface Props {
  showEditActivityDialog: null | string;
  setShowEditActivityDialog: React.Dispatch<React.SetStateAction<null | string>>;
}

const initExpensesData: FetchExpenseDTO[] = [];

// const PriceText = styled.div`
//   text-align: right;
//   float: right;
//   clear: both;
// `;

export function EditActivityDialog(props: Props) {
  const { showEditActivityDialog, setShowEditActivityDialog } = props;
  const [ expensesData, setExpensesData ] = useState(initExpensesData);
  const handleClose = () => setShowEditActivityDialog(null);

  useEffect(() => {
    if (showEditActivityDialog !== null) {
      fetchExpenses(setExpensesData, showEditActivityDialog);
    }
  }, [])
  
  return (
    <Modal show={showEditActivityDialog !== null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>View expenses</Modal.Title>
      </Modal.Header>
      <Modal.Body>{renderExpenseItem(expensesData)}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function renderExpenseItem(expensesData: FetchExpenseDTO[]) {
  return (
    <Accordion>
      {
    expensesData.length > 0 &&
    expensesData.map(function(expense, key) {
      return (
        <Accordion.Item eventKey={key.toString()}>
          <Accordion.Header>
            <span>{expense.data.itemName}</span>
            <span>{expense.data.price}</span>
          </Accordion.Header>
          <Accordion.Body>
            <ExpenseForm expense={expense} />
            {expense.data.paidBy} {JSON.stringify(expense.data.split)}
          </Accordion.Body>
        </Accordion.Item>
      );
    })
  }
  </Accordion>
  );
}
