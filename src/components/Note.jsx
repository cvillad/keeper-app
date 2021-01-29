import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios"
import DeleteIcon from '@material-ui/icons/Delete';
import { Card, Zoom, Button, Typography, CardContent, CardActions, Grid } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        margin: 15,
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
});

const Note = (props) => {
    const classes = useStyles();
    const [deleted, setDeleted] = useState(false);
    const {_id, title, content, onDelete} = props;

    const deleteNote = async () =>{
        const url = 'http://localhost:3001/note';
        const options = {
            headers: { 'Content-Type': 'application/json' }
        };
        const response = await axios.delete(
            url,
            {data: {_id}},
            options
        );
        if(response.data.success){
            onDelete((prevNotes)=>{
                return prevNotes.filter((note)=>
                    note._id!==_id
                )
            });
        }else{
            console.log(response.data)
        }
    };

    return (
        <Zoom in={!deleted} onExited={deleteNote}>
            <Grid item xs={2}>
                <Card className={classes.root}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {title}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {content}
                        </Typography>
                    </CardContent>
                    <CardActions style={{justifyContent: "flex-end"}}>
                        <Button style={{minWidth: 0}} onClick={()=>setDeleted(true)} size="small"><DeleteIcon/></Button>
                    </CardActions>
                </Card>
            </Grid>
        </Zoom>
    )
}

export default Note;