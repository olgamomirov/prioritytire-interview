import { useState, useEffect } from "react";
import currencyFormatter from "@/lib/priceFormatter";
import Price from "./Price";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

type LivePriceProps = {
  slug: string;
  fallbackPrice: number;
};

export default function LivePrice({ slug, fallbackPrice }: LivePriceProps) {
  const [regularPrice, setRegularPrice] = useState<number | null>(null);
  const [finalPrice, setFinalPrice] = useState<number | null>(null);

  const [currency, setCurrency] = useState<string | null>(null);
  const formattedCurrency = currencyFormatter(currency);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchFreshPrice() {
      try {
        setLoading(true);
        const res = await fetch(`/api/get-price?slug=${slug}`);
        const data = await res.json();
        const regularPrice = data?.livePrice?.regularPrice;
        const finalPrice = data?.livePrice?.finalPrice;
        const currency = data?.currency;

        if (regularPrice) setRegularPrice(regularPrice);
        if (finalPrice) setFinalPrice(finalPrice);
        if (currency && (regularPrice || finalPrice)) setCurrency(currency);
      } catch (err) {
        console.error("Failed to fetch prices:", err);
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchFreshPrice();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (error) {
    return (
      <Typography variant="h4">
        {formattedCurrency}
        {fallbackPrice.toFixed(2)}
      </Typography>
    );
  }
  return (
    <Box sx={{ minHeight: 42, display: "flex", alignItems: "center" }}>
      {loading ? (
        <Skeleton width={100} height={42} />
      ) : (
        <Price
          regularPrice={regularPrice}
          finalPrice={finalPrice}
          currency={formattedCurrency}
        />
      )}
    </Box>
  );
}
