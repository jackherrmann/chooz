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
            swipes: [],
            name: props.location.state.name,
            sessionId: props.location.state.sessionId
        };
        this.socket = props.socket;
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
            this.state.swipes);
    }

    handleYesClick = () => {
        console.log("Yes was clicked wooo"); 
        this.setState({ swipes: this.state.swipes.concat(1) });
        console.log(this.state.swipes);
        if (this.state.idx >= this.state.activities.length-1) {
            this.handleComplete();
        }
        else {
            this.setState({ idx: this.state.idx + 1 });
        }
    }
    
    handleNoClick = () => {
        console.log("No was clicked nooo"); 
        this.setState({ swipes: this.state.swipes.concat(0) });
        console.log(this.state.swipes);
        if (this.state.idx >= this.state.activities.length-1) {
            this.handleComplete();
        }
        else{
            this.setState({ idx: this.state.idx + 1 });
        }
    }

    render() {
        const { classes } = this.props;

        console.log(this.state.idx);

        const name = this.state.activities[this.state.idx].name;
        const cuisine = this.state.activities[this.state.idx].cuisine;
        const location = this.state.activities[this.state.idx].location;
        const imageUrl = this.state.activities[this.state.idx].image_url;
        const rating = this.state.activities[this.state.idx].rating;

        console.log(name);

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
        </Container>
      );
    }
      
};

export default withStyles(styles, {withTheme: true})(SwipePage);