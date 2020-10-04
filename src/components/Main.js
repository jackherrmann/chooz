import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { Link } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%', 
        display: 'flex', 
        flexWrap: 'no-wrap', 
        flexDirection: 'column',
        textAlign: 'center', 
        justifyContent: 'space-around',
        alignItems: 'center',
    }, 
    titleLink: {
        color: "#5353b5", 
    }, 
    title: {
        marginTop: "2rem", 
        marginBottom: "0.25rem", 
    }, 
    description: {
        marginBottom: "2rem",
        color: "#343471",
    },
    card: {
        width: '75%', 
        borderRadius: '1.5rem', 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop: 20, 
    },
    button: {
        width: '50%', 
        marginRight: 20, 
        marginTop: 30, 
        marginBottom: 30, 
        backgroundColor: "#5353b5", 
        color: 'white'
        
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

                <Typography className={classes.title} variant="h1"> <Link className={classes.titleLink} style={{ textDecoration: 'none' }} to='/'> chooz.io </Link> </Typography>

            <Typography className={classes.description} color="secondary" variant="subtitle1">
            Can't decide where to eat? chooz.io is a modern solution to group indecision
            </Typography>

            <Card className={classes.card}>
                <Link style={{ textDecoration: 'none' }} to='/create'>
                    <Button className={classes.button} variant="contained" onClick={handleStart}> Start Session </Button>
                </Link>
                <Link style={{ textDecoration: 'none' }} to='/join'>
                    <Button className={classes.button} variant="contained" onClick={handleJoin}> Join Session </Button>
                </Link>
            </Card>


        </Container>

    ); 

}
