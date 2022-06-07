import "./App.css";
import JobData from "./data.json";
import { Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import Reply from "./components/reply-card/reply-card.component";
import CommentCard from "./components/comment-card/comment-card.component";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setCurrentUser(JobData.currentUser);
    setComments(JobData.comments);
  }, []);

  console.log(currentUser);
  console.log(comments);

  return (
    <Container maxWidth="md" sx={{ marginTop: "64px" }}>
      {comments.map((user) => (
        <>
          <CommentCard user={user} key={user.id} />
          {user.replies.length ? (
            <Grid container>
              <Grid item sm={1}></Grid>
              <Grid item sm={11}>
                {user.replies.map((reply) => (
                  <CommentCard user={reply} key={reply.id} />
                ))}
              </Grid>
            </Grid>
          ) : null}
        </>
      ))}

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
