import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserNavbar } from "../components/Navbar";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../middleware/AuthUser";
import Swal from "sweetalert2";

const JobApplication = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [data, setData] = useState({});
  const [position, setPosition] = useState([]);
  const [checkBox, setChekBox] = useState([]);
  const [message, setMesage] = useState("");

  const handleChekBox = (position) =>
    setChekBox((prev) => {
      if (prev.includes(position)) return prev.filter((selected) => selected !== position);
      else return [...prev, position];
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (checkBox && message) {
      try {
        const response = await axios({ method: "POST", url: "/api/aplication", params: { token }, data: { vacancy_id: id, positions: checkBox, notes: message } });
        Swal.fire({ icon: "success", text: response.data.message }).then(() => (window.location.href = "/dasboard"));
      } catch (error) {
        console.log(error);
        Swal.fire({ icon: "error" });
      }
    }
  };

  const getVacancies = async () => {
    try {
      const response = await axios({ method: "GET", url: "/api/job_vacancies", params: { token, id } });
      setData(response.data.vacancies);
      setPosition(response.data.vacancies.avaliable_positions);
    } catch (error) {
      setData(null);
      console.log(error);
    }
  };

  useEffect(() => {
    getVacancies();
  }, []);

  return (
    <>
      <UserNavbar />

      <Container>
        <Row className="my-5 text-center">
          <Col>
            <h1>{data.company}</h1>
            <span className="text-secondary">{data.address}</span>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <h3>Description</h3>
            <span className="text-secondary">{data.description}</span>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>Select Position</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped border="1" className="text-center">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Position</th>
                  <th>Capacity</th>
                  <th>Aplication / Max</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {position.map((e, i) => {
                  return (
                    <tr key={i}>
                      <td align="center">
                        <Form.Check inline name={e.position} disabled={e.capacity == e.apply_capacity} checked={checkBox.includes(e.position)} onChange={() => handleChekBox(e.position)} />
                      </td>
                      <td>{e.position}</td>
                      <td>{e.capacity}</td>
                      <td>
                        {e.apply_capacity} / {e.capacity}
                      </td>
                      {i === 0 && (
                        <td rowSpan={position.length} align="center" valign="middle">
                          <Button variant="dark" onClick={handleSubmit}>
                            Apply this job
                          </Button>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <span>Notes For Company</span>
          </Col>
        </Row>
        <Row className="mb-5">
          <Col>
            <Form.Control as="textarea" rows={4} placeholder="Job position sparate with , (comma)" onChange={(e) => setMesage(e.target.value)} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default JobApplication;
