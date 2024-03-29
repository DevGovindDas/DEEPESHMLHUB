
export function CourseCard({ course }) {

  return (
    <div style={{ width: "200px", height: "140px", backgroundColor: `${course.available ? "green" : "red"}`, padding: "10px", margin: "10px", borderRadius: "10px" }}>
      <h6 style={{ margin: "0" }}>{course.name}</h6>
      <p style={{ margin: "0" }}>{course.category}</p>
      <p style={{ margin: "0" }}>{course.price}</p>
      <br></br>
      <p style={{ margin: "0" }}>{course.available ? "Avalible" : "Not Avalible"}</p>
    </div>
  );
}
