import Note from "./components/Note";
import Header from "./components/header";
import Footer from "./components/Footer";
import CreateArea from "./components/create";
import { useEffect, useState } from "react";
import axios from 'axios';

const client = axios.create({
  baseURL: "http://localhost:5000/notes"
})

function App() {
  const [notes,setNotes]=useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/notes`)
    .then((res) => res.json())
    .then((data) => setNotes(data))
  })
  
  function AddNote(newNote) {
    try {
      client.post('', newNote)
    } catch(e) {
      console.log(e)
    }
  }
  function deleteNote(id) {
    client.delete(`/${id}`)
    .then((res) => alert(res.data.message))
  }

  return (
    <div>
      <Header/>
      <CreateArea onAdd={AddNote}/>
        {notes.map((noteItem,index)=>{
            return <Note 
            key= {index}
            id={noteItem._id}
            title={noteItem.title} 
            content={noteItem.content}
            onDelete={deleteNote}
            />
          })}
      <Footer/>
    </div>
  );
}

export default App;
