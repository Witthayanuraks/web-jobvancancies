import { Container, Row, Col } from "react-bootstrap";
import { UserNavbar } from "../components/Navbar";
import DataFalidation from "../components/DataFalidation";
import DasboardAplication from "../components/DasboardAplication";

const Dasboard = () => {
  return (
    <>
      <UserNavbar />
      <Container>
        <Row className="my-5">
          <Col>
            <h1>Dasboard</h1>
          </Col>
        </Row>
        <DataFalidation />
        <DasboardAplication />
      </Container>
    </>
  );
};

export default Dasboard;
