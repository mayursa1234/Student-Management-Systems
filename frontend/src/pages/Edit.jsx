import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");

  // GET single student
  useEffect(() => {
    axios.get(`http://localhost:5000/api/students/${id}`)
      .then((res) => {
        setName(res.data.name);
        setEmail(res.data.email);
        setBranch(res.data.branch);
        setYear(res.data.year);
      })
      .catch((err) => console.log(err));
  }, [id]);

  // UPDATE student
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/students/${id}`, {
        name,
        email,
        branch,
        year,
      });

      navigate("/"); // back to home
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="add-container">
      <h2>Edit Student</h2>

      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input value={branch} onChange={(e) => setBranch(e.target.value)} />
      <input value={year} onChange={(e) => setYear(e.target.value)} />

      <button onClick={handleUpdate}>
        Update Student
      </button>
    </div>
  );
}

export default Edit;