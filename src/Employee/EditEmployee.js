import React, { useState, useEffect } from 'react';
import "../css/PopUp.css";

const EditEmployee = (props) => {

    const editPopUp = props.trigger;
    const setEditPopUp = props.setTrigger;

    const editFirstName = props.editFirstName;
    const editLastName = props.editLastName;
    const editFullName = props.editFullName;
    const editDepartment = props.editDepartment;
    const editIsActive = props.editIsActive;

    const setEditFirstName = props.setEditFirstName;
    const setEditLastName = props.setEditLastName;
    const setEditFullName = props.setEditFullName;
    const setEditDepartment = props.setEditDepartment;
    const setEditIsActive = props.setEditIsActive;

    const handleUpdate = props.handleUpdate;

    const handleEditActiveChange = (e) => {
        if(e.target.checked)
        {
            setEditIsActive(1);
        }
        else
        {
            setEditIsActive(0);
        }
    }

    return (editPopUp) ?
        (
            <div className='popUp'>
                <div className='popUp_header'>
                    <h1>Edit Employee</h1>
                </div>
                <form className='popUp_form'>
                    <label>First Name:</label>
                    <input 
                    type='text' 
                    value={editFirstName}
                    onChange={(e) => setEditFirstName(e.target.value)} />
                    <br />

                    <label>Last Name:</label>
                    <input 
                    type='text' 
                    value={editLastName}
                    onChange={(e) => setEditLastName(e.target.value)} />
                    <br />

                    <label>Full Name:</label>
                    <input 
                    type='text' 
                    value={editFullName}
                    onChange={(e) => setEditFullName(e.target.value)} />
                    <br />

                    <label>Department:</label>
                    <input 
                    type='text' 
                    value={editDepartment}
                    onChange={(e) => setEditDepartment(e.target.value)} />
                    <br />

                    <div className='checkboxWrapper'>
                        <label>
                            Active ?
                        </label>
                        <input 
                        type='checkbox'
                        value={editIsActive}
                        checked={editIsActive === 1 ? true : false} 
                        onChange={(e) => handleEditActiveChange(e)}
                        />
                    </div>
                </form>
                <button className='popUp_closeBtn' onClick={() => { handleUpdate()}}>Update</button>
                <button className='popUp_closeBtn' onClick={() => { setEditPopUp(false) }}>Close</button>
            </div>

        ) : ""
}
export default EditEmployee;