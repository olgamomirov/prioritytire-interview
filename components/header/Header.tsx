import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import NavigationMenu, { CategoryNode } from "../menu/Menu";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import Link from "next/link";
import ButtonBase from "@mui/material/ButtonBase";
import Seacrh from "../search/Search";
type HeaderProps = {
  categoriesData: CategoryNode[];
};
export default function Header({ categoriesData }: HeaderProps) {
  const { state } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <AppBar
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        bgcolor: "white",
        boxShadow: "none",
        top: 0,
        height: {
          xs: "46px",
          md: "100px",
        },
      }}
      position="sticky"
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Link
          href="/"
          style={{ height: "25px", width: "200px", position: "relative" }}
        >
          <Image
            src="/graphCommerce.svg"
            alt="Store logo"
            fill
            sizes="100vw"
            priority
            style={{ objectFit: "contain" }}
          />
        </Link>
        <Box sx={{ display: "flex", width: "fit-content" }}>
          <IconButton
            edge="start"
            aria-label="menu"
            onClick={() => setIsMenuOpen(true)}
            sx={(theme) => ({
              mr: 2,
              color: "black",
              display: { xs: "inline-flex", sm: "none" },

              [theme.breakpoints.down("sm")]: {
                position: "absolute",
                background: "white",
                left: "2rem",
                top: "90vh",
              },
            })}
          >
            <MenuIcon />
          </IconButton>

          <ButtonBase
            onClick={() => setIsMenuOpen(true)}
            aria-label="Browse categories"
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              color: "black",
              fontWeight: 700,
              gap: 1,
              "&:focus-visible": {
                outline: "2px solid black",
                outlineOffset: "2px",
              },
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 700 }}>
              Shop
            </Typography>
            <ExpandMoreOutlinedIcon fontSize="small" />
          </ButtonBase>
        </Box>

        <NavigationMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          categories={categoriesData}
        />
      </Box>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Seacrh />
        <IconButton aria-label="cart">
          <Badge badgeContent={state.totalQuantity} color="error">
            <ShoppingBagOutlinedIcon />
          </Badge>
        </IconButton>
      </Box>
    </AppBar>
  );
}
