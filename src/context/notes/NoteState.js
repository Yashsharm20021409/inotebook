// import react from "react";
import { useState } from "react";
import NoteContext from "./noteContext";
// import { useState } from "react";

const NoteState = (props) => {

    let notesInitial = [
        {
          "_id": "63e08d6c4bfe14d8a97443e38",
          "user": "63de1b3f53de2969579e0983",
          "title": "My title 3",
          "description": "This is My First Note 3",
          "tag": "personal",
          "timeStamp": "2023-02-06T05:17:32.389Z",
          "__v": 0
        },
        {
          "_id": "63e08d764bfaxe1d48a97443e3a",
          "user": "63de1b3f53de2969579e0983",
          "title": "My title",
          "description": "This is My First Note ",
          "tag": "personal",
          "timeStamp": "2023-02-06T05:17:42.004Z",
          "__v": 0
        }
        ,
        {
          "_id": "63e08d764bsdfe148da97443e3a",
          "user": "63de1b3f53de2969579e0983",
          "title": "My title",
          "description": "This is My First Note ",
          "tag": "personal",
          "timeStamp": "2023-02-06T05:17:42.004Z",
          "__v": 0
        }
        ,
        {
          "_id": "63e08d764bsdffe148a9d7443e3a",
          "user": "63de1b3f53de2969579e0983",
          "title": "My title",
          "description": "This is My First Note ",
          "tag": "personal",
          "timeStamp": "2023-02-06T05:17:42.004Z",
          "__v": 0
        }
      ]

      const [notes,setNotes] = useState(notesInitial);

      //   ADD a Note
      const addNote = (title,description,tag) =>{
        console.log("Adding a note")
        const note = {
            "_id": "63e08d6c4bfe14d8a97443e38",
            "user": "63de1b3f53de2969579e0983",
            "title": title,
            "description": description,
            "tag": tag,
            "timeStamp": "2023-02-06T05:17:32.389Z",
            "__v": 0
          }
        setNotes(notes.concat(note))
      }

      //   DELETE a Note
      const deleteNote = () =>{

      }

      //   EDIT a Note
      const editNote = () =>{

      }

    return (
        <NoteContext.Provider value={{notes,setNotes,addNote,deleteNote,editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;