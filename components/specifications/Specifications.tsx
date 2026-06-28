import List from "@mui/material/List";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";

type SpecificationsItem = {
  name: string;
  values: string[];
};
type SpecificationsProps = {
  specs: SpecificationsItem[];
};
export default function Specifications({ specs }: SpecificationsProps) {
  return (
    <Box>
      <Typography
        variant="overline"
        sx={{
          display: "block",
          borderBottom: "1px solid lightgray",
        }}
      >
        Product Specifications
      </Typography>
      <List>
        {specs.map((spec) => (
          <ListItem
            key={spec.name}
            sx={{ alignItems: "flex-start", gap: 8, p: 0 }}
          >
            <Box>{spec.name}</Box>
            <Box>
              {spec.values?.map((v, index) => (
                <Typography
                  component={"span"}
                  variant="body1"
                  key={`${v}_${index}`}
                  sx={{ display: "block" }}
                >
                  {v}
                </Typography>
              ))}
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
