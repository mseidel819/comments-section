import { Grid, TextField } from "@mui/material";
import julio from "../../images/avatars/image-juliusomo.png";
import { SendButton, StyledReplyCard } from "./reply.styles";

const Reply = ({ user }) => {
  return (
    <StyledReplyCard>
      <Grid container columnSpacing={2}>
        <Grid item sm={1}>
          <img src={julio} alt="current user" />
        </Grid>
        <Grid item sm={9}>
          <TextField
            multiline
            fullWidth
            rows={3}
            placeholder="Add a comment..."
          />
        </Grid>
        <Grid item sm={2}>
          <SendButton>SEND</SendButton>
        </Grid>
      </Grid>
    </StyledReplyCard>
  );
};

export default Reply;
