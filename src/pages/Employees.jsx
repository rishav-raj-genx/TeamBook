import { useEffect, useState } from "react";
import EmployeeCard from "../components/EmployeeCard";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchVal, setSearchVal] = useState("");
  const [department, setDepartment] = useState("All");

  useEffect(() => {
    fetch("https://dummyjson.com/users?limit=30")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not load employees");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setEmployees(data.users);
        setLoading(false);
      })
      .catch(() => {
        setError("Sorry, employee data could not be loaded.");
        setLoading(false);
      });
  }, []);

  const departments = ["All", ...new Set(employees.map((employee) => employee.company.department))];
  const shownEmployees = employees.filter((employee) => {
    const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
    const matchesName = fullName.includes(searchVal.toLowerCase());
    const matchesDepartment = department === "All" || employee.company.department === department;
    return matchesName && matchesDepartment;
  });

  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="eyebrow">OUR PEOPLE</p>
          <h1>Meet the team</h1>
        </div>
        <p>Search through our team and find your next teammate.</p>
      </div>
      <div className="filters">
        <label>
          Search by name
          <input
            type="text"
            value={searchVal}
            onChange={(event) => setSearchVal(event.target.value)}
            placeholder="Try searching for Emily..."
          />
        </label>
        <label>
          Department
          <select value={department} onChange={(event) => setDepartment(event.target.value)}>
            {departments.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
      </div>
      {loading && <p className="status">Loading employees...</p>}
      {error && <p className="status error">{error}</p>}
      {!loading && !error && shownEmployees.length === 0 && <p className="status">No employees match your search.</p>}
      <div className="employee-grid">
        {shownEmployees.map((employee) => <EmployeeCard key={employee.id} employee={employee} />)}
      </div>
    </section>
  );
}

export default Employees;
