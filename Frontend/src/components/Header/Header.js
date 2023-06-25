import React from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../actions/user'



function Header() {

  const navigate = useNavigate()
  const dipatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const {userInfo} = userLogin

  const logoutHandler = () => {
    dipatch(logout())
    navigate('/')
  }


  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
      {userInfo ? (
        <>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/home">
                <Link to="/home">Home</Link>
              </Nav.Link>
            </Nav>
            <Nav> 
              <NavDropdown title={userInfo?.name} id="collasible-nav-dropdown">
                <NavDropdown.Item href="/profile">My profile</NavDropdown.Item>
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </>
      ) : (
        <Nav.Link>
          <Link to="/login">Login</Link>
        </Nav.Link>
      )}
    </Container>
  </Navbar>
  
  )
}

export default Header