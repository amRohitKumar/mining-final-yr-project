import Camera from "@/components/Camera";
import { initialState, reducer } from "@/reducers/requestReducer";
import customFetch from "@/utils/axios";
import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import { useCallback, useEffect, useReducer, useRef } from "react";
import { Link } from "react-router-dom";

import { data, THRESHOLD } from "@/data/dirtDummy";

const DirtDetection = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const webcamRef = useRef(null);
  const handleTakeScreenshot = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    return imageSrc;
  }, [webcamRef]);

  useEffect(() => {
    const intervalId = setInterval(
      async () => {
        try {
          dispatch({ type: "SET_LOADING", payload: true });
          const imageUrl = handleTakeScreenshot();
          const { data } = await customFetch.post("/api/detect", {
            image: imageUrl,
          });
          dispatch({ type: "SET_RESPONSE", payload: data });
        } catch (e) {
          console.error(e);
          dispatch({
            type: "SET_ERROR",
            payload: e?.message || "Error while sending request !",
          });
        }
      },
      1 * 60 * 60 * 1000
    ); // 1 hour

    return () => clearInterval(intervalId);
  }, [handleTakeScreenshot]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <Box
        sx={{
          color: "white",
        }}
      >
        <Typography variant="h2" mb="0.5em" fontWeight="bold">
          Belt Conveyor Dirt Detector
        </Typography>
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "60dvh",
          width: "100%",
          backgroundImage: "linear-gradient(90deg,#fc4a1a,#f7b733)",
          zIndex: "-1",
        }}
      />
      <Box sx={{ display: "flex", width: "100%", px: 4 }}>
        <Paper
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            height: "max-content",
            borderRadius: "10px",
            overflow: "hidden",
          }}
          elevation={3}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #ccc",
              padding: "1em",
              backgroundColor: "#000",
              color: "#fff",
            }}
          >
            <Typography variant="body1">DATE</Typography>
            <Typography variant="body1">DIRT LEVEL</Typography>
          </Box>
          {data.slice(0, 5).map((item) => (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #ccc",
                padding: "1em",
                backgroundColor: item.dirt > THRESHOLD ? "#f8d7da" : "#d4edda",
              }}
            >
              <Typography variant="body1">{item.date}</Typography>
              <Typography variant="body1">{item.dirt}</Typography>
            </Box>
          ))}
          <Link
            to="/history"
            style={{
              color: "#6c5db7",
              marginLeft: "auto",
              padding: "0.5em",
            }}
          >
            Show all
          </Link>
        </Paper>
        <Box
          sx={{
            // border: "1px solid red",
            width: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Camera ref={webcamRef} />
          {state.loading && (
            <Box
              sx={{
                display: "flex",
                gap: "1em",
                my: 1,
                alignItems: "center",
              }}
            >
              <CircularProgress size="1.5rem" />
              <Typography variant="overline">Sending image...</Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default DirtDetection;
