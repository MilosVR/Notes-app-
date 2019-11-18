import React, { useState } from 'react'

const Note = (props) => {

    const [noteStatus, setNoteStatus] = useState(false)

    const noteStatusHandler = (e, id) => {
        setNoteStatus(e.currentTarget.checked)
    }
    return (
        <div className='note-item'>
            <div className='note-item-inner'>
                <div className='note-inner-title-author'>
                    <h4>{props.note.title}</h4>
                    <input type='checkbox' 
                           checked={noteStatus} 
                           className='note-status'
                           onChange={e => noteStatusHandler(e, props.note.id)}
                        />
                    <p>by {props.note.author_name} </p>
                </div>
                <div className={`note-inner-body ${noteStatus ? 'note-item-underline' :''}`}>Body : {props.note.body}</div>
                <p>{props.note.date}</p>
            </div>
            <button onClick={e => props.deleteNote(e, props.note.id)}>Delete</button>
        </div>
    )
}

export default Note
