import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Dropdown, DropdownButton, Form, InputGroup, Modal} from "react-bootstrap";
import styled from "styled-components";
import { FetchActivityDTO } from "../api/fetchActivities";
import EvenSplit from "../math/EvenSplit";

interface Props {
  addExpenseDialog: FetchActivityDTO;
  setShowAddExpenseDialog: React.Dispatch<React.SetStateAction<null | FetchActivityDTO>>;
}

export function AddExpenseDialog(props: Props) {
  const { addExpenseDialog, setShowAddExpenseDialog } = props;
  const handleClose = () => setShowAddExpenseDialog(null);

  return (
    <Modal show={addExpenseDialog !== null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add expense</Modal.Title>
      </Modal.Header>
      <Modal.Body>{renderForm({memberList: addExpenseDialog.data.members})} {JSON.stringify(addExpenseDialog)}</Modal.Body>
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

interface memberDataProps {
  memberList: FetchActivityDTO['data']['members'];
}

const MemberInput = styled.div`
  width: 90%;
  display: inline-block;
`;

function renderForm(props: memberDataProps) {
  const { memberList } = props;
  console.log(memberList);
  return (
    <Form>
      <Form.Group className="mb-3" controlId="form.name">
        <Form.Label>Expense Item</Form.Label>
        <Form.Control type="text" placeholder="Dinner" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="form.price">
        <Form.Label>Price</Form.Label>
        <InputGroup className="mb-3">
          <DropdownButton
            variant="outline-secondary"
            title="AUD"
            id="input-group-dropdown-1"
            align="end"
            disabled
          >
            <Dropdown.Item href="#">Action</Dropdown.Item>
          </DropdownButton>
          <Form.Control aria-label="Text input with dropdown button" />
      </InputGroup>
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="form.paidBy">
        <Form.Label>Paid by</Form.Label>
        <InputGroup className="mb-3">
          <Form.Select aria-label="Default select example">
            <option>Choose an option</option>
            {Array.from(Array(memberList.length), (e, i) => {
              return <option value={i}>{memberList[i]}</option>
            })}
          </Form.Select>
      </InputGroup>
      </Form.Group>
      <Form.Label>Split</Form.Label>
      {Array.from(Array(memberList.length), (e, i) => {
        return <MemberShareInput name={memberList[i]} />
      })}
    </Form>
  );
}

function MemberShareInput(props: {name: string}) {
  const { name } = props;

  return (
    <InputGroup className="mb-3">
    <Form.Control aria-label={name} placeholder={name} value={name} disabled />
    <Form.Control value="100%" />
  </InputGroup>
  );
}