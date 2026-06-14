import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddStudent.css";

function AddStudent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
  try {
    await axios.post("http://localhost:5000/api/students", {
      name,
      email,
      branch,
      year,
    });

    navigate("/"); // 🔥 back to home
  } catch (error) {
    console.log(error.response.data);
  }
};

  return (
    <div className="add-container">
      <h2>Add Student</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        type="text"
        placeholder="Branch"
        value={branch}
        onChange={(e) => setBranch(e.target.value)}
      />
      <br /><br />

      <input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <br /><br />

      <button onClick={handleSubmit}>
         Add Student
        </button>

    </div>
  );
}

export default AddStudent;