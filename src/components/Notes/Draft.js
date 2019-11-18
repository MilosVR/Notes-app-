import React from 'react'

const Draft = (props) => {
    return (
        <div className='draft-item'>
            <div className='draft-item-wraper'>
                <div className='draft-item-title'>
                    Title : { props.draft.title }
                </div>
                <div className='draft-item-author'>
                    Author : { props.draft.author_name }
                </div>  
                <div className='draft-item-body'>
                    Body : { props.draft.body }
                </div>
            </div>
            <div className='draft-item-btns'> 
                <button 
                    onClick={e => props.uploadDraft(e, props.draft.id)}>Send
                </button>
                <button onClick={props.closeDraftModal}>Close</button>
            </div>
        </div>
    )
}

export default Draft
