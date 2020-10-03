import React from 'react';
import { Box, Button } from '@material-ui/core';
import NavBar from './navigation/NavBar';
import Item from './Item'
import Activity from './Activity'
import NotInterestedIcon from '@material-ui/icons/NotInterested'; 
import CheckIcon from '@material-ui/icons/Check'; 
import CardActions from '@material-ui/core/CardActions';

/*

noButtonStyle: {
        background: 'red', 
        borderRadius: 30, 
        border: 0, 
        color: 'white', 
        width: '40%', 
    }, 
    yesButtonStyle: {
        background: 'green', 
        borderRadius: 30, 
        border: 0, 
        color: 'white', 
        width: '40%', 
    }, 
    

    <CardActions className={classes.buttonHolder}>
            <IconButton className ={classes.noButtonStyle} onClick={handleNoClick} aria-label="Not Interested">
                <NotInterestedIcon />
            </IconButton>
            <IconButton className={classes.yesButtonStyle} onClick={handleYesClick} aria-label="Interested">
                <CheckIcon />
            </IconButton>
          
      </CardActions>

      const handleYesClick = () => {
      console.log("Yes was clicked wooo"); 
  }

  const handleNoClick = () => {
      console.log("No was clicked nooo"); 
  }

  buttonHolder: {
        margin: 0, 
        display: "flex", 
        justifyContent: "space-around", 
        position: "absolute", 
        left: 0, 
        bottom: 5, 
        width: '100%', 
    }, 
*/


class SwipePage extends React.Component {
    render() {
      return (
          <Box flexDirection="column">
                <NavBar />
            <Box flexDirection="row">
                <Box flexGrow={1} >
                    <Button>No</Button>
                </Box>
                <Box>
                    <Activity />
                </Box>
                <Box flexGrow={1}>
                    <Button>Yes</Button>
                </Box>
            </Box>
          </Box>
      );
    }
}

export default SwipePage;