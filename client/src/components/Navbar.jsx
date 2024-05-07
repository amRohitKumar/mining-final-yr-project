import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import useScrolledNavbar from "@/hooks/useScrolledNavbar";

const Navbar = () => {
  const showBackground = useScrolledNavbar();
  return (
    <Box
      sx={{
        position: "sticky",
        top: "0",
        p: "2em 4em",
        color: "white",
        fontWeight: "bold",
        display: "flex",
        gap: "2em",
        backgroundColor: showBackground ? "#3b3e4f70": "transparent",
        transition: "background-color 0.5s",
        "& a": {
          color: "white",
          textDecoration: "none",
          transition: "color 0.5s",
        },
        "& a:hover": {
          color: "#323232",
        },
      }}
    >
      <Link to="/">Dirt Detection</Link>
      <Link to="/weartear">Health Detection</Link>
      <Link to="/history">Past Records</Link>
    </Box>
  );
};

export default Navbar;
