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

const test1 = {
    name: 'Pizza Hut',
    cuisine: 'Chicken Wings',
    url: '',
    imageUrl: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
    rating: 2.5,
    location: 'xavier\'s house',
};

const test2 = {
    name: 'Pizza Hut',
    cuisine: 'Chicken',
    url: '',
    imageUrl: 'https://homepages.cae.wisc.edu/~ece533/images/arctichare.png',
    rating: 2,
    location: 'xavier\'s house',
};

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
        this.socket.on('processed_swipes', data => {
            this.props.history.push({
                pathname: '/waiting',
            })
        })
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

    render() {
        const { classes } = this.props;

        const name = this.state.activities[this.state.idx].name;
        const cuisine = this.state.activities[this.state.idx].cuisine;
        const location = this.state.activities[this.state.idx].location;
        const imageUrl = this.state.activities[this.state.idx].image_url;
        const rating = this.state.activities[this.state.idx].rating;

        return (
            <Grid 
                container
                direction="column"
                justify="center"
                alignItems="center">
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
                        <IconButton className ={classes.noButtonStyle} onClick={this.handleNoClick} aria-label="Not Interested">
                            <NotInterestedIcon />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton className={classes.yesButtonStyle} onClick={this.handleYesClick} aria-label="Interested">
                            <CheckIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
      );
    }
      
};

export default withStyles(styles, {withTheme: true})(SwipePage);