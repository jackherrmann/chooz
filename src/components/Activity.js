import React from 'react';
import { Box, Typography, CardMedia, Chip, makeStyles } from '@material-ui/core';

// icons
/*
import MovieIcon from '@material-ui/icons/Movie'; 
import FoodIcon from '@material-ui/icons/Fastfood'; 
import EventIcon from '@material-ui/icons/Event'; 
import UnknownIcon from '@material-ui/icons/Help'; 
*/

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
/*
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
*/

const useStyles = makeStyles((theme) => ({
    root: {
      position:'relative',
      width: '50%',
      top: "2rem", 
      left: "2rem", 
    },

    card: {
        width: "100%",
        height: "50%",
        position: 'relative',
        pb: '1rem',
        pt: '1rem',
        borderRadius: 8,
        boxShadow: '0 8px 16px 0 #BDC9D7',
        overflow: 'hidden',
    },

    media: {
        paddingTop: '56.25%', // 16:9
        height: "100%", 
        width: "100%",
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
        borderWidth: 1, 
        paddingBottom: '1rem'
    }, 

    overlay: {
        position:'relative',
        bottom:'3rem',
        left:'1rem',
        color: '#ffffff',
        fontSize: 30,
        fontWeight: 400,
        fontFamily: 'sans-serif',
        fontStyle: 'normal',
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
    // const ItemTypeIcon = getIcon(itemInfo.type); 
    const classes = useStyles();

    return (
        <Box flexDirection="column" display="flex" flexWrap="no-wrap">
            <Box className={classes.card}>
                {/* TODO: make the image normal size + add the rest of the fields */}
                <Box flexDirection="column">
                    <Box>
                        <CardMedia
                            className={classes.media}
                            image={itemImage}
                            title="Activity image"
                        />
                        <Box className={classes.overlay} pb="0rem" >
                            {itemInfo.title}
                        </Box>
                    </Box>
                    <Box pl="1rem" pr="0.5rem">
                        <Typography variant="body2" color="textSecondary" component="p">
                            {itemInfo.bodyText}
                        </Typography>
                        <Box className={classes.chipContainer}>
                            <Chip className={classes.chipStyle} label={itemInfo.chips[0]} />
                            <Chip className={classes.chipStyle} label={itemInfo.chips[1]} />
                            <Chip className={classes.chipStyle} label={itemInfo.chips[2]} />
                            <Chip className={classes.chipStyle} label={itemInfo.chips[3]} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}