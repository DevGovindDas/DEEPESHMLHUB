export interface UserformInterface{
    firstName:String;
    surName:String;
    mobileEmail: String;
    password:String;
    dob:DateOfBirth;
    gender:String;
}
export interface DateOfBirth{
    day:number;
    month:String;
    year:number;
}
export interface Book{
    bookName:String;
    author:String;
    bookImg:String;
    kindlePrice:String;
    paperbackPrice:String;
}