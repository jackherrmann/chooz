import React from 'react';
import { Box, Typography, makeStyles } from '@material-ui/core';

// icons
import MovieIcon from '@material-ui/icons/Movie'; 
import FoodIcon from '@material-ui/icons/Fastfood'; 
import EventIcon from '@material-ui/icons/Event'; 
import UnknownIcon from '@material-ui/icons/Help'; 

// local files
import testContent from './test-media/test-content.json'; 
import testImage from './test-media/testPicture.jpg'; 

// these are just till we have real data from APIs
function getItemImage() {
    return testImage; 
}
function getItemInfo() {
    return testContent; 
}
// end of the fake data
function getIcon(itemType) {
    console.log(itemType); 
    switch(itemType) {
        case 'food': 
            return FoodIcon; 
        case 'movie':
            return MovieIcon; 
        case 'event': 
            return EventIcon; 
        default: 
            return UnknownIcon; 
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
      position:'relative',
      width: '50%', 
      borderRadius: "1rem", 
      top: "2rem", 
      left: "2rem", 
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
      position: 'relative',

    },
    overlay: {
        position: 'absolute',
        left: '1rem',
        bottom: '1rem',
        color: 'black',
        backgroundColor: 'black'
     },
    bodyTextHolder: {
        paddingBottom: "0rem", 
        borderWidth: "1rem", 
    }, 
    
    chipContainer: {
        paddingTop: 5, 
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap', 
        marginBottom: 60, 
        borderWidth: 1, 
    }, 
    overlay: {
        position:'absolute',
        bottom:'.5rem',
        left:'1rem'
    },
    chipStyle: {
        color: "primary", 
        marginLeft: 10, 
        marginRight: 10, 
        marginTop: 5, 
        marginBottom: 5, 
    }, 
  }));

export default function Activity() {
    const itemImage = getItemImage();  
    const itemInfo = getItemInfo();
    const ItemTypeIcon = getIcon(itemInfo.type); 
    const classes = useStyles();

    return (
        <Box>
            <div class="container">
                {/* TODO: make the image normal size + add the rest of the fields */}
                <img src={itemImage} />
            </div>
            <div className={classes.overlay} >
                Text here
            </div>
                
        </Box>
            
        );
}