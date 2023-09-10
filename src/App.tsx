import { Navbar, Container, Row }  from 'react-bootstrap';
import { ActivityCardsContent } from './Components/ActivityCardsContent';
import { useState } from 'react';
import { AddExpenseDialog } from './Components/AddExpenseDialog';

function App() {
  const [ addExpenseDialog, setAddExpenseDialog ] = useState<null | string>(null);
  
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
      </Container>
      {addExpenseDialog && <AddExpenseDialog addExpenseDialog={addExpenseDialog} setAddExpenseDialog={setAddExpenseDialog}/>}
    </div>
  );
}

export default App;
