import Camera from "@/components/Camera";
import { initialState, reducer } from "@/reducers/requestReducer";
import customFetch from "@/utils/axios";
import delay from "@/utils/delay";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useCallback, useEffect, useReducer, useRef } from "react";
import { Link } from "react-router-dom";

const WearTearDetection = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const webcamRef = useRef(null);

  const handleTakeScreenshot = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    return imageSrc;
  }, [webcamRef]);

  const sendImage = useCallback(async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const imageUrl = handleTakeScreenshot();
      const reqData = { image: imageUrl, date: new Date() };
      // console.log("sending request = ", reqData);
      await delay(3000);
      const { data } = await customFetch.post("/api/detect-tear", reqData);
      console.log(data);
      data.forEach((el) =>
        dispatch({
          type: "SET_RESPONSE",
          payload: { ...el, timestamp: new Date() },
        })
      );
    } catch (e) {
      console.error(e);
      dispatch({
        type: "SET_ERROR",
        payload: e?.message || "Error while sending request !",
      });
    }
  }, [handleTakeScreenshot]);

  useEffect(() => {
    const intervalId = setInterval(sendImage, 1 * 60 * 60 * 1000); // 1 hour
    return () => clearInterval(intervalId);
  }, [sendImage]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        pt: "4em",
        px: "4em",
      }}
    >
      <Box
        sx={{
          color: "white",
        }}
      >
        <Typography variant="h2" mb="0.5em" fontWeight="bold">
          Belt Conveyor Healt Detector
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
      <Box sx={{ display: "flex", width: "100%", alignItems: "center" }}>
        <Paper
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            borderRadius: "10px",
            overflow: "hidden",
            height: "400px",
            overflowY: "scroll",
          }}
          elevation={3}
        >
          <Box
            sx={{
              display: "grid",
              gridAutoFlow: "column",
              gridAutoColumns: "1fr",
              borderBottom: "1px solid #ccc",
              padding: "1em",
              backgroundColor: "#000",
              color: "#fff",
            }}
          >
            <Typography variant="body1">Date</Typography>
            <Typography variant="body1" align="center">
              Point
            </Typography>
            <Typography variant="body1" align="center">
              Severity
            </Typography>
          </Box>
          {state.records.map((item) => (
            <Box
              key={item.call_id}
              sx={{
                display: "grid",
                gridAutoFlow: "column",
                gridAutoColumns: "1fr",
                borderBottom: "1px solid #ccc",
                py: "1em",
                backgroundColor:
                  item.severity === "low"
                    ? "#d4edda"
                    : item.severity === "medium"
                    ? "#ecf4c6"
                    : "#f8d7da",
              }}
            >
              <Typography variant="body1" align="center">
                {moment(item?.timestamp).format("MMMM Do YYYY, h:mm:ss a")}
              </Typography>
              <Typography variant="body1" align="center">
                {item.point}
              </Typography>
              <Typography variant="body1" align="center">
                {item.severity}
              </Typography>
            </Box>
          ))}
          <Link
            to="/history"
            style={{
              color: "#6c5db7",
              marginLeft: "auto",
              padding: "0.5em",
              textDecoration: "none",
              marginTop: "auto",
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
          <Button size="small" onClick={sendImage}>
            Test
          </Button>
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

export default WearTearDetection;
