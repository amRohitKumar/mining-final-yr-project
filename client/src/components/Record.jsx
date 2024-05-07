import { Paper } from "@mui/material";

const Record = ({ date, dirt, test }) => {
  return (
    <Paper
      elevation={3}
      sx={{ px: 4, py: 1, my: 2, width: "60%", display: "flex" }}
    >
      <h3>{test}</h3>
      <p>{date}</p>
      <p>{dirt}</p>
    </Paper>
  );
};

export default Record;
