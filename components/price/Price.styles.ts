import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

export const StrikethroughPrice = styled(Typography)({
  fontWeight: 700,
  marginTop: 4,
  color: "gray",
  textDecoration: "line-through",
  fontSize: "1.5rem",
  lineHeight: "normal",
});
