import { styled, Button, Card, Grid, IconButton } from "@mui/material";

export const StyledCommentCard = styled(Card)({
  padding: "24px",
  borderRadius: "8px",
  boxShadow: "none",
  marginBottom: "20px",
});

export const UpvoteGrid = styled(Grid)({});
export const UpvoteCard = styled(Card)({
  backgroundColor: "#F5F6FA",
  borderRadius: "10px",
  overflow: "hidden",
  width: "40px",
  boxShadow: "none",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

export const StyledIconButton = styled(IconButton)({
  borderRadius: "0px",
  height: "35px",

  "&:hover": {
    backgroundColor: "#F5F6FA",
  },
});

export const UserSpan = styled("span")({
  fontWeight: "500",
  fontSize: "16px",
  lineHeight: "19px",
  color: "#334253",
  margin: "0 16px",
});

export const TimeSpan = styled("span")({
  fontWeight: "400",
  fontSize: "16px",
  lineHeight: "24px",
  color: "#67727E",
});

export const ReplyButton = styled(Button)({
  fontWeight: "500",
  fontSize: "16px",
  lineHeight: "24px",
  fontFamily: "Rubik",
  fontStyle: "normal",
  textTransform: "none",

  "&:hover": {
    color: "#C5C6EF",
    backgroundColor: "white",
    fill: "#C5C6EF",
  },
});
