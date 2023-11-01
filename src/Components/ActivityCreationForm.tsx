import React, {useState} from 'react';
import { Form, InputGroup, ToggleButton, ToggleButtonGroup, Stack } from 'react-bootstrap';

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
        // console.log(memberList)
        console.log(newMember)
}

function handleRemoveMember(memberList: string[], setMemberList: React.Dispatch<React.SetStateAction<string[]>>, index: number){
    const updatedList = [...memberList];
    updatedList.splice(index, 1);
    setMemberList(updatedList);
    console.log(updatedList)
}

function ActivityCreationForm(){
    const [memberList, setMemberList] = useState<string[]>([''])
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
            <Form.Group className="mb-3" controlId="form.members">
                <Form.Label>Members</Form.Label>
                    <div className="input-group">
                        <Form.Control type="members" placeholder="Add a Member..." value={newMember} onChange={(e) => setNewMember(e.target.value)}/>
                        <button className="btn btn-primary" type="button" onClick={()=> handleAddMember({memberList, setMemberList, newMember, setNewMember,})}>Add</button>
                    </div>
                </Form.Group>
            <ul style={{ listStyleType: 'none', margin: 0, padding: 0}}>
                {memberList.map((member, index) => (
                   <li key={index} style={{display: 'flex', justifyContent: 'space-between'}}>
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
            {/* <Stack direction="horizontal" gap={3}>
                Split
                    <ToggleButtonGroup className='p-2 ms-auto' type="radio" name="options" defaultValue={1}>
                        <ToggleButton id="even" value={1}>
                            Even
                        </ToggleButton>
                        <ToggleButton id="advanced" value={2}>
                            Advanced
                        </ToggleButton>
                    </ToggleButtonGroup>
            </Stack> */}
        </Form>
    );
}

export default ActivityCreationForm;