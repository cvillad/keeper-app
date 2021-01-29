import React from 'react'
import { FormControl, Input, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: "inherit",
        margin: "10px 0px"
    },
    errorMsg: {
        color: "#bf1650"
    }
    
}));

const InputForm = (props) => {
    const classes = useStyles();
    const {name, required, register, errors} = props;
    const nameLowerCase = name.toLowerCase()

    return (
        <FormControl className={classes.formControl}>
            <InputLabel htmlFor={name}>{name}</InputLabel>
            <Input name={nameLowerCase} aria-describedby={nameLowerCase+"-helper-text"} inputRef={register({required})}/>
            {errors.nameLowerCase && <p className={classes.errorMsg}>This field is required</p>}
        </FormControl>
    )
}

export default InputForm;