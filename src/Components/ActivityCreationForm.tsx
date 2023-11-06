import React, { useState } from 'react';
import { Form, Modal, Button, InputGroup, ToggleButton, ToggleButtonGroup, Stack } from 'react-bootstrap';
import { doc, setDoc, collection } from "firebase/firestore";
import { firestore } from '../firebase_setup/firebase';
import { ActivityDTO } from '../api/fetchActivities';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

interface handleMembers {
  memberList: string[];
  newMember: string;
  setMemberList: React.Dispatch<React.SetStateAction<string[]>>;
  setNewMember: React.Dispatch<React.SetStateAction<string>>;
}

interface Props {
  showAddActivityDialog: boolean;
  setShowAddActivityDialog: React.Dispatch<React.SetStateAction<boolean>>;
  addExpenseDialog: string;
}

function handleAddMember(props: handleMembers) {
  const { memberList, newMember, setMemberList, setNewMember } = props
  if (newMember.trim() !== '') {
    setMemberList([...memberList, newMember]);
    setNewMember('');
  };
}

function handleRemoveMember(memberList: string[], setMemberList: React.Dispatch<React.SetStateAction<string[]>>, index: number) {
  const updatedList = [...memberList];
  updatedList.splice(index, 1);
  setMemberList(updatedList);
}

const initActivityData: ActivityDTO = {
  title: '',
  description: '',
  members: [''],
};

const MemberInput = styled.div`
  width: 90%;
  display: inline-block;
`;

function AddedMember(props: handleMembers) {
  const { memberList, setMemberList } = props;

  return (
    <Form.Group className="mb-3" controlId="form.member">
      <MemberInput><Form.Control type="text" placeholder="Carmy" /></MemberInput>
      <span><FontAwesomeIcon icon={faMinus} onClick={() => { }} size={'2x'} /></span>
    </Form.Group>
  );
}

function renderForm(props: handleMembers) {
  const { memberList, setMemberList } = props;

  return (
    <Form>

      <Form.Label>Members: <span><FontAwesomeIcon icon={faPlus} onClick={() => { setMemberList(memberList => [...memberList, '']) }} size={'2x'} /></span></Form.Label>
      {Array.from(Array(memberList.length), (e, i) => {
        return <AddedMember {...props} />
      })}
    </Form>
  );
}

export function ActivityCreationForm(props: Props) {
  const [memberList, setMemberList] = useState<string[]>([''])
  const [newMember, setNewMember] = useState<string>('');
  const [formData, setFormData] = useState(initActivityData);
  const { showAddActivityDialog, setShowAddActivityDialog } = props;
  const handleClose = () => setShowAddActivityDialog(false);


  function handleChange(e: any) {
    const key = e.target.id;
    const value = e.target.value;
    setFormData({ ...formData, [key]: value });
  }

  async function createActivity() {
    const formRef = collection(firestore, 'activity');
    const newFormRef = doc(formRef); // create a new document reference in the "activity" collection
    await setDoc(newFormRef, formData);
  }

  return (
    <Modal show={showAddActivityDialog} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Activity</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="form.name">
            <Form.Label>Activity</Form.Label>
            <Form.Control type="text" placeholder="Activity Name..." onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="form.description">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Description..." onChange={handleChange} />
          </Form.Group>
          {/* <Form.Group className="mb-3" controlId="form.members">
            <Form.Label>Members</Form.Label>
            <div className="input-group">
              <MemberInput><Form.Control type="members" placeholder="Add a Member..." value={newMember} onChange={(e) => setNewMember(e.target.value)} /></MemberInput>
              <button className="btn btn-primary" type="button" onClick={() => handleAddMember({ memberList, setMemberList, newMember, setNewMember, })}>Add</button>
            </div>
          </Form.Group> */}
          <Form.Group className="mb-3" controlId="form.member">
            <MemberInput><Form.Control type="text" placeholder="Carmy" /></MemberInput>
            <span><FontAwesomeIcon icon={faPlus} onClick={() => { setMemberList(memberList => [...memberList, '']) }} size={'2x'} /></span>
          </Form.Group>
          <ul style={{ listStyleType: 'none', margin: 0, padding: 0 }}>
            {memberList.map((member, index) => (
              <li key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                {member}
                {member && (
                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={() => handleRemoveMember(memberList, setMemberList, index)}
                  >
                    Remove
                  </button>
                )}
              </li>
            ))}
          </ul>
        </Form></Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={createActivity}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}