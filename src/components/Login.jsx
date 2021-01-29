import React from 'react'
import { useForm } from "react-hook-form";
import { Typography, Button, Card, Link, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import history from '../history'

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    card: {
        padding: "40px 50px",
        width: 260,
        height: 380,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    form: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    input: {
        width: "inherit",
        marginTop: 25
    },
    buttonContainer:{
        marginTop: 30,
        display: "flex",
        flexDirection: "column",

    },
    button: {
        backgroundColor: "#f5ba13",
        marginTop: 10,
        alignSelf: "center"
    },
    errorMsg: {
        color: "#bf1650"
    },
    link: {
        color: "#f5ba13",
        cursor: "pointer",
        alignSelf: "center"
    },
    yellowText: {
        color: "#f5ba13",
        alignSelf: "center"
    }
    
}));

const Login = () => {
    const classes = useStyles()
    const { register, handleSubmit, watch, errors } = useForm({mode: "onChange"});
    const onSubmit = data => {
        history.push('/home')
    };

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <Typography className={classes.yellowText} variant="h4" >Login</Typography>

                    <TextField className={classes.input} name="email" label="Email" inputRef={register({required: true})}/>
                    {errors.email && <Typography className={classes.errorMsg}>This field is required</Typography>}

                    <TextField className={classes.input} name="password" label="Password" inputRef={register({required: true})} defaultValue=""/>
                    {errors.password && <Typography className={classes.errorMsg}>This field is required</Typography>}

                    <div className={classes.buttonContainer}>
                        <Link href="/signup" className={classes.link} >Don't you have an account? Sign Up</Link>
                        <Button style={{color: "white"}} className={classes.button} variant="contained" size="large" type='submit'>Log in</Button>
                    </div>
                </form>
            </Card>
        </div>
    )
}

export default Login;