import React from 'react'
import axios from 'axios';
import { useForm } from "react-hook-form";
import { Typography, Button, Card, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import history from '../history'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';

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
        height: "auto",
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

const formSchema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("Type a valid email").required("Email is required"),
    password: yup.string().required("Password is required")
});

const SignUp = () => {
    const classes = useStyles()
    const { register, handleSubmit, formState, errors } = useForm({
        mode: "onChange",
        resolver: yupResolver(formSchema)
    });
    
    console.log(formSchema)
    const onSubmit = data => {
        const createUser = async () => {
            const url = 'http://localhost:3001/user';
            const options = {
                headers: { 'Content-Type': 'application/json' }
            };
            console.log(data)
            const response = await axios.post(
                url,
                data,
                options
            );
            response.data.success ? console.log(response.data.data) : console.log(response.data)
        }
        createUser();
    };

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <Typography className={classes.yellowText} variant="h4">Sign Up</Typography>

                    <TextField className={classes.input} name="firstName" label="First Name" inputRef={register}/>
                    {errors.firstName && <Typography className={classes.errorMsg}>{errors.firstName.message}</Typography>}

                    <TextField className={classes.input} name="lastName" label="Last Name" inputRef={register}/>
                    {errors.lastName && <Typography className={classes.errorMsg}>{errors.lastName.message}</Typography>}

                    <TextField className={classes.input} name="email" label="Email" inputRef={register}/>
                    {errors.email && <Typography className={classes.errorMsg}>{errors.email.message}</Typography>}

                    <TextField type="password" className={classes.input} name="password" label="Password" inputRef={register}/>
                    {errors.password && <Typography className={classes.errorMsg}>{errors.password.message}</Typography>}

                    <div className={classes.buttonContainer}>
                        <Button disabled={!formState.isValid} style={{color: "white"}} className={classes.button} variant="contained" size="large" type='submit'>Sign Up</Button>
                    </div>
                </form>
            </Card>
        </div>
    )
}

export default SignUp;