// react elements
import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';


// icons
import NotInterestedIcon from '@material-ui/icons/NotInterested'; 
import CheckIcon from '@material-ui/icons/Check'; 
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
      width: '50%', 
      borderRadius: 10, 
      position: "absolute", 
      top: 20, 
      left: 20, 
    },
    media: {
      paddingTop: '56.25%', // 16:9
    },
    bodyTextHolder: {
        paddingBottom: 0, 
        borderWidth: 1, 
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

    buttonHolder: {
        margin: 0, 
        display: "flex", 
        justifyContent: "space-around", 
        position: "absolute", 
        left: 0, 
        bottom: 5, 
        width: '100%', 
    }, 
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
    
  }));

export default function Item() {

  const itemImage = getItemImage();  
  const itemInfo = getItemInfo();
  const ItemTypeIcon = getIcon(itemInfo.type); 
  const classes = useStyles();

  const handleYesClick = () => {
      console.log("Yes was clicked wooo"); 
  }

  const handleNoClick = () => {
      console.log("No was clicked nooo"); 
  }
  
  return (
    <Card className={classes.root}>
      <CardHeader 
        title={itemInfo.title}
        avatar= {
            <Avatar aria-label="itemAvatar">
                <ItemTypeIcon/>
            </Avatar>
        }
        titleTypographyProps={{variant: 'h4'}}
      />

      
      <CardMedia
        className={classes.media}
        image={itemImage}
        title="Item Image"
      />


      <CardContent className={classes.bodyTextHolder}>
        <Typography variant="body2" color="textSecondary" component="p">
           {itemInfo.bodyText}
        </Typography>
      </CardContent>



      <CardContent className={classes.chipContainer}>
          <Chip className={classes.chipStyle} label={itemInfo.chips[0]} />
          <Chip className={classes.chipStyle} label={itemInfo.chips[1]} />
          <Chip className={classes.chipStyle} label={itemInfo.chips[2]} />
          <Chip className={classes.chipStyle} label={itemInfo.chips[3]} />
      </CardContent>


      
      <CardActions className={classes.buttonHolder}>
            <IconButton className ={classes.noButtonStyle} onClick={handleNoClick} aria-label="Not Interested">
                <NotInterestedIcon />
            </IconButton>
            <IconButton className={classes.yesButtonStyle} onClick={handleYesClick} aria-label="Interested">
                <CheckIcon />
            </IconButton>
          
      </CardActions>


    </Card>
  );
}