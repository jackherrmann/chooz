import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%', 
        display: 'flex', 
        flexWrap: 'wrap', 
        textAlign: 'center', 
        justifyContent: 'space-around', 
    }, 
    title: {
        marginBottom: 40, 
    }, 
    card: {
        width: '75%', 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        marginTop: 20, 
    },
    button: {
        width: '50%', 
        marginRight: 20, 
        marginTop: 30, 
        marginBottom: 30, 
    },
}));




export default function MainPage() {

    const classes = useStyles(); 

    const handleStart = () => {
        console.log("Start was clicked"); 
    }
  
    const handleJoin = () => {
        console.log("Join was clicked"); 
    }

    return (

        <Container className={classes.container}>

            <Typography className={classes.title} color="primary" variant="h1"> chooz.io</Typography>

            <Card className={classes.card}>

                <Typography className={classes.title} color="primary" variant="h4"> Create a Session</Typography>


                <form>

                    




                </form>
            </Card>


        </Container>

    ); 

}