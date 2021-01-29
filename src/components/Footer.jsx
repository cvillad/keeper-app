import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        backgroundColor: "inherit",
        position: "absolute",
        bottom: 0,
        height: "2.5rem",
        width: "100%",
        justifyContent: "center"
    }
}));

const Footer = () => {
    const classes = useStyles();

    return( 
        <div className={classes.root}>
            <Typography component="p">
                Copyright ⓒ {new Date().getFullYear()}
            </Typography>
        </div>
    )
}

export default Footer;