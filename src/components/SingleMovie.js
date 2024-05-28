import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const SingleMovie = (props) => {
  return (
    <>
      <Col>
        <Card style={{ width: "16rem", minHeight:"720px"}}>
          <Card.Img variant="top" src={props.data.image} style={{height:"300px"}} />
          <Card.Body>
            <Card.Title>{props.data.name}</Card.Title>
            <Card.Text>{props.data.info}</Card.Text>
            <Link to={`/view_movie/${props.data.id}`}>
            <Button style={{ fontWeight: "bold"}} variant="success">View Details</Button>
          </Link>
          </Card.Body>
        </Card>

        {/* <div key={props.data.id}>
          <Link to={`/view_movie/${props.data.id}`}>
            <span style={{ fontWeight: "bold" }}>{props.data.name}</span>
          </Link>
          <br />
          <img
            src={props.data.image}
            alt="Movie Image"
            style={{ height: "100px", width: "100px" }}
          />
          <div>Info : {props.data.info} </div>
          Ratings : {props.data.rating}
          <br />
          <br />
          <br />
        </div> */}
      </Col>
    </>
  );
};

export default SingleMovie;
