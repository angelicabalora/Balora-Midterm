import React, { useState } from "react";
import "./App.css"; // optional if you want to move CSS

const App = () => {
  const [students, setStudents] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [viewVisible, setViewVisible] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    birthdate: "",
    place: "",
    phone: "",
    nationality: "",
    religion: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [viewData, setViewData] = useState(null);

  const openForm = (index = null) => {
    setFormVisible(true);
    if (index !== null) {
      const student = students[index];
      setFormData(student);
      setEditIndex(index);
    } else {
      setFormData({
        id: "",
        name: "",
        birthdate: "",
        place: "",
        phone: "",
        nationality: "",
        religion: "",
      });
      setEditIndex(null);
    }
  };

  const closeForm = () => {
    setFormVisible(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const saveStudent = () => {
    const updatedStudents = [...students];
    if (editIndex !== null) {
      updatedStudents[editIndex] = formData;
    } else {
      updatedStudents.push(formData);
    }
    setStudents(updatedStudents);
    closeForm();
  };

  function deleteStudent(index) {
    if (window.confirm("Are you sure you want to delete this student?")) {
      const updatedStudents = [...students];
      updatedStudents.splice(index, 1);
      setStudents(updatedStudents);
    }
  }
  


  const viewStudent = (index) => {
    setViewData(students[index]);
    setViewVisible(true);
  };

  const closeView = () => {
    setViewVisible(false);
    setViewData(null);
  };

  return (
    <div className="container">
      <h2>STUDENT RECORDS</h2>
      <button onClick={() => openForm()}>Add New Student</button>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>BIRTHDATE</th>
            <th>PLACE</th>
            <th>PHONE</th>
            <th>NATIONALITY</th>
            <th>RELIGION</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr><td colSpan="8">No records</td></tr>
          ) : (
            students.map((student, index) => (
              <tr key={index}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.birthdate}</td>
                <td>{student.place}</td>
                <td>{student.phone}</td>
                <td>{student.nationality}</td>
                <td>{student.religion}</td>
                <td>
                  <button className="action-btn view-btn" onClick={() => viewStudent(index)}>View</button>
                  <button className="action-btn edit-btn" onClick={() => openForm(index)}>Edit</button>
                  <button className="action-btn delete-btn" onClick={() => deleteStudent(index)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {formVisible && (
        <div className="form-popup">
          <h3>{editIndex !== null ? "Edit Student" : "Add Student"}</h3>
          <label>ID:</label>
          <input type="text" id="id" value={formData.id} onChange={handleChange} /><br /><br />
          <label>Name:</label>
          <input type="text" id="name" value={formData.name} onChange={handleChange} /><br /><br />
          <label>Birthdate:</label>
          <input type="date" id="birthdate" value={formData.birthdate} onChange={handleChange} /><br /><br />
          <label>Place:</label>
          <input type="text" id="place" value={formData.place} onChange={handleChange} /><br /><br />
          <label>Phone:</label>
          <input type="text" id="phone" value={formData.phone} onChange={handleChange} /><br /><br />
          <label>Nationality:</label>
          <input type="text" id="nationality" value={formData.nationality} onChange={handleChange} /><br /><br />
          <label>Religion:</label>
          <input type="text" id="religion" value={formData.religion} onChange={handleChange} /><br /><br />
          <button onClick={saveStudent}>Save</button>
          <button onClick={closeForm}>Cancel</button>
        </div>
      )}

      {viewVisible && viewData && (
        <div className="form-popup">
          <h3>Student Details</h3>
          <p><strong>ID:</strong> {viewData.id}</p>
          <p><strong>Name:</strong> {viewData.name}</p>
          <p><strong>Birthdate:</strong> {viewData.birthdate}</p>
          <p><strong>Place:</strong> {viewData.place}</p>
          <p><strong>Phone:</strong> {viewData.phone}</p>
          <p><strong>Nationality:</strong> {viewData.nationality}</p>
          <p><strong>Religion:</strong> {viewData.religion}</p>
          <button onClick={closeView}>Close</button>
        </div>
      )}
    </div>
  );
};

export default App;
