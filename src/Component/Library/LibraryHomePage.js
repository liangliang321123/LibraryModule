import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import "../../css/Library.css";
import AddLibrary from '../../Library/AddLibrary';
import EditLibrary from '../../Library/EditLibrary';
import axios from 'axios';

const LibraryHomePage = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const loginUsername = location.state ? location.state.loginUsername : 'Default User';
    //get the role of the user
    const userObj = location.state.userData;

    //search function
    const [search, setSearch] = useState('');

    const [data, setData] = useState([]);
    const [editPopUp, setEditPopUp] = useState(false);
    const [addPopUp, setAddPopUp] = useState(false);

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [genre, setGenre] = useState('');
    const [availability, setAvailability] = useState(true);

    const [editBookID, setEditBookID] = useState('');
    const [editTitle, setEditTitle] = useState('');
    const [editAuthor, setEditAuthor] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editGenre, setEditGenre] = useState('');
    const [editAvailability, setEditAvailability] = useState('');

    // use let instead of const to let put quickly get from get method
    let borrowBookID = '';
    let borrowTitle = '';
    let borrowAuthor = '';
    let borrowDescription = '';
    let borrowGenre = '';
    let borrowAvailability = '';

    const [borrowData, setBorrowData] = useState([]);

    const [testDate, setTestDate] = useState('');
    // const [dueDate, setDueDate] = useState(getDueDate());
    const [todayDate, setTodayDate] = useState(getDate());
    const [dueDate, setDueDate] = useState(getDueDate());

    function getDate() {
        const today = new Date();
        var month = today.getMonth() + 1;
        const year = today.getFullYear();
        var date = today.getDate();

        if (month < 10) {
            month = '0' + month;
        }
        if (date < 10) {
            date = '0' + date;
        }
        // return `${month}/${date}/${year}`;
        return `${year}-${month}-${date}`;
    }

    function getDueDate() {
        var today = new Date();
        var dueDate = new Date(new Date().setDate(today.getDate() + 30));
        var month = dueDate.getMonth() + 1;
        var year = dueDate.getFullYear();
        var date = dueDate.getDate();

        if (month < 10) {
            month = '0' + month;
        }
        if (date < 10) {
            date = '0' + date;
        }
        return `${year}-${month}-${date}`;
    }

    // function getDueDate() {
    //     const date = today.getDate() + 7;
    // }

    //retrieve data
    const getData = () => {
        axios.get("https://localhost:44326/api/Library")
            .then((result) => {
                setData(result.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    //retrieve borrow data
    const getBorrowData = () => {
        axios.get("https://localhost:44326/api/Library/borrow")
            .then((result) => {
                setBorrowData(result.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    //get the data
    useEffect(() => {
        getData();
    }, [])

    //add book
    const handleAdd = () => {
        const url = `https://localhost:44326/api/Library`;
        const data = {
            "title": title,
            "author": author,
            "description": description,
            "genre": genre,
            "availability": availability,
            "borrowedBooks": null
        }
        axios.post(url, data)
            .then((result) => {
                getData();
                clearData();
                setAddPopUp(false);
                alert("Add Successfully");
            })
    }

    //Edit Library 
    const handleEdit = (id) => {
        console.log('test run temp');
        setEditPopUp(true);
        axios.get(`https://localhost:44326/api/Library/${id}`)
            .then((result) => {
                setEditTitle(result.data.title);
                setEditAuthor(result.data.author);
                setEditDescription(result.data.description);
                setEditGenre(result.data.genre);
                setEditAvailability(result.data.availability);
                setEditBookID(id);
                console.log(result.data);
            })
    }

    //  after edit we use this update
    const handleUpdate = () => {
        const url = `https://localhost:44326/api/Library/${editBookID}`
        console.log("what is this number" + editBookID);
        const data = {
            "bookID": editBookID,
            "title": editTitle,
            "author": editAuthor,
            "description": editDescription,
            "genre": editGenre,
            "availability": editAvailability,
        }
        axios.put(url, data)
            .then((result) => {
                getData();
                clearData();
                setEditPopUp(false);
                alert("Updated Successfully")
            })
    }

    //first check if the book is able to return 
    const handleReturnBook = (itemID) => {
        axios.get("https://localhost:44326/api/Library/borrow")
            .then((result) => {
                const borrowedBooks = result.data;
                const ReturnBook = borrowedBooks.find(res => res.borrowerID === userObj.borrowerID && res.bookID === itemID);
                if (ReturnBook) {
                    const borrowedBookID = ReturnBook.borrowedBookID;
                    // handleReturnUpdate(itemID);
                    // handleReturn(itemID);
                    handleBookReturn(itemID, borrowedBookID);
                }
                else {
                    alert("You didn't borrowed this book!");
                }
            })
    }

    const handleBookReturn = async (itemID, borrowedBookID) => {
        try {
            await axios.get(`https://localhost:44326/api/Library/${itemID}`)
                .then((result) => {
                    borrowBookID = itemID;
                    borrowTitle = result.data.title;
                    borrowAuthor = result.data.author;
                    borrowDescription = result.data.description;
                    borrowGenre = result.data.genre;
                    borrowAvailability = result.data.availability;
                })
            //const url = `https://localhost:44326/api/Library/${borrowBookID}`;
            //console.log("what is this number " + borrowBookID);
            if (borrowAvailability == false) {
                //handleReturn(itemID, borrowedBookID);
                if (window.confirm("Do you want to return this book ?") === true) {
                    handleDeleteBorrowedBookID(borrowedBookID);
                    handleReturnUpdate(itemID);
                }
            }
            else {
                console.log("This book is not available to return.");
                alert("This book is not available to return");
            }
        } catch (error) {
            console.log(error);
        }
    }

    //this function update the returndate of the borrowedBookID (but now i cancel first)
    const handleReturn = (itemID, borrowedBookID) => {
        if (window.confirm("Do you want to return this book?") === true) {
            const url = `https://localhost:44326/api/Library/return/${borrowedBookID}`;
            const borrowData = {
                "borrowedBookID": borrowedBookID,
                "borrowDate": todayDate, //new Date().toISOString(), Set borrow date to current date
                "dueDate": dueDate, // Use the value from the input field for due date
                "returnDate": todayDate, // set return date
                "bookID": itemID,
                // "book": item,
                "borrowerID": userObj.borrowerID,
                // "borrowerID": 4,
                // "borrower": userObj,
            };
            axios.put(url, borrowData)
                .then((result) => {
                    //getBorrowData();
                    alert("Return Successfully");
                })
                .catch((error) => {
                    console.log(error);
                    console.log(borrowData);
                })
        }
    }

    //cancel the borrowedBookID
    const handleDeleteBorrowedBookID = (borrowedBookID) => {
        axios.delete(`https://localhost:44326/api/Library/borrow/${borrowedBookID}`)
            .then((result) => {
                if (result.status === 200) {
                    getData();
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleReturnUpdate = (itemID) => {
        try {
            const url = `https://localhost:44326/api/Library/${itemID}`;
            console.log("what is this number " + itemID);
            const data = {
                "bookID": itemID,
                "title": borrowTitle,
                "author": borrowAuthor,
                "description": borrowDescription,
                "genre": borrowGenre,
                "availability": true,
            }
            axios.put(url, data)
                .then((result) => {
                    alert("Return successfully");
                    getData();
                    clearData();
                    console.log("updated");
                })
                .catch((error) => {
                    console.log(error);
                })
        } catch (error) {
            console.log(error);
        }
    }

    // first check if duplicated for the borrower
    const handleCheckDuplicateBookID = (itemID) => {
        axios.get("https://localhost:44326/api/Library/borrow")
            .then((result) => {
                const borrowedBooks = result.data;
                const duplicateBook = borrowedBooks.find(res => res.borrowerID === userObj.borrowerID && res.bookID === itemID && res.returnDate == null); // add 1 more condition where returnDate== null
                if (duplicateBook) {
                    alert("You already Borrowed this books!");
                }
                else {
                    if (window.confirm("Confirm to borrow?") === true) {
                        handleBookAvailability(itemID);
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            }) 
    }

    //then check the book availability
    const handleBookAvailability = async (itemID) => {
        try {
            await axios.get(`https://localhost:44326/api/Library/${itemID}`)
                .then((result) => {
                    borrowBookID = itemID;
                    borrowTitle = result.data.title;
                    borrowAuthor = result.data.author;
                    borrowDescription = result.data.description;
                    borrowGenre = result.data.genre;
                    borrowAvailability = result.data.availability;
                })
            if (borrowAvailability == true) {
                handleBorrow(itemID);
                handleUpdateAvailability(itemID);
            }
            else {
                console.log("This book is not available.");
                alert("This book is not available");
            }


        } catch (error) {
            console.log(error);
        }
    }

    //post borrow
    const handleBorrow = (id) => {
        const url = `https://localhost:44326/api/Library/borrow`;
        const borrowData = {
            "borrowDate": todayDate, //new Date().toISOString(), Set borrow date to current date
            "dueDate": dueDate, // Use the value from the input field for due date
            "returnDate": null, // Initially set return date to null
            "bookID": id,
            // "book": item,
            "borrowerID": userObj.borrowerID,
            // "borrowerID": 4,
            // "borrower": userObj,
        };
        axios.post(url, borrowData)
            .then((result) => {
                //getBorrowData();
                alert("Borrow Successfully");
            })
            .catch((error) => {
                console.log(error);
                console.log(borrowData);
            })


    }

    //update availability immediate
    const handleUpdateAvailability = (borrowBookID) => {
        try {
            const url = `https://localhost:44326/api/Library/${borrowBookID}`;
            console.log("what is this number " + borrowBookID);
            const data = {
                "bookID": borrowBookID,
                "title": borrowTitle,
                "author": borrowAuthor,
                "description": borrowDescription,
                "genre": borrowGenre,
                "availability": false,
            }
            axios.put(url, data)
                .then((result) => {
                    getData();
                    clearData();
                    console.log("updated");
                })
                .catch((error) => {
                    console.log(error);
                })
        } catch (error) {
            console.log(error);
        }

    }


    const handleDelete = (id) => {
        if (window.confirm("Are you sure to delete this book ?") === true) {
            axios.delete(`https://localhost:44326/api/Library/${id}`)
                .then((result) => {
                    if (result.status === 200) {
                        alert("Delete Successfully");
                        getData();
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    // const handlePassUserObj = (userObj) => {
    //     navigate('/LIB/${}', { state: { loginUsername, role, userData} });
    // }

    //clear data only nia
    const clearData = () => {
        setTitle('');
        setAuthor('');
        setDescription('');
        setGenre('');
        setAvailability('');
    }

    return (
        <div>
            <header className="homePage_header">
                <h1 className="homePage_h1">LIBRARY HOMEPAGE</h1>
                <div className="homePage_userDetails">
                    <div className="homePage_userID">User ID: {loginUsername}</div>
                    <div className="homePage_userID">Role: {userObj.role}</div>
                    {/* <div className="homePage_userID">ID Number: {userObj.borrowerID}</div> */}
                    {/*<Link to={`/LIB/USER/${userObj.borrowerID}`}><button className="standard_button">Profile</button></Link> onClick={() => navigate(-1)}*/}
                    <Link to={`/LIB/${userObj.borrowerID}`}><button className="standard_button" >Profile</button></Link> {/*onClick={() => navigate(-1)}*/}
                </div>
            </header>

            <div className="library_margin">
                <div className="library_header">
                    {/* <form action="/action_page.php"> */}
                    <input
                        type="text"
                        placeholder="Enter Book name to search"
                        onChange={(e) => setSearch(e.target.value)}

                    />
                    <button type="submit">
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            style={{ color: "#" }}
                        />
                    </button>
                    {/* <button className="standard_button" style={{ marginLeft: "15px" }} onClick={() => setAddPopUp(true)}>Add Book</button> */}
                    {(() => {
                        if (userObj.role === "admin") {
                            return <button className="standard_button" style={{ marginLeft: "15px" }} onClick={() => setAddPopUp(true)}>Add Book</button>;
                        }
                        else {
                            return <p></p>
                        }

                    })()}
                </div>
                <div className="library_body">
                    <div className='grid_container'>
                        {data && data.length > 0 ? (
                            data.filter((index) => {
                                return search.toLowerCase() === ''
                                    ? index
                                    : index.title.toLowerCase().includes(search);
                            }).map((item, index) => (
                                <div key={index} className="grid_item">
                                    <div className="book_info">
                                        <strong>Book ID: {item.bookID}</strong>
                                        <p>Title: {item.title}</p>
                                        <p>Author: {item.author}</p>
                                        <p>Description: {item.description}</p>
                                        <p>Genre: {item.genre}</p>
                                        {(() => {
                                            if (item.availability === true) {
                                                return <p>Availability: Yes</p>
                                            }
                                            else {
                                                return <p>Availability: No</p>
                                            }

                                        })()}
                                        <div className="library_dropdown">
                                            <button className="library_dropdown_button">Action ▼</button>
                                            <div className="library_dropdown_content">
                                                {(() => {
                                                    if (location.state.role === "admin") {
                                                        return <>
                                                            <button onClick={() => handleEdit(item.bookID)}>Update</button>
                                                            <button onClick={() => handleDelete(item.bookID)}>Delete</button>
                                                        </>
                                                    }
                                                    else {
                                                        return <>
                                                            <button onClick={() => {
                                                                handleCheckDuplicateBookID(item.bookID);
                                                                //handleBookAvailability(item.bookID);
                                                            }}>Borrow</button>
                                                            <button onClick={() => {
                                                                handleReturnBook(item.bookID);
                                                                //handleBookAvailability(item.bookID);
                                                            }}>Return</button>
                                                        </>
                                                    }

                                                })()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) :
                            (
                                <p>Loading...</p>
                            )}
                    </div>
                </div>
            </div>
            <AddLibrary
                passInfo={{
                    trigger: addPopUp,
                    setTrigger: setAddPopUp,
                    handleAdd: handleAdd,
                    title: title,
                    author: author,
                    description: description,
                    genre: genre,
                    availability: availability,
                    setTitle: setTitle,
                    setAuthor: setAuthor,
                    setDescription: setDescription,
                    setGenre: setGenre,
                    setAvailability: setAvailability,
                }}
            />
            <EditLibrary
                passInfo={{
                    editTrigger: editPopUp,
                    setTrigger: setEditPopUp,
                    handleUpdate: handleUpdate,
                    editTitle: editTitle,
                    editAuthor: editAuthor,
                    editDescription: editDescription,
                    editGenre: editGenre,
                    editAvailability: editAvailability,
                    setEditTitle: setEditTitle,
                    setEditAuthor: setEditAuthor,
                    setEditDescription: setEditDescription,
                    setEditGenre: setEditGenre,
                    setEditAvailability: setEditAvailability,
                }}
            />
        </div>
    )
}
export default LibraryHomePage; 