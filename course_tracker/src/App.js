import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Navigatr } from "./Navigatr";
import { AddCourse } from "./AddCourse";
import { Home } from "./Home";
import { COURSES } from "./COURSES";

export default function App() {

  const [courseArray, setCourseArray] = useState(COURSES);

  return (

    <Router>
      <div>
        <Navigatr />
        <Routes>
          <Route
            path="/"
            Component={() => (
              <Home courseArray={courseArray}
              />
            )}
          />
          <Route
            exact
            path="/addCourse"
            Component={() => (
              <AddCourse courseArray={courseArray} setCourseArray={setCourseArray} />
            )}
          />

        </Routes>
      </div>
    </Router>

  );
}


