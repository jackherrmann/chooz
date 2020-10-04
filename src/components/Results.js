import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CardMedia from '@material-ui/core/CardMedia'; 
import { withStyles } from '@material-ui/core/styles';
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
        borderRadius: "1.5rem"
    },
    cardTitle: {
        marginTop: "1rem", 
        marginBottom: ".5rem"
    },
    subCardContainer: {
        width: '100%', 
        display: 'flex', 
        flexWrap: 'wrap', 
        flexDirection: 'row', 
        justifyContent: 'space-around'
    }, 
    subCard: {
            width: '35%', 
            marginTop: '1rem', 
            marginLeft: '1rem', 
            marginRight: '1rem', 
            marginBottom: '1rem', 
    }, 
    subCardMedia: {
        paddingTop: '56.25%',
    }, 
    subCardTitle: {
    },
    media: {
        width: "100%", 
        height: "20rem"
    }
});

class Results extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            results: props.location.state.matches
        }
        this.socket = props.socket;
    }

    createResultsCards() {
        const { classes } = this.props; 
        
        const cards = [];    
        for (let idx in this.state.results) {
            const cardName = this.state.results[idx].name; 
            const cardLink = this.state.results[idx].url; 
            const cardPic = this.state.results[idx].image_url;  
            cards.push(

                <Card className={classes.subCard}>
                    <a href={cardLink} target="_blank" rel="noopener noreferrer">

                        <CardMedia
                            className={classes.media}
                            component="img"
                            src={cardPic}
                            title="Item Image"
                        />

                        <Typography className={classes.subCardTitle} color="primary" variant="h5">
                            {cardName}
                        </Typography>
                    </a>
                </Card>
                
            ); 
        }
        return cards; 
    }
    

    render() {
        const { classes } = this.props; 

        return (

            <Container className={classes.container}>
    
                <Typography className={classes.title} variant="h1"> <Link className={classes.titleLink} style={{ textDecoration: 'none' }} to='/'> chooz.io </Link> </Typography>
    
                <Card className={classes.card}>
    
                    <Typography className={classes.cardTitle} color="primary" variant="h4"> Session Results </Typography>
                    <div className={classes.subCardContainer}>
                        {this.createResultsCards()}
                    </div>
                    
    
                </Card>
    
            </Container>
        ); 
    }

}


export default withStyles(styles, {withTheme: true})(Results);
