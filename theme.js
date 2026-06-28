import { createTheme } from "@mui/material/styles";
let theme = createTheme();
theme = createTheme({
  palette: {
    background: {
      default: "#f9f9fa",
    },
  },
  typography: {
    h1: {
      fontSize: "28px",
      fontWeight: 700,
      lineHeight: 1.55,
      [theme.breakpoints.up("md")]: {
        fontSize: "48px",
      },
    },
    h3: {
      fontSize: "22px",
      fontWeight: 700,
      lineHeight: 1.55,
    },
  },
});

export default theme;
