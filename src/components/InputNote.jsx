import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import AddIcon from '@material-ui/icons/Add';
import { TextField, Fab, Zoom, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        display: "flex",
        justifyContent: "center"
    },
    card: {
        height: "auto",
        width: 340,
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    form: {
        width: "auto",
        margin: "10px 20px",
    },
    input: {
        width: "100%",
        margin: "5px 0"
    },
    button: {
        position: "relative",
        width: 36,
        height: 36,
        left: "92%",
        marginTop: 8,
        backgroundColor: "#f5ba13",
        color: "white"
    },
    errorMsg: {
        color: "#bf1650"
    }
}));

const formSchema = yup.object().shape({
    title: yup.string().required(),
    content: yup.string().required()
})

const InputNote = (props) => {
    const classes = useStyles();
    const [isEmpty, setIsEmpty] = useState(true)
    const [inputNote, setInputNote] = useState({
        title: "",
        content: ""
    });
    const { register, handleSubmit, formState, watch } = useForm({
        mode: "onChange",
        resolver: yupResolver(formSchema)
    });
    const {onAdd} = props;
    const title = watch("title") || "";
    const content = watch("content") || "";

    useEffect(()=>{
        setInputNote({title, content})
    }, [title, content])

    

    const submitNote = (data) => {
        const createNote = async () => {
            const url = 'http://localhost:3001/note';
            const options = {
                headers: { 'Content-Type': 'application/json' }
            };
            const response = await axios.post(
                url,
                inputNote,
                options
            );
            const {_id, title, content} = response.data.data;
            onAdd((prevNotes)=>{return [{_id, title, content}, ...prevNotes]});
        }
        createNote();
        setInputNote({
            title: "",
            content: ""
        });
        setIsEmpty(true);
    }

    return(
        <div className={classes.root}>
            <Card className={classes.card}>
                <form 
                    className={classes.form}
                    onSubmit={handleSubmit(submitNote)}>
                    {!isEmpty && <TextField
                        InputProps = {{disableUnderline: true}}
                        inputRef={register}
                        className={classes.input}
                        label="Title"
                        name="title"
                        type="text"/>}
                    <TextField
                        multiline
                        InputProps = {{disableUnderline: true}}
                        inputRef={register}
                        className={classes.input}
                        label={isEmpty? "Take a note..." : "Content"}
                        onClick={()=>setIsEmpty(false)}
                        name="content"
                        type="text"
                        rows={isEmpty? 1 : 5}
                        //value={inputNote.content}
                    />
                    <Zoom in={formState.isValid}>
                        <Fab aria-label="add" type="submit" className={classes.button}>
                            <AddIcon/>
                        </Fab>
                    </Zoom>
                </form>
            </Card>
        </div>
    )
}

export default InputNote;