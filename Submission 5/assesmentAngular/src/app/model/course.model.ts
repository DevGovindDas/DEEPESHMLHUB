export class Course {
    courseId?: number;
    author?:Author;
    courseName? : String;
    duration?:number;
    avaliblity?:boolean;
}

export class Author{
    authorName? : String;
    authorId?: number;
    emailId?:String;
}
export class Course1 {
    courseId?: number;
    courseName? : String;
    duration?:number;
    avaliblity?:boolean;
    authorId?:number;
}

// "id": 1,
// "name": "Ane",
// "salary": 300