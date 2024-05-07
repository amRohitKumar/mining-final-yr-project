import { Box, Typography } from "@mui/material";
import BGImg from "@/assets/conveyor_belt.jpeg";
import Record from "@/components/Record";
import { recordData } from "@/data/dirtDummy";

const History = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
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
          // backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%), url(${BGImg})`,
          backgroundImage: "linear-gradient(90deg,#fc4a1a,#f7b733)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          zIndex: "-1",
        }}
      />
      {recordData.map((record) => (
        <Record key={record.id} {...record} />
      ))}
    </Box>
  );
};
export default History;
