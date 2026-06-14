import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./home.css";

function Home() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [dark, setDark] = useState(false);

  const navigate = useNavigate();

  // GET all students
  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/students");
      setStudents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // DELETE student
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`);
      fetchStudents(); // auto refresh
    } catch (err) {
      console.log(err);
    }
  };

  // search filter
  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={dark ? "container dark" : "container"}>

      {/* TITLE */}
      <h1 className="title">Student Management System</h1>

      {/* DASHBOARD */}
      <div className="dashboard">
        <div className="dash-card">
          Total Students: {students.length}
        </div>
      </div>

      {/* CONTROLS */}
      <div className="controls">

        {/* SEARCH */}
        <input
          className="searchBar"
          type="text"
          placeholder="Search student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* DARK MODE */}
        <button className="darkBtn" onClick={() => setDark(!dark)}>
          {dark ? "Light Mode" : "Dark Mode"}
        </button>

        {/* ADD STUDENT */}
        <button className="addBtn" onClick={() => navigate("/add")}>
          + Add Student
        </button>
      </div>

      {/* STUDENT GRID */}
      <div className="grid">
        {filteredStudents.map((s) => (
          <div className="card" key={s._id}>
            
            <h3>{s.name}</h3>
            <p>{s.email}</p>
            <p>{s.branch}</p>
            <p>Year: {s.year}</p>

            <div className="btns">

              {/* EDIT */}
              <button
                className="edit"
                onClick={() => navigate(`/edit/${s._id}`)}
              >
                Edit
              </button>

              {/* DELETE */}
              <button
                className="delete"
                onClick={() => handleDelete(s._id)}
              >
                Delete
              </button>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Home;