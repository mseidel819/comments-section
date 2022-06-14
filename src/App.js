import "./App.css";
import JobData from "./data.json";
import { Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import Reply from "./components/reply-card/reply-card.component";
import CommentCard from "./components/comment-card/comment-card.component";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [comments, setComments] = useState([]);
  const [commentId, setCommentId] = useState(5);

  useEffect(() => {
    setCurrentUser(JobData.currentUser);
    setComments(JobData.comments);
  }, []);

  ///////
  const increaseScore = (commentId) => {
    const newComments = comments.map((comment) => {
      return comment.id === commentId
        ? { ...comment, score: comment.score + 1 }
        : comment;
    });
    setComments(newComments);
  };

  ////////
  const decreaseScore = (commentId) => {
    const newComments = comments.map((comment) => {
      return comment.id === commentId
        ? { ...comment, score: comment.score - 1 }
        : comment;
    });

    setComments(newComments);
  };

  /////////
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

  ////////////
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

  //////////
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

  //////////////
  const addReplyHandler = (content, user, currentUser) => {
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
      replyingTo: user.user.username,
      score: 0,
      user: currentUser,
    };

    if (user.replies) {
      const targetComment = comments.find((comment) => comment.id === user.id);
      targetComment.replies.push(newComment);
      setComments([
        ...comments.filter((comment) => comment.id !== targetComment.id),
        targetComment,
      ]);

      setCommentId(commentId + 1);
    }

    ///add function for if its already a reply. if !targetComment.replies
    if (user.replyingTo) {
      let targetComment = comments.find((comment) =>
        comment.replies.find((reply) => reply.id === user.id)
      );

      targetComment = {
        ...targetComment,
        replies: [...targetComment.replies, newComment],
      };

      setComments([
        ...comments.filter((comment) => comment.id !== targetComment.id),
        targetComment,
      ]);
    }
  };

  ////////////
  const removeCommentHandler = (currentId) => {
    const filteredComments = comments.filter((comment) => {
      return comment.id !== currentId;
    });

    setComments(filteredComments);
  };

  /////////////
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

  const editCommentHandler = (content, user) => {
    // console.log(user);
    const newComment = {
      ...user,
      content: content,
    };

    const targetComment = comments.find((comment) => comment.id === user.id);

    setComments([
      ...comments.filter((comment) => comment.id !== targetComment.id),
      newComment,
    ]);
  };

  ////working here to remove old reply and replace it with the new one
  const editReplyHandler = (content, user, currentUser) => {
    const newComment = {
      ...user,
      content: content,
    };

    if (user.replies) {
      const targetComment = comments.find((comment) => comment.id === user.id);
      console.log(targetComment);
      setComments([
        ...comments.filter((comment) => comment.id !== targetComment.id),
        newComment,
      ]);
    }

    if (user.replyingTo) {
      let targetComment = comments.find((comment) =>
        comment.replies.find((reply) => reply.id === user.id)
      );
      console.log(targetComment);

      targetComment = {
        ...targetComment,
        replies: targetComment.replies.filter((reply) => reply.id !== user.id),
      };

      console.log(newComment);
      setComments([
        ...comments.filter((comment) => comment.id !== targetComment.id),
        newComment,
      ]);
    }
  };
  ///////////////////////////////////////////////
  /////JSX
  ////////////////////////////////////////////////
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
              addCommentHandler={addCommentHandler}
              addReplyHandler={addReplyHandler}
              editCommentHandler={editCommentHandler}
              editReplyHandler={editReplyHandler}
              mainOrSub="main"
            />
            {user.replies.length ? (
              <Grid container>
                <Grid item sm={1}></Grid>
                <Grid item sm={11}>
                  {user.replies.map((reply) => (
                    <CommentCard
                      removeCommentHandler={removeReplyHandler}
                      currentUser={currentUser}
                      user={reply}
                      increaseScore={increaseScoreReply}
                      decreaseScore={decreaseScoreReply}
                      addCommentHandler={addCommentHandler}
                      addReplyHandler={addReplyHandler}
                      editReplyHandler={editReplyHandler}
                      mainOrSub="sub"
                      key={`reply${reply.id}`}
                    />
                  ))}
                </Grid>
              </Grid>
            ) : null}
          </div>
        ))}

      <Reply
        user={currentUser}
        addHandler={addCommentHandler}
        sendReply="Send"
      />
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
