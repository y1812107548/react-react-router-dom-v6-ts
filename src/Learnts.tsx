import React from 'react'
// 1
// const user = {
//     name:'daniel',
//     age:22,
// }
// user.location
// 2
// let announcement = "hello world!";

// announcement.toUpperCase()
// console.log('announcement: ', announcement);
// 3
// const value = Math.random() < 0.5 ? "a" : "b";
// if (value !== "a") {
//   // ...
// } else if (value === "b") {
// // 永远无法到达这个分支
// }
// 4
// function greet(person: string, date: Date) {
//     console.log(`Hello ${person}, today is ${date.toDateString()}!`);
//   }

//   greet("Maddison", new Date());
// 5
// let obj: any = { x: 0 };
// // None of the following lines of code will throw compiler errors.
// // Using `any` disables all further type checking, and it is assumed
// // you know the environment better than TypeScript.
// obj.foo();
// obj();
// obj.bar = 100;
// obj = "hello";
// const n: number = obj;
//6
// No type annotations here, but TypeScript can spot the bug
// const names = ["Alice", "Bob", "Eve"];

// names.forEach(function (s) {
//     console.log(s.toUpperCase());
//     // Property 'toUppercase' does not exist on type 'string'.Did you mean 'toUpperCase' ?
// });

// // Contextual typing also applies to arrow functions
// names.forEach((s) => {
//   console.log(s.toUpperCase());
// });
//7
// function printName(obj: { first: string; last?: string }) {
//     // Error - might crash if 'obj.last' wasn't provided!
//     console.log(obj.last?.toUpperCase());
//     //   Object is possibly 'undefined'.
//     if (obj.last !== undefined) {
//         // OK
//         console.log(obj.last.toUpperCase());
//     }

//     // A safe alternative using modern JavaScript syntax:
//     console.log(obj.last?.toUpperCase());
// }

//8
// declare function getInput():string;

// declare function sanitize(str:string):string

// type UserInputSanitizedString = string;

// function sanitizeInput(str:string):UserInputSanitizedString{
//     return sanitize(str)
// }

// let userInput = sanitizeInput(getInput())

// userInput = 'new input'

//9 所有的 interface 功能都可以在 type 中使用
// // type 不能重新开放类型以添加新的属性，而接口始终是可扩展的
// interface Animal {
//     name:string;
// }

// interface Animal {
//     eat?:string
// }
// interface Bear extends Animal {
//     honey:boolean;
// }

// const bear:Bear = {
//     name:'熊大',
//     honey:true
// }


// type Animal1 = {
//     name:string;

// }
// // Error: Duplicate identifier 'Animal1'
// // type Animal1 = {
// //     eat?:string
// // }

// type Bear1 = Animal1 & {
//     honey:boolean;
// }



//10 
// const myCanvas = document.getElementsByClassName("main_canvas") as any;

// const a = expr as any as T

// 11
// function printText(s: string, alignment: "left" | "right" | "center") {

// }
//   printText("Hello, world", "left");
//   printText("G'day, mate", "centre");

// 12

// interface Options {
//     width:number;
// }

// function configure(x:Options | 'auto'){

// }
// configure({ width: 100 });
// configure("auto");
// configure("automatic");

//13 当是可选为某一种类型 需要改对象为常量
// const req = { url: "https://example.com", method: "GET" };
// const req = { url: "https://example.com", method: "GET" as "GET" };
// const req = { url: "https://example.com", method: "GET"} as const;
// // handleRequest(req.url, req.method as 'GET');//Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"'
// handleRequest(req.url, req.method)
// function handleRequest(url:string,method:'GET' | 'POST'){

// }

// 14
// ts type 类型
// string number bigint boolean symbol undefined object function
// function padLeft(padding: number | string, input: string) {
//     // return " ".repeat(padding) + input;
//     if(typeof padding === 'number') return ' '.repeat(padding) + input
//     return padding + input
// }

// 15
// function printAll(strs:string | string[] | null){
//     if(strs && typeof strs ==='object'){
//         for(const s of strs){
//             console.log(s);
//         }
//     }else if(typeof strs === 'string'){

//     }
// }

// function multiplyAll(values:number[] | undefined,factor:number):number[] | undefined{
//     if(!values) return values
//     return values.map(x=>(x*factor))
// }


//16 in

// type Fish = {
//     swim: () => void
// }
// type Bird = {
//     fly: () => void
// }

// type Human = {
//     swim?:()=>void;
//     fly?:()=>void
// }

// function move(animal:Fish | Brid | Human){
//     // if('swim' in animal) return animal?.swim()
//     // return animal?.fly()
// }

//17
// function logValue(x:Date | string){
//     if(x instanceof Date){
//         console.log(x.toLocaleString());
//     }else{
//         x.toLocaleLowerCase()
//     }
// }

//18
// function isFish(pet: Fish | Bird): pet is Fish {
//     return (pet as Fish).swim !== undefined;
// }
// console.log(isFish({fly:()=>{}}));

//19
// interface Shape {
//     kind: "circle" | "square";
//     radius?: number;
//     sideLength?: number;
// }

// function getArea(shape:Shape) {
//     // return Math.PI * shape.radius ** 2 // Object is possibly 'undefined'.
//     // return Math.PI * shape.radius! ** 2
//     if(shape.kind === 'circle') return Math.PI * shape.radius! ** 2
// }

// 20
// interface Circle {
//     kind: "circle";
//     radius: number;
// }

// interface Square {
//     kind: "square";
//     sideLength: number;
// }

// interface Triangle {
//     kind: "triangle";
//     sideLength: number;
// }

// type Shape = Circle | Square | Triangle;

// function getArea(shape: Shape) {
//     switch (shape.kind) {
//         case 'circle':

//             return Math.PI * shape.radius ** 2
//         case 'square':

//             return shape.sideLength ** 2
//         default:
//             const _exhaustiveCheck: never = shape;
//             return _exhaustiveCheck
//     }
// }
//21
function greeter(fn:(a:string)=>void){
    fn('hello ts')
}
function printtoconsole(s:string){
    console.log(s);
}
greeter(printtoconsole)
const Learnts:React.FC = () => {
    return (
        <div>
            Learnts
            <div className="main_canvas"></div>
        </div>
    )
}

export default Learnts