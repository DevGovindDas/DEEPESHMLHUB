import { useState } from "react";
import { COURSES } from "./COURSES";
import { CourseCard } from "./CourseCard";

export function Home({ courseArray }) {
  const [searchItem, setSearchItem] = useState('');
  const [onlyShowCoursesAvalible, setOnlyShowCoursesAvalible] = useState(false);
  const [sortedCourseArray, setSortedCourseArray] = useState(COURSES);
  function handleOnSubmit(e) {
    e.preventDefault();
    setSortedCourseArray(courseArray.filter((course) => course.name.toLowerCase().includes(searchItem.toLowerCase())).filter((course) => (!onlyShowCoursesAvalible) || course.available));
    console.log(sortedCourseArray);
    console.log(onlyShowCoursesAvalible);
  }
  return (
    <div className='container'>
      <h2 style={{ backgroundColor: "yellow", textAlign: "center", fontWeight: "800" }}>Course Tracker</h2>
      <div className="container" style={{ paddingLeft: "100px", paddingRight: "100px" }}>
        <form onSubmit={handleOnSubmit}>
          <label htmlFor="search" style={{ width: "100px" }}>Search</label>
          <input id="search" type="text" value={searchItem} placeholder="Search..." onChange={(e) => setSearchItem(e.target.value)} style={{ width: "200px" }} />
          <br></br>
          <input id="onlyShowCoursesAvalible" type="checkbox" value={onlyShowCoursesAvalible} onChange={(e) => setOnlyShowCoursesAvalible(!onlyShowCoursesAvalible)} />
          <label htmlFor="onlyShowCoursesAvalible">Only Show Courses Avalible</label>
        </form>
        <br></br>
        <div className="row">
          {sortedCourseArray.length === 0 ? <h3 style={{ textAlign: "center" }}>No Data Found</h3> :
            sortedCourseArray.map((course) => (<CourseCard course={course} key={course.id} />))}
        </div>
      </div>
    </div>
  );
}
