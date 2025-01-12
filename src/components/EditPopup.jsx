import React, { useState, useContext, useEffect } from 'react'
import { themeContext } from '../context/context';

const EditPopup = ({ first, setTlist, tlist }) => {
  const theme = useContext(themeContext);
  const [q, setq] = useState("");


  useEffect(() => {
    const foundItem = tlist.find(item => item.id === first);
    if (foundItem) {
      setq(foundItem.title);
    }
  }, [first]);
  
  const handleSave = () => {
    const updatedList = tlist.map(item =>
      item.id === first ? {
        ...item,
        title: q ? q : " ", // Update the title if `q` has a value, otherwise set it to "op"
      } : item
    );

    // Set the updated list to the state
    setTlist(updatedList);
    setq("");

  }
  const handleClose =()=>{
    setq("");
  }
  const onChanger = (e) => {
    setq(e.target.value);
  }


  return (
    <>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-theme={theme}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <label className="form-check-label" htmlFor="edit">Enter Task</label>
              <input id="edit" className="form-control border border-secondary" type="text" value={q} onChange={onChanger} />
            </div>
            <div className="modal-footer">
              <button type="button" onClick={handleClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" onClick={handleSave} className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default EditPopup
