import { useEffect, useState } from "react";
import { useAuth } from "../middleware/AuthUser";
import { UserNavbar } from "../components/Navbar";
import { Col, Container, Row, Table } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

const JobVacancies = () => {
  const { token } = useAuth();
  const [data, setData] = useState([]);

  const getVacancies = async () => {
    try {
      const response = await axios({ method: "GET", url: "/api/job_vacancies", params: { token } });
      setData(response.data.vacancies);
    } catch (error) {
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
        <Row className="my-5">
          <Col>
            <h1>Job Vacancies</h1>
          </Col>
        </Row>
        <Row className="my-5">
          <Col>
            <Table striped hover>
              <thead>
                <tr>
                  <th colSpan={3}>
                    <h4 className="text-secondary">List Of Job Vacancies </h4>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((e, i) => (
                  <tr key={i}>
                    <td>
                      <h5>{e.company}</h5>
                      <span className="text-secondary">{e.address}</span>
                    </td>
                    <td>
                      <h5>Avaliable Position (Capacity)</h5>
                      <span className="text-secondary">
                        {e.avaliable_positions.map((e, i) => {
                          return (
                            <span key={i}>
                              {" "}
                              {e.position} ({e.capacity - e.apply_capacity}),
                            </span>
                          );
                        })}
                      </span>
                    </td>
                    <td>
                      <Link className="btn btn-outline-dark" to={"/job-application/" + e.id}>
                        Detail / Apply
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default JobVacancies;
