import React, { useState, useEffect } from 'react';
import "../css/PopUp.css";

const AddEmployee = (props) => {

    const addPopUp = props.trigger;
    const setAddPopUp = props.setTrigger;

    const firstName = props.firstName;
    const lastName = props.lastName;
    const fullName = props.fullName;
    const department = props.department;
    const isActive = props.isActive;

    const setFirstName = props.setFirstName;
    const setLastName = props.setLastName;
    const setFullName = props.setFullName;
    const setDepartment = props.setDepartment;
    const setIsActive = props.setIsActive;

    const handleAdd = props.handleAdd;

    const handleActiveChange = (e) => {
        if(e.target.checked)
        {
            setIsActive(1);
        }
        else
        {
            setIsActive(0);
        }
    }

    return (addPopUp) ?
        (
            <div className='popUp'>
                <div className='popUp_header'>
                    <h1>Add Employee</h1>
                </div>
                <form className='popUp_form'>
                    <label>First Name:</label>
                    <input
                        type='text'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)} />
                    <br />

                    <label>Last Name:</label>
                    <input
                        type='text'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)} />
                    <br />

                    <label>Full Name:</label>
                    <input
                        type='text'
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)} />
                    <br />

                    <label>Department:</label>
                    <input
                        type='text'
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)} />
                    <br />

                    <div className='checkboxWrapper'>
                        <label>
                            Active ?
                        </label>
                        <input
                            type='checkbox'
                            value={isActive}
                            checked={isActive === 1 ? true : false}
                            // onChange = {(e) => setIsActive(e.target.value)}
                            onChange = {(e) => handleActiveChange(e)}
                        />
                    </div>
                </form>
                <button className='popUp_closeBtn'onClick = {()=>handleAdd()}>Add Employee</button>
                <button className='popUp_closeBtn' onClick={() => setAddPopUp(false)}>Close</button>

            </div>

        ) : ""
}
export default AddEmployee;