import { Button, Dropdown, DropdownButton, Form, InputGroup } from "react-bootstrap";
import { FetchExpenseDTO } from "../api/fetchExpenses";

interface Props {
  expense: FetchExpenseDTO;
  // setExpenseData
}

export function ExpenseForm(props: Props) {
  const { expense } = props;

  const splitMap: Map<string, number> = new Map(Object.entries(expense.data.split));
  console.log(splitMap);
  const memberList = Array.from(splitMap.keys());
  console.log(memberList);

  return (
    <Form>
      <Form.Group className="mb-3" controlId="form.name">
        <Form.Label>Expense Item</Form.Label>
        <Form.Control type="text" value={expense.data.itemName} />
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
          <Form.Control value={expense.data.price} />
      </InputGroup>
      </Form.Group>
      <Form.Group className="mb-3" controlId="form.paidBy">
        <Form.Label>Paid by</Form.Label>
        <InputGroup className="mb-3">
          <Form.Select defaultValue={expense.data.paidBy}>
            {Array.from(Array(memberList.length), (e, i) => {
              return <option value={i}>{memberList[i]}</option>
            })}
          </Form.Select>
      </InputGroup>
      </Form.Group>
      <Form.Label>Split</Form.Label>
      {Array.from(Array(memberList.length), (e, i) => {
        return <MemberSplitInput name={memberList[i]} split={splitMap.get(memberList[i])!} />
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

function MemberSplitInput(props: {name: string, split: number}) {
  const { name, split } = props;

  return (
    <InputGroup className="mb-3">
    <Form.Control aria-label={name} placeholder={name} value={name} disabled />
    <Form.Control value={split} />
  </InputGroup>
  );
}