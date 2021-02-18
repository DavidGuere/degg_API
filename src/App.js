import "./App.css";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./Components/Auth/Signup";
import Login from "./Components/Auth/Login";
import UserLogged from "./Components/Auth/UserLogged";
import AuthProvider from "./Components/Context/AuthProvider";
import UpdateInfo from "./Components/Auth/UpdateInfo";
import ProtectedRoute from "./Components/Auth/ProtectedRoute";
import PassReset from "./Components/Auth/PassReset";

function App() {
  return (
    <AuthProvider>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Router>
            <Switch>
              <ProtectedRoute exact path="/userhome" component={UserLogged} />
              <ProtectedRoute path="/updateinfo" component={UpdateInfo} />
              <Route path="/Signup" component={Signup} />
              <Route path="/Login" component={Login} />
              <Route path="/password-reset" component={PassReset} />
            </Switch>
          </Router>
        </div>
      </Container>
    </AuthProvider>
  );
}

export default App;
