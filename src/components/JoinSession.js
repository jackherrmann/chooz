import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
    keywordInput: {
        marginBottom: "2rem"
    }, 
    joinButton: {
        marginBottom: "2rem"
    }, 
}));


export default function JoinSession() {

    const classes = useStyles(); 

    var id = ""; 
    var name = ""; 
    const handleNameChange = (event) => {
        name = event.target.value; 
    }
    const handleIdChange = (event) => {
        id = event.target.value; 
    }
    const handleJoin = () => {
        console.log("joined with id: " + id); 
        console.log("joined with name: " + name); 
    }

    return (

        <Container className={classes.container}>

            <Typography className={classes.title} color="primary" variant="h1"> chooz.io</Typography>

            <Card className={classes.card}>

                <Typography className={classes.cardTitle} color="primary" variant="h4"> Join a Session</Typography>

                <TextField className={classes.keywordInput} id="keyword" label="Enter Session ID" defaultValue="" onChange={handleIdChange} />

                <TextField className={classes.keywordInput} id="nameInput" label="Enter Your Name" defaultValue="" onChange={handleNameChange} />

                <Button className={classes.joinButton} variant="contained" onClick={handleJoin}>Join Session</Button>

            </Card>

        </Container>
    ); 
}