IS231: Web Technology JavaScript and AJAX 

By: Neamat El Tazi 

## References 

- **W3schools.com** 

- **https://www.geeksforgeeks.org/mvc-design-pattern/** 

- **https://selftaughtcoders.com/from-idea-to-launch/lesson-17/laravel-5mvc-application-in-10-minutes/** 

2 

Web Technology 

Neamat El Tazi 

## ECMAScri t 2009 – ES5 p 

- ECMAScript 2009, also known as ES5, was the first major revision to JavaScript. 

3 

Web Technology 

Neamat El Tazi 

## ES5 Most Im ortant Features p 

- "use strict" 

- String.trim() 

- Array.isArray() 

- Array.forEach() 

- Array.map() 

- Array.filter() 

- Array.reduce() 

- Array.reduceRight() 

- Array.every() 

- Array.some() 

- Array.indexOf() 

- Array.lastIndexOf() 

- JSON.parse() 

- JSON.stringify() 

- Date.now() 

- Property Getters and Setters 

- New Object Property Methods 

4 

Web Technology 

Neamat El Tazi 

## Use Strict Directive 

- The "use strict" directive was new in ES5. 

- It is not a statement, but a literal expression, ignored by earlier versions of JavaScript. 

- The purpose of "use strict" is to indicate that the code should be executed in "strict mode". 

- With strict mode, you can not, for example, use undeclared variables. 

**==> picture [594 x 63] intentionally omitted <==**

Web Technology 

Neamat El Tazi 

5 

## Strin .trim g () 

- String.trim() removes whitespace from both sides of a string. 

**==> picture [562 x 79] intentionally omitted <==**

- Check Demo 11 

6 

Web Technology 

Neamat El Tazi 

## Arra .isArra y y() 

- The isArray() method checks whether an object is an 

   - array. 

```
varfruits =
```

- `"Banana"` 

- `[ , "Orange", "Apple", "Mango"]; console.log(Array.isArray(fruits));` 

## `Check Demo 12` 

Web Technology 

Neamat El Tazi 

7 

## Arra .forEach y () 

 The forEach() method calls a function once for each array element. 

```
functionmyFunction(value) {
 txt = txt + value +"<br>"
;
  console.log(txt);
}
```

```
vartxt ="";
var45491625
numbers = [,,,,];
numbers.forEach(myFunction);
```

Check Demo 13 

8 

Web Technology 

Neamat El Tazi 

## Array.map() 

- The map() method creates a new array by performing a function on each array element. 

- The map() method does not execute the function for array elements without values. 

- The map() method does not change the original array. 

- This example multiplies each array value by 2: 

```
functionmyFunction(value) {
returnvalue *2;
```

```
}
```

```
varnumbers1 = [45,4,9,16,25];
var
numbers2 = numbers1.map(myFunction);
```

```
Check Demo 14
```

9 

Web Technology 

Neamat El Tazi 

## Arra .filter y () 

- The `filter()` method creates a new array with array elements that passes a test. 

- This example creates a new array from elements with a value larger than 18: 

```
var45491625
numbers = [,,,,];
varover18 =numbers.filter(myFunction);
```

```
functionmyFunction(value) {
returnvalue >18
;
}
```

`###check Arrow functions in ES6 .. Coming` ☺ 

10 

Web Technology 

Neamat El Tazi 

## Arra .reduce y () 

- The reduce() method runs a function on each array element to produce (reduce it to) a single value. 

- The reduce() method works from left-to-right in the array 

- This example finds the sum of all numbers in an array: 

```
var45491625
numbers1 = [,,,,];
var
sum = numbers1.reduce(myFunction);
functionmyFunction(total, value) {
returntotal + value;
}
```

//Total here represents the initial value or the previously returned value Check Demo 16 

Web Technology 

Neamat El Tazi 

11 

## Array.reduceRight() 

- The reduceRight() method runs a function on each array element to produce (reduce it to) a single value. 

- The reduceRight() works from right-to-left in the array. 

- This example finds the sum of all numbers in an array: 

- `var 45 4 9 16 25 numbers1 = [ , , , , ];` 

- `var sum = numbers1.reduceRight(myFunction);` 

- `function myFunction(total, value, index, array) {` 

```
returntotal + value;
}
```

12 

Web Technology 

Neamat El Tazi 

## Array.every() 

- The every() method checks if all array values pass a test. 

 This example check if all array values are larger than 18: 

```
var45491625
numbers = [,,,,];
varallOver18 =numbers.every(myFunction);
```

```
functionmyFunction(value, index, array) {
returnvalue >18
;
}
```

```
Check Demo 18
```

13 

Web Technology 

Neamat El Tazi 

## Arra .some y () 

- The some() method check if some array values pass a test. 

- This example check if some array values are larger than 18: 

```
var45491625
numbers = [,,,,];
var
someOver18 = numbers.some(myFunction);
```

```
functionmyFunction(value, index, array) {
returnvalue >18
;
}
Check Demo 18 and change the function to “some”
```

14 

Web Technology 

Neamat El Tazi 

## Array.indexOf() 

- The indexOf() method searches an array for an element value and returns its position. 

 Note: The first item has position 0, the second item has position 1, and so on. 

```
varfruits =
```

- `["Apple", "Orange", "Apple", "Mango"]; var a = fruits.indexOf("Apple");` 

Web Technology 

Neamat El Tazi 

15 

## Array.lastIndexOf() 

 Array.lastIndexOf() is the same as Array.indexOf(), but returns the position of the last occurrence of the specified element. 

```
varfruits =
```

- `["Apple", "Orange", "Apple", "Mango"]; var a = fruits.lastIndexOf("Apple");` 

16 

Web Technology 

Neamat El Tazi 

## Array.find() 

- The find() method returns the value of the first array element that passes a test function. 

- This example finds (returns the value of) the first element that is larger than 18: 

- `var 4 9 16 25 29 numbers = [ , , , , ];` 

- `var first = numbers.find(myFunction);` 

```
functionmyFunction(value, index, array) {
returnvalue >18
;
}
```

```
Check Demo 18 and change the function to “find”
```

Web Technology 

Neamat El Tazi 

17 

## JSON.stringify() and JSON.parse() 

- A common use of JSON is to send data to a web server. 

- When sending data to a web server, the data has to be a string. 

- Imagine we have this object in JavaScript: 

   - `var obj = {name:"John", age:30, city:"New York"};` 

- Use the JavaScript function `JSON.stringify()` to convert it into a string. 

   - `var myJSON = JSON.stringify(obj);` 

18 

Web Technology 

Neamat El Tazi 

## Date.now() 

- Date.now() returns the number of milliseconds since zero date (January 1. 1970 00:00:00 UTC). 

- `var timInMSs = Date.now();` 

- `Date() returns today’s date and time now.` 

19 

Web Technology 

Neamat El Tazi 

## Pro ert Getters and Setters p y 

 ES5 lets you define object methods with a syntax that looks like getting or setting a property.  This example creates a **getter** for a property called fullName: 

```
// Create an object:
var
person = {
 firstName:"John"
,
 lastName :"Doe"
,
 getfullName() {
returnthis.firstName+" "+this.lastName;
}
```

```
};
```

- `// Display data from the object using a getter: document.getElementById("demo").innerHTML = person.fullName;` 

20 

Web Technology 

Neamat El Tazi 

## New Ob ect Pro ert Methods j p y 

 Object.defineProperty() is a new Object method in ES5. 

 `// Create an Object: var person = { firstName: "John", lastName : "Doe", language : "NO", };` 

```
// Change a Property:
Object.defineProperty(person,"language", {
```

```
value:"EN",
writable :true,
enumerable :true,
configurable :true
});
```

```
// Enumerate Properties
```

```
vartxt ="";
forvarxin
(person) {
txt += person[x] +"<br>";
```

```
}
document.getElementById("demo").innerHTML=txt;
```

21 

Web Technology 

Neamat El Tazi 

## Property Access on Strings 

 The charAt() method returns the character at a specified index (position) in a string: 

```
varstr ="HELLO WORLD"
;
str.charAt(0);
```

```
// returns H
```

ES5 allows property access on strings: 

```
varstr ="HELLO WORLD"
;
str[0];
```

```
// returns H
```

22 

Web Technology 

Neamat El Tazi 

## Trailin Commas g 

- ES5 allows trailing commas in object and array definitions: 

 

```
person = {
 firstName:"John"
,
 lastName:" Doe"
,
46
 age:,
}
```

- `Note:` JSON does not allow trailing commas. 

```
// Not allowed:
```

```
varperson ='{"firstName":"John",
"lastName":"Doe", "age":46,}'
JSON.parse(person)
```

23 

Web Technology 

Neamat El Tazi 

## Strin s Over Multi le Lines g p 

- ES5 allows string literals over multiple lines if escaped with a backslash: 

```
"Hello \
Dolly!";
```

A safer way to break up a string literal, is to use string addition: 

```
"Hello "+
"Dolly!";
```

24 

Web Technology 

Neamat El Tazi 

## Reserved Words as Pro ert Names p y 

- ES5 allows reserved words as property names: 

```
var"John"new:
obj = {name:,"yes"}
```

25 

Web Technology 

Neamat El Tazi 

## ECMAScri t 2015 – ES6 p 

 ECMAScript 6, also known as ES6 and ECMAScript 2015, was the second major revision to JavaScript. 

26 

Web Technology 

Neamat El Tazi 

## New Features in ES6 

- The let keyword 

- The const keyword 

- JavaScript Arrow Functions 

- JavaScript Class 

- JavaScript Promise 

- Default Parameter Values 

- New Types Properties (check it on www.w3schools.com) 

- ES7,8,9,10,11,12,13,14,15 

- ES2024 = ES15 

- ES2025 (latest Finalized as of now) 

27 

Web Technology 

Neamat El Tazi 

## The Var Ke word y 

 Before ES6, the var keyword was used to declare a variable in JavaScript. The var keyword has been around since the inception of JavaScript, and it’s what you will see in any pre ES6 code. 

 Variables declared using the var keyword are either globally or functionally scoped, they do not support block-level scope. This means that if a variable is defined in a loop or in an if statement it can be accessed outside the block and accidentally redefined leading to a buggy program. 

28 

Web Technology 

Neamat El Tazi 

## The Var Ke word y 

**==> picture [672 x 378] intentionally omitted <==**

29 

Web Technology 

Neamat El Tazi 

## ES6 Let Ke word ( ) y 

- The let keyword is very similar to the var keyword as they both allow you to reassign the value later. The main difference between the two is that let deals with a block scope and although it can be reassigned it cannot be redeclared. 

- Generally, you should avoid using the var keyword and use Let instead. 

30 

Web Technology 

Neamat El Tazi 

## Let Ke word y 

**==> picture [648 x 332] intentionally omitted <==**

31 

Web Technology 

Neamat El Tazi 

## JavaScri t let ke word p y 

 The let keyword allows you to declare a variable with block scope. 

```
varx =10
;
// Here x is 10
{
```

```
letx =2
;
// Here x is 2
```

```
}
```

```
// Here x is 10
```

32 

Web Technology 

Neamat El Tazi 

## JavaScri t const p 

- The const keyword allows you to declare a constant (a JavaScript variable with a constant value). 

- Constants are similar to let variables, except that the value cannot be changed. 

```
varx =10
;
// Here x is 10
{
```

```
constx =2
;
// Here x is 2
```

```
}
// Here x is 10
```

33 

Web Technology 

Neamat El Tazi 

## Arrow Functions 

- Arrow functions allows a short syntax for writing function expressions. 

 You don't need the function keyword, the return keyword, and the curly brackets. 

```
// ES5
```

```
varx =function(x, y) {
returnx * y;
```

```
}
```

```
// ES6
constx = (x, y) => x * y;
```

34 

Web Technology 

Neamat El Tazi 

## Arrow Functions 

- Arrow functions do not have their own this. They are not well suited for defining object methods. 

- They must be defined **before** they are used. 

- `const var` 

- Using is safer than using , because a function expression is always a constant value. 

- You can only omit the `return` keyword and the curly brackets if the function is a single statement. 

```
constx = (x, y) => {returnx * y };
=
```

```
constx = (x, y) => x * y;
```

35 

Web Technology 

Neamat El Tazi 

## Remember 

```
//ES5
```

```
var45491625
numbers = [,,,,];
varover18 =numbers.filter(myFunction);
```

```
functionmyFunction(value) {
returnvalue >18
;
```

```
}
```

```
//ES6
```

`var 45 4 9 16 25 numbers = [ , , , , ]; var over18 = numbers.filter((value)=>value>18);` Check Demo 20 

36 

Web Technology 

Neamat El Tazi 

## JavaScri t Classes p 

- JavaScript Classes are templates for JavaScript Objects. 

#  Use the keyword class to create a class. 

#  Always add a method named constructor(): 

## Syntax 

- `class ClassName {` 

```
 constructor() { ...}
```

```
}
```

37 

Web Technology 

Neamat El Tazi 

## JavaScri t Classes p 

- Classes were introduced in ES6 to provide a cleaner way to follow object-oriented programming patterns. 

- JavaScript still follows a prototype-based inheritance model. Classes in JavaScript are syntactic sugar over the prototype-based inheritance model which we use to implement OOP concepts. 

- Thus, the introduction of classes in JS made it easier for developers to build software around OOP concepts. It also brought in similarities to different OOP-based programming languages such as C++ and Java. 

38 

Web Technology 

Neamat El Tazi 

## Before Classes 

 Before classes, we used constructor functions to do OOP in JavaScript. 

function Pen name color ( , , price) { = this. `name name` ; = this. `color color` ; = this. `price price` ; } = const `pen1` new Pen("Marker", "Blue", "$3"); `console` .log( `pen1` ); 

https://www.freecodecamp.org/news/javascript-classes-how-they-work-with-use-case/ 

39 

Web Technology 

Neamat El Tazi 

## Before Classes – Adding a function to a constructor 

function Pen(name, color, price) { this.name = name; this.color = color; this.price = price; } const pen1 = new Pen("Marker", "Blue", "$3"); Pen.prototype.showPrice = function(){ console.log(`Price of ${this.name} is ${this.price}`); } 

pen1.showPrice(); 

40 

Web Technology 

Neamat El Tazi 

## Usin Class Ke word g y 

class Pen { constructor(name, color, price){ this.name = name; this.color = color; this.price = price; } 

showPrice(){ console.log(`Price of ${this.name} is ${this.price}`); } } 

const pen1 = new Pen("Marker", "Blue", "$3"); pen1.showPrice(); 

41 

Web Technology 

Neamat El Tazi 

JavaScri t Classes – Another exam le p p Example 

 `class Car { constructor(name, year) { this.name = name; this .year = year;` 

```
 }
```

```
}
```

- Using a Class 

```
letnew"Ford"2014
myCar1 =Car(,);
letnew"Audi"2019
myCar2 =Car(,);
```

42 

Web Technology 

Neamat El Tazi 

## Inheritance in Javascri t Classes p 

class OfficeSupplies { constructor(name, color, price){ this.name = name; this.color = color; this.price = price; } showPrice(){ console.log(`Price of ${this.name} is ${this.price}`); } } 

class Pen extends OfficeSupplies { constructor(type){ super(); this.type = type; 

} 

showType(){ console.log(`Type of ${this.name} is ${this.type}`);  }} 

43 

Web Technology 

Neamat El Tazi 

## JavaScri t Promise Ob ect p j 

- A Promise is a JavaScript object that links "Producing Code" and "Consuming Code". 

- "Producing Code" can take some time and "Consuming Code" must wait for the result. 

## **Promise Syntax** 

```
letmyPromise =newPromise(function(myResolve, myReject) {
// "Producing Code" (May take some time)
```

```
 myResolve();// when successful
 myReject(); // when error
```

```
});
```

- `// "Consuming Code" (Must wait for a fulfilled Promise). myPromise.then(` 

```
function(value) {/* code if successful */},
function(error) {/* code if some error */}
```

```
);
```

44 

Web Technology 

Neamat El Tazi 

## Exam le Usin a Promise p g 

```
letmyPromise
```

- `= new Promise(function(myResolve, myReject)` 

```
{
```

- `setTimeout(function() { myResolve("I love` 

- `You !!"); }, 3000); });` 

```
myPromise.then(function(value) {
 document.getElementById("demo").innerHTML
= value;
```

- `});` 

- Check Demo 200.html 

45 

Web Technology 

Neamat El Tazi 

## Default Parameter Values 

- ES6 allows function parameters to have default values. 

```
functionmyFunction(x, y =10) {
// y is 10 if not passed or undefined
return
x + y;
```

```
}
```

```
myFunction(5);// will return 15
```

46 

Web Technology 

Neamat El Tazi 

## Function Rest Parameter 

- The rest parameter (...) allows a function to treat an indefinite number of arguments as an array: 

```
functionsum(...args) {
letsum =0
;
for(letarg of args) sum += arg;
return
sum;
}
```

```
let491625291006677
x = sum(,,,,,,,);
```

```
Check Demo 22
```

47 

Web Technology 

Neamat El Tazi 

## Array.find() 

- The find() method returns the value of the first array element that passes a test function. 

- This example finds (returns the value of ) the first element that is larger than 18: 

```
var49162529
numbers = [,,,,];
varfirst =numbers.find(myFunction);
```

```
functionmyFunction(value) {
returnvalue >18
;
}
```

48 

Web Technology 

Neamat El Tazi 

## New Global Methods: The isNaN() Method 

 The global isNaN() method returns true if the argument is NaN. Otherwise it returns false 

```
isNaN("Hello");
```

```
// returns true
```

```
//Try it
```

49 

Web Technology 

Neamat El Tazi 

## New Global Methods: The isFinite() Method 

- The global isFinite() method returns false if the argument is Infinity or NaN. 

- Otherwise it returns true: 

```
isFinite(10/0);
isFinite(10/1);
isFinite(“hello”);
```

```
// returns false
// returns true
   // returns false
```

50 

Web Technology 

Neamat El Tazi 

## ECMA2016 – ES7 

##  Introduced only two new features: 

 Array.prototype.includes() 

- Exponential Operatator 

Web Technology 

Neamat El Tazi 

51 

## ES7 – Includes() feature 

 In ES6, we used to use indexOf() function to check if a value exists in an array like the following: Let numbers = [1,2,3,4] 

if(numbers.indexOf(2) !== -1) { //do something} 

- In ES7, we can write: 

Let numbers = [1,2,3,4] 

if(numbers.includes(2)) { //do something} 

52 

Web Technology 

Neamat El Tazi 

Difference between indexOf and includes 

 Array.prototype.includes() handles NaN better than Array.prototype.indexOf(). If the array contains NaN, indexOf() cannot handle it. 

 Array.prototype.includes() returns the correct value when searching for NaN. 

console.log(numbers.indexOf(NaN)); //Prints -1 console.log(numbers.includes(NaN)); //Prints true 

53 

Web Technology 

Neamat El Tazi 

## ES7 – Ex onentiation O erator p p 

- ECMAScript 2016 introduced the exponentiation operator, **. 

 It has the same purpose as Math.pow(). It returns the first argument raised to the power of the second argument. 

let base = 3; let exponent = 4; let result = base**exponent; console.log(result); //81 

54 

Web Technology 

Neamat El Tazi 

## ES8 

- ES8 introduces two string handling functions for padding a string: 

   - String.padStart() 

   - String.padEnd() 

- Async and Await 

Web Technology 

Neamat El Tazi 

55 

## ES8 – adStart p () 

string_value.padStart(targetLength [, padString]) 

56 

Web Technology 

Neamat El Tazi 

## ES8 – adEnd p () 

string_value.padEnd(targetLength [, padString]) 

Web Technology 

Neamat El Tazi 

57 

## ES8 – As nc and Await y 

- Async/Await is a very important feature in ES8. 

- The await keyword is used with promises. This keyword can be used to pause the execution of a function till a promise is settled. 

- The await keyword returns value of the promise if the promise is resolved while it throws an error if the promise is rejected. 

- The await function can only be used inside functions marked as async. A function that is declared using the async keyword always returns a promise. 

58 

Web Technology 

Neamat El Tazi 

## ES8 – As nc and Await  --- **in ES6** y 

**==> picture [570 x 385] intentionally omitted <==**

59 

Web Technology 

Neamat El Tazi 

## **ES8** – As nc and Await y 

Check Demo 201.html 

60 

Web Technology 

Neamat El Tazi 

## Promise chainin with As nc/await in ES8 g y 

**==> picture [371 x 388] intentionally omitted <==**

**==> picture [160 x 138] intentionally omitted <==**

61 

Web Technology 

Neamat El Tazi 

## ES9 

##  ES9 introduced: 

#  Rest/Spread Properties 

##  Promise: finally() 

62 

Web Technology 

Neamat El Tazi 

## ES9 - Rest/S read Pro erties p p 

**==> picture [397 x 378] intentionally omitted <==**

The value of age property of student is copied into the age variable while the values of the remaining properties are copied into the other variable using the rest syntax `...` 

63 

Web Technology 

Neamat El Tazi 

## ES9 – Promise Finall y 

The **finally()** is executed whenever a promise is settled, regardless of its outcome. This function returns a promise. It can be used to avoid code duplication in both the promise's **then()** and **catch()** handlers. 

**==> picture [381 x 186] intentionally omitted <==**

64 

Web Technology 

Neamat El Tazi 

## ES9 – romise finall Exam le p y() p 

**==> picture [294 x 370] intentionally omitted <==**

The following example declares a async function that returns the square of a positive number after a delay of 3 seconds. The function throws an error if a negative number is passed. The statements in the finally block is executed in either case, whether the promise is rejected or resolved. 

**==> picture [151 x 132] intentionally omitted <==**

65 

Web Technology 

Neamat El Tazi 

## ES10 – ECMAScri t2019 p 

 ES10 introduced some new functions/features: 

 flat() is a method which is used to flatten an array. There are certain situations in which the elements of an array are an array. These types of arrays are called nested arrays.  Normally to un-nest (flatten) them, we had to use recursion. Now with the introduction of flat(), it can be done in a single line. **F.Y.I — a flattened array is an array of depth 0** 

**==> picture [536 x 149] intentionally omitted <==**

66 

Web Technology 

Neamat El Tazi 

## ES10 – ECMAScri t2019 p 

- ES10 introduced some new functions/features: 

   - **flatMap()** is used to flatten a nested array and to change the values according to a function like a map() function. 

**==> picture [519 x 189] intentionally omitted <==**

67 

Web Technology 

Neamat El Tazi 

## ES11 – ECMAScri t2020 p 

 ES11 introduced private class variables: 

class HelloWorld { #message = "How are you?";  //this is a private variable getMessage() { console.log(this.#message) } } 

const hello = new HelloWorld() hello.getMessage() // How are you? 

68 

Web Technology 

Neamat El Tazi 

## ES12 ES13 and ES14 , 

- Small but useful features have been added to ES12, ES13 and now also in 2023 ES14 

- You can check them online. 

69 

Web Technology 

Neamat El Tazi 

AJAX 

70 

Web Technology 

Neamat El Tazi 

## AJAX 

- AJAX is not a programming language. 

- AJAX is a technique for accessing web servers from a web page. 

- AJAX stands for Asynchronous JavaScript And XML. 

Web Technology 

Neamat El Tazi 

71 

## AJAX Exam le p 

HTML Page 

- `<!DOCTYPE html>` 

```
<html>
<>
body
```

- `<div id="demo">` 

```
<h2>Let AJAX change this text</h2>
<buttontype="button"onclick="loadDoc()
">Change Content</button>
</div>
```

```
<>
/body
</html>
```

72 

Web Technology 

Neamat El Tazi 

## AJAX Exam le p 

- Function loadDoc() 

 `function loadDoc() { var new xhttp = XMLHttpRequest(); = xhttp.onreadystatechange function() { == == if (this.readyState 4 && this.status 200) { document.getElementById("demo").innerHTML = this.responseText; }` 

```
 };
"GET"true
 xhttp.open(,"ajax_info.txt",);
 xhttp.send();
```

```
}
```

73 

Web Technology 

Neamat El Tazi 

## What is AJAX? 

**==> picture [592 x 337] intentionally omitted <==**

74 

Web Technology 

Neamat El Tazi 

## AJAX C cle y 

1. An event occurs in a web page (the page is loaded, a button is clicked) 

2. An XMLHttpRequest object is created by JavaScript 

3. The XMLHttpRequest object sends a request to a web server 

4. The server processes the request 

5. The server sends a response back to the web page 

6. The response is read by JavaScript 

7. Proper action (like page update) is performed by JavaScript 

Web Technology 

Neamat El Tazi 

75 

## Next 

- MVC 

- Python (Back-end Programming Language) 

- Django (Web Applications Framework) 

76 

Web Technology 

Neamat El Tazi 

