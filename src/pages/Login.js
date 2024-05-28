import axios from "axios";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import MovieNavbar from "../components/MovieNavbar";
import { Button, Container, Form, Modal } from "react-bootstrap";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const history = useHistory();

  const [modalShown, setModalShown] = useState(false);
  const [modalText, setModalText] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();

    const loginData = {
      email: email.current.value,
      password: password.current.value,
    };
    try {
      const response = await axios.post(
        "https://api.dynoacademy.com/test-api/v1/login",
        loginData,
        { timeout: 10000 }
      );

      const getAccessToken = response.data.accessToken;
      localStorage.setItem("accessToken", getAccessToken);

      //   alert(response.data.message);
      if (response.data.status === "success") {
        // alert("Logged in successfully!!!");
        setModalText("Logged in successfully, Redirectingggg!!!");
        setModalShown(true);
      }

      setTimeout(() => {
        history.push("/");
      }, 2000);
    } catch (error) {
      // console.log(error.response.data.errors[0].message);

      if (error.response) {
        // alert(error.response.data.errors[0].message);
        setModalText(error.response.data.errors[0].message);
        setModalShown(true);
      } else {
        // alert("Unknown error occured! Try again later.");
        setModalText("Unknown error occured! Try again later.");
        setModalShown(true);
      }
    }
  };
  return (
    <>
      <MovieNavbar />
      <Container className="mt-4">
        <h5>This is the Login Page!</h5>
        <form onSubmit={loginHandler}>
          {/* <h4>Email:</h4>
          <input type="text" placeholder="Email Address" ref={email} /> */}

          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              ref={email}
            />
          </Form.Group>

          {/* <h4>Password:</h4>
          <input type="text" placeholder="Password" ref={password} /> */}

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" ref={password} />
          </Form.Group>
          <br />

          {/* <button>Login</button> */}
          <Button as="input" type="submit" value="Login" variant="secondary" />
        </form>
      </Container>

      <Modal
        show={modalShown}
        onHide={() => {
          setModalShown(false);
        }}
      >
        <Modal.Body>{modalText}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setModalShown(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Login;
