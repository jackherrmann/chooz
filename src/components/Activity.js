import React, { Component } from 'react';
import { Box, Typography, CardMedia, Chip, withStyles } from '@material-ui/core';

const styles = (theme) => ({
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
  });

class Activity extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.name,
            cuisine: props.cuisine,
            imageUrl: props.image_url,
            location: props.location,
            rating: props.rating,
        };
    }
    
    render() {
        const { classes } = this.props;

        return (
            <Box flexDirection="column" display="flex" flexWrap="no-wrap">
                <Box className={classes.card}>
                    {/* TODO: make the image normal size + add the rest of the fields */}
                    <Box flexDirection="column">
                        <Box>
                            <CardMedia
                                className={classes.media}
                                src={this.state.imageUrl}
                                title="Activity image"
                            />
                            <Box className={classes.overlay} pb="0rem" >
                                {this.state.name}
                            </Box>
                        </Box>
                        <Box pl="1rem" pr="0.5rem">
                            <Typography variant="body2" color="textSecondary" component="p">
                                {this.state.location}
                            </Typography>
                            <Box className={classes.chipContainer}>
                                <Chip className={classes.chipStyle} label={'Rating: ' + this.state.rating} />
                                <Chip className={classes.chipStyle} label={'Cuisine: ' + this.state.cuisine} />
                                {/* <Chip className={classes.chipStyle} label={itemInfo.chips[2]} />
                                <Chip className={classes.chipStyle} label={itemInfo.chips[3]} /> */}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        );
    }
    
}

export default withStyles(styles, { withTheme: true })(Activity);