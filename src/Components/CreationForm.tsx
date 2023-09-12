import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useState} from 'react';
import { Form, Modal } from 'react-bootstrap';
import styled from 'styled-components';
interface creationFormProps {
    
}

interface handleMembers {
    memberList: string[];
    newMember: string;
    setMemberList: React.Dispatch<React.SetStateAction<string[]>>;
    setNewMember: React.Dispatch<React.SetStateAction<string>>;
}

function handleAddMember(props: handleMembers){
    const {memberList, newMember, setMemberList, setNewMember} = props
    if (newMember.trim() !== '') {
        setMemberList([...memberList, newMember]);
        setNewMember('');};
}


function CreationForm(props: creationFormProps){
    const [memberList, setMemberList ] = useState<string[]>([''])
    const [newMember, setNewMember] = useState<string>('');
    return (
        <Form>
            <Form.Group className="mb-3" controlId="form.name">
            <Form.Label>Activity Name</Form.Label>
            <Form.Control type="text" placeholder="Activity Name..." />
            </Form.Group>
            <Form.Group className="mb-3" controlId="form.description">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Description..."/>
            </Form.Group>
            <Form.Label className='d-flex justify-content-between align-items-center'>Members: 
                <span>
                    <input 
                        type ="text"
                        placeholder='Add a member...'
                        value={newMember}
                        onChange={(e) => setNewMember(e.target.value)}
                    />
                    <FontAwesomeIcon icon={faPlus} onClick={()=> handleAddMember({memberList, setMemberList, newMember, setNewMember,})} 
                        size={'2x'} style={{ cursor: 'pointer' }} />
                </span></Form.Label>
                {memberList.map((member, index) => (

                    // <li key={index}>{member}</li>
                )
                )}
        </Form>
    );
}

export default CreationForm;