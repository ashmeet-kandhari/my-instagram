import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import AccountCircle from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { userService } from "../utils/auth";
import "./Header.css";

function Header({ title, user, history }) {
  // const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    userService.logout();
    history.push("/login");
    setAnchorEl(null);
  };

  return (
    <div className="Header">
      <AppBar
        position="static"
        style={{ color: "#000", backgroundColor: "#fff" }}
      >
        <Toolbar>
          <h2 style={{ fontFamily: "Alex Brush, cursive" }}>My-Instagram</h2>
          <span className="flex-span" />
          {
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "center"
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </div>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(Header);
