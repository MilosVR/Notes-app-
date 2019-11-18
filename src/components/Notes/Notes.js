import React, {useEffect, useState} from "react";
import axios from 'axios'
import Draft from './Draft'
import Note from './Note'
import './Notes.scss'

let allNotes = []
let allDrafts = []

function Notes() {

    useEffect(()=> {
        axios('./static/notes.json')
            .then(res => {
                allNotes = res.data
                setNotes(res.data)
            })
            .catch(err => console.log(err))
    },[])

    const [notes, setNotes] = useState([]);
    const [search, setSearch] = useState("");
    const [newNote, setNewNote] = useState({
        title:'',
        author:'',
        body:''
    })
    const [draft, setDraft] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDraftOpen, setIsDraftOpen] = useState(false)
  
  const sortOldest = e => {
    let mapData = [...notes].sort(function(a,b){
        return new Date(a.date) - new Date(b.date);
    });
    setNotes(mapData)
  }
  const sortNewest = e => {
    let mapData = [...notes].sort(function(a,b){
        return new Date(b.date) - new Date(a.date);
    });
    setNotes(mapData)
  }

  const addNote = e => {
    setNewNote({
            ...newNote, 
            [e.target.name]:e.target.value 
    })
}
  const submitNote = e => {
      e.preventDefault()
      
      let newDate = new Date().toString().split(' ').slice(1,5).map(item => item + ' ')
      
      const addedNote = {}
      addedNote.author_name = newNote.author;
      addedNote.title = newNote.title;
      addedNote.body = newNote.body;
      addedNote.status = false
      addedNote.id = Math.random()
      addedNote.date = newDate
      allNotes = [...allNotes, addedNote]
      setIsModalOpen(false)
      setNotes(allNotes)
      resetInputValue({})
  }

  const MoveToDraft = () => {
    const addedNote = {}
    addedNote.author_name = newNote.author;
    addedNote.title = newNote.title;
    addedNote.body = newNote.body;
    addedNote.status = false
    addedNote.id = Math.random()
    allDrafts = [...allDrafts, addedNote]
    setIsModalOpen(false)
    setDraft(allDrafts)
    resetInputValue({
        title : '',
        author : '',
        body : ''
    })
  }

  const uploadDraft = (e,id) => {
      const savedDraft = allDrafts.find(item => item.id === id)
      setIsModalOpen(true)
      setNewNote({
          title : savedDraft.title,
          author : savedDraft.author_name,
          body : savedDraft.body
      })
      setIsDraftOpen(false)
  }

  const searchNotes = e => {
    const filteredNotes = allNotes.filter(note => {
      return note.title.toLowerCase().includes(e.target.value.toLowerCase());
    });
    
    setNotes(filteredNotes);
    setSearch(e.target.value);
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }
  const closeModal = () => {
    setIsModalOpen(false)
  }
  const deleteNote = (e, id) => {
    allNotes = allNotes.filter(item => item.id !== id)
    setNotes(allNotes)
  }

  const toggleDraftItems = () => {
    setIsDraftOpen(!isDraftOpen)
  }
  const closeDraftModal = () => {
    setIsDraftOpen(false)
  }
  const resetInputValue = val => {
    setNewNote(val)
  }
  return (
    <div className='notes-app'>
      <div className="container">

        <h1 className='notes-main-title'>Notes app</h1>

        <div className='notes-search-fiter'>
          <div className='notes-search-fiter-input'>
            <label>Search by Title </label>
            <input
              onChange={e => searchNotes(e)}
              type="text"
              value={search}
            />
          </div>

          <div className='notes-sort-btns'>
              <button onClick={sortNewest}>Newest</button>
              <button onClick={sortOldest}>Oldest</button>
          </div>
        </div>

        <div className='notes-app-body'>
          <div className='add-draft-btn'>
            <div onClick={toggleModal} className='draft-btn'>Add Note</div>
            <div onClick={toggleDraftItems} className='draft-btn'>
              Drafts ({draft.length})
            
            </div> 
          </div>

          <div className='note_wraper'>
            {notes && notes.map(note => (
                  <Note key={note.id} 
                        note={note} 
                        deleteNote={deleteNote}
                      />
                ))}
          </div>
        </div>

        </div>
        {isModalOpen && 
        <div className='modal' >
          <div className='modal-inner'>
            <h2>Add Note</h2>
            <form onSubmit={submitNote} autoComplete='off'>

              <div className='modal-inner-form-field'>
                  <label>Title </label>
                  <input name='title' type='text' onChange={addNote} value={newNote.title}/>
              </div>
              <div className='modal-inner-form-field'>
                  <label>Author </label>
                  <input name='author' type='text' onChange={addNote} value={newNote.author}/>
              </div>
              <div className='modal-inner-form-field'>
                  <label>Description </label>
                  <input name='body' type='text' onChange={addNote} value={newNote.body}/>
              </div>
              
              <div className='modal-btns'>
                <div >
                  <button type="submit">Submit</button>
                  <button onClick={closeModal}>Close</button>
                </div>
                <button onClick={MoveToDraft}>Save as Draft</button>
              </div>

            </form>
          </div>
        </div>
        }
        {isDraftOpen && <div className='drafts-wraper'>
            <div className='drafts'>
                  
                  {draft.length > 0 ?
                     draft.map(item => {
                        return (
                          <Draft 
                            draft={item} 
                            uploadDraft={uploadDraft} 
                            key={item.id}
                            closeDraftModal={closeDraftModal}
                          />
                        )
                      })
                    : <div className='if-drafts-is-empty'>
                        <h2>No draft to show!</h2>
                        <button onClick={closeDraftModal}>Close</button>
                      </div>}
                  }
            </div>
          </div>
        }
    </div>
  );
}

export default Notes