import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../css/PopUp.css";
import axios from 'axios';

const AddUser = () => {

    const navigate = useNavigate();

    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('admin');
    const [isActive, setIsActive] = useState(true);
    
    const handleRegister = () => {
        const url = `https://localhost:44326/User/AddUser`;
        const data = {
          "userid": userId,
          "name": name,
          "password": password,
          "email": email,
          "role": role,
          "isActive": isActive,
        }
        axios.post(url, data)
          .then((result) => {
            clearData();
            alert("Add Successfully");
            navigate(-1);
          })
          .catch((error) => {
            console.log("Error is due to: " + error);
          })
      }

      const clearData = () => {
        setUserId('');
        setName('');
        setPassword('');
        setEmail('');
        setRole('');
        setIsActive('');
      }

    const handleActiveChange = (e) => {
        if (e.target.checked) {
            setIsActive(true);
        }
        else {
            setIsActive(false);
        }
    }

    return  (
            <div className='popUp'>
                <div className='popUp_header'>
                    <h1>Add User</h1>
                </div>
                <form className='popUp_form'>
                    <label>User ID:</label>
                    <input
                        type='text'
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)} />
                    <br />

                    <label>Name:</label>
                    <input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                    <br />

                    <label>Password:</label>
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    <br />

                    <label>Email:</label>
                    <input
                        type='text'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    <br />

                    <label>Role:</label>
                    <select onChange={(e) => setRole(e.target.value)} value={role}>
                        <option value='admin' >Admin</option>
                        <option value='user'>User</option>
                    </select>
                    <br />

                    <div className='checkboxWrapper'>
                        <label>
                            Active ?
                        </label>
                        <input
                            type='checkbox'
                            value={isActive}
                            checked={isActive === true ? true : false}
                            // onChange = {(e) => setIsActive(e.target.value)}
                            onChange={(e) => handleActiveChange(e)}
                        />
                    </div>
                </form>
                <button className='popUp_closeBtn' onClick={() => handleRegister()}>Register</button>
                <button className='popUp_closeBtn' onClick={() => navigate(-1)}>Close</button>
            </div>
        )
}
export default AddUser;