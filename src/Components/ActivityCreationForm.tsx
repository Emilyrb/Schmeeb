import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useState} from 'react';
import { Form, InputGroup, ToggleButton, ToggleButtonGroup, Stack } from 'react-bootstrap';
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


function ExpenseCreationForm(props: creationFormProps){
    const [memberList, setMemberList ] = useState<string[]>([''])
    const [newMember, setNewMember] = useState<string>('');
    return (
        <Form>
            <Form.Group className="mb-3" controlId="form.name">
                <Form.Label>Activity</Form.Label>
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
                    <FontAwesomeIcon 
                        icon={faPlus} 
                        onClick={()=> handleAddMember({memberList, setMemberList, newMember, setNewMember,})} 
                        size={'2x'} style={{ cursor: 'pointer' }}
                    />
                </span>
            </Form.Label>
            {memberList.map((member, index) => (

                <li key={index}>{member}</li>
            )
            )}
            <Form.Group className="mb-3" controlId="form.paidBy">
                
                <InputGroup className="mb-3">
                    <Form.Select aria-label="Default select example">
                        <option>Choose an option</option>
                        {Array.from(Array(memberList.length), (e, i) => {
                        return <option value={i}>{memberList[i]}</option>
                        })}
                    </Form.Select>
                </InputGroup>
            </Form.Group>
            <Stack direction="horizontal" gap={3}>
                Split
                    <ToggleButtonGroup className='p-2 ms-auto' type="radio" name="options" defaultValue={1}>
                        <ToggleButton id="even" value={1}>
                            Even
                        </ToggleButton>
                        <ToggleButton id="advanced" value={2}>
                            Advanced
                        </ToggleButton>
                    </ToggleButtonGroup>
            </Stack>
        </Form>
    );
}

export default ExpenseCreationForm;