import React from 'react';
import { IconButton, Grid, makeStyles } from '@material-ui/core';
import Activity from './Activity';
import NotInterestedIcon from '@material-ui/icons/NotInterested'; 
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles((theme) => ({
    noButtonStyle: {
        background: 'red', 
        borderRadius: 30, 
        border: 0, 
        color: 'white', 
        width: '80%', 
        marginRight: '1rem'
    }, 
    yesButtonStyle: {
        background: 'green', 
        borderRadius: 30, 
        border: 0, 
        color: 'white', 
        width: '80%', 
        marginLeft: '1rem'
    }, 
  }));

const handleYesClick = () => {
    console.log("Yes was clicked wooo"); 
}

const handleNoClick = () => {
    console.log("No was clicked nooo"); 
}

export default function SwipePage() {
      const classes = useStyles();
      return (
        <Grid>
            <Grid 
                container
                direction="row"
                justify="center"
                alignItems="center">
                <Grid item>
                    <IconButton className ={classes.noButtonStyle} onClick={handleNoClick} aria-label="Not Interested">
                        <NotInterestedIcon />
                    </IconButton>
                </Grid>
                <Grid item>
                    <Activity />
                </Grid>
                <Grid item>
                    <IconButton className={classes.yesButtonStyle} onClick={handleYesClick} aria-label="Interested">
                        <CheckIcon />
                    </IconButton>
                </Grid>
            </Grid>
          </Grid>
      );
};