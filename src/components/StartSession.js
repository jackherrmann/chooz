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
    }, 
    card: {
        width: '75%', 
        display: 'flex', 
        flexWrap: 'wrap', 
        flexDirection: 'column', 
        marginTop: "1rem", 
        alignContent: 'center', 
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
        width: '100%'
    },
    keywordInput: {
        marginBottom: "2rem"
    }, 
    createButton: {
        marginBottom: "2rem"
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
          activityType: '',
          activityGenres: [], 
          activityPrice: '',
          numItems: 10,
          latitude: 0,
          longitude: 0,
        };
    }

    componentDidMount() {
        const setLocationState = (lat, long) => {
            this.setState({ latitude: lat });
            this.setState({ longitude: long });
        }

        navigator.geolocation.getCurrentPosition(
            function(position) {
                console.log('latitude: ' + position.coords.latitude);
                console.log('longitude' + position.coords.longitude);
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

        var keywordInput = ""; 
        var nameInput = ""; 
        const handleNamechange = (event) => {
            nameInput = event.target.value; 
        }
        const handleActivityChange = (event) => {
            this.setState({ activityType: event.target.value });
            this.setState({ activityGenre: [] });
        }
        const handleGenresChange = (event) => {
            this.setState({ activityGenre: event.target.value });
        }
        const handlePriceChange = (event) => {
            this.setState({ activityPrice: event.target.value });
        }
        const handleKeywordChange = (event) => {
            keywordInput = event.target.value; 
        }
        const handleNumItemsInputChange = (event) => {
            this.setState({ numItems: event.target.value });
        }
        const handleNumItemsSliderChange = (event, newValue) => {
            this.setState({ numItems: newValue });
        }
        const handleCreate = () => {
            const data = {
                'name': nameInput,
                'activityType': this.state.activityType,
                'numSwipes': this.state.numItems,
                'latitude': this.state.latitude,
                'longitude': this.state.longitude,
            };
            socket.emit('create_session', data);
        }

        const handleBlur = () => {
            console.log("handled blur with num: " + this.state.numItems); 
            if (this.state.numItems < 1) {
                this.setState({ numItems: 1 });
            } else if (this.state.numItems > 100) {
                this.setState({ numItems: 100 });
            }
        };

        const genres = {
            "Food": ["Any", "Chinese", "Pizza", "Other"], 
            "Movies": ["Any", "Comedy", "Action", "Horror"], 
            "Events": ["Any", "Concert", "Protest", "Other"]
        }; 

        const prices = ["Any", "$", "$$", "$$$"]; 

        return (

            <Container className={classes.container}>

                <Typography className={classes.title} color="primary" variant="h1"> chooz.io</Typography>

                <Card className={classes.card}>

                    <Typography className={classes.cardTitle} color="primary" variant="h4"> Create a Session</Typography>

                    <TextField className={classes.keywordInput} id="name" label="Your Name" defaultValue="" onChange={handleNamechange} />

                    <FormControl className={classes.formControl}>
                        <InputLabel id="ActivityTypeLabel" className={classes.selectLabel}> Select Activity </InputLabel>
                        <Select
                            labelId="ActivityTypeLabel"
                            id="ActivityType"
                            value={this.state.activityType}
                            onChange={this.state.handleActivityChange}
                            className={classes.select}
                        >
                            {getMenuItems(Object.keys(genres))}
                        </Select>

                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="GenreLabel" className={classes.selectLabel}> Select Genre </InputLabel>
                        <Select
                                labelId="ActivityGenreLabel"
                                id="ActivityGenre"
                                value={this.state.activityGenres}
                                onChange={handleGenresChange}
                                className={classes.select}
                                multiple
                                input={<Input />}
                                renderValue={(selected) => selected.join(', ')}
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

                    <TextField className={classes.keywordInput} id="keyword" label="Enter Keyword (Optional)" defaultValue="" onChange={handleKeywordChange} />

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

                    <Button className={classes.createButton} variant="contained" onClick={handleCreate}>Create Session</Button>

                </Card>

            </Container>

        ); 
    }

}

export default withStyles(styles, {withTheme: true})(StartSession);