import { Button, Modal } from "react-bootstrap";

interface Props {
  addExpenseDialog: string;
  setAddExpenseDialog: React.Dispatch<React.SetStateAction<null | string>>;
}

export function AddExpenseDialog(props: Props) {
  const { addExpenseDialog, setAddExpenseDialog } = props;
  const handleClose = () => setAddExpenseDialog(null);

  return (
    <Modal show={addExpenseDialog !== null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add expense</Modal.Title>
      </Modal.Header>
      <Modal.Body>form goes here, activity id is: {addExpenseDialog}</Modal.Body>
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