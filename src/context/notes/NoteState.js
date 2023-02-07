// import react from "react";
import { useState } from "react";
import NoteContext from "./noteContext";
// import { useState } from "react";

const NoteState = (props) => {

  const host = "http://localhost:5000";

  let notesInitial = []

  const [notes, setNotes] = useState(notesInitial);

  //   get all Notes
  const getAllNotes = async () => {
    // Api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkZTFiM2Y1M2RlMjk2OTU3OWUwOTgzIn0sImlhdCI6MTY3NTUwOTU2NH0.JqdEueUuUNt5d8-wkWJHur7OYdvv-sWkfvx_RTQMsw0'
      },
    });
    const json = await response.json();
    console.log(json);
    // just pass all the notes avilable in the backend
    setNotes(json)
  }

  //   ADD a Note
  const addNote = async (title, description, tag) => {
    // Api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkZTFiM2Y1M2RlMjk2OTU3OWUwOTgzIn0sImlhdCI6MTY3NTUwOTU2NH0.JqdEueUuUNt5d8-wkWJHur7OYdvv-sWkfvx_RTQMsw0'
      },
      body: JSON.stringify({ title, description, tag })
    });
    // const json = response.json();

    // Logic to add the note

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

  //   DELETE a Note (id is props here)
  const deleteNote = (id) => {
    console.log("Deleting the node with id " + id);
    // agar notes._id not equal h id k(id of that ele which we want to delete) to vo notes me rhega otherwise ni rhega
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes);
  }

  //   EDIT a Note
  const editNote = async (id, title, description, tag) => {
    // Api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkZTFiM2Y1M2RlMjk2OTU3OWUwOTgzIn0sImlhdCI6MTY3NTUwOTU2NH0.JqdEueUuUNt5d8-wkWJHur7OYdvv-sWkfvx_RTQMsw0'
      },
      body: JSON.stringify({ title, description, tag })
    });
    // const json = response.json();

    // Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      let element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  }

  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote,getAllNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;