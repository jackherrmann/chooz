import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List'; 
import ListItem from '@material-ui/core/ListItem'; 
import ListItemText from '@material-ui/core/ListItemText'; 



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
    partListContainer: {
        width: "50%", 
        display: 'flex', 
        justifyContent: "center", 
    }, 
    list: {
        width: "50%", 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
    },
    listItem: {
        textAlign: "center", 
    }

}));




export default function PreSession() {

    const classes = useStyles(); 

    var id = "000000"; 

    var participants = ["Jack", "Eric", "Alex", "Xavier"]; 

    const createPartList = () => {
        var parts = [];  
        for (let idx in participants) {
            parts.push(
                <ListItem className={classes.listItem}>
                    <ListItemText primary={participants[idx]}/>
                </ListItem>
            ); 
        }
        return parts; 
    }

    

    return (

        <Container className={classes.container}>

            <Typography className={classes.title} color="primary" variant="h1"> chooz.io</Typography>

            <Card className={classes.card}>

                <Typography className={classes.cardTitle} color="primary" variant="h4"> Waiting for the host to begin...</Typography>

                <Typography className={classes.cardTitle} color="primary" variant="h4"> Session ID: {id}</Typography>

                <Typography variant="h6" className={classes.partListTitle}> Participants: </Typography>
                <div className={classes.partListContainer}>
                    <List className={classes.list}>
                    
                        {createPartList(participants)}
                    
                    </List>
                </div>

            </Card>

        </Container>
    ); 
}