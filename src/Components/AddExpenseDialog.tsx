import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Dropdown, DropdownButton, Form, InputGroup, Modal} from "react-bootstrap";
import styled from "styled-components";
import { FetchActivityDTO } from "../api/fetchActivities";
import EvenSplit from "../math/EvenSplit";
import { ExpenseForm } from "./ExpenseForm";

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
      <Modal.Body>{<ExpenseForm activityId={addExpenseDialog.id} members={addExpenseDialog.data.members} />}</Modal.Body>
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
