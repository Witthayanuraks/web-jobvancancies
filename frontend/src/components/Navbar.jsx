import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../middleware/AuthUser";
import axios from "axios";
import Swal from "sweetalert2";

export const UserNavbar = ({ id }) => {
  const { removeToken, username, token } = useAuth();

  return (
    <Navbar bg="dark" variant="dark" sticky={id == 2 ? "" : "top"} fixed={id == 2 ? "top" : ""}>
      <Container className="justify-content-between">
        <Navbar.Brand>Job seekers platform</Navbar.Brand>
        <Nav className="ms-auto">
          {username && token ? (
            <>
              <Navbar.Text className="mx-4">{username}</Navbar.Text>
              <Nav.Link
                onClick={async () => {
                  removeToken();
                  try {
                    const response = await axios({ method: "POST", url: "/api/logout", params: { token } });
                    await Swal.fire({ icon: "success", text: response.data.message });
                    window.location.href = "/login";
                  } catch (error) {
                    await Swal.fire({ icon: "error" });
                  }
                }}
              >
                LogOut
              </Nav.Link>
            </>
          ) : (
            <Link className="nav-link" to="/login">
              Login
            </Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};
