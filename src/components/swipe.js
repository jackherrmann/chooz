import React, { Component } from 'react';
import { IconButton, Grid, withStyles } from '@material-ui/core';
import Activity from './Activity';
import NotInterestedIcon from '@material-ui/icons/NotInterested'; 
import CheckIcon from '@material-ui/icons/Check';

const styles = theme => ({
    noButtonStyle: {
        background: 'red', 
        borderRadius: 30, 
        border: 0, 
        color: 'white', 
        marginRight: '1rem',
        marginTop: '1rem',
    }, 
    yesButtonStyle: {
        background: 'green', 
        borderRadius: 30, 
        border: 0, 
        color: 'white', 
        marginLeft: '1rem',
        marginTop: '1rem',
    }, 
  });

const handleYesClick = () => {
    console.log("Yes was clicked wooo"); 
}

const handleNoClick = () => {
    console.log("No was clicked nooo"); 
}

class SwipePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { classes } = this.props;

        return (
            <Grid 
                container
                direction="column"
                justify="center"
                alignItems="center">
                <Grid item>
                    <Activity />
                </Grid>
                <Grid container
                    direction="row"
                    justify="center"
                    alignItems="center">
                    <Grid item>
                        <IconButton className ={classes.noButtonStyle} onClick={handleNoClick} aria-label="Not Interested">
                            <NotInterestedIcon />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton className={classes.yesButtonStyle} onClick={handleYesClick} aria-label="Interested">
                            <CheckIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
      );
    }
      
};

export default withStyles(styles, {withTheme: true})(SwipePage);