import "./App.css";
import JobData from "./data.json";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import Reply from "./components/reply/reply.component";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [comments, setComments] = useState({});

  useEffect(() => {
    setCurrentUser(JobData.currentUser);
    setComments(JobData.comments);
  }, []);

  console.log(currentUser);
  console.log(comments);

  return (
    <Container maxWidth="md">
      <Reply user={currentUser} />
      <footer>
        Challenge by &nbsp;
        <a
          href="https://www.frontendmentor.io?ref=challenge"
          target="_blank"
          rel="noreferrer"
        >
          Frontend Mentor
        </a>
        . Coded by &nbsp;
        <a href="https://seidelmatt.com/" target="_blank" rel="noreferrer">
          Matt Seidel
        </a>
        .
      </footer>
    </Container>
  );
}

export default App;
