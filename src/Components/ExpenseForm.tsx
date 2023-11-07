import { Button, Dropdown, DropdownButton, Form, InputGroup } from "react-bootstrap";
import { ExpenseDTO, FetchExpenseDTO } from "../api/fetchExpenses";
import { useEffect, useState } from "react";

interface EditExpenseProps {
  expense?: FetchExpenseDTO;
  activityId?: string;
  members?: string[];
}

export function ExpenseForm(props: EditExpenseProps) {
  const { expense, members } = props;

  let initMemberSplitAtZero = {};
  if (members){
    initMemberSplitAtZero = members.reduce((obj: { [key: string]: number }, member) => {
      obj[member] = 0;
      return obj;
    }, {});
  }
  const initExpenseDoc: ExpenseDTO = {
    itemName: '',
    price: 0,
    paidBy: '',
    split: members ? initMemberSplitAtZero : {},
  }
  
  const [ formData, setFormData ] = useState<ExpenseDTO>(expense ? expense.data : initExpenseDoc);

  let splitMap: { [key: string]: number } = formData.split;
  const memberList = Object.keys(splitMap);

  function handleChange(e: any) {
    const key = e.target.id;
    const value = e.target.value;
    console.log(key, value);
    setFormData({ ...formData, [key]: value });
  }
  
  function handleMapTypeChange(e: any){
    const key = e.target.id;
    const value = e.target.value;
    console.log(key, value);
    splitMap[key] = parseInt(value);
    console.log({ ...formData, split: splitMap });
    setFormData({ ...formData, split: splitMap });
  }
  // useEffect(() => {
  //   console.log('formData', formData);
  // }, [setFormData]);

  function MemberSplitInput(props: {name: string, split: number}) {
    const { name, split } = props;

    return (
      <Form.Group className="mb-3" controlId={name}>
        <InputGroup className="mb-3" >
          <InputGroup.Text>{name}</InputGroup.Text>
          <Form.Control value={split} onChange={handleMapTypeChange} />
        </InputGroup>
      </Form.Group>
    );
  }

  return (
    <Form>
      <Form.Group className="mb-3" controlId="itemName">
        <Form.Label>Expense Item</Form.Label>
        <Form.Control type="text" value={formData.itemName} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="price">
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
          <Form.Control value={formData.price} onChange={handleChange} />
      </InputGroup>
      </Form.Group>
      <Form.Group className="mb-3" controlId="paidBy">
        <Form.Label>Paid by</Form.Label>
        <InputGroup className="mb-3">
          <Form.Select defaultValue={formData.paidBy} placeholder="Choose an option" onChange={handleChange}>
            {Array.from(Array(memberList.length), (e, i) => {
              return <option value={i}>{memberList[i]}</option>
            })}
          </Form.Select>
      </InputGroup>
      </Form.Group>
      <Form.Label>Split</Form.Label>
      {Array.from(Array(memberList.length), (e, i) => {
        return <MemberSplitInput name={memberList[i]} split={splitMap[memberList[i]]} />
      })}
      <Button variant="secondary" onClick={()=>{}}>
          Cancel
        </Button>
        <Button variant="primary" onClick={()=>{}}>
          Edit
        </Button>
    </Form>
  );
}