import axios from "axios";
import { useRef } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import MovieNavbar from "../components/MovieNavbar";
import { Button, Container, Form } from "react-bootstrap";

const AddMovie = () => {
  const history = useHistory();
  const movie_name_reference = useRef();
  const rating_reference = useRef();
  const description_reference = useRef();

  const AddMovieHandler = async (e) => {
    e.preventDefault();

    const movieData = {
      movie_name: movie_name_reference.current.value,
      rating: rating_reference.current.value,
      description: description_reference.current.value,
    };

    try {
      const response = await axios.post(
        "https://api.dynoacademy.com/test-api/v1/movies",
        movieData,
        { timeout: 10000 }
      );
      alert(response.data.message);
      history.replace("/");
    } catch (error) {
      // console.log(error.response.data.errors[0].message);

      if (error.response) {
        alert(error.response.data.errors[0].message);
      } else {
        alert("Unknown error occured! Try again later.");
      }
    }
  };

  return (
    <>
      <MovieNavbar />
      <Container className="mt-4">
        <h3>Fill to add a movie:</h3>
        <form onSubmit={AddMovieHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Movie Name</Form.Label>
            <Form.Control type="text" ref={movie_name_reference} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Movie Rating</Form.Label>
            <Form.Control type="number" ref={rating_reference} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Movie Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter your movie description..."
              ref={description_reference}
              style={{ height: "100px" }}
            />
          </Form.Group>

          <Button
            as="input"
            type="submit"
            value="Add movie"
            variant="success"
          />
        </form>
      </Container>
    </>
  );
};

export default AddMovie;
