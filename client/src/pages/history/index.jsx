import {RecordDirt, RecordTear} from "@/components/Record";
import { initialState, reducer } from "@/reducers/requestReducer";
import customFetch from "@/utils/axios";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useCallback, useEffect, useReducer, useState } from "react";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{
        width: "100%",
      }}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            p: 3,
            width: '100%',
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const History = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [state, dispatch] = useReducer(reducer, {...initialState, response: {}});
  const fetchHistory = useCallback(async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const { data } = await customFetch.get("/api/history");
      console.log(data);
      dispatch({ type: "SET_RESPONSE", payload: data });
    } catch (e) {
      console.error(e);
      dispatch({
        type: "SET_ERROR",
        payload: e?.message || "Error while fetching history !",
      });
    }
  }, []);
  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);
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
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="history tabs"
          indicatorColor="secondary"
          textColor="secondary"
        >
          <Tab label="Dirt" {...a11yProps(0)} sx={{ width: "400px" }} />
          <Tab label="Tear" {...a11yProps(1)} sx={{ width: "400px" }} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {state.response?.dirt?.map((el) => (
          <RecordDirt {...el} />
        ))}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {state.response?.tear?.map((el) => (
          <RecordTear key={el.id} {...el} />
        ))}
      </CustomTabPanel>
    </Box>
  );
};
export default History;
