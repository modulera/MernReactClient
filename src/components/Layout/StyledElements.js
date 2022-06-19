import { styled } from "@mui/material/styles";
import { NavLink as Link } from "react-router-dom";

export const NavLink = styled(Link)(() => ({
  color: "#ffffff",
  textTransform: "uppercase",
  textDecoration: "none",
  padding: "20px",
  margin: "0 15px",
  fontSize: "1.2rem",
  padding: "13px",
  width: "max-content",
  transition: "0.5s",
  "&:active, &:hover, &.Mui-focusVisible": {
    color:"#FF5917",
    backgroundColor: "#e4e4e4",
  },
  "&.active": {
    backgroundColor: "#FF5917",
    "&:active, &:hover, &.Mui-focusVisible": {
      color:"#ffffff",
      backgroundColor: "#FF5917",
    },
  },
}));
