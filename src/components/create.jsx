import React, { useState ,useEffect} from "react";
import AddReactionIcon from '@mui/icons-material/AddReaction';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import axios from "axios";

const client = axios.create({
    baseURL: "http://localhost:8000/notes"
  })

function CreateArea(props){

    const [isexpanded,setexpanded]=useState(false);

    const [note,setNote]=useState({
        title:"",
        content:""
    });

    function handleChange(event){
          const {name,value}=event.target;
          
          setNote(prev=>{
            return {
                ...prev,
               [name]:value
            };
          });
    }

    function submitNote(event){
        props.onAdd(note);
        setNote({
            title:"",
            content:""
        })
        event.preventDefault();
    }

    function expand(){
        setexpanded(true);
    }

    return (
       <div>
        <form className="create-note">
            {isexpanded && (<input name="title" 
            onChange={handleChange} 
            placeholder="Title" 
            value={note.title}>
            </input>)}
            
            <textarea name="content" 
            onClick={expand} 
            onChange={handleChange} 
            placeholder="Take a note" 
            rows={isexpanded?3:1} 
            value={note.content}></textarea>
            <Zoom in={isexpanded}>
                <Fab onClick={submitNote}>
                   <AddReactionIcon/>
                </Fab>
            </Zoom>
            
        </form>
       </div>
    );
}

export default CreateArea;