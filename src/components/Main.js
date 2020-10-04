import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { Link } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%', 
        display: 'flex', 
        flexWrap: 'wrap', 
        textAlign: 'center', 
        justifyContent: 'space-around', 
    }, 
    title: {
        marginTop: "2rem", 
        marginBottom: "3rem", 
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
                <Link to='/create'>
                    <Button className={classes.button} variant="contained" onClick={handleStart}> Start Session </Button>
                </Link>
                <Link to='/join'>
                    <Button className={classes.button} variant="contained" onClick={handleJoin}> Join Session </Button>
                </Link>
            </Card>


        </Container>

    ); 

}
