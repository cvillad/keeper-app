import React, { useState } from 'react';
import axios from 'axios';
import AddIcon from '@material-ui/icons/Add';
import { TextField, Fab, Zoom, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        display: "flex",
        justifyContent: "center"
    },
    card: {
        width: 340,
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    form: {
        width: "auto",
        margin: 16,
    },
    input: {
        width: "100%",
        margin: "5px 0"
    },
    button: {
        position: "relative",
        width: 36,
        height: 36,
        left: "80%",
        marginTop: 8,
        backgroundColor: "#f5ba13",
        color: "white"
    }
}));

function InputArea(props){
    const classes = useStyles();
    const [isEmpty, setIsEmpty] = useState(true)
    const [inputNote, setInputNote] = useState({
        title: "",
        content: ""
    });
    const {onAdd} = props;

    const handleChange = (event) => {
        const {name, value} = event.target;
        setInputNote((prevNote)=>{
            return{
                ...prevNote,
                [name]: value
            }
        });
    };

    const submitNote = (event) => {
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
        event.preventDefault();
    }

    return(
        <div className={classes.root}>
            <Card className={classes.card}>
                <form 
                    className={classes.form}
                    onSubmit={submitNote}>
                    {!isEmpty && <TextField
                        className={classes.input}
                        label="Title"
                        onChange={handleChange} 
                        name="title"
                        type="text" 
                        value={inputNote.title}/>}
                    <TextField
                        multiline
                        className={classes.input}
                        label={isEmpty? "Take a note..." : "Content"}
                        onChange={handleChange}
                        onClick={()=>setIsEmpty(false)}
                        name="content"
                        type="text"
                        rows={isEmpty? 1 : 4}
                        value={inputNote.content}
                    />
                    <Zoom in={!isEmpty}>
                        <Fab aria-label="add" type="submit" className={classes.button}>
                            <AddIcon/>
                        </Fab>
                    </Zoom>
                </form>
            </Card>
        </div>
    )
}

export default InputArea;