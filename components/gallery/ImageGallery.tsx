import { useState, useRef, useCallback } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Image from "next/image";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import SliderButtons from "../slider/SliderButtons";
import { useSwipe } from "@/hooks/useSwipe";
import ButtonBase from "@mui/material/ButtonBase";

type Images = {
  url: string;
  label: string;
};
type ImageGalleryProps = {
  images: Images[];
};
export default function ImageGallery({ images }: ImageGalleryProps) {
  const [index, setIndex] = useState(0);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + images.length) % images.length),
    [images.length],
  );
  const next = useCallback(
    () => setIndex((i) => (i + 1) % images.length),
    [images.length],
  );

  const swipe = useSwipe({ next, prev });

  return (
    <Box
      sx={{
        width: { xs: "100%", md: "70%" },
        aspectRatio: "1/1.2",
        height: { xs: "60vh", md: "90vh" },
        position: "relative",
        userSelect: "none",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          bgcolor: "transparent",
          filter: "brightness(1.03)",
        }}
        {...swipe}
      >
        {images.map((img, i) => (
          <Image
            key={img.url}
            fill
            sizes="(min-width: 960px) 70vw, 100vw"
            src={img.url}
            alt={img.label}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
              opacity: i === index ? 1 : 0,
              pointerEvents: "none",
            }}
            priority={i === 0}
            quality={75}
          />
        ))}

        <SliderButtons prev={prev} next={next} />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 1,
          mt: 1.5,
          position: "absolute",
          margin: "auto",
          width: "100%",
          bottom: "-20px",
        }}
      >
        {images.map((_, i) => {
          const isSelected = i === index;

          return (
            <ButtonBase
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={isSelected ? "true" : "false"}
              sx={{
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                transition: "all 0.2s ease",
                "&:focus-visible": {
                  outline: "1px solid black",
                  outlineOffset: "2px",
                },
              }}
            >
              <Box
                component="span"
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor: isSelected ? "black" : "gray",
                }}
              />
            </ButtonBase>
          );
        })}
      </Box>
    </Box>
  );
}
