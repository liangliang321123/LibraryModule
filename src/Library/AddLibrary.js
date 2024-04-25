import React, { useState, useEffect } from 'react';
import "../css/PopUp.css";

const AddLibrary = (props) => {

    const { trigger,
        setTrigger,
        handleAdd,
        title,
        author,
        description,
        genre,
        availability,
        setTitle,
        setAuthor,
        setDescription,
        setGenre,
        setAvailability,
    } = props.passInfo;

    // const firstName = props.firstName;
    // const lastName = props.lastName;
    // const fullName = props.fullName;
    // const department = props.department;
    // const isActive = props.isActive;

    // const setFirstName = props.setFirstName;
    // const setLastName = props.setLastName;
    // const setFullName = props.setFullName;
    // const setDepartment = props.setDepartment;
    // const setIsActive = props.setIsActive;

    //const handleAdd = props.handleAdd;

    const handleActiveChange = (e) => {
        if (e.target.checked) {
            setAvailability(true);
        }
        else {
            setAvailability(false);
        }
    }

    return (trigger) ?
        (
            <div className='popUp'>
                <div className='popUp_header'>
                    <h1>Add Book</h1>
                </div>
                <form className='popUp_form'>
                    <label>Title:</label>
                    <input
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} />
                    <br />

                    <label>Author:</label>
                    <input
                        type='text'
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)} />
                    <br />

                    <label>Description:</label>
                    <input
                        type='text'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} />
                    <br />

                    <label>Genre:</label>
                    <input
                        type='text'
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)} />
                    <br />

                    <div className='checkboxWrapper'>
                        <label>
                            Availability ?
                        </label>
                        <input
                            type='checkbox'
                            value={availability}
                            checked={availability === true ? true : false}
                            // onChange = {(e) => setIsActive(e.target.value)}
                            onChange={(e) => handleActiveChange(e)}
                        />
                    </div>
                </form>
                <button className='popUp_closeBtn' onClick={() => handleAdd()}>Add Book</button>
                <button className='popUp_closeBtn' onClick={() => setTrigger(false)}>Close</button>

            </div>

        ) : ""
}
export default AddLibrary;