import { Grid } from "@mui/material";

import {
  UpvoteGrid,
  UpvoteCard,
  StyledIconButton,
  DeleteButton,
  ReplyButton,
} from "./upvoterMobile.styles";
import { ReactComponent as Plus } from "../../images/icon-plus.svg";
import { ReactComponent as Minus } from "../../images/icon-minus.svg";
import { ReactComponent as Reply } from "../../images/icon-reply.svg";
import { ReactComponent as Delete } from "../../images/icon-delete.svg";

const UpvoterMobile = ({
  user,
  increaseScore,
  decreaseScore,
  currentUser,
  removeCommentHandler,
}) => {
  return (
    <UpvoteGrid
      item
      container
      justifyContent="space-between"
      xs={12}
      sm={0}
      sx={{ display: { xs: "flex", sm: "none" } }}
    >
      <Grid item xs={3}>
        <UpvoteCard>
          <Grid container>
            <Grid item xs={4}>
              <StyledIconButton
                onClick={() => increaseScore(user.id)}
                size="large"
              >
                <Plus />
              </StyledIconButton>
            </Grid>
            <Grid item xs={4}>
              <h3>{user.score}</h3>
            </Grid>
            <Grid item xs={4}>
              <StyledIconButton
                onClick={() => decreaseScore(user.id)}
                size="large"
              >
                <Minus />
              </StyledIconButton>
            </Grid>
          </Grid>
        </UpvoteCard>
      </Grid>
      <Grid item xs={3}>
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
    </UpvoteGrid>
  );
};

export default UpvoterMobile;
