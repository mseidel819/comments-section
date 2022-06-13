import { Grid, Box } from "@mui/material";
import { useState } from "react";
import { ReactComponent as ReplyIcon } from "../../images/icon-reply.svg";
import { ReactComponent as Delete } from "../../images/icon-delete.svg";
import juliusomo from "../../images/avatars/image-juliusomo.png";
import amyrobson from "../../images/avatars/image-amyrobson.png";
import maxblagun from "../../images/avatars/image-maxblagun.png";
import ramsesmiron from "../../images/avatars/image-ramsesmiron.png";
import UpvoterMain from "../upvoter/upvoterMain.component";
import UpvoterMobile from "../upvoter/upvoterMobile.component";
import Reply from "../reply-card/reply-card.component";

import {
  StyledCommentCard,
  UserSpan,
  TimeSpan,
  ReplyButton,
  DeleteButton,
  YouSpan,
} from "./comment-card.styles";

const CommentCard = ({
  user,
  currentUser,
  removeCommentHandler,
  increaseScore,
  decreaseScore,
  addCommentHandler,
  addReplyHandler,
}) => {
  const [replyActive, setReplyActive] = useState(false);

  const replyToggler = () => setReplyActive(!replyActive);

  const userObj = {
    juliusomo: juliusomo,
    amyrobson: amyrobson,
    maxblagun: maxblagun,
    ramsesmiron: ramsesmiron,
  };

  return (
    <Grid container>
      <Grid item>
        <StyledCommentCard>
          <Grid container columnSpacing={1}>
            <UpvoterMain
              user={user}
              increaseScore={increaseScore}
              decreaseScore={decreaseScore}
            />

            <Grid item container sm={11}>
              <Grid item container justifyContent="space-between">
                <Grid item container alignItems="center" xs={12} sm={10}>
                  <img src={userObj[user.user.username]} alt="user" />
                  <UserSpan>{user.user.username}</UserSpan>
                  {user.user.username === currentUser.username && (
                    <YouSpan>you</YouSpan>
                  )}
                  <TimeSpan>{user.createdAt}</TimeSpan>
                </Grid>
                <Grid
                  item
                  container
                  justifyContent="end"
                  sx={{ display: { xs: "none", sm: "flex" } }}
                  xs={0}
                  sm={2}
                >
                  {user.user.username === currentUser.username ? (
                    <DeleteButton
                      onClick={() => removeCommentHandler(user.id)}
                      variant="text"
                      startIcon={<Delete />}
                    >
                      Delete
                    </DeleteButton>
                  ) : (
                    <ReplyButton
                      onClick={replyToggler}
                      variant="text"
                      startIcon={<ReplyIcon />}
                    >
                      Reply
                    </ReplyButton>
                  )}
                </Grid>
              </Grid>
              <Box sx={{ minWidth: "500px" }}>
                <p>
                  {user.replyingTo && <span>@{user.replyingTo}&nbsp;</span>}
                  {user.content}
                </p>
              </Box>
            </Grid>
            <UpvoterMobile
              removeCommentHandler={removeCommentHandler}
              user={user}
              increaseScore={increaseScore}
              decreaseScore={decreaseScore}
              currentUser={currentUser}
            />
          </Grid>
        </StyledCommentCard>
      </Grid>
      {replyActive && (
        <Grid item xs={12} sx={{ marginBottom: "20px" }}>
          <Reply
            currentUser={currentUser}
            user={user}
            addHandler={addReplyHandler}
            sendReply="Reply"
          />
        </Grid>
      )}
    </Grid>
  );
};

export default CommentCard;
