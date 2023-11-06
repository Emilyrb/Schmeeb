import { Navbar, Container, Row }  from 'react-bootstrap';
import { ActivityCardsContent } from './Components/ActivityCardsContent';
import { useState } from 'react';
import { AddExpenseDialog } from './Components/AddExpenseDialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { FetchActivityDTO } from './api/fetchActivities';
import { ActivityCreationForm} from './Components/ActivityCreationForm';

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  float: right;
  color: green;
  position: absolute;
  bottom: 20px;
  right: 50px;

  &:hover {
    cursor: pointer;
  }
  &:active {
    color: darkgreen;
  }
`;

function App() {
  const [ addExpenseDialog, setAddExpenseDialog ] = useState<null | FetchActivityDTO>(null);
  const [ showAddActivityDialog, setShowAddActivityDialog ] = useState(false);
  
  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
        crossOrigin="anonymous"
      />
      <Navbar bg="dark" data-bs-theme="dark" className="justify-content-center">
        <Container>
          <Navbar.Brand href="#">SCHMEEEEB</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <Row><ActivityCardsContent setAddExpenseDialog={setAddExpenseDialog} /></Row>
        <StyledFontAwesomeIcon icon={faCirclePlus} style={{color: "#4ca6ff"}} onClick={() => {setShowAddActivityDialog(true)}} size={'4x'}/>
      </Container>
      {addExpenseDialog && <AddExpenseDialog addExpenseDialog={addExpenseDialog} setAddExpenseDialog={setAddExpenseDialog}/>}
      {showAddActivityDialog && <ActivityCreationForm showAddActivityDialog={showAddActivityDialog} setShowAddActivityDialog={setShowAddActivityDialog}/>}
    </div>
  );
}

export default App;
