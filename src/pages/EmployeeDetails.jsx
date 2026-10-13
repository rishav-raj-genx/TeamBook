import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EmployeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`https://dummyjson.com/users/${id}`).then((response) => {
        if (!response.ok) throw new Error("Could not load employee");
        return response.json();
      }),
      fetch(`https://dummyjson.com/users/${id}/todos`).then((response) => {
        if (!response.ok) throw new Error("Could not load tasks");
        return response.json();
      })
    ])
      .then(([employeeData, todoData]) => {
        setEmployee(employeeData);
        setTodos(todoData.todos);
        setLoading(false);
      })
      .catch(() => {
        setError("Sorry, this employee could not be loaded.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="status">Loading employee details...</p>;
  if (error) return <p className="status error">{error}</p>;
  if (!employee) return <p className="status error">Employee not found.</p>;

  return (
    <section>
      <button className="back-button" onClick={() => navigate("/employees")}>← Back to employees</button>
      <div className="details-layout">
        <div className="profile-card">
          <img className="profile-image" src={employee.image} alt={`${employee.firstName} ${employee.lastName}`} />
          <p className="eyebrow">{employee.company.department}</p>
          <h1>{employee.firstName} {employee.lastName}</h1>
          <p className="job-title">{employee.company.title}</p>
        </div>
        <div className="details-content">
          <div className="info-grid">
            <div><span>Age</span><strong>{employee.age}</strong></div>
            <div><span>Email</span><strong>{employee.email}</strong></div>
            <div><span>Phone</span><strong>{employee.phone}</strong></div>
            <div><span>City</span><strong>{employee.address.city}</strong></div>
            <div><span>Company</span><strong>{employee.company.name}</strong></div>
            <div><span>Department</span><strong>{employee.company.department}</strong></div>
          </div>
          <div className="tasks-box">
            <h2>Tasks</h2>
            {todos.map((todo) => (
              <div className="task-row" key={todo.id}>
                <span>{todo.todo}</span>
                <b className={todo.completed ? "done" : "pending"}>{todo.completed ? "Done" : "Pending"}</b>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default EmployeeDetails;
