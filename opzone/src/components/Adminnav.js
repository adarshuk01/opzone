import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

function Adminnavbar() {
  return (
    <Navbar  bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">OP Zone</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Link</Nav.Link>
            <NavDropdown title="Users" id="navbarScrollingDropdown">
              <NavDropdown.Item className='d-flex align-items-center gap-2'>
  <Link to="/adddoctor"> <span className="material-symbols-outlined">stethoscope_arrow</span>
  Add Doctors</Link>
 
</NavDropdown.Item>
              <NavDropdown.Item className='d-flex align-items-center gap-2' href="/addopstaff">
              <span class="material-symbols-outlined">moving_ministry</span> Add Hospital
              </NavDropdown.Item>
              <NavDropdown.Item className='d-flex align-items-center gap-2' href="#action3"><span class="material-symbols-outlined">vaccines</span>Add Pharmacy
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button href='/login' variant="outline-success">Logout</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Adminnavbar;
