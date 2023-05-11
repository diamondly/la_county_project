import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Employee() {
    const [allEmployees, setAllEmployees] = useState(null);
    const [statusMsg, setStatusMsg] = useState('');

    const getAllEmployees = async() => {
        try {
            const res = await axios.get('http://localhost:4000/employees/allEmployees');
            setAllEmployees(res.data);
        } catch (error) {
            console.log(error.message);
            setAllEmployees(null);
        }
    };

    useEffect(() => {
        getAllEmployees();
    }, []);

    //TODO: validating the data entered by the user
   const changeHandler = (e) => {
    //alert('update: ' + e.target[0].value);
   }

   const handleAdd = (e) => {
    e.preventDefault();
    if (window.confirm(`Are you sure you want to add employee?`) === true) {
        //alert('Number: ' + e.target[0].value + " Name: " + e.target[1].value);
        const frmData = new FormData(e.target);
        if (frmData.get('eid') === "" || (frmData.get('fName') === "") || (frmData.get('lName') === "") || 
            (frmData.get('email') === "") || (frmData.get('phone') === ""))
            setStatusMsg('All the fields are required!');
        else {
            setStatusMsg('');
            axios.post('http://localhost:4000/employees', {eid: frmData.get('eid'), fName: frmData.get('fName'), lName: frmData.get('lName'),
                                                            email: frmData.get('email'), phone: frmData.get('phone')})
            .then(res => { //received response from the express api
            //alert(' status ' + JSON.stringify(res.data));
            const status = res.data.status;
                if (status === 200)  {
                    setStatusMsg(`The employee ${frmData.get('eid')} - ${frmData.get('fName')} saved successfully`);
                    //to avoid reloading from the DB
                    let employees = {'id': frmData.get('eid'), 'fName': frmData.get('fName'), 'lName': frmData.get('lName'),
                                        'email': frmData.get('email'), 'phone': frmData.get('phone')};
                    allEmployees.push(employees);
                    setAllEmployees(allEmployees);
                    //console.log('all Employees ' + allEmployees);
                } else if (status === 19 || status === 500) {
                    setStatusMsg(`Employee ${frmData.get('eid')} already exists!`);
                }
            })
            .catch((error) => { 
                console.log(error) 
            });  
        }
    }
  };

    return (
        <>
            <h1>Employees</h1>
                <section id="employee">
                    <form id="employForm" onSubmit={handleAdd}>
                        <label>
                            Employee ID: <input minLength="6" maxLength="6" type="number" id="eid" name="eid" required/><br/>
                            <br/>
                            First Name: <input type="text" id="fName" name="fName" required/><br/>
                            <br/>
                            Last Name: <input type="text" id="lName" name="lName" required/><br/>
                            <br/>
                            Email Address: <input type="text" id="email" name="email" required/><br/>
                            <br/>
                            Phone Number: <input type="text" id="phone" name="phone" required/><br/>
                        </label>
                        <br/>
                        <button type="submit">Add Employee</button>
                        <br/>
                    </form>
                    <br/>
                    <div className='msg'>{statusMsg}</div>
                </section>
                <br/>
                
                <table className="employees">
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email Address</th>
                            <th>Phone Number</th>
                        </tr>
                    </thead>

                    <tbody>
                    {allEmployees && allEmployees.map(({id, fName, lName, email, phone}) => ( 
                        <tr>
                            <td><input type="number" value={id} onChange={changeHandler}></input></td>
                            <td><input type="text" value={fName} onChange={changeHandler}/></td>
                            <td><input type="text" value={lName} onChange={changeHandler}/></td>
                            <td><input type="text" value={email} onChange={changeHandler}/></td>
                            <td><input type="text" value={phone} onChange={changeHandler}/></td>
                        </tr>
                    ))}
                    </tbody>
            </table>
        </>
    )
}