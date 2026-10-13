import { Link } from "react-router-dom";

function EmployeeCard({ employee }) {
  return (
    <article className="employee-card">
      <img src={employee.image} alt={`${employee.firstName} ${employee.lastName}`} />
      <div className="card-info">
        <h2>{employee.firstName} {employee.lastName}</h2>
        <p className="job-title">{employee.company.title}</p>
        <p className="department">{employee.company.department}</p>
        <Link className="small-button" to={`/employees/${employee.id}`}>View profile</Link>
      </div>
    </article>
  );
}

export default EmployeeCard;
