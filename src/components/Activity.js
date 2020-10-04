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
        backgroundColor: 'white'
    },

    media: {
        width: "40rem", 
        height: "20rem"
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
    },

    chipStyle: {
        color: "#5353b5", 
        marginLeft: 10, 
        marginRight: 10, 
        marginTop: 5, 
        marginBottom: 5, 
        background: "#e3e3ff",
    }, 
  });

class Activity extends Component {
    render() {
        const { classes } = this.props;
    
        return (
            <Box flexDirection="column" display="flex" flexWrap="no-wrap">
                <Box className={classes.card}>
                    {/* TODO: make the image normal size + add the rest of the fields */}
                    <Box flexDirection="column">
                        <Box>
                            <CardMedia component="img" className={classes.media} src={this.props.imageUrl} />
                            <Box className={classes.overlay} pb="0rem" >
                                <Typography variant="h5">
                                    {this.props.name}
                                </Typography>
                            </Box>
                        </Box>
                        <Box pl="1rem" pr="0.5rem">
                            <Typography variant="body2" color="#5353b5" component="p">
                                {this.props.location}
                            </Typography>
                            <Box className={classes.chipContainer}>
                                <Chip className={classes.chipStyle} label={'Rating: ' + this.props.rating} />
                                <Chip className={classes.chipStyle} label={'Cuisine: ' + this.props.cuisine} />
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