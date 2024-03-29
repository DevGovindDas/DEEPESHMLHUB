import { Link } from "react-router-dom";

export function Navigatr() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li
              className="btn btn-success"
              style={{ margin: "20px", color: "black" }}
            >
              <Link to="/" style={{ color: "black" }}>
                Home
              </Link>
            </li>
            <li className="btn btn-success" style={{ margin: "20px" }}>
              <Link to="/addCourse" style={{ color: "black" }}>
                Add Course
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
