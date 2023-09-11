import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import styled from "styled-components";

interface Props {
  addExpenseDialog: string;
  setAddExpenseDialog: React.Dispatch<React.SetStateAction<null | string>>;
}

export function AddExpenseDialog(props: Props) {
  const [ memberList, setMemberList ] = useState(['']); 
  const { addExpenseDialog, setAddExpenseDialog } = props;
  const handleClose = () => setAddExpenseDialog(null);

  return (
    <Modal show={addExpenseDialog !== null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add expense</Modal.Title>
      </Modal.Header>
      <Modal.Body>{renderForm({memberList, setMemberList})} {addExpenseDialog}</Modal.Body>
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
  memberList: string[];
  setMemberList: React.Dispatch<React.SetStateAction<string[]>>;
}

const MemberInput = styled.div`
  width: 90%;
  display: inline-block;
`;

function renderForm(props: memberDataProps) {
  const { memberList, setMemberList } = props;

  return (
    <Form>
      <Form.Group className="mb-3" controlId="form.name">
        <Form.Label>Activity Name</Form.Label>
        <Form.Control type="text" placeholder="Movie night" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="form.description">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
      <Form.Label>Members: <span><FontAwesomeIcon icon={faPlus} onClick={() => {setMemberList(memberList => [...memberList, ''] )}} size={'2x'} /></span></Form.Label>
      {Array.from(Array(memberList.length), (e, i) => {
        return <AddedMemmber {...props} />
      })}
    </Form>
  );
}

function AddedMemmber(props: memberDataProps) {
  const { memberList, setMemberList } = props;

  return (
    <Form.Group className="mb-3" controlId="form.member">
      <MemberInput><Form.Control type="text" placeholder="Carmy" /></MemberInput>
      <span><FontAwesomeIcon icon={faMinus} onClick={() => {}} size={'2x'} /></span>
    </Form.Group>
  );
}
