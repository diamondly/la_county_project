import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function AccessKeycards() {
    const [allKeycards, setAllKeycards] = useState(null);
    const [statusMsg, setStatusMsg] = useState('');
    const [allDepts, setAllDepts] = useState(null);
    const [allParking, setAllParking] = useState(null);

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
  
     useEffect(() => {
        getAllDepts();
        getAllKeycards();
     }, []);

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
        getAllParking();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (window.confirm(`Are you sure you want to create this keycard?`) === true) {
        const frmData = new FormData(e.target);
        if (frmData.get('eid') === "" || 
            frmData.get('dept-num') === "" ||
            frmData.get('park-num') === "" ||
            frmData.get('first-name') === "" ||
            frmData.get('last-name') === "" || 
            frmData.get('start-date') === "" ||
            frmData.get('end-date') === "")
            setStatusMsg('All the fields are required!');
        else {
            setStatusMsg('');
            axios.post('http://localhost:4000/keycard', {eid: frmData.get('eid'), 
                                                         dept_no: frmData.get('dept-num'),
                                                         parking_lot_no: frmData.get('park-num'), fName: frmData.get('first-name'), lName: frmData.get('last-name'),
                                                         valid_from: frmData.get('start-date'),
                                                         valid_to: frmData.get('end-date') 
                                                        })
            .then(res => { //received response from the express api
                //alert(' status ' + JSON.stringify(res.data));
                const status = res.data.status;
                if (status === 200)  {
                    setStatusMsg(`Keycard data ${frmData.get('eid')}, ${frmData.get('dept-num')}, ${frmData.get('park-num')}, ${frmData.get('start-date')}, ${frmData.get('end-date')}, saved successfully`);
                    //to avoid reloading from the DB
                    let keycard = {'id': frmData.get('eid'), 
                                   'dept_no': frmData.get('dept-num'),
                                   'parking_lot_no': frmData.get('park-num'), 
                                   'fName': frmData.get('first-name'),
                                   'lName': frmData.get('last-name'),
                                   'valid_from': frmData.get('start-date'),
                                   'valid_to': frmData.get('end-date') 
                    }
                    allKeycards.push(keycard);
                    setAllKeycards(allKeycards);
                    // console.log('all keycard ' + allKeycards);
                    } else if (status === 19 || status === 500) {
                    setStatusMsg(`The keycard for employee ${frmData.get('eid')} already exists!`);
                }
            })
            .catch((error) => { 
                console.log(error) 
            });  
          }
        }
    }

    return (
        <>
            <h1>Employee Parking Access Keycards</h1>
            <body>
            <div className='msg'>{statusMsg}</div>
                <section id="keycards">
                    <form onSubmit={handleSubmit}>
                        <label>
                            Employee ID: <input minLength="6" maxLength="6"  type="text" id="eid" name="eid" required/><br/>
                            <br/>
                            First Name: <input type="text" id="first-name" name="first-name" required/><br/>
                            <br/>
                            Last Name: <input type="text" id="last-name" name="last-name" required/><br/>
                            <br/>
                            Select Department Name: <select name="dept-num">
                                                        {allDepts ? (
                                                            allDepts && allDepts.map(item => 
                                                                <option value={item.num}>{item.name}</option>)
                                                            ) : (
                                                            <option></option>
                                                            )
                                                        };
                                                      </select>  <br/> 
                            <br/>
                            Select Parking Lot Number: <select name="park-num">
                                                        {allParking ? (
                                                            allParking && allParking.map(item => 
                                                                <option value={item.num}>{item.num}</option>)
                                                            ) : (
                                                            <option></option>
                                                            )
                                                        };
                                                      </select>  <br/> 
                            <br/>
                            State Date: <input type="date" id="start-date" name="start-date" placeholder="yyyy-mm-dd" required/><br/>
                            <br/>
                            End Date: <input type="date" id="end-date" name="end-date" placeholder="yyyy-mm-dd" required/>

                        </label>
                        <br/><br/>
                        <button type="submit">Submit</button>
                    </form>
                </section>
            </body>
        </>
    )
}