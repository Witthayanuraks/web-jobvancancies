import { useEffect, useState } from "react";
import { useAuth } from "../middleware/AuthUser";
import { Alert, Card, Col, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const DasboardAplication = () => {
  const { token } = useAuth();
  const [data, setData] = useState("");
  const [aplication, setAplication] = useState(null || {});
  const [position, setPosition] = useState([] || null);
  const [date, setDate] = useState("");

  const getFalidation = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "/api/validations",
        params: { token },
      });
      setData(response.data.validasi.status);
    } catch (error) {
      setData(null);
    }
  };

  const getAplication = async () => {
    try {
      const response = await axios({ method: "GET", url: "/api/aplication", params: { token } });
      const res = response.data.vacancies;

      if (res.length != 0) {
        res.map((e, i) => {
          if (e.position.length != 0) {
            if (i == 0) setDate(e.position[0].date);
            setAplication(e);
            setPosition(e.position);
          }
        });
      } else setAplication(null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAplication();
    getFalidation();
  }, []);

  return (
    <>
      <Row className="justify-content-between my-4">
        <Col>
          <h4 className="text-secondary">My Jop Appications {data}</h4>
        </Col>
        {data == "accepted" && aplication == null && (
          <Col className="d-flex justify-content-end">
            <Link className="btn btn-dark" to="/job-vacancies">
              + Add Job Application
            </Link>
          </Col>
        )}
      </Row>
      {data != "accepted" && (
        <Row className="mt-3">
          <Col>
            <Alert variant="warning">Your data validation must be approved by validators to get the job applying</Alert>
          </Col>
        </Row>
      )}
      {aplication != null && (
        <Row className="mb-5">
          <Col md={4}>
            <Card>
              <Card.Header>
                <h5>{aplication.company}</h5>
              </Card.Header>
              <Card.Body className="p-0">
                <Table className="m-0" striped hover>
                  <tbody>
                    <tr>
                      <td>Address</td>
                      <td>{aplication.address}</td>
                    </tr>
                    <tr>
                      <td>Position</td>
                      <td>
                        <ul>
                          {position.map((e, i) => {
                            let classStatus;
                            if (e.status == "pending") classStatus = "text-info";
                            else if (e.status == "accepted") classStatus = "text-success";
                            else classStatus = "text-danger";
                            return (
                              <li key={i}>
                                <span>{e.avaliable_position.position} </span>
                                <span className={classStatus}>{e.status}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td>Apply Date</td>
                      <td>{date.split("T")[0]}</td>
                    </tr>
                    <tr>
                      <td>Notes</td>
                      <td>{position[0]?.job_apply_society.notes}</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default DasboardAplication;
