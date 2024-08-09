import React, { useState } from "react"
import { useDispatch } from "react-redux";
import { api } from "../users";
import { IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material";
import KeyIcon from '@mui/icons-material/Key';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { openChangePassword } from "./redux";
import { logout } from "../auth";

export const UserIcon = () => {
    const [anchorE1, setAnchorE1] = useState(null);
    const menuOpen = Boolean(anchorE1);
    const closeMenu = () => setAnchorE1(null);
    const dispatch = useDispatch();
    const { data } = api.endpoints.getSelf.useQuery();
    return (
        <>
            <Tooltip title='Profile'>
                <IconButton color='inherit' onClick={event => setAnchorE1(event.currentTarget)}>
                    <AccountCircleIcon />
                </IconButton>
            </Tooltip>
            <Menu anchorEl={anchorE1} open={menuOpen} onClose={closeMenu}>
                {data && <MenuItem>{data.name}</MenuItem>}
                <MenuItem onClick={() => {
                    dispatch(openChangePassword());
                    closeMenu();
                }}>
                    <ListItemIcon>
                        <KeyIcon />
                    </ListItemIcon>
                    Change Password
                </MenuItem>
                <MenuItem onClick={() => dispatch(logout())}>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
};