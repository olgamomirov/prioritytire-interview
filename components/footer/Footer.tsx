import BottomNavigation from "@mui/material/BottomNavigation";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import Link from "next/link";
type SocialValues = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ComponentType<{ sx?: any; fontSize?: any }>;
  url: string;
  brandColor: string;
};
const SOCIAL_VALUES: Record<string, SocialValues> = {
  LinkedIn: {
    icon: LinkedInIcon,
    url: "https://linkedin.com",
    brandColor: "#0A66C2",
  },
  Facebook: {
    icon: FacebookIcon,
    url: "https://facebook.com",
    brandColor: "#1877F2",
  },
  Twitter: {
    icon: TwitterIcon,
    url: "https://twitter.com",
    brandColor: "#1DA1F2",
  },
  Instagram: {
    icon: InstagramIcon,
    url: "https://instagram.com",
    brandColor: "#E1306C",
  },
};
export default function Footer() {
  const socials = ["LinkedIn", "Facebook", "Twitter", "Instagram"];
  return (
    <Box
      component={"footer"}
      sx={{ display: "flex", flexDirection: "column", py: 2 }}
    >
      <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
        {socials.map((platform) => {
          const social = SOCIAL_VALUES[platform];
          if (!social) return null;

          const IconComponent = social.icon;

          return (
            <IconButton
              key={platform}
              component="a"
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit our ${platform} profile`}
            >
              <IconComponent fontSize="medium" />
            </IconButton>
          );
        })}
      </Box>
      <Box sx={{ display: "flex", gap: 4 }}>
        <Link href={"/about-us"} style={{ textDecoration: "underline" }}>
          About us
        </Link>
        <Link
          href={"/terms-and-conditions"}
          style={{ textDecoration: "underline" }}
        >
          Terms and Conditions
        </Link>
      </Box>
    </Box>
  );
}
