import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

const ViewField = ({ title, value, ...others }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "2em" }}>
      <Typography variant="body">{title}</Typography>
      <Typography variant="body2" {...others}>
        {value}
      </Typography>
    </Box>
  );
};

export default ViewField;
