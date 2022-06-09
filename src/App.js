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

  const increaseScore = (commentId) => {
    const newComments = comments.map((comment) => {
      return comment.id === commentId
        ? { ...comment, score: comment.score + 1 }
        : comment;
    });
    setComments(newComments);
  };
  const decreaseScore = (commentId) => {
    const newComments = comments.map((comment) => {
      return comment.id === commentId
        ? { ...comment, score: comment.score - 1 }
        : comment;
    });

    setComments(newComments);
  };

  const increaseScoreReply = (replyId) => {
    let targetComment = comments.find((comment) =>
      comment.replies.find((reply) => reply.id === replyId)
    );

    targetComment = {
      ...targetComment,
      replies: targetComment.replies.map((comment) => {
        return comment.id === replyId
          ? { ...comment, score: comment.score + 1 }
          : comment;
      }),
    };

    setComments([
      ...comments.filter((comment) => comment.id !== targetComment.id),
      targetComment,
    ]);
  };

  const decreaseScoreReply = (replyId) => {
    let targetComment = comments.find((comment) =>
      comment.replies.find((reply) => reply.id === replyId)
    );

    targetComment = {
      ...targetComment,
      replies: targetComment.replies.map((comment) => {
        return comment.id === replyId
          ? { ...comment, score: comment.score - 1 }
          : comment;
      }),
    };

    setComments([
      ...comments.filter((comment) => comment.id !== targetComment.id),
      targetComment,
    ]);
  };

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

  const removeReplyHandler = (replyId) => {
    let targetComment = comments.find((comment) =>
      comment.replies.find((reply) => reply.id === replyId)
    );

    targetComment = {
      ...targetComment,
      replies: targetComment.replies.filter((reply) => reply.id !== replyId),
    };

    setComments([
      ...comments.filter((comment) => comment.id !== targetComment.id),
      targetComment,
    ]);
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: "64px" }}>
      {comments
        .sort((a, b) => {
          return b.score - a.score;
        })
        .map((user) => (
          <div key={user.id}>
            <CommentCard
              removeCommentHandler={removeCommentHandler}
              currentUser={currentUser}
              user={user}
              increaseScore={increaseScore}
              decreaseScore={decreaseScore}
            />
            {user.replies.length ? (
              <Grid container>
                <Grid item sm={1}></Grid>
                <Grid item sm={11}>
                  {user.replies.map((reply) => (
                    <CommentCard
                      currentUser={currentUser}
                      user={reply}
                      key={`reply${reply.id}`}
                      removeCommentHandler={removeReplyHandler}
                      increaseScore={increaseScoreReply}
                      decreaseScore={decreaseScoreReply}
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
