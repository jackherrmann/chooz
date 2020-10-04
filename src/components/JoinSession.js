import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

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
        marginBottom: "2rem"
    }, 
    formControl: {
        marginBottom: "2rem", 
    }, 
    keywordInput: {
        marginBottom: "2rem"
    }, 
    joinButton: {
        marginBottom: "2rem", 
        backgroundColor: '#5353b5', 
        color: 'white'
    }, 
});


class JoinSession extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sessionId: "",
            name: ""
        }
        this.socket = props.socket;
    }

    componentDidMount() {
        this.socket.on('join_attempt_result', result => {
            if (result) {
                this.props.history.push({
                    pathname: '/presession-guest',
                    state: {
                        name: this.state.name
                    }
                })
            }
            else {
                window.alert("Session does not exist");
            }
        })
    }

    handleNameChange = (event) => {
        this.setState({name: event.target.value});
    }
    handleIdChange = (event) => {
        this.setState({sessionId: event.target.value});
    }
    handleJoin = () => {
        console.log('joining');
        const data = {
            'name': this.state.name,
            'sessionId': this.state.sessionId
        }
        this.socket.emit('join_session', data);
    }

    render() {
        const{classes} = this.props;

        return (

            <Container className={classes.container}>

                <Typography className={classes.title} variant="h1"> <Link className={classes.titleLink} style={{ textDecoration: 'none' }} to='/'> chooz.io </Link> </Typography>

                <Card className={classes.card}>

                    <Typography className={classes.cardTitle} color="primary" variant="h4"> Join a Session</Typography>

                    <TextField className={classes.keywordInput} id="nameInput" label="Enter Your Name" defaultValue="" onChange={this.handleNameChange} />

                    <TextField className={classes.keywordInput} id="sessionId" label="Enter Session ID" defaultValue="" onChange={this.handleIdChange} />

                    <Button className={classes.joinButton} variant="contained" onClick={this.handleJoin}>Join Session</Button>

                </Card>

            </Container>
        ); 
    }

}

export default withRouter(withStyles(styles, {withTheme: true})(JoinSession));