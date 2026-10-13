import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Employees from "./pages/Employees";
import EmployeeDetails from "./pages/EmployeeDetails";

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <Link className="brand" to="/">
          TeamBook
        </Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/employees">Employees</Link>
        </div>
      </nav>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/employees/:id" element={<EmployeeDetails />} />
          <Route
            path="*"
            element={
              <section className="not-found">
                <h1>Page not found</h1>
                <p>We could not find that TeamBook page.</p>
                <Link className="button" to="/">Back to Home</Link>
              </section>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
