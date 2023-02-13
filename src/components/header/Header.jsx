import {
  AppBar,
  Avatar,
  Box,
  Button,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as PATH from "../../constant/path";
import { logout, reset } from "../../features/auth/authSlice";
import AllEasyLogo from "../alleasyLogo/AllEasyLogo";
import ResponsiveDrawer from "../drawer/Drawer";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate(PATH.LOGIN);
    toast.success("Successful Logout");
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <React.Fragment>
      <AppBar
        component="nav"
        position="static"
        color="inherit"
        sx={{
          height: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 1rem",
          boxShadow: "none",
          borderBottom: "1px solid #e6e6e6",
        }}
      >
        <Box display="flex" alignItems="center">
          <button className="menu-button" onClick={() => setIsOpen(true)}>
            <FaBars />
          </button>
          <AllEasyLogo />
        </Box>
        <Box
          sx={{
            flexGrow: 0,
            border: "2px solid #c1272d",
            borderRadius: "50%",
            padding: "4px",
          }}
        >
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar
              alt="Remy Sharp"
              //  src={data?.data.institution.logo}
            />
          </IconButton>
          <Menu
            sx={{ mt: "45px", padding: "4px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem sx={{ display: "flex", justifyContent: "center" }}>
              <Typography textAlign="center">
                {data?.data.profile.first_name}
              </Typography>
            </MenuItem>
            <MenuItem
              onClick={handleCloseUserMenu}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Button color="warning" variant="contained" onClick={onLogout}>
                Logout
              </Button>
            </MenuItem>
          </Menu>
        </Box>
      </AppBar>
      <Drawer open={isOpen} anchor={"left"} onClose={() => setIsOpen(false)}>
        <ResponsiveDrawer onClose={() => setIsOpen(false)} />
      </Drawer>
    </React.Fragment>
  );
}

export default Header;
