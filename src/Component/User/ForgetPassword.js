import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "../../css/PopUp.css";
import axios from 'axios';

const ForgetPassword = () => {

    //const location = useLocation();
    const navigate = useNavigate();
    //const loginUsername = location.state.loginUsername;

    // const { loginUsername,
    // } = props.passInfo;
    //const loginUsername = props.loginUsername;
    //const [loginUsername, setLoginUsername] = useState('');

    let editBorrowerID = '';
    let editFirstName = '';
    let editLastName = '';
    let editFullName = '';
    let editEmail = '';
    let editPhone = '';
    let editRole = '';
    let editIsActive = '';
    const [editLoginUsername, setEditLoginUsername] = useState('');
    const [editPassword, setEditPassword] = useState('');

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    //use get /user/{username}
    const handleBEdit = () => {
        //axios.get(`https://localhost:44326/User/${editLoginUsername}`)
        axios.get(`https://localhost:44326/api/Library/BorrowerUsername/${editLoginUsername}`)
            .then((result) => {
                console.log(result.data);
                editBorrowerID = result.data.borrowerID;
                setEditPassword(result.data.password);
                editFirstName= (result.data.firstName);
                editLastName=(result.data.lastName)
                editFullName=(result.data.fullName)
                editEmail=(result.data.email);
                editPhone=(result.data.phone);
                editRole=(result.data.role);
                editIsActive=(result.data.isActive);
                setEditLoginUsername(editLoginUsername);
                
            })
            .then(() => handleUpdate());
    }

    const handleUpdate = () => {
        const url = `https://localhost:44326/api/Library/PutBorrowerUsername/${editLoginUsername}`
        const data = {
            "borrowerID": editBorrowerID,
            "loginUsername": editLoginUsername,
            "firstName": editFirstName,
            "lastName": editLastName,
            "fullName": editFullName,
            "password": confirmPassword, // put new password here
            "email": editEmail,
            "phone": editPhone,
            "role": editRole,
            "isActive": editIsActive,
        }
        axios.put(url, data)
            .then((result) => {
                alert("Update Successfully");
                clearData();
            })
            .catch((error) => {
                console.log(data);
                console.log("Error is due to" + error);
                alert("Update Failed");
            })
    }

    const validate = () => {
        if (newPassword == confirmPassword) {
            handleBEdit();
        }
        else {
            alert("Password not match, please key in again");
        }
    }

    const clearData = () => {
        setEditLoginUsername('');
        setNewPassword('');
        setConfirmPassword('');
    }

    return (
        <div className='popUp'>
            <div className='popUp_header'>
                <h1>Reset Password</h1>
            </div>
            <form className='popUp_form'>
                <label>Username:</label>
                <input
                    type='text'
                    value={editLoginUsername}
                    onChange={(e) => setEditLoginUsername(e.target.value)}
                />
                <br />

                <label>New Password:</label>
                <input
                    type='password'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <br />

                <label>Confirm Password:</label>
                <input
                    type='password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <br />
            </form>
            <button className='popUp_closeBtn' onClick={() => validate()}>Change</button>
            <button className='popUp_closeBtn' onClick={() => navigate(-1)}>Back</button>
        </div>
    )
}
export default ForgetPassword;