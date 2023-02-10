import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import AddNote from './AddNote';
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom'
// import Alert from './Alert';

const Notes = (props) => {
    const context = useContext(noteContext);
    // destructring
    const { notes, getAllNotes, editNote } = context;
    const ref = useRef(null)
    const closeRef = useRef(null)
    const [note, setNotes] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    let navigate = useNavigate();

    // setNotes({

    // })
    useEffect(() => {
        if(localStorage.getItem('token')){
            getAllNotes()
        }else{
            navigate("/login");
        }
        // eslint-disable-next-line
    }, [])

    const updateNotes = (currentNotes) => {
        ref.current.click();
        setNotes({ id: currentNotes._id, etitle: currentNotes.title, edescription: currentNotes.description, etag: currentNotes.tag })
        
    }

    // to refenece any ele

    const handleClick = (e) => {
        e.preventDefault();
        // addNote(note.etitle,note.edescription,note.etag)
        // console.log("updated",note)
        closeRef.current.click();
        editNote(note.id, note.etitle, note.edescription, note.etag)
        props.showAlert("Note Updated Successfully","success")
    }

    const onChange = (e) => {
        setNotes({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <AddNote  showAlert = {props.showAlert}/>

            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="container my-3">
                                <form className='my-3'>
                                    <div className="mb-3">
                                        <label htmlFor="etitle" className="form- label ">Title</label>
                                        <input type="text" className="form-control " name='etitle' id="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange}  />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="edescription" className="form-label ">Description</label>
                                        <input type="text" className="form-control" id="edesc" name="edescription" value={note.edescription} onChange={onChange}  />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="etag" className="form-label ">Tag</label>
                                        <input type="etag" className="form-control" value={note.etag} id="etag" name="etag" onChange={onChange}  />
                                    </div>
                                </form>

                            </div>
                        </div>
                        <div className="modal-footer">
                            <button ref={closeRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleClick} disabled={note.etitle.length < 5 || note.edescription.length < 5 } type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2 className='my-3'>Your Notes</h2>
                <div className="container">
                    {notes.length === 0 && 'No Notes to Display'}
                </div>
                {
                    notes.map((note) => {
                        return <NoteItem key={note._id} updateNotes={updateNotes} note={note} showAlert = {props.showAlert}/>
                    })
                }
            </div>
        </>
    )
}

export default Notes
