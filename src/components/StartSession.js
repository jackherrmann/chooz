import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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




const useStyles = makeStyles((theme) => ({
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
}));


function getMenuItems(arr) {
    const items = []; 
    var item; 
    for (item in arr) {
        items.push(<MenuItem value={arr[item]}> {arr[item]} </MenuItem>); 
    }
    return items; 
}

export default function StartSession() {

    const classes = useStyles(); 

    const [activityType, setActivityType] = React.useState(''); 
    const [activityGenres, setActivityGenre] = React.useState([]); 
    const [activityPrice, setActivityPrice] = React.useState(''); 
    const [numItems, setNumItems] = React.useState(10); 

    var keywordInput = ""; 
    var nameInput = ""; 
    const handleNamechange = (event) => {
        nameInput = event.target.value; 
    }
    const handleActivityChange = (event) => {
        setActivityType(event.target.value);
        setActivityGenre([]); 
    }
    const handleGenresChange = (event) => {
        setActivityGenre(event.target.value); 
    }
    const handlePriceChange = (event) => {
        setActivityPrice(event.target.value); 
    }
    const handleKeywordChange = (event) => {
        keywordInput = event.target.value; 
    }
    const handleNumItemsInputChange = (event) => {
        setNumItems(event.target.value === '' ? '' : Number(event.target.value)); 
    }
    const handleNumItemsSliderChange = (event, newValue) => {
        setNumItems(newValue); 
    }
    const handleCreate = () => {
        console.log("Submitted with activity: " + nameInput); 
        console.log("submitted with activity: " + activityType); 
        console.log("submitted with genre: " + activityGenres); 
        console.log("submitted with price: " + activityPrice); 
        console.log("submitted with keyword: " + keywordInput); 
        console.log("submitted with numItems: " + numItems); 
    }
    const handleBlur = () => {
        if (numItems < 1) {
          setNumItems(1);
        } else if (numItems > 100) {
          setNumItems(100);
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
                        value={activityType}
                        onChange={handleActivityChange}
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
                            value={activityGenres}
                            onChange={handleGenresChange}
                            className={classes.select}
                            multiple
                            input={<Input />}
                            renderValue={(selected) => selected.join(', ')}
                        >
                            {getMenuItems(genres[activityType])}
                        </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel id="PriceLabel" className={classes.selectLabel}> Select Price </InputLabel>
                    <Select
                        labelId="PriceLabel"
                        id="ActivityPrice"
                        value={activityPrice}
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
                            value={typeof numItems === 'number' ? numItems : 10}
                            onChange={handleNumItemsSliderChange}
                            aria-labelledby="numItemsLabel"
                    />
                    <Input
                        className={classes.sliderNumber}
                        value={numItems}
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