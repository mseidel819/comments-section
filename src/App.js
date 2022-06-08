import "./App.css";
import JobData from "./data.json";
import { Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import Reply from "./components/reply-card/reply-card.component";
import CommentCard from "./components/comment-card/comment-card.component";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [comments, setComments] = useState([]);
  const [commentId, setCommentId] = useState(4);

  useEffect(() => {
    setCurrentUser(JobData.currentUser);
    setComments(JobData.comments);
  }, []);

  // console.log(currentUser);
  // console.log(comments);

  const addCommentHandler = (content, user) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDay();
    const hour = date.getHours();
    const minute = date.getMinutes();

    const newComment = {
      content: content,
      createdAt: `${month}/${day}/${year} at ${hour}:${minute}`,
      id: commentId,
      replies: [],
      score: 0,
      user: user,
    };

    setComments([...comments, newComment]);
    setCommentId(commentId + 1);
  };

  const removeCommentHandler = (currentId) => {
    const filteredComments = comments.filter((comment) => {
      return comment.id !== currentId;
    });

    setComments(filteredComments);
  };

  // const removeReplyHandler = (replyId, replyTo) => {
  //   console.log(replyTo);
  //   console.log(comments);

  //   const targetComment = comments.filter((comment) => {
  //     return comment.user.username === replyTo;
  //   });

  //   const removeTargetComment = comments.filter((comment) => {
  //     return comment.id !== targetComment.id;
  //   });
  //   setComments(removeTargetComment);
  //   console.log(targetComment);
  // const filteredComment = targetComment.replies.filter((reply) => {
  //   return reply.id !== replyId;
  // });

  // setComments([...comments, filteredComment]);
  // };

  return (
    <Container maxWidth="md" sx={{ marginTop: "64px" }}>
      {comments.map((user) => (
        <div key={user.id}>
          <CommentCard
            removeCommentHandler={removeCommentHandler}
            currentUser={currentUser}
            user={user}
            // key={user.id}
          />
          {user.replies.length ? (
            <Grid container>
              <Grid item sm={1}></Grid>
              <Grid item sm={11}>
                {user.replies.map((reply) => (
                  <CommentCard
                    currentUser={currentUser}
                    user={reply}
                    key={reply.id}
                  />
                ))}
              </Grid>
            </Grid>
          ) : null}
        </div>
      ))}

      <Reply user={currentUser} addHandler={addCommentHandler} />
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
