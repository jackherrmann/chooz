import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider'; 

import { Link } from 'react-router-dom';

const styles = theme => ({
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
        color: "#5353b5"
    }, 
    titleLink: {
        color: "#5353b5", 
    }, 
    card: {
        width: '75%', 
        display: 'flex', 
        flexWrap: 'wrap', 
        flexDirection: 'column', 
        marginTop: "1rem", 
        alignContent: 'center', 
        backgroundColor: 'white', 
        borderRadius: '1.5rem', 
        marginBottom: '2rem'
    },
    cardTitle: {
        marginTop: "1rem", 
        marginBottom: "2rem"
    }, 
    formControl: {
        marginBottom: "2rem", 
    }, 
    selectLabel: {
    }, 
    select: {
        width: '100%', 
        
    },
    keywordInput: {
        marginBottom: "2rem", 
        color: 'red'
    }, 
    createButton: {
        marginBottom: "2rem", 
        backgroundColor: '#5353b5', 
        color: 'white'
    }, 
    sliderContainer: {
        marginBottom: "2rem", 
        display: 'flex'

    }, 
    sliderLabel: {
    }, 
    slider: {
        width: '80%'
    }, 
    sliderNumber: {
        marginLeft: "0.5rem", 
        width: '17%', 
    }
  });


function getMenuItems(arr) {
    const items = []; 
    var item; 
    for (item in arr) {
        items.push(<MenuItem key={item} value={arr[item]}> {arr[item]} </MenuItem>); 
    }
    return items; 
}

class StartSession extends Component {
    constructor(props) {
        super(props);
        this.state = {
          count: 0,
          activityType: "Restaurants",
          activityGenre: '', 
          activityPrice: '',
          numItems: 10,
          latitude: 0,
          longitude: 0,
          name: ''
        };
    }

    componentDidMount() {
        const setLocationState = (lat, long) => {
            this.setState({ latitude: lat });
            this.setState({ longitude: long });
        }

        navigator.geolocation.getCurrentPosition(
            function(position) {
                setLocationState(position.coords.latitude, position.coords.longitude)
            },
            function(error) {
                console.error("Error Code = " + error.code + " - " + error.message);
            }
        );
    }


    render () {
        const socket = this.props.socket;

        const { classes } = this.props; 

        // var keywordInput = ""; 
        const handleNamechange = (event) => {
            this.setState({ name: event.target.value}); 
        }
        // const handleActivityChange = (event) => {
        //     this.setState({ activityType: event.target.value });
        //     this.setState({ activityGenres: [] });
        // }
        const handleGenreChange = (event) => {
            this.setState({ activityGenre: event.target.value });
        }
        const handlePriceChange = (event) => {
            this.setState({ activityPrice: event.target.value });
        }
        // const handleKeywordChange = (event) => {
        //     keywordInput = event.target.value; 
        // }
        const handleNumItemsInputChange = (event) => {
            this.setState({ numItems: event.target.value });
        }
        const handleNumItemsSliderChange = (event, newValue) => {
            this.setState({ numItems: newValue });
        }
        const handleCreate = () => {
            const data = {
                'name': this.state.name,
                'activityType': this.state.activityType,
                'numSwipes': this.state.numItems,
                'location': {
                    'latitude': this.state.latitude,
                    'longitude': this.state.longitude,
                },
                'params': {
                    'cuisine' : this.state.activityGenre,
                    'price' : this.state.activityPrice,
                }
            };
            socket.emit('create_session', data);
        }

        const handleBlur = () => {
            if (this.state.numItems < 1) {
                this.setState({ numItems: 1 });
            } else if (this.state.numItems > 100) {
                this.setState({ numItems: 100 });
            }
        };

        const genres = {
            "Restaurants": ["Any", "Chinese", "Mexican", "Italian", "Pizza", "Burgers", "Breakfast & Brunch", "Cafes", "Sushi"], 
            "Movies": ["Any", "Comedy", "Action", "Horror"], 
            "Events": ["Any", "Concert", "Protest", "Other"]
        }; 

        const prices = ["Any", "$", "$$", "$$$"]; 

        return (

            <Container className={classes.container}>

                <Typography className={classes.title} variant="h1"> <Link className={classes.titleLink} style={{ textDecoration: 'none' }} to='/'> chooz.io </Link> </Typography>

                <Card className={classes.card}>

                    <Typography className={classes.cardTitle} color="primary" variant="h4"> Create a Session</Typography>

                    <TextField className={classes.keywordInput} id="name" label="Your Name" defaultValue="" onChange={handleNamechange} />

                    {/* <FormControl className={classes.formControl}>
                        <InputLabel id="ActivityTypeLabel" className={classes.selectLabel}> Select Activity </InputLabel>
                        <Select
                            labelId="ActivityTypeLabel"
                            id="ActivityType"
                            value={this.state.activityType}
                            onChange={handleActivityChange}
                            className={classes.select}
                        >
                            {getMenuItems(Object.keys(genres))}
                        </Select>

                    </FormControl> */}
                    <FormControl className={classes.formControl}>
                        <InputLabel id="GenreLabel" className={classes.selectLabel}> Select Cuisine </InputLabel>
                        <Select
                                labelId="ActivityGenreLabel"
                                id="ActivityGenre"
                                value={this.state.activityGenre}
                                onChange={handleGenreChange}
                                className={classes.select}
                                input={<Input />}
                                renderValue={(selected) => selected}
                            >
                                {getMenuItems(genres[this.state.activityType])}
                            </Select>
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <InputLabel id="PriceLabel" className={classes.selectLabel}> Select Price </InputLabel>
                        <Select
                            labelId="PriceLabel"
                            id="ActivityPrice"
                            value={this.state.activityPrice}
                            onChange={handlePriceChange}
                            className={classes.select}
                        >
                            {getMenuItems(prices)}
                        </Select>
                    </FormControl>

                    {/* <TextField className={classes.keywordInput} id="keyword" label="Enter Keyword (Optional)" defaultValue="" onChange={handleKeywordChange} /> */}

                    <InputLabel id="numItemsLabel" className={classes.sliderLabel}> Number of Items </InputLabel>
                    <div className={classes.sliderContainer}> 
                        <Slider
                                className={classes.slider}
                                value={typeof this.state.numItems === 'number' ? this.state.numItems : 10}
                                onChange={handleNumItemsSliderChange}
                                aria-labelledby="numItemsLabel"
                        />
                        <Input
                            className={classes.sliderNumber}
                            value={this.state.numItems}
                            margin="dense"
                            onChange={handleNumItemsInputChange}
                            onBlur={handleBlur}
                            inputProps={{
                            step: 1,
                            min: 1,
                            max: 100,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                            }}
                        />
                    </div>
                    <Link style={{ textDecoration: 'none' }} to={{
                        pathname: '/presession-host',
                        state: {
                            hostName: this.state.name
                        }
                        
                    }}>        
                        <Button className={classes.createButton} variant="contained" onClick={handleCreate}>Create Session</Button>
                    </Link>                    
                </Card>

            </Container>

        ); 
    }

}

export default withStyles(styles, {withTheme: true})(StartSession);