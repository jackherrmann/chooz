import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List'; 
import ListItem from '@material-ui/core/ListItem'; 
import ListItemText from '@material-ui/core/ListItemText'; 
import { Link } from 'react-router-dom';


import { withRouter } from 'react-router-dom';

const styles = (theme) => ({
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
    titleLink: {
        color: "#5353b5", 
    }, 
    card: {
        width: '75%', 
        display: 'flex', 
        flexWrap: 'wrap', 
        flexDirection: 'column', 
        marginTop: "1rem", 
        alignContent: 'center', 
        borderRadius: '1.5rem', 
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

});




class PreSessionGuest extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sessionId: "",
            participants: [],
            name: props.location.state.name
        }
        this.socket = props.socket;
    }

    componentDidMount() {
        this.socket.on('initial_joined_session', data => {
            const {sessionId, participants} = data;
            this.setState({
                sessionId: sessionId,
                participants: participants
            })
        })
        this.socket.on('user_joined_session', data => {
            const {username} = data;
            this.setState({
                participants: this.state.participants.concat(username)
            })
        })
        this.socket.on('started_session', activities => {
            this.socket.sessionId = this.state.sessionId;
            this.props.history.push({
                pathname: '/session',
                state: {    
                    activities: activities,
                    name: this.state.name,
                    sessionId: this.state.sessionId
                }
            })
        })
    }

    createPartList = () => {
        var parts = [];  
        for (let idx in this.state.participants) {
            parts.push(
                <ListItem>
                    <ListItemText primary={this.state.participants[idx]}/>
                </ListItem>
            ); 
        }
        return parts; 
    }

    
    render() {
        const {classes} = this.props;

        return (

            <Container className={classes.container}>
    
                <Typography className={classes.title} variant="h1"> <Link className={classes.titleLink} style={{ textDecoration: 'none' }} to='/'> chooz.io </Link> </Typography>
    
                <Card className={classes.card}>
    
                    <Typography className={classes.cardTitle} color="primary" variant="h4"> Waiting for the host to begin...</Typography>
    
                    <Typography className={classes.cardTitle} color="primary" variant="h4"> Session ID: {this.state.sessionId}</Typography>
    
                    <Typography variant="h6" className={classes.partListTitle}> Participants: </Typography>
                    <div className={classes.partListContainer}>
                        <List className={classes.list}>
                        
                            {this.createPartList(this.state.participants)}
                        
                        </List>
                    </div>
    
                </Card>
    
            </Container>
        ); 
    }
}

export default withRouter(withStyles(styles, {withTheme: true})(PreSessionGuest));