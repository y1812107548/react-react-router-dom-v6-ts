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
function printName(obj: { first: string; last?: string }) {
    // Error - might crash if 'obj.last' wasn't provided!
    console.log(obj.last?.toUpperCase());
    //   Object is possibly 'undefined'.
    if (obj.last !== undefined) {
        // OK
        console.log(obj.last.toUpperCase());
    }

    // A safe alternative using modern JavaScript syntax:
    console.log(obj.last?.toUpperCase());
}
const Learnts = () => {
    return (
        <div>Learnts</div>
    )
}

export default Learnts