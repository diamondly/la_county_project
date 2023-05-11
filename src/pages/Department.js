import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

export default function Department() {
   const [allDepts, setAllDepts] = useState(null);
   const [statusMsg, setStatusMsg] = useState('');
   const [editRow, setEditRow] = useState(null);

   const [filteredData, setFilteredData] = useState(null);

   const inputRefName = useRef();
   const inputRefNum = useRef();

   const getAllDepts = async() => {
      try {
          const res = await axios.get('http://localhost:4000/dept/allDepts');
          setAllDepts(res.data);
      } catch (error) {
          console.log(error.message);
          setAllDepts(null);
      }
   };

   useEffect(() => {
      getAllDepts();
   }, []);

   const handleAdd = (e) => { 
      e.preventDefault(); //needed because of using submit
      //alert('Number: ' + e.target[0].value + " Name: " + e.target[1].value);
      const frmData = new FormData(e.target);
      if (frmData.get('dnumber') === "" || (frmData.get('dname') === ""))
          setStatusMsg('All the fields are required!');
      else {
          setStatusMsg('');
          axios.post('http://localhost:4000/dept', {dnumber: frmData.get('dnumber'), dname: frmData.get('dname')})
          .then(res => { //received response from the express api
            //alert(' status ' + JSON.stringify(res.data));
            const status = res.data.status;
              if (status === 200)  {
                  setStatusMsg(`The dept ${frmData.get('dnumber')} - ${frmData.get('dname')} saved successfully`);
                  //to avoid reloading from the DB
                  let dept = {'num': frmData.get('dnumber'), 'name': frmData.get('dname')}
                  allDepts.push(dept);
                  setAllDepts(allDepts);
                  //console.log('all dept ' + allDepts);
                } else if (status === 19 || status === 500) {
                  setStatusMsg(`The dept ${frmData.get('dnumber')} already exists!`);
              }
          })
          .catch((error) => { 
              console.log(error) 
          });  
      }
    }; 

    const handleUpdate = async(dnumber, dname) => { 
        console.log('New dept number: ' + dnumber + ' Name: ' + dname);
        try {
            await axios.put('http://localhost:4000/dept', {dnumber: dnumber, dname: dname})
            .then(res => {
                const status = res.data.status;
                if (status === 200)  {
                    allDepts.forEach((element, idx) => {
                        if(element.num === parseInt(dnumber)) {
                            element.name = dname;
                        }
                    });
                    setAllDepts(allDepts);
                    setStatusMsg(`The dept ${dnumber} - ${dname} updated successfully`);
                } else if (status === 19 || status === 500) {
                    setStatusMsg(`The dept ${dnumber} cannot be updated...`);
                }
            })
            .catch((error) => { 
                console.log(error) 
            });  
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleDelete = async(dnumber) => { 
        console.log("delete Number: " + dnumber);
        try {
            await axios.delete(`http://localhost:4000/dept/${dnumber}`)
            .then(res => { //receive response from server
                const status = res.data.status;
                //alert(' status ' + JSON.stringify(res.data));
                if (status === 200)  {
                    setStatusMsg(`The dept ${dnumber} deleted successfully`);
                    //to avoid reloading the data form the database
                    let idx_to_delete = -1;
                    allDepts.forEach((element, idx) => {
                        if (element.num === dnumber) {
                            idx_to_delete = idx;
                        }
                    });                    
                    allDepts.splice(idx_to_delete, 1); //removing one element by idx 
                    //const newDepts = allDepts;
                    //newDepts.splice(i, 1); //removing the dept with index i from the dept array
                    setAllDepts(allDepts);
                } else if (status === 19 || status === 500) {
                    setStatusMsg(`The dept ${dnumber} cannot not be deleted...`);
                }
            })
            .catch((error) => { 
                console.log(error) 
            });  
        } catch (error) {
            console.log(error.message);
        }
    }; 

    // validating the data entered by the user
    const handleEdit = (e, num) => { 
        e.preventDefault();
        setEditRow(num);
    };
    const handleCancel = () => {
        setEditRow(null);
    };

    // search function implementation    
    const [userInput, setUserInput] = useState("");

    function filterItems(arr, query) {
      return arr.filter((el) => el.name.toLowerCase().includes(query.toLowerCase()));
    }
    
    const handleFilterUpdate = (val) => {
        setUserInput(val);
        setFilteredData(filterItems(allDepts, userInput))
        console.log(filteredData);
    }

    return ( 
        <div className="Dept">
            <h1>Departments of LA County</h1>
            <br />

            <input type="text" placeholder="Search department..." className="search" value={userInput} onChange={e => handleFilterUpdate(e.target.value)}></input>

            <form>
                <br/>
                <table className="deptList">
                    <thead>
                    <tr>
                        <th>Department No.</th>
                        <th>Department Name</th>
                    </tr>
                    </thead>
                
                    <tbody>
                    {filteredData && filteredData.map(({num, name}) => (
                        <>
                            { editRow === num ? (
                                <tr>
                                    <td><input ref={inputRefNum} type="number" /></td>
                                    <td><input ref={inputRefName} type="text" /></td>
                                    <td><button type="button" onClick={()=>{if (window.confirm(`Are you sure you want to update to this dept: ${inputRefNum.current.value}-${inputRefName.current.value}?`)) handleUpdate(inputRefNum.current.value, inputRefName.current.value);}}>Update</button></td>
                                    <td><button type="button" onClick={handleCancel} >Cancel</button></td>
                                </tr> 
                                ) : (
                                <tr>
                                    <td><input type="number" value={num} /></td>
                                    <td><input type="text" value={name} /></td>
                                    <td><button type="button" onClick={(e)=>handleEdit(e,num)}>Edit</button></td>
                                    <td><button type="button" onClick={()=>{if (window.confirm(`Are you sure you want to delete this dept: ${num}-${name}?`)) handleDelete(num);}}>Delete</button></td>
                                </tr>
                                )}
                        </>
                    ))}
                    </tbody>
                </table>
            </form>
            <br/>
            <div className="DeptForm">
                <form id='deptForm' onSubmit={handleAdd}>
                    <label>
                        Dept. No: <input type="number" id="dnumber" name="dnumber" /> 
                        Dept. Name: <input type="text" id="dname" name="dname" />
                    </label>
                    <button type="submit" value = "add" >Add</button>
                </form>
                <br/>
                <div className='msg'>{statusMsg}</div>
            </div>
        </div>
    );
}