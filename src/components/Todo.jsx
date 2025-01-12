import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import EditPopup from './EditPopup';
import { FaTimes } from "react-icons/fa";
import { LuPencil } from "react-icons/lu";
import { FaRegCheckCircle } from "react-icons/fa";
import DatePicker from 'react-datepicker'; // If you want to use a date picker
import "react-datepicker/dist/react-datepicker.css";

const Todo = ({ theme, id }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [tlist, setTlist] = useState([]);
    const [newa, setNewa] = useState(0);
    const [first, setfirst] = useState(0)
    const [checked, setchecked] = useState(0)
    const [input, setInput] = useState({
        title: ""
    });

    // Format the selected date into a string that can be used as a key
    const formatDate = (date) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(date).toLocaleDateString('en-CA', options); // Example: "2024-12-28"
    };

    // This is the unique key used to store tasks for a specific date in localStorage
    const storageKey = `tasks-${formatDate(selectedDate)}`;



    // Load the list from localStorage when the component mounts
    useEffect(() => {
        setTlist([]);
        const storedTlist = localStorage.getItem(storageKey);
        if (storedTlist) {
            setTlist(JSON.parse(storedTlist)); // Parse and set the stored array
        }
    }, [selectedDate]); // This effect runs once when the component mounts

    // Save the tlist to localStorage whenever it changes
    useEffect(() => {
        if (tlist.length > 0) { // Only store the list if it has items
            localStorage.setItem(storageKey, JSON.stringify(tlist)); // Save the list to localStorage
        }
    }, [tlist, setTlist, selectedDate]);



    const handleAdd = () => {
        setTlist([
            ...tlist,
            input
        ]);
        setInput({
            title: "",
            id: "",
            isCompleted: "",
        });
    }

    const handleOnChange = (e) => {
        setInput({
            title: e.target.value,
            id: uuidv4(),
            isCompleted: false,
        });
    }


    const handleEdit = (id) => {
        setfirst(id);
    }

    const handleComplete = (id) => {
        setTlist(
            tlist.map(item =>
                item.id === id ? {
                    ...item,
                    isCompleted: !item.isCompleted,
                } : item
            )
        );
    }
    const handleDelete = (id) => {
        setTlist(tlist.filter(item => item.id !== id));
    }

    const handlefilter = (e) => {
        if (e.target.checked) {
            setchecked(1);
            setNewa(tlist.filter(item => item.isCompleted === true));;
        } else {
            setchecked(0);
        }
    }
    const handleReverse = () => {
        setTlist([...tlist].reverse());
        setNewa([...newa].reverse());
    }

    console.log(selectedDate);
    return (
        <>
            <div className="d-flex flex-column justify-content-center align-items-start container mt-5" data-bs-theme={theme}>
                <p className='form-label'>Select a date to add or view your tasks for that date</p>
                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="yyyy-MM-dd"

                    className={"form-control border border-secondary"}
                />
            </div>
            <div className="mt-5  mb-5 container" data-bs-theme={theme}>
                <label htmlFor="exampleFormControlInput1" className="form-label">Add Task</label>
                <div className="d-flex  mb-2 gap-2">
                    <input value={input.title} onChange={handleOnChange} type="text" className="form-control border border-secondary" id="exampleFormControlInput1" placeholder="Add a Note" />
                    <button type="button" onClick={handleAdd} className="btn btn-primary" disabled={input.title === ""}>Add</button>
                </div>
                <div className="form-check">
                    <input className="form-check-input" onClick={handlefilter} type="checkbox" value="" id="flexCheckDefault" />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        Show All Done
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" onClick={handleReverse} type="checkbox" value="" id="flexCheckDefault2" />
                    <label className="form-check-label" htmlFor="flexCheckDefault2">
                        Reverse
                    </label>
                </div>
            </div>

            {!checked ?
                tlist.map((item) => {
                    return <div key={item.id} data-bs-theme={theme} style={{ backgroundColor: (theme === 'dark' && item.isCompleted) ? "#caffd1" + "1A" : (theme === 'dark' && "#cde9ff21") }} className={item.isCompleted ? "done container d-flex justify-content-between mb-3" : "not-done container d-flex justify-content-between mb-3"} >
                        <div className="d-flex gap-2 w-75">
                            {<p className={item.isCompleted ? 'scaling-done-icon' : 'zero-scaled'}><FaRegCheckCircle /></p>}
                            <h6 className={item.isCompleted ? "text-strike" : "normal-text"}>{item.title}</h6>
                        </div>
                        <div className="d-flex gap-2 mobile-flex">
                            <button onClick={() => handleEdit(item.id)} className="btn border border-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal"><LuPencil /></button>
                            <button onClick={() => handleDelete(item.id)} className="btn btn-outline-tertiary btn-light cross" ><FaTimes /></button>
                            <button onClick={() => handleComplete(item.id)} className={`btn btn-outline-secodary ${item.isCompleted ? "btn-warning" : "btn-success"}`} >{item.isCompleted ? "Undo" : "Done"}</button>
                        </div>
                    </div>
                })
                :
                newa.map((item) => {
                    return <div key={item.id} data-bs-theme={theme} style={{ backgroundColor: (theme === 'dark' && item.isCompleted) ? "#caffd1" + "1A" : (theme === 'dark' && "#cde9ff21") }} className={item.isCompleted ? "done container d-flex justify-content-between mb-3" : "not-done container d-flex justify-content-between mb-3"} >
                        <div className="d-flex gap-2 w-75">
                            {<p className={item.isCompleted ? 'scaling-done-icon' : 'zero-scaled'}><FaRegCheckCircle /></p>}
                            <h6 className={item.isCompleted ? "text-strike" : "normal-text"}>{item.title}</h6>
                        </div>
                        <div className="d-flex gap-2 mobile-flex">
                            <button onClick={() => handleEdit(item.id)} className="btn border border-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
                            <button onClick={() => handleDelete(item.id)} className="btn btn-outline-tertiary btn-light cross" >Delete</button>
                            <button onClick={() => handleComplete(item.id)} className={`btn btn-outline-secodary ${item.isCompleted ? "btn-warning" : "btn-success"}`} >{item.isCompleted ? "Undo" : "Done"}</button>
                        </div>
                    </div>
                })
            }
            <EditPopup theme={theme} first={first} setTlist={setTlist} tlist={tlist} />

        </>
    )
}

export default Todo
