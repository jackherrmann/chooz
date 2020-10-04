import React from 'react';
import { Box, Toolbar, AppBar, Typography, Button, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

function NavBar(props) {

    return (
        <AppBar position="static" height="200px">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                <MenuIcon />
                </IconButton>
                    <Typography variant="h6">
                        Chooz.io
                    </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;