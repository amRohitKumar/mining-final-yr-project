import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";

import { DirtDetection, History, WearTearDetection } from "./pages";

function App() {
  return (
    <Box>
      
      <Routes>
        <Route exact path="/" element={<DirtDetection />} />
        <Route exact path="/weartear" element={<WearTearDetection />} />
        <Route exact path="/history" element={<History />} />
      </Routes>
    </Box>
  );
}

export default App;
