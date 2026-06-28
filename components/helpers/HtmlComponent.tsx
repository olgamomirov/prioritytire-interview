/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";

type HtmlComponentPros = {
  html: string;
};
export default function HtmlComponent({ html }: HtmlComponentPros) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <Typography
      component="div"
      variant="body1"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
