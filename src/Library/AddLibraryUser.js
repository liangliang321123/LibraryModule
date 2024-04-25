import React, { useState, useEffect } from 'react';
import "../css/PopUp.css";

const AddLibraryUser = (props) => {

    const { trigger,
        setTrigger,
        handleAdd,
        firstName,
        lastName,
        fullName,
        email,
        phone,
        isActive,
        password,
        role,
        loginUsername,
        setFirstName,
        setLastName,
        setFullName,
        setEmail,
        setPhone,
        setIsActive,
        setPassword,
        setRole,
        setLoginUsername,
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
            setIsActive(true);
        }
        else {
            setIsActive(false);
        }
    }

    return (trigger) ?
        (
            <div className='popUp'>
                <div className='popUp_header'>
                    <h1>Add User</h1>
                </div>
                <form className='popUp_form'>
                    <label>FirstName:</label>
                    <input
                        type='text'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)} />
                    <br />

                    <label>LastName:</label>
                    <input
                        type='text'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)} />
                    <br />

                    <label>FullName:</label>
                    <input
                        type='text'
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)} />
                    <br />

                    <label>Email:</label>
                    <input
                        type='text'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    <br />

                    <label>Phone:</label>
                    <input
                        type='text'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)} />
                    <br />

                    <div className='checkboxWrapper'>
                        <label>
                            Availability ?
                        </label>
                        <input
                            type='checkbox'
                            value={isActive}
                            checked={isActive === true ? true : false}
                            // onChange = {(e) => setIsActive(e.target.value)}
                            onChange={(e) => handleActiveChange(e)}
                        />
                    </div>

                    <label>Password:</label>
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    <br />

                    <label>Role:</label>
                    <select onChange={(e) => setRole(e.target.value)} value={role}>
                        <option value='admin' >Admin</option>
                        <option value='user'>User</option>
                    </select>

                    <label>LoginUsername:</label>
                    <input
                        type='text'
                        value={loginUsername}
                        onChange={(e) => setLoginUsername(e.target.value)} />
                    <br />
                </form>
                <button className='popUp_closeBtn' onClick={() => handleAdd()}>Add User</button>
                <button className='popUp_closeBtn' onClick={() => setTrigger(false)}>Close</button>

            </div>

        ) : ""
}
export default AddLibraryUser;