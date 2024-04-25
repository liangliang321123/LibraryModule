import React, { useState, useEffect } from 'react';
import EditEmployee from './EditEmployee';
import AddEmployee from './AddEmployee';
import axios from 'axios';

const UpdateEmployee = () => {

    const [data, setData] = useState([]);
    const [editPopUp, setEditPopUp] = useState(false);
    const [addPopUp, setAddPopUp] = useState(false);

    //handle Add
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [fullName, setFullName] = useState('');
    const [department, setDepartment] = useState('');
    const [isActive, setIsActive] = useState(0);

    //handle edit
    const [editID, setEditID] = useState('');
    const [editFirstName, setEditFirstName] = useState('');
    const [editLastName, setEditLastName] = useState('');
    const [editFullName, setEditFullName] = useState('');
    const [editDepartment, setEditDepartment] = useState('');
    const [editIsActive, setEditIsActive] = useState(0);

    useEffect(() => {
        getData();
    }, [])
    
    //get data from database which return employee
    const getData = () => {
        axios.get("https://localhost:44326/api/Employee")
        .then((result) => {
            setData(result.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    const handleAdd = () => {
        const url = 'https://localhost:44326/api/Employee'
        const data = {
            "firstName": firstName,
            "lastName": lastName,
            "fullName": fullName,
            "department": department,
            "isActive": isActive
        }

        axios.post(url, data)
        .then((result) => {
             getData();
             clear();
             setAddPopUp(false);
             alert("Add Successfully");
        })
    }

    const clear = () => {
        setFirstName('');
        setLastName('');
        setFullName('');
        setIsActive(0);
        setEditFirstName('');
        setEditLastName('');
        setEditFullName('');
        setEditDepartment('');
        setEditIsActive(0);
        setEditID('');
    }


    //edit and update to gether ( handle edit firstly grab data only )
    const handleEdit = (id) => { //takes the id that pass from outside
        setEditPopUp(true);
        axios.get(`https://localhost:44326/api/Employee/${id}`)
        .then((result)=> {
            setEditFirstName(result.data.firstName);
            setEditLastName(result.data.lastName);
            setEditFullName(result.data.fullName);
            setEditDepartment(result.data.department);
            setEditIsActive(result.data.isActive);
            setEditID(id);
        
        })
        //console.log("test edit");

    }

    const handleUpdate = () => {
        const url = `https://localhost:44326/api/Employee/${editID}`
        const data = {
            "id" : editID,
            "firstName": editFirstName,
            "lastName": editLastName,
            "fullName": editFullName,
            "department": editDepartment,
            "isActive": editIsActive
        }

        axios.put(url, data)
        .then((result)=> {
            getData();
            clear();
            setEditPopUp(false);
            alert("Updated Successfully");
        })
    } 


    const handleDelete = (id) => {
        if(window.confirm("Are you sure to delete this employee ") == true)
        {
            axios.delete(`https://localhost:44326/api/Employee/${id}`)
            .then((result) => {
                if(result.status == 200)
                {
                    alert("Delete Successfully");
                    getData();
                }
            })
            .catch((error)=> {
                console.log(error);
            })
        }
    }


    return (
        <div>
            <h1>Employee List</h1>
            <div>
                <button onClick={() => setAddPopUp(true)}>Add Employee</button>
                <table className='table_form'>
                    <tr>
                        <th>Index#</th>
                        {/* <th>EMPID</th> */}
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Full Name</th>
                        <th>Department</th>
                        <th>Active</th>
                        <th>Actions</th>
                    </tr>
                    {
                        data && data.length > 0 ?
                            data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        {/* <td>{item.id}</td> */}
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.fullName}</td>
                                        <td>{item.department}</td>
                                        <td>{item.isActive}</td>
                                        <td colSpan={2}>
                                            <button onClick={()=> handleEdit(item.id)}>Edit</button>
                                            <button onClick={() => handleDelete(item.id)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                            : "Loading..."
                    }

                </table>
            </div>
            <EditEmployee 
            handleUpdate = {handleUpdate}
            trigger={editPopUp}
            setTrigger = {setEditPopUp}
            editFirstName = {editFirstName}
            editLastName = {editLastName}
            editFullName = {editFullName}
            editDepartment = {editDepartment}
            editIsActive= {editIsActive}
            setEditFirstName = {setEditFirstName}
            setEditLastName = {setEditLastName}
            setEditFullName = {setEditFullName}
            setEditDepartment = {setEditDepartment}
            setEditIsActive = {setEditIsActive}
            />

            <AddEmployee
            handleAdd = {handleAdd}
            trigger={addPopUp}
            setTrigger = {setAddPopUp}
            firstName = {firstName}
            lastName = {lastName}
            fullName = {fullName}
            department = {department}
            isActive = {isActive}
            setFirstName = {setFirstName}
            setLastName = {setLastName}
            setFullName = {setFullName}
            setDepartment = {setDepartment}
            setIsActive = {setIsActive}
            />
        </div>
    )
}
export default UpdateEmployee