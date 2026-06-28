import { useState } from "react";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import useMediaQuery from "@mui/material/useMediaQuery";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";

export type CategoryNode = {
  name?: string | null;
  url_key?: string | null;
  level?: number | null;
  children?: CategoryNode[] | null;
};

type NavigationMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  categories: CategoryNode[];
};

export default function NavigationMenu({
  isOpen,
  onClose,
  categories,
}: NavigationMenuProps) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const [menuStack, setMenuStack] = useState<CategoryNode[][]>([]);
  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  const [titleStack, setTitleStack] = useState<string[]>([]);

  const currentMobileItems =
    menuStack.length > 0 ? menuStack[menuStack.length - 1] : categories;
  const currentTitle =
    titleStack.length > 0 ? titleStack[titleStack.length - 1] : "Shop";
  const isMobileRoot = menuStack.length === 0;

  const activeDesktopPanelsList =
    menuStack.length > 0 ? menuStack : [categories];

  const handleFullClose = () => {
    onClose();
    setTimeout(() => {
      setMenuStack([]);
      setActiveKeys([]);
      setTitleStack([]);
    }, 300);
  };
  const allItem = (
    items: CategoryNode[],
    parentName: string,
    parentKey: string,
  ): CategoryNode[] => [
    {
      name: `All ${parentName}`,
      url_key: parentKey,
      level: items[0]?.level,
      children: [],
    },
    ...items,
  ];
  const handleDownTheMenu = (node: CategoryNode, currentLevelIndex: number) => {
    if (node.children && node.children.length > 0) {
      const childrenWithAll = allItem(
        node.children as CategoryNode[],
        node.name || "",
        node.url_key || "",
      );

      if (isDesktop) {
        const correctMenuStack =
          menuStack.length === 0
            ? [categories]
            : menuStack.slice(0, currentLevelIndex + 1);
        const correctKeys = activeKeys.slice(0, currentLevelIndex);
        const correctTitles = titleStack.slice(0, currentLevelIndex);

        setMenuStack([...correctMenuStack, childrenWithAll]);
        setActiveKeys([...correctKeys, node.url_key || ""]);
        setTitleStack([...correctTitles, node.name || "Submenu"]);
      } else {
        if (menuStack.length === 0) {
          setMenuStack([categories, childrenWithAll]);
          setTitleStack(["Shop", node.name || "Submenu"]);
        } else {
          setMenuStack((prev) => [...prev, childrenWithAll]);
          setTitleStack((prev) => [...prev, node.name || "Submenu"]);
        }
      }
    }
  };

  const handleMobileBackClick = () => {
    if (menuStack.length > 0) {
      setMenuStack((prev) => prev.slice(0, -1));
      setTitleStack((prev) => prev.slice(0, -1));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, currentLevelIndex: number) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setTimeout(() => {
        const columns = document.querySelectorAll("[data-menu-column]");
        const nextColumn = columns[currentLevelIndex + 1];
        const firstButton = nextColumn?.querySelector(
          "button, a",
        ) as HTMLElement;
        firstButton?.focus();
      }, 50);
    }

    if (e.key === "ArrowLeft" && currentLevelIndex > 0) {
      e.preventDefault();
      setTimeout(() => {
        const columns = document.querySelectorAll("[data-menu-column]");
        const prevColumn = columns[currentLevelIndex - 1];
        const activeParent = prevColumn?.querySelector(
          ".Mui-selected",
        ) as HTMLElement;
        activeParent?.focus();
      }, 50);
    }
  };

  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={handleFullClose}
      sx={{
        "& .MuiPaper-root": {
          width: { xs: "80%", md: "auto" },
          component: "nav",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: isDesktop ? "flex-end" : "space-between",
          px: 3,
          py: 1.5,
          borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
          bgcolor: "#ffffff",
        }}
      >
        {!isDesktop && !isMobileRoot && (
          <IconButton
            onClick={handleMobileBackClick}
            aria-label="Go back to previous category"
          >
            <ArrowBackIcon fontSize="small" />
          </IconButton>
        )}

        <Typography
          variant="h6"
          component="h2"
          sx={{ textAlign: "center", display: "block", width: "100%" }}
        >
          {currentTitle}
        </Typography>

        <IconButton
          onClick={handleFullClose}
          aria-label="close menu"
          sx={{ color: "gray" }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "row",
          overflowX: "auto",
          height: "100%",
          px: 2,
          py: 2,
          gap: 1,
        }}
      >
        {isDesktop ? (
          activeDesktopPanelsList.map((panelArray, levelIndex) => {
            return (
              <Box
                key={levelIndex}
                data-menu-column
                sx={{
                  width: "280px",
                  minWidth: "280px",
                  height: "100%",
                  overflowY: "auto",
                  borderRight:
                    levelIndex < activeDesktopPanelsList.length - 1
                      ? "1px solid rgba(0, 0, 0, 0.06)"
                      : "none",
                  px: 1,
                }}
              >
                <List component="nav" disablePadding>
                  {panelArray.map((category, index) => {
                    const hasChildren = Boolean(
                      category.children && category.children.length > 0,
                    );
                    const isSelected =
                      activeKeys[levelIndex] === category.url_key;

                    return (
                      <ListItem
                        key={category.url_key || index}
                        disablePadding
                        sx={{ mb: 0.5, display: "block" }}
                      >
                        <ListItemButton
                          component={Link}
                          href={`/categories/${category.url_key}`}
                          onMouseOver={() =>
                            handleDownTheMenu(category, levelIndex)
                          }
                          onFocus={() =>
                            handleDownTheMenu(category, levelIndex)
                          }
                          onClick={handleFullClose}
                          onKeyDown={(e) => handleKeyDown(e, levelIndex)}
                          selected={isSelected}
                          sx={{
                            py: 1,
                            px: 2,
                            "&.Mui-selected": {
                              bgcolor: "lightgray",
                              fontWeight: 700,
                            },
                          }}
                        >
                          <ListItemText primary={category.name} />
                          {hasChildren && <ChevronRightIcon fontSize="small" />}
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </Box>
            );
          })
        ) : (
          <Box>
            <List key={menuStack.length} component="nav" disablePadding>
              {currentMobileItems?.map((category, index) => {
                const hasChildren = Boolean(
                  category.children && category.children.length > 0,
                );

                return (
                  <ListItem
                    key={category.url_key || index}
                    disablePadding
                    sx={{ mb: 0.5, display: "block" }}
                  >
                    <Link
                      href={
                        hasChildren ? "#" : `/categories/${category.url_key}`
                      }
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <ListItemButton
                        onClick={
                          hasChildren
                            ? () =>
                                handleDownTheMenu(category, menuStack.length)
                            : handleFullClose
                        }
                        sx={{ py: 1.75, px: 2.5, borderRadius: 2 }}
                      >
                        <ListItemText primary={category.name} />
                        {hasChildren && <ChevronRightIcon fontSize="small" />}
                      </ListItemButton>
                    </Link>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}
