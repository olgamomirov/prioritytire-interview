import { CategoryDetailQuery } from "@/graphql/CategoryDetail.generated";
import currencyFormatter from "@/lib/priceFormatter";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";

export type ProductItem = NonNullable<
  NonNullable<
    NonNullable<
      NonNullable<
        NonNullable<CategoryDetailQuery["categories"]>["items"]
      >[number]
    >["products"]
  >["items"]
>[number];

export type ProductCardProps = {
  product: ProductItem;
  index: number;
};
export default function ProductCard({ product, index }: ProductCardProps) {
  const regularPrice =
    product?.price_range?.minimum_price?.regular_price?.value || 0;
  const finalPrice =
    product?.price_range?.minimum_price?.final_price?.value || 0;

  const currency = currencyFormatter(
    product?.price_range?.minimum_price?.regular_price?.currency,
  );
  const imageUrl = product?.thumbnail?.url || "/placeholder.png";

  return (
    <Link
      href={`/products/${product?.url_key}`}
      passHref
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Box
        sx={{
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            aspectRatio: "1 / 1",
            overflow: "hidden",
            borderRadius: 2,
            bgcolor: "white",
          }}
        >
          <Image
            src={imageUrl}
            alt={product?.thumbnail?.label || product?.name || "thumbnail"}
            fill
            sizes="(max-width: 600px) calc(50vw - 16px), calc((100vw - 48px) / 3)"
            style={{
              objectFit: "contain",
              filter: "brightness(1.03)",
            }}
            loading={index > 2 ? "lazy" : "eager"}
          />
        </Box>

        <Box sx={{ px: 0.5, display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              overflow: "hidden",
              minHeight: 40,
            }}
          >
            {product?.name}
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            {regularPrice !== finalPrice && (
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 700,
                  color: "gray",
                  textDecoration: "line-through",
                }}
              >
                {currency}
                {regularPrice.toFixed(2)}
              </Typography>
            )}
            <Typography variant="body1" sx={{ fontWeight: 700 }}>
              {currency}
              {finalPrice.toFixed(2)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Link>
  );
}
