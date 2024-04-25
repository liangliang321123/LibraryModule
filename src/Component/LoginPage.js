import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginImage from '../Image/LoginImage.jpg';
import axios from "axios";
import ForgetPassword from "./User/ForgetPassword";

const LoginPage = (props) => {
  const navigate = useNavigate();
  const [module, setModule] = useState('LIB');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleModule = (role) => {
    if (module == 'PAY') {
      navigate('/PAY', { state: { loginUsername, role } });
    }
    else if (module == 'LIB') {
      handleLibraryUser();
    }
  };

  const handleForgetPassword = () => {
    navigate('/FORGP');
  }

  const handleLibraryUser = () => {
    axios.get(`https://localhost:44326/api/Library/AuthUser?username=${loginUsername}&password=${loginPassword}`)
      .then((result) => {
        if (result.data.isActive != 0) // active user
        {
          const userData = result.data;
          console.log({ ...userData });
          const role = result.data.role;
          navigate('/LIB', { state: { loginUsername, role, userData } });
        }
        else {
          alert("This user is inactive please contact administrator.")
        }
      })
      .catch((error) => {
        console.log("Login Failed due to : " + error);
        alert("Invalid username or password");
      })
  }

  return (
    <div className="Login-WholeContent">
      <div className="HeaderContent">
        <h1>Login to Library Software</h1>
      </div>
      <div className="BodyContent">
        <table>
          <tr>
            <td>
              <div className="loginpage-img-main">
                <img src={LoginImage}></img>
              </div>
            </td>
            <td></td>
            <td>
              <div className="loginpage-form-group">
                <span>Login to System</span>
                <div className="form-group">
                  <label>Username : </label>
                  <input
                    type='text'
                    value={loginUsername}
                    // onChange={(e) => setUser(e.target.value)}
                    onChange={(e) => setLoginUsername(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Password : </label>
                  <input
                    type='password'
                    value={loginPassword}
                    // onChange={(e) => setUser(e.target.value)}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Module : </label>
                  <select onChange={(e) => setModule(e.target.value)}>
                    <option value='LIB'>Library Module</option>
                    {/* <option value='PAY'>Payroll Module</option> */}
                  </select>
                </div>
                <button className="form-group-forgotPassword" onClick={() => handleForgetPassword()}>Forget Password?</button>
                <div className="form-group-marginTop">
                  <button className="form-group-button" onClick={handleModule} >Login</button>
                </div>
                <div className="form-group-marginTop">
                  {/* <button className="form-group-button" onClick={() => navigate('/REG')} >Register</button> */}
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>
      {/* <div className="display_none_passing_props">
        <ForgetPassword loginUsername={loginUsername} />
      </div> */}
    </div>
  );
}
export default LoginPage;
