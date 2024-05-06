import { Box, Typography } from "@mui/material";
import BGImg from "@/assets/conveyor_belt.jpeg";

const History = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
        position: "relative",
        py: "2em",
      }}
    >
      <Box
        sx={{
          color: "white",
        }}
      >
        <Typography variant="h2" mb="0.5em" fontWeight="bold">
          Past Records
        </Typography>
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "60dvh",
          width: "100%",
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%), url(${BGImg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          zIndex: "-1",
        }}
      />
    </Box>
  );
};
export default History;
