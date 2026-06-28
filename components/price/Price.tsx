import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { StrikethroughPrice } from "./Price.styles";

type Price = {
  regularPrice: number | null;
  finalPrice: number | null;
  currency: string | null;
};

export default function Price({ regularPrice, finalPrice, currency }: Price) {
  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      {regularPrice !== finalPrice && (
        <StrikethroughPrice variant="overline">
          {currency}
          {regularPrice?.toFixed(2)}
        </StrikethroughPrice>
      )}
      <Typography
        variant="overline"
        sx={{
          fontWeight: 700,
          mt: 0.5,
          fontSize: "1.5rem",
          lineHeight: "normal",
        }}
      >
        {currency}
        {finalPrice?.toFixed(2)}
      </Typography>
    </Box>
  );
}
