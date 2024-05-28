import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import MovieNavbar from "../components/MovieNavbar";
import { Button, Container, Modal } from "react-bootstrap";

const Profile = () => {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState({});
  const [modalShown, setModalShown] = useState(false);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    const getAccessToken = localStorage.getItem("accessToken");

    try {
      const response = await axios.get(
        "https://api.dynoacademy.com/test-api/v1/me",
        {
          timeout: 10000,
          headers: {
            Authorization: `Bearer ${getAccessToken}`,
          },
        }
      );
      setUserInfo(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      // console.log(error.response.data.errors[0].message);

      if (error.response) {
        alert(error.response.data.errors[0].message);
      } else {
        alert("Unknown error occured! Try again later.");
      }
    }
  };

  const logoutHandler = () => {
    setModalShown(true);
  };
  return (
    <>
      <MovieNavbar />
      <Container className="mt-4">
        Name : {userInfo.name}
        <br />
        Email : {userInfo.email}
        <br />
        Country : {userInfo.country}
        <br />
        <br />
        <Button
          as="input"
          type="submit"
          value="Logout"
          variant="danger"
          onClick={logoutHandler}
        />
      </Container>

      <Modal
        show={modalShown}
        onHide={() => {
          setModalShown(false);
        }}
      >
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setModalShown(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              localStorage.removeItem("accessToken");
              history.push("/");
            }}
          >
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Profile;
