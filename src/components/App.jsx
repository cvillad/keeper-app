import React, {useState, useEffect} from "react";
import axios from "axios";
import Footer from './Footer';
import Header from './Header';
import Note from "./Note";
import InputArea from "./InputArea";


function App(){
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


    return <div>
        <Header/>
        <InputArea
            onAdd={setNotes}
        />
        {notes.map((note) => 
            <Note
                key={note._id}
                _id={note._id}
                title={note.title} 
                content={note.content}
                onDelete={setNotes}
            />)}
        <Footer/>
    </div>
}

export default App;