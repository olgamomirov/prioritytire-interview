import { useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import LivePrice from "../price/LivePrice";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

type AtcProps = {
  price: number;
  slug: string;
};
export default function Atc({ price, slug }: AtcProps) {
  const [quantity, setQuantity] = useState<number>(1);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    if (val) {
      setQuantity(val);
    } else if (e.target.value === "") {
      setQuantity(1);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mt: 3,
        maxWidth: 300,
      }}
    >
      <Box sx={{ display: "flex", gap: 2 }}>
        <Box
          role="group"
          aria-label="Product Quantity Selector"
          sx={{
            display: "flex",
            alignItems: "center",
            border: "1px solid lightgray",
            borderRadius: 1,
            width: "fit-content",
            bgcolor: "background.paper",
            "&:focus-within": {
              outline: "2px solid black",
              outlineOffset: "2px",
            },
          }}
        >
          <IconButton
            size="small"
            onClick={handleDecrement}
            aria-label="Decrease quantity by 1"
            disabled={quantity <= 1}
          >
            <RemoveIcon fontSize="small" />
          </IconButton>

          <Box
            component="input"
            type="number"
            name="quantity"
            value={quantity}
            onChange={handleInputChange}
            aria-label="Increase quantity by custom number"
            aria-live="polite"
            sx={{
              color: "black",
              width: 50,
              textAlign: "center",
              fontWeight: 600,
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: "1rem",
              MozAppearance: "textfield",
              "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
                display: "none",
              },
            }}
          />

          <IconButton
            size="small"
            onClick={handleIncrement}
            aria-label="Increase quantity by 1"
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>
        <LivePrice slug={slug} fallbackPrice={price} />
      </Box>
      <Button
        type="submit"
        variant="contained"
        sx={{
          bgcolor: "black",
          color: "white",
          py: 1.5,
          fontWeight: 600,
          textTransform: "unset",
          borderRadius: 6,
          "&:hover": { bgcolor: "black" },
        }}
      >
        Add To Cart
      </Button>
    </Box>
  );
}
