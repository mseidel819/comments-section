import { Grid, Button, Card } from "@mui/material";
import { ReactComponent as Plus } from "../../images/icon-plus.svg";
import { ReactComponent as Minus } from "../../images/icon-minus.svg";
import { ReactComponent as Reply } from "../../images/icon-reply.svg";
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
} from "./comment-card.styles";

const CommentCard = ({ user }) => {
  console.log(user);
  return (
    <StyledCommentCard>
      <Grid container columnSpacing={1}>
        <UpvoteGrid item sm={1}>
          <UpvoteCard>
            <StyledIconButton size="large">
              <Plus />
            </StyledIconButton>
            <h3>{user.score}</h3>
            <StyledIconButton size="large">
              <Minus />
            </StyledIconButton>
          </UpvoteCard>
        </UpvoteGrid>

        <Grid item sm={11}>
          <Grid container justifyContent="space-between">
            <Grid item container alignItems="center" xs={12} sm={10}>
              <img src={amyrobson} alt="user" />
              <UserSpan>{user.user.username}</UserSpan>
              <TimeSpan>{user.createdAt}</TimeSpan>
            </Grid>
            <Grid item container justifyContent="end" xs={12} sm={2}>
              <ReplyButton variant="text" startIcon={<Reply />}>
                Reply
              </ReplyButton>
            </Grid>
          </Grid>
          <p>{user.content}</p>
        </Grid>
      </Grid>
    </StyledCommentCard>
  );
};

export default CommentCard;
