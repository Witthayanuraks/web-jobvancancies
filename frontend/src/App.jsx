import { AutUser, AuthProfider, AuthUserLogin } from "./middleware/AuthUser";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
import Dasboard from "./pages/Dasboard";
import RequestValidation from "./pages/RequestValidation";
import JobVacancies from "./pages/JobVacancies";
import JobApplication from "./pages/JobApplication";

function App() {
  return (
    <AuthProfider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <AuthUserLogin>
                <Login />
              </AuthUserLogin>
            }
          />

          <Route
            path="/dasboard"
            element={
              <AutUser>
                <Dasboard />
              </AutUser>
            }
          />
          <Route
            path="/request-validation"
            element={
              <AutUser>
                <RequestValidation />
              </AutUser>
            }
          />
          <Route
            path="/job-vacancies"
            element={
              <AutUser>
                <JobVacancies />
              </AutUser>
            }
          />
          <Route
            path="/job-application/:id"
            element={
              <AutUser>
                <JobApplication />
              </AutUser>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProfider>
  );
}

export default App;
