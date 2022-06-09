import { Grid } from "@mui/material";
import { ReactComponent as Plus } from "../../images/icon-plus.svg";
import { ReactComponent as Minus } from "../../images/icon-minus.svg";
import { ReactComponent as Reply } from "../../images/icon-reply.svg";
import { ReactComponent as Delete } from "../../images/icon-delete.svg";
import julio from "../../images/avatars/image-juliusomo.png";
import amyrobson from "../../images/avatars/image-amyrobson.png";
import maxblagun from "../../images/avatars/image-maxblagun.png";
import ramsesmiron from "../../images/avatars/image-ramsesmiron.png";

import {
  StyledCommentCard,
  UpvoteGrid,
  StyledIconButton,
  UserSpan,
  TimeSpan,
  ReplyButton,
  UpvoteCard,
  DeleteButton,
  YouSpan,
} from "./comment-card.styles";

const CommentCard = ({
  user,
  currentUser,
  removeCommentHandler,
  increaseScore,
  decreaseScore,
}) => {
  return (
    <StyledCommentCard>
      <Grid container columnSpacing={1}>
        <UpvoteGrid item sm={1}>
          <UpvoteCard>
            <StyledIconButton
              onClick={() => increaseScore(user.id)}
              size="large"
            >
              <Plus />
            </StyledIconButton>
            <h3>{user.score}</h3>
            <StyledIconButton
              onClick={() => decreaseScore(user.id)}
              size="large"
            >
              <Minus />
            </StyledIconButton>
          </UpvoteCard>
        </UpvoteGrid>

        <Grid item sm={11}>
          <Grid container justifyContent="space-between">
            <Grid item container alignItems="center" xs={12} sm={10}>
              <img src={amyrobson} alt="user" />
              <UserSpan>{user.user.username}</UserSpan>
              {user.user.username === currentUser.username && (
                <YouSpan>you</YouSpan>
              )}
              <TimeSpan>{user.createdAt}</TimeSpan>
            </Grid>
            <Grid item container justifyContent="end" xs={12} sm={2}>
              {user.user.username === currentUser.username ? (
                <DeleteButton
                  onClick={() => removeCommentHandler(user.id)}
                  variant="text"
                  startIcon={<Delete />}
                >
                  Delete
                </DeleteButton>
              ) : (
                <ReplyButton variant="text" startIcon={<Reply />}>
                  Reply
                </ReplyButton>
              )}
            </Grid>
          </Grid>

          <p>
            {user.replyingTo && <span>@{user.replyingTo}&nbsp;</span>}
            {user.content}
          </p>
        </Grid>
      </Grid>
    </StyledCommentCard>
  );
};

export default CommentCard;
