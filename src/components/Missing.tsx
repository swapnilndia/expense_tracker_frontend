import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <Container style={{ textAlign: "center", padding: "50px 20px" }}>
      <Typography variant="h3" gutterBottom>
        Oops! Page not found
      </Typography>
      <Box
        component="img"
        src="https://media.istockphoto.com/id/467923438/photo/silly-dog-tilts-head-in-front-of-barn.jpg?s=2048x2048&w=is&k=20&c=H_cR-9-qXOb3jUZWnsWwwzhdpSMnA90C9Fa7qb8dPjs="
        alt="Cute kitten"
        style={{ maxWidth: "600px", height: "auto", margin: "20px 0" }}
      />
      <Typography variant="body1" gutterBottom>
        We can't find the page you're looking for. But here's a cute animal to
        cheer you up!
      </Typography>
      <Button variant="contained" color="primary">
        <Link to={"/"} style={{ fontStyle: "normal" }}>
          {" "}
          Go Back Home
        </Link>
      </Button>
    </Container>
  );
};

export default Missing;
