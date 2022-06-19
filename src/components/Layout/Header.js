import React, { useState } from "react";

import { useHistory } from 'react-router-dom';
import { logout, useAuthState, useAuthDispatch } from '../../context/auth';

import routes from '../../config/routes';

import { styled } from "@mui/material/styles";

import { NavLink } from "./StyledElements";

import {
    Drawer as MuiDrawer,
    AppBar as MuiAppBar,
    Box,
    Toolbar,
    List,
    Divider,
    IconButton,
    Typography,
    MenuItem,
    Menu,
    Avatar,
    Button,
    Tooltip,
    Badge,
} from '@mui/material';

import {
    Menu as MenuIcon,
    ChevronLeft as ChevronLeftIcon,
    Notifications as NotificationsIcon,
    AccountCircle,
} from '@mui/icons-material';

import { mainListItems, secondaryListItems } from "./ListItems";
const settings = ["Profile"];

const headerMenuRight = ({ accessToken, isAuthenticated, ...props }) => {
    return (
        <>
            {!accessToken && !isAuthenticated ? (
                <>
                    <NavLink exact to='/signin'>GİRİŞ</NavLink>
                </>
            ) : (
                <>
                    <Tooltip title="Open menu">
                        <IconButton color="inherit" sx={{ mr: 2 }}>
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Open menu">
                        <IconButton onClick={props.handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt="Mustafa Akbaş" src="/static/images/avatar/2.jpg" />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: "45px" }}
                        id="menu-appbar"
                        anchorEl={props.anchorElUser}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right"
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right"
                        }}
                        open={Boolean(props.anchorElUser)}
                        onClose={props.handleCloseUserMenu}
                    >
                        {props.settings.map((setting) => (
                            <MenuItem key={setting} onClick={props.handleCloseUserMenu}>
                                <Typography textAlign="center">{setting}</Typography>
                            </MenuItem>
                        ))}
                        <MenuItem onClick={props.handleCloseUserMenu}>
                            <a className='nav-link' onClick={props.handleLogout} href='#!'>Logout</a>
                        </MenuItem>
                    </Menu>
                </>
            )}
        </>
    )
};

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
        // marginLeft: drawerWidth, // ! depth1
        // width: `calc(100% - ${drawerWidth}px)`,  // ! depth1
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    })
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        }),
        boxSizing: "border-box",
        ...(!open && {
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up("sm")]: {
                width: theme.spacing(9)
            }
        })
    }
}));

const Header = (props) => {
    const { loading, isAuthenticated, accessToken, ...rest } = useAuthState();

    const history = useHistory();
    const authDispatch = useAuthDispatch();

    const handleLogout = (e) => {
        e.preventDefault()

        logout(authDispatch) //call the logout action
        history.push('/signin') //navigate to logout page on logout
    }

    const [open, setOpen] = useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    // #########
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <>
            <AppBar position="absolute" open={open}>
                <Toolbar sx={{ pr: "24px" }} className="testasd">
                    {/* keep right padding when drawer closed */}

                    {accessToken && (
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: "36px",
                                // ...(open && { display: "none" })  // ! depth1
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}

                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        {routes.filter(item => item?.title && item.isVisible && (item.isPrivate === false || item.multiple === true))
                            .sort((a, b) => a.priority - b.priority)
                            .map((route, i) => (
                                <NavLink
                                    key={i}
                                    exact to={route.path}
                                >
                                    {route.title}
                                </NavLink>
                            ))}
                    </Box>

                    <Typography sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }} />

                    <Box sx={{ flexGrow: 0 }}>
                        {headerMenuRight({ accessToken, isAuthenticated, handleOpenUserMenu, anchorElUser, handleCloseUserMenu, handleLogout, settings })}
                    </Box>
                </Toolbar>
            </AppBar>

            <Drawer
                open={open}
                variant={accessToken ? 'permanent' : 'temporary'}>
                <Toolbar
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        px: [1]
                    }}
                >
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Toolbar>
                <Divider />
                <List component="nav">
                    {mainListItems}
                    <Divider sx={{ my: 1 }} />
                    {secondaryListItems}
                </List>
            </Drawer>
        </>
    );
};

export default Header;
