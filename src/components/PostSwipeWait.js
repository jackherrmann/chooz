import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { CircularProgress } from '@material-ui/core';

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
        justifyContent: 'space-around',
        alignContent: 'center', 
        alignItems: 'center',
        marginBottom: '1rem',
    },
    cardTitle: {
        marginTop: "1rem", 
        marginBottom: '3rem'
    }, 
    formControl: {
        marginBottom: "2rem", 
    },
    spacedContainer: {
        marginBottom: '1rem',
        marginTop: '1rem',
    },

});




class PostSwipeWait extends React.Component {

    constructor(props) {
        super(props);
        this.socket = props.socket;
    }

    componentDidMount() {
        this.socket.on('finished_all', (data) => {
            const {matches} = data;
            this.props.history.push({
                pathname: '/results',
                state: {
                    matches: matches
                }
            });
        })
    }

    
    render() {
        const {classes} = this.props;

        return (

            <Container className={classes.container}>
    
                <Typography className={classes.title} color="primary" variant="h1"> chooz.io</Typography>
    
                <Card className={classes.card}>
    
                    <Typography className={classes.cardTitle} color="primary" variant="h4"> Waiting for your friends to finish...</Typography>

                    <Container className={classes.spacedContainer}>
                        <CircularProgress color="secondary" marginBottom="1rem" marginTop="1rem" />
                    </Container>

                </Card>
    
            </Container>
        ); 
    }
}

export default withRouter(withStyles(styles, {withTheme: true})(PostSwipeWait));