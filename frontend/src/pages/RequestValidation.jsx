import { useEffect, useState } from "react";
import { UserNavbar } from "../components/Navbar";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../middleware/AuthUser";
import Swal from "sweetalert2";

const RequestValidation = () => {
  const [jobCategory, setJobCategory] = useState([]);
  const [workExperiences, setWorkExperiences] = useState(true);
  const { token } = useAuth();
  const [data, setData] = useState({
    wrok_experience: "",
    job_category: "",
    job_position: "",
    reason_accepted: "",
  });

  const setForm = (e) =>
    setData((props) => {
      return {
        ...props,
        [e.target.name]: e.target.value,
      };
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (data.job_position && data.job_category && data.reason_accepted) {
      try {
        if (workExperiences) {
          const response = await axios({
            method: "POST",
            url: "/api/validation",
            params: { token },
            data,
          });
          await Swal.fire({ title: response.data.message, icon: "success" }).then((e) => (window.location.href = "/dasboard"));
        } else {
          const response = await axios({
            method: "POST",
            url: "/api/validation",
            params: { token },
            data: { job_category: data.job_category, job_position: data.job_position, reason_accepted: data.reason_accepted },
          });
          await Swal.fire({ title: response.data.message, icon: "success" }).then((e) => (window.location.href = "/dasboard"));
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getJobCategory = async () => {
    try {
      const data = await axios({
        url: "/api/job_vacancies",
        method: "GET",
        params: { token },
      });
      setJobCategory(data.data.vacancies);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getJobCategory();
  }, []);

  return (
    <>
      <UserNavbar />
      <Container>
        <Row className="my-5">
          <Col>
            <h1>Request Data Validation</h1>
          </Col>
        </Row>
        <Form onSubmit={onSubmit}>
          <Row className="justify-content-between mb-3">
            <Col md={5}>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Job Category</Form.Label>
                <Form.Select name="job_category" onChange={setForm}>
                  <option>Choose...</option>
                  {jobCategory.map((e, i) => (
                    <option key={i} value={e.category.job_category}>
                      {e.category.job_category}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={5}>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Work Experiences ?</Form.Label>
                <Form.Select defaultValue={"Yes, I have"} onChange={(e) => setWorkExperiences(e.target.value)}>
                  <option value={false}>Yes, I have</option>
                  <option value={true}>No, I dont have</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-between mb-3">
            <Col md={5}>
              <Form.Control as="textarea" rows={4} placeholder="Job position sparate with , (comma)" name="job_position" onChange={setForm} />
            </Col>
            <Col md={5}>
              <Form.Control as="textarea" rows={4} placeholder="Describe your work experiences" name="wrok_experience" onChange={setForm} />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col md={12}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Reason Accepted</Form.Label>
                <Form.Control as="textarea" rows={4} placeholder="Explain why you should be accepted" name="reason_accepted" onChange={setForm} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button type="submit" variant="outline-dark">
                Send
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default RequestValidation;
