import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List'; 
import ListItem from '@material-ui/core/ListItem'; 
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'; 
import ListItemText from '@material-ui/core/ListItemText'; 
import IconButton from '@material-ui/core/IconButton'; 
import DeleteIcon from '@material-ui/icons/Delete';


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
    }, 
    formControl: {
        marginBottom: "2rem", 
    }, 
    keywordInput: {
        marginBottom: "2rem"
    }, 
    joinButton: {
        marginTop: "3rem", 
        marginBottom: "2rem"
    }, 
}));




export default function PreSessionHost() {

    const classes = useStyles(); 

    var id = "000000"; 

    const handleBegin = () => {
        console.log("began with id: " + id); 
    }

    var participants = ["Jack", "Eric", "Alex", "Xavier"]; 


    const deletePart = (idx) => {
        console.log("deleted part at: " + idx); 
    }

    


    const createPartList = () => {
        var parts = [];  
        for (let idx in participants) {
            const handleDelete = (event) => {
                deletePart(idx);  
            }
            parts.push(
                <ListItem>
                    <ListItemText primary={participants[idx]}/>
                    <ListItemSecondaryAction>
                        <IconButton id={idx} edge="end" aria-label="delete" onClick={handleDelete}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            ); 
        }
        return parts; 
    }

    

    return (

        <Container className={classes.container}>

            <Typography className={classes.title} color="primary" variant="h1"> chooz.io</Typography>

            <Card className={classes.card}>

                <Typography className={classes.cardTitle} color="primary" variant="h4"> Wait for your friends...</Typography>

                <Typography className={classes.cardTitle} color="primary" variant="h4"> Session ID: {id}</Typography>



                <Typography variant="h6" className={classes.partListTitle}> Participants: </Typography>
                <div className={classes.partListContainer}>
                    <List>
                    
                        {createPartList(participants)}
                    
                    </List>
                </div>

                <Button className={classes.joinButton} variant="contained" onClick={handleBegin}>Begin Session</Button>

            </Card>

        </Container>
    ); 
}