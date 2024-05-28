import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import MovieNavbar from "../components/MovieNavbar";
import { Container, Form, Row, Spinner } from "react-bootstrap";
import SingleMovie from "../components/SingleMovie";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchErrorText, setSearchErrorText] = useState("");

  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [firstRun, setFirstRun] = useState(true);

  const fetchMovies = async () => {
    //fetch resources...
    setLoading(true);
    setSearchErrorText("");
    console.log("Calling API first!!!");

    try {
      const response = await axios.get(
        `https://api.dynoacademy.com/test-api/v1/movies?search=${searchText}`
      );

      setMovies(response.data.moviesData);
      setIsError(false);
      setLoading(false);
      setFirstRun(false);
    } catch (error) {
      setIsError(true);
      setErrorMsg("Unable to get movie details!!!");
      setLoading(false);
      setFirstRun(false);
    }

    console.log(movies);

    // --- PROMISE CODE ---
    // const promise = new Promise((resolve, reject) => {
    //   const response = axios.get(
    //     "https://api.dynoacademy.com/test-api/v1/movies"
    //   );

    //   resolve(response);
    // });

    // promise
    //   .then((result) => {
    //     console.log(result);
    //     console.log("finished!");
    //   })
    //   .catch((error) => {});
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    if (!firstRun) {
      const fetchTimer = setTimeout(() => {
        if (searchText && searchText.length > 2) {
          fetchMovies();
        } else if (searchText.length < 1) {
          fetchMovies();
        } else {
          setSearchErrorText(
            "Please enter more than two characters to search!!!"
          );
        }
      }, 1800);

      console.log("debouncinggg!!");
      //clean up function
      return () => {
        clearTimeout(fetchTimer);
      };
    }
  }, [searchText]);

  return (
    <div className="App">
      <MovieNavbar />
      {/* <button onClick={fetchMovies}>Get all movies</button> */}
      <Container className="mt-4">
        <Form.Control
          type="text"
          placeholder="Type movie title..."
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <span style={{ color: "red" }}>{searchErrorText}</span>
      </Container>

      <br />
      {loading ? (
        <Container className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Container>
      ) : (
        <></>
      )}
      {isError ? (
        <>
          <div
            style={{
              background: "red",
              color: "white",
              padding: "10px",
              margin: "5px",
            }}
          >
            {errorMsg}
          </div>
        </>
      ) : (
        <>
          <div style={{ background: "yellow", padding: "10px", margin: "5px" }}>
            {!loading && movies.length < 1 ? (
              <>No movies found!</>
            ) : (
              <>
                <Row>
                  {movies.map((el) => (
                    <SingleMovie data={el} />
                  ))}
                </Row>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default Home;
