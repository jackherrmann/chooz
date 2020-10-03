// react elements
import React from 'react';
import Card from '@material-ui/core/Card';
import { CardHeader, CardMedia, CardContent, Typography, makeStyles, Box } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';


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

    chipStyle: {
        color: "primary", 
        marginLeft: 10, 
        marginRight: 10, 
        marginTop: 5, 
        marginBottom: 5, 
    }, 
  }));

export default function Item() {

  const itemImage = getItemImage();  
  const itemInfo = getItemInfo();
  const ItemTypeIcon = getIcon(itemInfo.type); 
  const classes = useStyles();
  
  return (
    <Card className={classes.root}>
      {/* <CardHeader 
        title={itemInfo.title}
        
        titleTypographyProps={{variant: 'h4'}}
      /> */}
      

      <CardMedia
        className={classes.media}
        image={itemImage}
        title="Item Image"
      />

      <CardContent className={classes.bodyTextHolder}>
          <Box flexDirection="row">
            {/* <Avatar aria-label="itemAvatar">
                    <ItemTypeIcon/>
            </Avatar> */}
            <Typography gutterBottom variant="h5" component="h2">
                {itemInfo.title}
            </Typography>
          </Box>
        <Typography variant="body2" color="textSecondary" component="p">
           {itemInfo.bodyText}
        </Typography>
        <Chip className={classes.chipStyle} label={itemInfo.chips[0]} />
        <Chip className={classes.chipStyle} label={itemInfo.chips[1]} />
        <Chip className={classes.chipStyle} label={itemInfo.chips[2]} />
        <Chip className={classes.chipStyle} label={itemInfo.chips[3]} />
      </CardContent>
    </Card>
  );
}