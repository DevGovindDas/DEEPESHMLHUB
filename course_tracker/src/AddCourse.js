import { useState } from "react";

export function AddCourse({ courseArray, setCourseArray }) {
  const [courseName, setCourseName] = useState('');
  const [courseCategory, setCourseCategory] = useState('');
  const [coursePrice, setCoursePrice] = useState('');
  const [courseAvailible, setCourseAvalible] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();

    const newCourse = {
      category: courseCategory,
      price: coursePrice,
      available: courseAvailible,
      name: courseName,
      id: Date.now(),
    };
    setCourseArray([...courseArray, newCourse]);
    console.log(courseArray);
  }
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ margin: "auto" }}>
        <form onSubmit={handleSubmit}>
          <table>
            <thead><th style={{ textDecoration: "underline" }}>Please enter the Course details<br></br><br></br></th></thead>
            <tr>
              <td>
                <label htmlFor="name">Enter Course Name</label>
              </td>
              <td>
                <input
                  type="text"
                  id="name"
                  placeholder="Course Name"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)} />
              </td>
              <td>
                <label htmlFor="duration">Enter Course Category</label>
              </td>
              <td>
                <input
                  type="text"
                  id="category"
                  placeholder="Course Category"
                  value={courseCategory}
                  onChange={(e) => setCourseCategory(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="price">Enter Course Price</label>
              </td>
              <td>
                <input
                  type="text"
                  id="price"
                  placeholder="Course Price"
                  value={coursePrice}
                  onChange={(e) => setCoursePrice(e.target.value)} />
              </td>
              <td>
                <label htmlFor="availible">Enter Track Artist</label>
              </td>
              <td>
                <input
                  type="text"
                  id="availible"
                  placeholder="Course Availible"
                  value={courseAvailible}
                  onChange={(e) => setCourseAvalible(e.target.value === 'true' ? true : false)} />
              </td>
            </tr>
            <tr>
              <td>
                <input type="submit" value={'Submit'} />
              </td>
            </tr>
          </table>
        </form>
      </div>
    </div>
  );
}
