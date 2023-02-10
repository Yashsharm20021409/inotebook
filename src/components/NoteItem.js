import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const NoteItem = (props) => {
    const context = useContext( noteContext);
    // destructring
    const {deleteNote}  = context;
    const { note ,updateNotes} = props;
    // onClick hse click ho given function ko call krdo
    return (
        <div className='col-md-3 mx-3'>
            {/* {note.title}
            {note.description} */}
            <div className="card my-3 " style={{"width" :"18rem"}}>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <p className='card-text '><b>TAG: </b>{note.tag}</p>
                    <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id ); props.showAlert("Note Deleted Successfully","success")}} style={{'cursor':'pointer'}}></i>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNotes(note)}} style={{'cursor':'pointer'}}></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
