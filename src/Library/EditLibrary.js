import React, { useState, useEffect } from 'react';
import "../css/PopUp.css";

const EditLibrary = (props) => {

    const {
        editTrigger,
        setTrigger,
        handleUpdate,
        editTitle,
        editAuthor,
        editDescription,
        editGenre,
        editAvailability,
        // editBorrower,
        // editDueDate,
        setEditTitle,
        setEditAuthor,
        setEditDescription,
        setEditGenre,
        setEditAvailability,
        // setEditBorrower,
        // setEditDueDate,
    } = props.passInfo;

    const handleEditActiveChange = (e) => {
        if(e.target.checked)
        {
            setEditAvailability(true);
        }
        else
        {
            setEditAvailability(false);
        }
    }

    return (editTrigger) ?
        (
            <div className='popUp'>
                <div className='popUp_header'>
                    <h1>Update Books</h1>
                </div>
                <form className='popUp_form'>
                    <label>Title:</label>
                    <input 
                    type='text' 
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)} />
                    <br />

                    <label>Author:</label>
                    <input 
                    type='text' 
                    value={editAuthor}
                    onChange={(e) => setEditAuthor(e.target.value)} />
                    <br />

                    <label>Description:</label>
                    <input 
                    type='text' 
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)} />
                    <br />

                    <label>Genre:</label>
                    <input 
                    type='text' 
                    value={editGenre}
                    onChange={(e) => setEditGenre(e.target.value)} />
                    <br />

                    <div className='checkboxWrapper'>
                        <label>
                            Availability ?
                        </label>
                        <input 
                        type='checkbox'
                        value={editAvailability}
                        checked={editAvailability === true ? true : false} 
                        onChange={(e) => handleEditActiveChange(e)}
                        />
                    </div>

                    {/* <label>Borrower:</label>
                    <input 
                    type='text' 
                    value={editBorrower}
                    onChange={(e) => setEditBorrower(e.target.value)} />
                    <br />

                    <label>Due Date:</label>
                    <input 
                    type='date' 
                    value={editDueDate}
                    onChange={(e) => setEditDueDate(e.target.value)} />
                    <br /> */}
                </form>
                <button className='popUp_closeBtn' onClick={() => { handleUpdate()}}>Update</button>
                <button className='popUp_closeBtn' onClick={() => { setTrigger(false) }}>Close</button>
            </div>

        ) : ""
}
export default EditLibrary;