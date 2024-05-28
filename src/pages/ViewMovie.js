import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import MovieNavbar from "../components/MovieNavbar";
import { Button, Card, CardBody, Container } from "react-bootstrap";

const ViewMovie = () => {
  const getParams = useParams();
  const getId = getParams.id;

  const [viewMovie, setViewMovie] = useState({});
  const [isLogged, setIsLogged] = useState(false);

  // First useEffect, runs when the compoenent is rendered for the first time only...
  useEffect(() => {
    viewSingleMovie();
  }, []);

  //second useEffect, runs everytime when a component is changed or updated...
  //   useEffect(() => {
  //     console.log("Something was updated!!!");
  //   });

  //Third useEffect, runs each time when the dependencies are updated or changed...
  //   useEffect(() => {
  //     console.log("I am triggered!!");
  //   }, [isLogged, viewMovie]);

  const viewSingleMovie = async () => {
    try {
      const response = await axios.get(
        `https://api.dynoacademy.com/test-api/v1/movie/${getId}`
      );
      setViewMovie(response.data.singleMovieData);
    } catch (error) {
      alert("Error occured!");
    }
  };

  return (
    <>
      {/* <div>
        <button onClick={viewSingleMovie}>View Single Movie Description</button>
        <button
          onClick={() => {
            setIsLogged(true);
          }}
        >
          Check
        </button>
      </div>
      <hr /> */}

      <MovieNavbar />
      <Container className="mt-3">
        <div>
          <h2 className="text-primary">{viewMovie.name}</h2>
          <Card>
            <Card.Body>Movie Info :{viewMovie.info} </Card.Body>
          </Card><br/>
          <Card>
            <Card.Body>Movie Description :{viewMovie.desc} </Card.Body>
          </Card><br/>
          <Card>
            <Card.Body>Movie Ratings :{viewMovie.rating} </Card.Body>
          </Card><br/>
          <Card body>
            Image: <br />
            <img
              src={viewMovie.image}
              alt="Movie Image"
              style={{ height: "200px", width: "200px" }}
            />
          </Card><br/>
          <Link to="/"><Button className="bg-dark mb-5">Go Back</Button></Link>
        </div>
      </Container>
    </>
  );
};

export default ViewMovie;
