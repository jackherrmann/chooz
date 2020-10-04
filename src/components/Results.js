import React, { Component } from 'react';
import { Grid, Typography, CardMedia, Chip, makeStyles } from '@material-ui/core';
import ResultsCard from './ResultsCard';

// dummy data
// local files
import testContent from './test-media/test-content.json'; 
import testImage from './test-media/testPicture.jpg'; 

const styles = theme => ({
    root: {
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
  });

// socket.on('message', data => {
//     console.log(data);
// });
// will use something like this to get the data later ^

// these are just till we have real data from APIs
function getItemImage() {
    return testImage; 
}
function getItemInfo() {
    return testContent; 
}

class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Grid container> 
                <ResultsCard />
            </Grid>
        );
    }
}

export default Results;