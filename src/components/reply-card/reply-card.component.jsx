import { Grid, TextField } from "@mui/material";
import { useState } from "react";
import julio from "../../images/avatars/image-juliusomo.png";
import { SendButton, StyledReplyCard } from "./reply-card.styles";

const Reply = ({ user, addHandler }) => {
  const [textField, setTextField] = useState("");

  const textFieldHandler = (e) => {
    const searchFieldString = e.target.value;
    setTextField(searchFieldString);
  };

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
            onChange={textFieldHandler}
            placeholder="Add a comment..."
            value={textField}
          />
        </Grid>
        <Grid item sm={2}>
          <SendButton
            onClick={() => {
              addHandler(textField, user);
              setTextField("");
            }}
          >
            SEND
          </SendButton>
        </Grid>
      </Grid>
    </StyledReplyCard>
  );
};

export default Reply;
