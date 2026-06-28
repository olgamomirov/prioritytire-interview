import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

export default function Seacrh() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Box>
      {isOpen ? (
        <Box
          sx={(theme) => ({
            [theme.breakpoints.down("sm")]: {
              position: "absolute",
              display: "flex",
              justifyContent: "center",
              zIndex: 8,
              right: 0,
              width: "100%",
              backgroundColor: "white",
            },
          })}
        >
          <Box
            component="input"
            type="text"
            name="seacrh-bar"
            aria-label="Search for products"
            aria-live="polite"
            placeholder="Search all products..."
            sx={{
              color: "black",
              fontWeight: 600,
              border: "1px solid gray",
              borderRadius: 1,
              outline: "none",
              background: "transparent",
              fontSize: "1rem",

              MozAppearance: "textfield",
              p: 1,
              "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
                display: "none",
              },
            }}
          />
          <IconButton
            onClick={() => setIsOpen(false)}
            aria-label="Close Search bar"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      ) : (
        <IconButton
          onClick={() => setIsOpen(true)}
          aria-label="Open Search bar"
          aria-expanded={isOpen}
        >
          <SearchIcon />
        </IconButton>
      )}
    </Box>
  );
}
