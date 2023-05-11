import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Reports() {
    const [allKeycards, setAllKeycards] = useState(null);
    const [statusMsg, setStatusMsg] = useState('');
    const [allDepts, setAllDepts] = useState(null);
    const [allParking, setAllParking] = useState(null);
    const [filteredKey, setFilteredKey] = useState(null);

    const getAllDepts = async() => {
        try {
            const res = await axios.get('http://localhost:4000/dept/allDepts');
            setAllDepts(res.data);
        } catch (error) {
            console.log(error.message);
            setAllDepts(null);
        }
     };

     const getAllKeycards = async() => {
        try {
            const res = await axios.get('http://localhost:4000/keycard/allKeycards');
            setAllKeycards(res.data);
        } catch (error) {
            console.log(error.message);
            setAllKeycards(null);
        }
     };

     const getAllParking = async() => {
        try {
            const res = await axios.get('http://localhost:4000/parking/allParking');
            setAllParking(res.data);
        } catch (error) {
            console.log(error.message);
            setAllParking(null);
        }
    };

    useEffect(() => {
        getAllDepts();
        getAllKeycards();
        getAllParking();
     }, []);


    const handleSubmit = (e) => {
        e.preventDefault();
        const frmData = new FormData(e.target);
        setFilteredKey(allKeycards.filter(keycard => keycard.dept_no == frmData.get('dept-num')));
    }

    return (
        <div>
        <h1>Reports</h1>

        <body>
        <form onSubmit={handleSubmit}>
            Select Department: <select name="dept-num">
                {allDepts ? (allDepts && allDepts.map(item => 
                        <option value={item.num}>{item.name}</option>)
                    ) : (<option></option>)
                };
                </select> 
            <button type="submit">Find</button>
            <br/>
        </form>

            <br/>
            <table className="keycards">
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Department</th>
                        <th>Parking Lot</th>
                        <th>Last Name</th>
                        <th>First Name</th>
                        <th>Valid From</th>
                        <th>Valid To</th>
                    </tr>
                </thead>

                <tbody>
                {filteredKey && filteredKey.map(({id, dept_no, parking_lot_no, fName, lName, valid_from, valid_to}) => ( 
                    <tr>
                        <td><input type="number" value={id}></input></td>
                        <td><input type="text" value={dept_no}/></td>
                        <td><input type="text" value={parking_lot_no}/></td>
                        <td><input type="text" value={lName}/></td>
                        <td><input type="text" value={fName}/></td>
                        <td><input type="text" value={valid_from}/></td>
                        <td><input type="text" value={valid_to}/></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </body>
        </div>
    )
}