import React, { Component } from 'react';
import { IconButton, Grid, withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
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
    container: {
        width: '100%', 
        display: 'flex', 
        flexWrap: 'wrap', 
        flexDirection: 'column', 
        textAlign: 'center', 
        alignContent: 'center',  
    }, 
    title: {
        marginTop: "2rem", 
        marginBottom: "3rem", 
    }, 
    spacedContainer: {
        marginBottom: '1rem',
        marginTop: '1rem',
    },
  });

class SwipePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idx: 0,
            activities: props.location.state.activities,
            name: props.location.state.name,
            sessionId: props.location.state.sessionId
        };
        this.socket = props.socket;
        this.swipes = [];
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyPress, false);
        this.socket.on('processed_swipes', data => {
            this.props.history.push({
                pathname: '/waiting',
            })
        })
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyPress, false);
    }

    handleComplete = () => {
        this.socket.emit('process_swipes', 
            this.state.sessionId,
            this.state.name,
            this.swipes);
    }

    handleYesClick = () => {
        this.swipes.push(1);
        if (this.state.idx >= this.state.activities.length-1) {
            this.handleComplete();
        }
        else {
            this.setState(state => ({
                idx: state.idx + 1
            }))
        }
    }
    
    handleNoClick = () => {
        this.swipes.push(0);
        if (this.state.idx >= this.state.activities.length-1) {
            this.handleComplete();
        }
        else {
            this.setState(state => ({
                idx: state.idx + 1
            }))
        }
    }

    handleKeyPress = (event) => {
        if (event.keyCode == '37') {
            this.handleNoClick();
        }
        else if (event.keyCode == '39') {
            this.handleYesClick();
        }
    }

    render() {
        const { classes } = this.props;

        const name = this.state.activities[this.state.idx].name;
        const cuisine = this.state.activities[this.state.idx].cuisine;
        const location = this.state.activities[this.state.idx].location;
        const imageUrl = this.state.activities[this.state.idx].image_url;
        const rating = this.state.activities[this.state.idx].rating;

        return (
            <Container className={classes.container}>
    
                <Typography className={classes.title} color="primary" variant="h1"> chooz.io</Typography>
    
                <Grid 
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    margin="1rem">
                    <Grid item>
                        <Activity 
                            name={name} 
                            cuisine={cuisine}
                            location={location}
                            imageUrl={imageUrl}
                            rating={rating}
                            />
                    </Grid>
                    <Grid container
                        direction="row"
                        justify="center"
                        alignItems="center">
                        <Grid item>
                            <IconButton className ={classes.noButtonStyle} onClick={this.handleNoClick} onKeyPress={this.handleKeyPress} aria-label="Not Interested">
                                <NotInterestedIcon />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton className={classes.yesButtonStyle} onClick={this.handleYesClick} onKeyPress={this.handleKeyPress} aria-label="Interested">
                                <CheckIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Container className={classes.spacedContainer}>
                        <Typography variant='body1'>Use the left and right arrow keys</Typography>
                    </Container>
                </Grid>
        </Container>
      );
    }
      
};

export default withStyles(styles, {withTheme: true})(SwipePage);