import React from 'react';
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

import { withStyles } from '@material-ui/core/styles';

import { withRouter } from 'react-router-dom';

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
});


class PreSessionHost extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sessionId: "",
            participants: [props.location.state.hostName],
            name: props.location.state.hostName
        }
        this.socket = props.socket;
    }

    componentDidMount() {
        this.socket.on('created_session', data => {
            const {sessionId} = data;
            console.log ("received", sessionId);
            this.setState({
                sessionId: sessionId
            })
        })
        this.socket.on('user_joined_session', data => {
            const {username} = data;
            console.log("received ", username);
            this.setState({
                participants: this.state.participants.concat(username)
            })
        })
        this.socket.on('started_session', activities => {
            this.props.history.push({
                pathname: '/session',
                state: {
                    activities: activities,
                    name: this.state.name
                }
            })
        })
    }

    handleBegin = () => {
        console.log("began with id: " + this.state.sessionId); 
        this.socket.emit('start_session', this.state.sessionId);
    }


    deletePart = (idx) => {
        console.log("deleted part at: " + idx); 
    }

    
    createPartList = () => {
        var parts = [];  
        for (let idx in this.state.participants) {
            const handleDelete = (event) => {
                this.deletePart(idx);  
            }
            parts.push(
                <ListItem>
                    <ListItemText primary={this.state.participants[idx]}/>
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

    
    render() {
        const {classes} = this.props;

        return (

            <Container className={classes.container}>
    
                <Typography className={classes.title} color="primary" variant="h1"> chooz.io</Typography>
    
                <Card className={classes.card}>
    
                    <Typography className={classes.cardTitle} color="primary" variant="h4"> Wait for your friends...</Typography>
    
                    <Typography className={classes.cardTitle} color="primary" variant="h4"> Session ID: {this.state.sessionId}</Typography>
    
    
    
                    <Typography variant="h6" className={classes.partListTitle}> Participants: </Typography>
                    <div className={classes.partListContainer}>
                        <List>
                        
                            {this.createPartList(this.state.participants)}
                        
                        </List>
                    </div>
                    <Button className={classes.joinButton} variant="contained" onClick={this.handleBegin}>Begin Session</Button>
                </Card>
    
            </Container>
        ); 
    }
    
}

export default withRouter(withStyles(styles, {withTheme: true})(PreSessionHost));