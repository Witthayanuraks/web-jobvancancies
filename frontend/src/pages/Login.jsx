import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, FloatingLabel, Button } from "react-bootstrap";
import { UserNavbar } from "../components/Navbar";
import { useAuth } from "../middleware/AuthUser";
import Swal from "sweetalert2";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Login = () => {
  const { saveToken, saveUsername, username, token } = useAuth();
  const [data, setData] = useState({
    id_card_number: 0,
    password: "",
  });
  const [goToDasboard, setGotoDasboard] = useState(false);

  const falidationUser = () => (username && token ? (window.location = "/dasboard") : null);

  useEffect(() => {
    falidationUser();
  }, []);

  const setForm = (e) => {
    if (e.target.name == "id_card_number" && e.target.value.length > 8) return;
    setData((pref) => {
      return {
        ...pref,
        [e.target.name]: e.target.value,
      };
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await axios({
        method: "POST",
        url: "/api/login",
        data,
      });

      saveToken(response.data.login_token);
      saveUsername(response.data.name);
      Swal.fire({ text: "Correct KTP number or password", icon: "success" }).then(() => setGotoDasboard(true));
    } catch (error) {
      Swal.fire({ text: "No KTP atau Password salah", icon: "error" });
    }
  };

  if (goToDasboard) return <Navigate to="/dasboard" />;
  return (
    <>
      <UserNavbar id={2} />

      <Container>
        <Row className="d-flex vh-100 justify-content-center align-items-center">
          <Col md={8}>
            <Card>
              <Card.Header className="text-center">
                <h3>login</h3>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={submitForm}>
                  <FloatingLabel controlId="floatingId" label="No KTP" className="mb-3">
                    <Form.Control type="number" placeholder="6356536" name="id_card_number" value={data.id_card_number == 0 ? null : data.id_card_number} onChange={setForm} />
                  </FloatingLabel>
                  <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                    <Form.Control type="password" placeholder="Password" name="password" onChange={setForm} />
                  </FloatingLabel>
                  <Button type="submit" variant="outline-primary">
                    Login
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
