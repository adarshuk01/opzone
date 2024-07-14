import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown, Form, Button } from 'react-bootstrap';

function Adminnavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">OP Zone</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <Nav.Link as={Link} to="/home">Home</Nav.Link>
            <Nav.Link as={Link} to="/link">Link</Nav.Link>
            <NavDropdown title="Users" id="navbarScrollingDropdown">
              <NavDropdown.Item>
                <Link to="/adddoctor" className="d-flex align-items-center gap-2">
                  <span className="material-symbols-outlined">stethoscope_arrow</span>
                  Add Doctors
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/addopstaff" className="d-flex align-items-center gap-2">
                  <span className="material-symbols-outlined">moving_ministry</span>
                  Add Hospital
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/addpharmacy" className="d-flex align-items-center gap-2">
                  <span className="material-symbols-outlined">vaccines</span>
                  Add Pharmacy
                </Link>
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
            <Button as={Link} to="/login" variant="outline-success">Logout</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Adminnavbar;
