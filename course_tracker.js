var COURSES = [
    {category: "Programming", price: "$100", available: true, name: "JavaScript Basics",id:1},
    {category: "Programming", price: "$200", available: false, name: "Advanced Python",id:2},
    {category: "Design", price: "$150", available: true, name: "UI/UX Design Fundamentals",id:3},
    {category: "Design", price: "$300", available: false, name: "Advanced Graphic Design",id:4},
    {category: "Marketing", price: "$120", available: true, name: "SEO Basics",id:5},
    {category: "Marketing", price: "$220", available: false, name: "Advanced Social Media Marketing",id:6}
    ];

    const choice='Yes';
    const id=7;
    function addNewCourse(course){
        COURSES=[...COURSES,course];
    }

console.log("************************Display All Courses***********************");

    for(var i=0;i<COURSES.length;i++){
        console.log('***********Course************');
        console.log({...COURSES[i]})
    }

console.log("************************Add a new Course with id 7***********************");
// while(choice==='Yes'){

// const category=prompt("Enter the Category:");
// const price=prompt("Enter the Price:");
// const avalible=prompt("Enter the Avaliblity:");
// const name=prompt("Enter the Name:");

const newCourse={
    category:"c1",
    price:"$100",
    avalible:true,
    name:"Subbu",
    id:id
}
addNewCourse(newCourse);
// choice=prompt("Do You want to add one more course?Yes/No:")
// }

console.log("************************Display All Courses***********************");

for(var i=0;i<COURSES.length;i++){
    console.log('***********Course************');
    console.log({...COURSES[i]})
}


console.log("************************Update course with id 1***********************");

COURSES.map((course)=>course.id===1?{...course,name:'Updated Name'}:course).map((course)=>{console.log(course);});
COURSES=COURSES.map((course)=>course.id===1?{...course,name:'Updated Name'}:course);
console.log("************************Delete Course with id 1***********************");

console.log(COURSES.filter((course)=>course.id!==1));
console.log("************************Display All Courses***********************");

for(var i=0;i<COURSES.length;i++){
    console.log('***********Course************');
    console.log({...COURSES[i]})
}

console.log("************************Search Course with name containing UI/UX***********************");

var course=COURSES.filter((course)=>course.name.includes('UI/UX'));

console.log('The found course details are as follows',course);