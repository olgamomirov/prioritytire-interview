import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

type SliderButtonProps = {
  prev: () => void;
  next: () => void;
};

export default function SliderButtons({ prev, next }: SliderButtonProps) {
  return (
    <>
      <IconButton
        onClick={prev}
        size="small"
        sx={{
          position: "absolute",
          left: 8,
          top: "50%",
          transform: "translateY(-50%)",
          bgcolor: "rgba(255,255,255,0.85)",
          "&:hover": { bgcolor: "white" },
          zIndex: 1,
        }}
        aria-label="previous image"
      >
        <ChevronLeftIcon />
      </IconButton>

      <IconButton
        onClick={next}
        size="small"
        sx={{
          position: "absolute",
          right: 8,
          top: "50%",
          transform: "translateY(-50%)",
          bgcolor: "rgba(255,255,255,0.85)",
          "&:hover": { bgcolor: "white" },
          zIndex: 1,
        }}
        aria-label="next image"
      >
        <ChevronRightIcon />
      </IconButton>
    </>
  );
}
