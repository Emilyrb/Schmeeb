import { Button, Modal } from "react-bootstrap";
import ActivityCreationForm from "./ActivityCreationForm";

interface Props {
  showAddActivityDialog: boolean;
  setShowAddActivityDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AddActivityDialog(props: Props) {
  const { showAddActivityDialog, setShowAddActivityDialog } = props;
  const handleClose = () => setShowAddActivityDialog(false);
  const handleSubmit = () => {alert('handle submit')};


  return (
    <Modal show={showAddActivityDialog} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Activity</Modal.Title>
      </Modal.Header>
      <Modal.Body><ActivityCreationForm/></Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}