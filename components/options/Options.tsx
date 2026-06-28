import { useState } from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { isColor } from "@/lib/isColor";

type OptionsProps = {
  label: string | null | undefined;
  values: (Option | null)[] | null | undefined;
};

export type Option = {
  label: string | null;
  swatch_data?: SwatchData;
};
type SwatchData =
  | { value: string | null; thumbnail?: never }
  | { value: string | null; thumbnail: string | null }
  | null;

export default function Options({ label, values }: OptionsProps) {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  if (!label) return null;

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="overline" component="div">
        {label}
      </Typography>

      <Box
        role="radiogroup"
        aria-label={label}
        sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}
      >
        {values?.map((val) => {
          if (!val || !val.label) return null;

          const isSelected = selectedValue === val.label;
          const isCol = isColor(val?.swatch_data?.value || "");
          const isImageOrColor = val?.swatch_data?.thumbnail || isCol;

          return (
            <ButtonBase
              key={val.label}
              component="label"
              sx={{
                width: "calc(50% - 4px)",
                borderWidth: isSelected ? 2 : 1,
                borderStyle: "solid",
                borderColor: isSelected ? "black" : "lightgray",
                borderRadius: 1,
                display: "flex",
                padding: 1,
                justifyContent: "flex-start",
                cursor: "pointer",
                "&:focus-within": {
                  outline: "2px solid black",
                  outlineOffset: "2px",
                },
                "&:hover": {
                  borderColor: isSelected ? "black" : "lightGray",
                },
              }}
              tabIndex={-1}
            >
              <input
                type="radio"
                name={label}
                value={val.label}
                required
                checked={isSelected}
                onChange={() => setSelectedValue(val.label)}
                style={{
                  position: "absolute",
                  opacity: 0,
                }}
              />

              <Box
                sx={{
                  display: "flex",
                  flexDirection: isImageOrColor ? "row" : "column",
                  alignItems: isImageOrColor ? "center" : "start",
                  gap: isImageOrColor ? 1 : 0,
                }}
              >
                {val?.swatch_data?.thumbnail ? (
                  <Image
                    src={val?.swatch_data?.thumbnail}
                    alt={val?.label || "Option button"}
                    width={35}
                    height={35}
                    style={{ borderRadius: "50%" }}
                  />
                ) : isCol ? (
                  <Box
                    sx={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                      backgroundColor: val?.swatch_data?.value,
                    }}
                  />
                ) : (
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                    {val?.swatch_data?.value}
                  </Typography>
                )}
                <Typography variant="caption">{val?.label}</Typography>
              </Box>
            </ButtonBase>
          );
        })}
      </Box>
    </Box>
  );
}
