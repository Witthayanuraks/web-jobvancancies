import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Row, Table } from "react-bootstrap";
import { useAuth } from "../middleware/AuthUser";
import { Link } from "react-router-dom";

const DataFalidation = () => {
  const { token } = useAuth();
  const [data, setData] = useState({});
  const [validator, setValidator] = useState({});

  const getFalidation = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "/api/validations",
        params: {
          token,
        },
      });
      setData(response.data.validasi);
      setValidator(response.data.validasi.validator);
    } catch (error) {
      setData(null);
      setValidator(null);
    }
  };

  const getClassStatus = (status) => {
    if (status == "pedding") return "text-info";
    else if (status == "accepted") return "text-success";
    else return "text-danger";
  };

  useEffect(() => {
    getFalidation();
  }, []);

  return (
    <>
      <Row className="mb-2">
        <Col>
          <h4 className="text-secondary">My Data Falidation</h4>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Card>
            <Card.Header className="fw-bold">
              <h5>Data Falidation</h5>
            </Card.Header>
            <Card.Body className={data ? "p-0" : ""}>
              {data ? (
                <Table className="m-0" striped hover>
                  <tbody>
                    <tr>
                      <td>Status</td>
                      <td className={getClassStatus(data.status)}>{data.status}</td>
                    </tr>
                    <tr>
                      <td>Job Position</td>
                      <td>{data.job_position}</td>
                    </tr>
                    <tr>
                      <td>Reason Accepted</td>
                      <td>{data.reason_accepted}</td>
                    </tr>
                    <tr>
                      <td>Validator</td>
                      <td>{validator?.name}</td>
                    </tr>
                    <tr>
                      <td>Validator Note</td>
                      <td>{data?.validator_notes}</td>
                    </tr>
                  </tbody>
                </Table>
              ) : (
                <Link to="/request-validation" className="w-100 btn btn-dark">
                  + Request Falidation
                </Link>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DataFalidation;
