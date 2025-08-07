import { useState } from 'react'
import './App.css'

function App() {
  const [employees, setEmployees] = useState([
    {
      fname: "Sam",
      lname: "Sain",
      job: "Developer",
      desc: "Developer at xyz company",
      role: "Web Developer"
    }
  ]);

  const [employeeForm, setEmployeeForm] = useState({
    fname: "",
    lname: "",
    job: "",
    desc: "",
    role: ""
  });

  const [editIndex, setEditIndex] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setEmployeeForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit() {
    if (!employeeForm.fname.trim() ||
      !employeeForm.lname.trim() ||
      !employeeForm.job.trim() ||
      !employeeForm.desc.trim() ||
      !employeeForm.role.trim()) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    if (editIndex !== null) {
      const updated = [...employees];
      updated[editIndex] = employeeForm;
      setEmployees(updated);
      setEditIndex(null);
    } else {
      setEmployees([...employees, employeeForm]);
    }
    setEmployeeForm({ fname: "", lname: "", job: "", desc: "", role: "" });
  }

  function handleEdit(index) {
    setEmployeeForm(employees[index]);
    setEditIndex(index);
  }

  function handleDelete(index) {
    setEmployees(employees.filter((_, i) => i !== index));
    if (editIndex === index) {
      setEmployeeForm({ fname: "", lname: "", job: "", desc: "", role: "" });
      setEditIndex(null);
    }
  }

  return (
    <>
      <div className='Container'>
        <h1>Employee Management System</h1>
        <input
          type="text"
          name="fname"
          placeholder='Enter First Name'
          value={employeeForm.fname}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lname"
          placeholder='Enter Last Name'
          value={employeeForm.lname}
          onChange={handleChange}
        />
        <input
          type="text"
          name="job"
          placeholder='Enter Job Title'
          value={employeeForm.job}
          onChange={handleChange}
        />
        <input
          type="text"
          name="desc"
          placeholder='Enter Job Desc'
          value={employeeForm.desc}
          onChange={handleChange}
        />
        <input
          type="text"
          name="role"
          placeholder='Enter Job Role'
          value={employeeForm.role}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>
          {editIndex !== null ? "Update Employee" : "Add Employee"}
        </button>
      </div>

      <div>
        <h1>Employee Details</h1>
        <table border="2px solid black">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Job Title</th>
              <th>Job Desc</th>
              <th>Job Role</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr key={index}>
                <td>{emp.fname}</td>
                <td>{emp.lname}</td>
                <td>{emp.job}</td>
                <td>{emp.desc}</td>
                <td>{emp.role}</td>
                <td><button onClick={() => handleEdit(index)}>Edit</button></td>
                <td><button onClick={() => handleDelete(index)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App;
