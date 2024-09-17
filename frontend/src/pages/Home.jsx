import { Col, Container, Row } from "react-bootstrap";
import { UserNavbar } from "../components/Navbar";

import job from "../assets/job.png";

const Home = () => {
  return (
    <>
      <UserNavbar id={2}/>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={5}>
            <img src={job} alt="job" width={300} height={300} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
