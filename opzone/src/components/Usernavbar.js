import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Usernavbar() {
  const userid= localStorage.getItem('userId')
  const logoutfunc=()=>{
    localStorage.removeItem('userId');
    localStorage.removeItem('bookedDoctorId');
    localStorage.removeItem('token');
  }

  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary sticky-top">
      <Container fluid>
        <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/">Link</Nav.Link>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
          </Nav>
          <Form className="d-flex gap-2">
          {userid ? (
          <Button onClick={handleLogout} variant="success">Logout</Button>
        ) : (
          <Link to="https://opzone-frontend.onrender.com/register">
            <Button variant="success">Register/Login</Button>
          </Link>
        )} 
          
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Usernavbar;
