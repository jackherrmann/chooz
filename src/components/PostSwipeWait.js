import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List'; 
import ListItem from '@material-ui/core/ListItem'; 
import ListItemText from '@material-ui/core/ListItemText'; 
import { render } from '@testing-library/react';

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
    }

});




class PreSessionGuest extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
        this.socket = props.socket;
    }

    componentDidMount() {
        this.socket.on('initial_joined_session', data => {
            const {sessionId, participants} = data;
            console.log ("received", sessionId);
            this.setState({
                sessionId: sessionId,
                participants: participants
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

    
    render() {
        const {classes} = this.props;

        return (

            <Container className={classes.container}>
    
                <Typography className={classes.title} color="primary" variant="h1"> chooz.io</Typography>
    
                <Card className={classes.card}>
    
                    <Typography className={classes.cardTitle} color="primary" variant="h4"> Waiting for your friends to finish...</Typography>
    
                </Card>
    
            </Container>
        ); 
    }
}

export default withRouter(withStyles(styles, {withTheme: true})(PreSessionGuest));