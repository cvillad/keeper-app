import React, {useState, useEffect} from "react";
import axios from "axios";
import Footer from './Footer';
import Header from './Header';
import Note from "./Note";
import InputArea from "./InputArea";
import { Grid } from '@material-ui/core';

function Home(){
    const [notes, setNotes] = useState([]);

    useEffect(()=>{
        const getNotes = async () => {
            const response = await axios.get("http://localhost:3001/notes");
            if (response.data) {
                const data = response.data;
                setNotes(data);
            }
        };
        getNotes();
    }, []);

    return (
        <div>
            <Header/>
            <InputArea
                onAdd={setNotes}/>
            <Grid>
                <Grid container item xs={12}>  
                {notes.map(note =>(
                    <Note
                        key={note._id}
                        _id={note._id}
                        title={note.title} 
                        content={note.content}
                        onDelete={setNotes}/>
                    ))}
                </Grid>
            </Grid>
            <Footer/>
        </div>
    )
}

export default Home;