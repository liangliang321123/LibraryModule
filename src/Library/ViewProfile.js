import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import AddLibraryUser from './AddLibraryUser';

const ViewProfile = () => {
    const params = useParams();
    const borrowerID = params.borrowerID;
    const userID = params.userID;
    const [data, setData] = useState([]);
    const [borrowerData, setBorrowerData] = useState([]);
    const [username, setUsername] = useState('');

    //add user
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isActive, setIsActive] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [loginUsername, setLoginUsername] = useState('');

    const [addPopUp, setAddPopUp] = useState(false);


    //let role = '';
    const [roleObj, setRoleObj] = useState('');
    //const {borrowerID} = useParams();

    const getBorrowData = () => {
        axios.get(`https://localhost:44326/api/Library/borrow/user/$${borrowerID}`)
            .then((result) => {
                setData(result.data.$values);
                console.log(result.data.$values);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const getBorrowerData = () => {
        axios.get(`https://localhost:44326/api/Library/BorrowerList`)
            .then((result) => {
                setBorrowerData(result.data);
                console.log(result.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const getUserData = async () => {
        await axios.get(`https://localhost:44326/api/Library/BorrowerList/${borrowerID}`)
            .then((result) => {
                setUsername(result.data.loginUsername);
                setRoleObj(result.data.role);
                //role = result.data.role
                console.log(role);
                //setRole(result.data.role);
            })
    }

    const handleDeleteBorrower = (borrowerID) => {
        axios.delete(`https://localhost:44326/api/Library/DeleteUser/del/${borrowerID}`)
            .then((result) => {
                if (result.status === 200) {
                    alert("Delete Successfully");
                    getBorrowerData();
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleCheckBorrowBook = (borrowerID) => {
        axios.get("https://localhost:44326/api/Library/borrow")
        .then((result)=>{
            const borrowedBooks = result.data;
            const stillHaveBooks = borrowedBooks.find(res => res.borrowerID === borrowerID)
            if(stillHaveBooks)
            {
                alert("Please return all books before delete");
            }
            else
            {
                handleDeleteBorrower(borrowerID);
            }
        })
    }

    const handleAdd = () => {
        const url = `https://localhost:44326/api/Library/AddUser`
        const data = {
            "firstName": firstName,
            "lastName": lastName,
            "fullName": fullName,
            "email": email,
            "phone": phone,
            "isActive": isActive,
            "password": password,
            "role": role,
            "loginUsername": loginUsername
        }
        axios.post(url, data)
            .then((result) => {
                getBorrowerData();
                clearData();
                setAddPopUp(false);
                alert("Add Successfully");
            })
    }

    const handleEdit =() =>{
        alert("I lazy to edit");
    }

    const clearData = () => {
        setFirstName('');
        setLastName('');
        setFullName('');
        setEmail('');
        setPhone('');
        setIsActive('');
        setPassword('');
        setRole('');
        setLoginUsername('');
    }

    useEffect(() => {
        getBorrowData();
        getBorrowerData();
        getUserData();
    }, [])

    return (
        <div>
            <header className="homePage_header">
                <h1 className="homePage_h1">USER PROFILE - {username}</h1>
                <div className="homePage_userDetails">
                    <Link to={`/`}><button className="standard_button" >Logout</button></Link> {/*onClick={() => navigate(-1)}*/}
                </div>
            </header>
            <div className="library_margin">
                {/* {(() => {
                    if(role === "admin")
                    {
                        return <p>Borrower List</p>
                    }
                    else{
                        return <p>bruh:</p>
                    }
                })()} */}
                {roleObj === "admin" ? (
                    <div>
                        <h2>Borrower List:</h2>
                        <button className="standard_button" style={{ marginLeft: "15px" }} onClick={() => setAddPopUp(true)}>Add User</button>
                        <table className='table_form'>
                            <tr>
                                <th>Index#</th>
                                <th>BorrowerID</th>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Is Active</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                            {
                                borrowerData && borrowerData.length > 0 ?
                                    borrowerData.filter(adm => adm.role != roleObj) // to filter out admin
                                        .map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.borrowerID}</td>
                                                    <td>{item.fullName}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.phone}</td>
                                                    <td>{item.isActive === true ? (
                                                        <p>Yes</p>
                                                    ) : (
                                                        <p>No</p>
                                                    )}</td>
                                                    <td>{item.role}</td>
                                                    <td colSpan={2}>
                                                        <button onClick={() => handleEdit()}>Edit</button>
                                                        <button onClick={() => handleCheckBorrowBook(item.borrowerID)}>Delete</button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    : (
                                        <td colSpan="5">No Books Borrowed...</td>
                                    )
                            }
                        </table>
                    </div>
                ) : (
                    <div>
                        <h2>Book Borrowed:</h2>
                        <table className='table_form'>
                            <tr>
                                <th>Index#</th>
                                {/* <th>EMPID</th> */}
                                <th>BookID</th>
                                <th>Title</th>
                                <th>Borrow Date</th>
                                <th>Due Date</th>
                                {/* <th>Return Date</th> */}
                            </tr>
                            {
                                data && data.length > 0 ?
                                    data.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.BookID}</td>
                                                <td>{item.Book.Title}</td>
                                                <td>{item.BorrowDate}</td>
                                                <td>{item.DueDate}</td>
                                            </tr>
                                        )
                                    })
                                    : (
                                        <td colSpan="5">No Books Borrowed...</td>
                                    )
                            }
                        </table>
                    </div>
                )}
            </div>
            <AddLibraryUser
                passInfo={{
                    trigger: addPopUp,
                    setTrigger: setAddPopUp,
                    handleAdd: handleAdd,
                    firstName: firstName,
                    lastName: lastName,
                    fullName: fullName,
                    email: email,
                    phone: phone,
                    isActive: isActive,
                    password: password,
                    role: role,
                    loginUsername: loginUsername,
                    setFirstName: setFirstName,
                    setLastName: setLastName,
                    setFullName: setFullName,
                    setEmail: setEmail,
                    setPhone: setPhone,
                    setIsActive: setIsActive,
                    setPassword: setPassword,
                    setRole: setRole,
                    setLoginUsername: setLoginUsername,
                }}
            />
        </div>
    )
}
export default ViewProfile;