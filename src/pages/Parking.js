import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

export default function Parking() {
    const [allParking, setAllParking] = useState(null);
    const [statusMsg, setStatusMsg] = useState('');
    const [editRow, setEditRow] = useState(null);
    const inputRefName = useRef();
    const inputRefNum = useRef();

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

   const handleAdd = (e) => { 
    e.preventDefault(); //needed because of using submit
    //alert('Number: ' + e.target[0].value + " Name: " + e.target[1].value);
    const frmData = new FormData(e.target);
    if (frmData.get('pnum') === "" || (frmData.get('pname') === ""))
        setStatusMsg('All the fields are required!');
    else {
        setStatusMsg('');
        axios.post('http://localhost:4000/parking', {pnum: frmData.get('pnum'), pname: frmData.get('pname')})
        .then(res => { //received response from the express api
          //alert(' status ' + JSON.stringify(res.data));
          const status = res.data.status;
            if (status === 200)  {
                setStatusMsg(`The dept ${frmData.get('pnum')} - ${frmData.get('pname')} saved successfully`);
                //to avoid reloading from the DB
                let parking = {'num': frmData.get('pnum'), 'name': frmData.get('pname')}
                allParking.push(parking);
                setAllParking(allParking);
                //console.log('all parking ' + allParking);
              } else if (status === 19 || status === 500) {
                setStatusMsg(`Parking ${frmData.get('pnum')} already exists!`);
            }
        })
        .catch((error) => { 
            console.log(error) 
        });  
    }
  };
  
    const handleUpdate = async(pnum, pname) => { 
        console.log('New parking number: ' + pnum + ' Name: ' + pname);
        try {
            await axios.put('http://localhost:4000/parking', {pnum: pnum, pname: pname})
            .then(res => {
                const status = res.data.status;
                if (status === 200)  {
                    allParking.forEach((element, idx) => {
                        if(element.num === parseInt(pnum)) {
                            element.name = pname;
                        }
                    });
                    setAllParking(allParking);
                    setStatusMsg(`Parking ${pnum} - ${pname} updated successfully`);
                } else if (status === 19 || status === 500) {
                    setStatusMsg(`Parking ${pnum} cannot be updated...`);
                }
            })
            .catch((error) => { 
                console.log(error) 
            });  
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleDelete = async(pnum) => { 
        console.log("delete Number: " + pnum);
        try {
            await axios.delete(`http://localhost:4000/parking/${pnum}`)
            .then(res => { //receive response from server
                const status = res.data.status;
                //alert(' status ' + JSON.stringify(res.data));
                if (status === 200)  {
                    setStatusMsg(`The parking ${pnum} deleted successfully`);
                    //to avoid reloading the data form the database
                    let idx_to_delete = -1;
                    allParking.forEach((element, idx) => {
                        if (element.num === pnum) {
                            idx_to_delete = idx;
                        }
                    });                    
                    allParking.splice(idx_to_delete, 1); //removing one element by idx 
                    //const newDepts = allDepts;
                    //newDepts.splice(i, 1); //removing the dept with index i from the dept array
                    setAllParking(allParking);
                } else if (status === 19 || status === 500) {
                    setStatusMsg(`The parking ${pnum} cannot not be deleted...`);
                }
            })
            .catch((error) => { 
                console.log(error) 
            });  
        } catch (error) {
            console.log(error.message);
        }
    }; 

    //TODO: validating the data entered by the user
    const handleEdit = (e, num) => { 
        e.preventDefault();
        setEditRow(num);
    };
    const handleCancel = () => {
        setEditRow(null);
    };

    // search function implementation    
    const [userInput, setUserInput] = useState("");
    const [filteredData, setFilteredData] = useState(null);

    function filterItems(arr, query) {
      return arr.filter((el) => el.name.toLowerCase().includes(query.toLowerCase()));
    }
    
    const handleFilterUpdate = (val) => {
        setUserInput(val);
        setFilteredData(filterItems(allParking, userInput))
        console.log(filteredData);
    }

    return ( 
        <div className="Parking">
            <h1>Parking Lot Facilities</h1>  
            <br/>
            <input type="text" placeholder="Search parking lot..." className="search" value={userInput} onChange={e => handleFilterUpdate(e.target.value)}></input>
            <form>
                <br/>
                <table className="parking_lots">
                    <thead>
                    <tr>
                        <th>Parking Lot No.</th>
                        <th>LA County Parking Lot Name</th>
                    </tr>
                    </thead>

                    <tbody>
                    {filteredData && filteredData.map(({num, name}) => ( 
                        <>
                            { editRow === num ? (
                                <tr>
                                    <td><input ref={inputRefNum} type="number" onChange={handleUpdate}/></td>
                                    <td><input ref={inputRefName} type="text" onChange={handleUpdate}/></td>
                                    <td><button type="button" onClick={()=>{if (window.confirm(`Are you sure you want to update to this lot: ${inputRefNum.current.value}-${inputRefName.current.value}?`)) handleUpdate(inputRefNum.current.value, inputRefName.current.value);}}>Update</button></td>
                                    <td><button type="button" onClick={handleCancel}>Cancel</button></td>
                                </tr>
                                ) : (
                                <tr>
                                    <td><input type="number" value={num} onChange={handleUpdate}/></td>
                                    <td><input type="text" value={name} onChange={handleUpdate}/></td>
                                    <td><button type="button" onClick={(e)=>handleEdit(e,num)}>Edit</button></td>
                                    <td><button type="button" onClick={()=>{if (window.confirm(`Are you sure you want to delete this lot: ${num}-${name}?`)) handleDelete(num);}}>Delete</button></td>
                                </tr>
                                )}
                        </>
                    ))}
                    </tbody>
                </table>
            </form>
            <br/>
            <div className="ParkingForm">
                <form id='parkingForm' onSubmit={handleAdd}>
                    <label>
                        Parking Lot No: <input type="number" id="pnum" name="pnum" /> 
                        Parking Lot Name: <input type="text" id="pname" name="pname" />
                    </label>
                    <button type="submit" value = "add" >Add</button>
                </form>
                <br/>
                <div className='msg'>{statusMsg}</div>
            </div>
        </div>
    );
}