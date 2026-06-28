import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ProductCard, { ProductItem } from "../product_card/ProductCard";
import SliderButtons from "./SliderButtons";
import { useSwipe } from "@/hooks/useSwipe";

type SliderProps = {
  products: ProductItem[];
  title: string;
};

export default function Slider({ products, title }: SliderProps) {
  const [offset, setOffset] = useState(0);
  const gap = 16;

  const trackRef = useRef<HTMLDivElement>(null);

  const next = () => {
    const track = trackRef.current;
    if (!track) return;

    const card = track.children[0] as HTMLElement;
    const cardWidth = card?.offsetWidth ?? 280;
    const gap = 16;
    const step = cardWidth + gap;
    const containerWidth = track.parentElement?.offsetWidth ?? 0;
    const totalWidth = products.length * step + gap;
    const max = totalWidth - containerWidth;

    setOffset((o) => Math.min(max, o + step));
  };

  const prev = () => {
    const card = trackRef.current?.children[0] as HTMLElement;
    const cardWidth = card?.offsetWidth ?? 280;
    const gap = 16;
    setOffset((o) => Math.max(0, o - cardWidth + gap));
  };
  const swipe = useSwipe({ next, prev });

  return (
    <Box sx={{ width: "100%", py: 4 }}>
      <Typography
        variant="h2"
        sx={{ fontWeight: 700, mb: 3, px: 2, fontSize: "18px" }}
      >
        {title}
      </Typography>

      <Box sx={{ position: "relative" }}>
        <Box
          ref={trackRef}
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: `${gap}px`,
            px: 2,
            pb: 2,
            transform: `translateX(-${offset}px)`,
            transition: "transform 0.35s ease",
            willChange: "transform",
          }}
          {...swipe}
        >
          {products.map((product: ProductItem, index: number) => (
            <Box
              key={product?.url_key || index}
              sx={{
                flexShrink: 0,
                width: {
                  xs: `calc((100vw - 16px) / 1.5)`,
                  md: `calc((100vw - 72px) / 3.5)`,
                },
              }}
            >
              <ProductCard product={product} index={index} />
            </Box>
          ))}
        </Box>

        <SliderButtons prev={prev} next={next} />
      </Box>
    </Box>
  );
}
