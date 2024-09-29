import { useEffect, useState } from "react";
import { Badge, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import useAuthStore from "../store/authStore";
import { FaBell, FaUser } from "react-icons/fa";
import axios from "axios";

export default function Header() {
  const { username, isAuthenticated,isAdmin ,logout,companyName,companyLogo } = useAuthStore();
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

   // Polling function to fetch notifications every 30 seconds
   useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Replace with your API endpoint for fetching notifications
        const {data} = await axios.get("/api/notifications/notify");
  
        setNotifications(data);
        setNotificationCount(data.length);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    // Fetch notifications immediately on mount
    fetchNotifications();

    // Poll every 30 seconds
    const interval = setInterval(fetchNotifications, 10000);

    // Clear interval on unmount
    return () => clearInterval(interval);
  }, []);


  const logoutHandler = () => {
    logout();
  };
  return (
    <>
      <Navbar bg="body-tertiary" variant="light" expand="lg" collapseOnSelect>
        <Container fluid='xxl'>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={companyLogo} alt="Logo" width="60" height="60" />
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/packageList">
                <Nav.Link>Our Packages</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/enroll">
                <Nav.Link>Enrollment</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/enrollstatus">
                <Nav.Link>Status</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/mocktest">
                <Nav.Link>Mock Test</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/resource">
                <Nav.Link>Resources</Nav.Link>
              </LinkContainer>


              <LinkContainer to="/aboutus">
                <Nav.Link>About us</Nav.Link>
              </LinkContainer>
            </Nav>
          
            <Nav className="ms-auto ">

            {/* Notifications Dropdown */}
            <NavDropdown align="end"
                    title={
                      <>
                      {/* Bell icon with animation */}
                      <div className={`notification-icon ${notificationCount > 0 ? 'animate-bell' : ''}`}>
                        <FaBell />{" "}
                        {notificationCount > 0 && (
                          <Badge bg="danger">{notificationCount}</Badge>
                        )}
                      </div>
                    </>
                    }
                    id="notifications-dropdown"
                  >
                    {notifications.length > 0 ? (
                      notifications.map((notification, index) => (
                        <NavDropdown.Item key={index}>
                          {notification.message} 
                        </NavDropdown.Item>
                      ))
                    ) : (
                      <NavDropdown.Item>No Notifications</NavDropdown.Item>
                    )}
                  </NavDropdown>



            {isAuthenticated ? (
                <>
                  <NavDropdown title={username} id='username' align="end">
                    {/* <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer> */}
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <FaUser /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}

            {
              isAdmin && (

                

                <NavDropdown title="Admin Screens" id="adminmenu" align="end"> 
                <LinkContainer to="/admin/dashboard">
                    <NavDropdown.Item>Dashboard</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/packagelist">
                    <NavDropdown.Item>Training Package List</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/enrolllist">
                    <NavDropdown.Item>Enrollments</NavDropdown.Item>
                  </LinkContainer>

                  

                  <LinkContainer to="/admin/questioneditlist">
                    <NavDropdown.Item>Mock Test Question</NavDropdown.Item>
                  </LinkContainer>



                  <LinkContainer to="/admin/resourceeditlist">
                    <NavDropdown.Item>Resources List</NavDropdown.Item>
                  </LinkContainer>


                  <LinkContainer to="/admin/notifications">
                    <NavDropdown.Item>Notifications</NavDropdown.Item>
                  </LinkContainer>

                  
                  <LinkContainer to="/admin/systemSetting">
                    <NavDropdown.Item>System Settings</NavDropdown.Item>
                  </LinkContainer>
{/* 

                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                 */}
        
                </NavDropdown>
              )

            }
            </Nav>
          </Navbar.Collapse>

          {/* <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" href="#">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/packageList">Our Packages</Link>
                  </li>


                  <li className="nav-item">
                    <Link className="nav-link" to="/enroll">Enrollment</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/aboutus">About Us</Link>
                  </li>
                </ul>
                <form className="d-flex" role="search">
                  <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                  <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
              </div> */}
        </Container>
      </Navbar>
    </>
  );
}
