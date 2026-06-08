IS231: Web Technology JavaScript-1 

By: Neamat El Tazi 

## References 

- **Slides from Carlton University:** 

   - **http://cglab.ca/~morin/teaching/2405/notes/javascript1.pdf** 

- **W3schools.com** 

2 

Web Technology 

Neamat El Tazi 

**==> picture [557 x 476] intentionally omitted <==**

3 

Web Technology Neamat El Tazi 

**==> picture [692 x 390] intentionally omitted <==**

4 

Web Technology Neamat El Tazi 

**==> picture [698 x 444] intentionally omitted <==**

5 Web Technology Neamat El Tazi 

**==> picture [696 x 412] intentionally omitted <==**

6 Web Technology Neamat El Tazi 

**==> picture [684 x 396] intentionally omitted <==**

Newest Version: ECMAScript 2025 

Web Technology 

Neamat El Tazi 

7 

8 Web Technology 

Neamat El Tazi 

**==> picture [682 x 361] intentionally omitted <==**

9 

Web Technology Neamat El Tazi 

**==> picture [628 x 490] intentionally omitted <==**

10 Web Technology Neamat El Tazi 

**==> picture [689 x 378] intentionally omitted <==**

##  Check Demo: 00.html 

Web Technology 

Neamat El Tazi 

11 

**==> picture [690 x 412] intentionally omitted <==**

12 

Web Technology Neamat El Tazi 

**==> picture [688 x 422] intentionally omitted <==**

13 Web Technology Neamat El Tazi 

**==> picture [694 x 467] intentionally omitted <==**

## Check Demo: 0.html 

14 

Web Technology 

Neamat El Tazi 

**==> picture [698 x 424] intentionally omitted <==**

15 Web Technology Neamat El Tazi 

16 Web Technology Neamat El Tazi 

Check Demo: 1.html ~~Check Demo: 2.html~~ 

Web Technology 

Neamat El Tazi 

17 

**==> picture [706 x 438] intentionally omitted <==**

18 Web Technology Neamat El Tazi 

**==> picture [704 x 175] intentionally omitted <==**

19 

Web Technology Neamat El Tazi 

**==> picture [674 x 348] intentionally omitted <==**

20 

Web Technology Neamat El Tazi 

**==> picture [634 x 304] intentionally omitted <==**

21 

Web Technology Neamat El Tazi 

**==> picture [656 x 473] intentionally omitted <==**

22 

Web Technology Neamat El Tazi 

**==> picture [668 x 481] intentionally omitted <==**

23 

Web Technology Neamat El Tazi 

**==> picture [672 x 180] intentionally omitted <==**

24 

Web Technology Neamat El Tazi 

**==> picture [674 x 466] intentionally omitted <==**

25 

Web Technology Neamat El Tazi 

**==> picture [682 x 318] intentionally omitted <==**

26 

Web Technology Neamat El Tazi 

**==> picture [680 x 320] intentionally omitted <==**

27 

Web Technology Neamat El Tazi 

**==> picture [619 x 474] intentionally omitted <==**

28 

Web Technology Neamat El Tazi 

**==> picture [694 x 491] intentionally omitted <==**

29 Web Technology Neamat El Tazi 

**==> picture [690 x 321] intentionally omitted <==**

30 

Web Technology 

Neamat El Tazi 

**==> picture [688 x 328] intentionally omitted <==**

31 Web Technology Neamat El Tazi 

**==> picture [698 x 398] intentionally omitted <==**

32 

Web Technology Neamat El Tazi 

**==> picture [694 x 440] intentionally omitted <==**

33 Web Technology Neamat El Tazi 

**==> picture [672 x 321] intentionally omitted <==**

Check our previous Lecture for Navigating and Updating the DOM. 

34 

Web Technology 

Neamat El Tazi 

## Histor y 

**==> picture [576 x 325] intentionally omitted <==**

## Newest Version: ES14 (ECMAScript 2023) 

ECMAScript 2024, the 15th and current version (standard), was released in June 2024 

https://medium.com/@bluetch/javascript-es6-es7-es8-es9-es10-es11-and-es12-519d8be7d48c 

35 

Web Technology 

Neamat El Tazi 

**==> picture [438 x 324] intentionally omitted <==**

36 Web Technology 

Neamat El Tazi 

**==> picture [664 x 490] intentionally omitted <==**

37 Web Technology Neamat El Tazi 

**==> picture [591 x 446] intentionally omitted <==**

38 

Web Technology Neamat El Tazi 

**==> picture [616 x 331] intentionally omitted <==**

39 

Web Technology Neamat El Tazi 

**==> picture [623 x 430] intentionally omitted <==**

40 Web Technology Neamat El Tazi 

**==> picture [646 x 390] intentionally omitted <==**

41 

Web Technology Neamat El Tazi 

## Global Variables 

- You can access global variables through any the following objects: 

   - window 

   - self 

   - this 

   - frames 

   - globalThis (standard way right now to access a global variable in all environments) 

   - window, self, frames will not work in Node.js environment 

Check Demo 8 

https://blog.logrocket.com/what-is-globalthis-why-use-it/ 

42 

Web Technology 

Neamat El Tazi 

**==> picture [664 x 423] intentionally omitted <==**

43 Web Technology Neamat El Tazi 

**==> picture [672 x 416] intentionally omitted <==**

44 Web Technology Neamat El Tazi 

**==> picture [550 x 419] intentionally omitted <==**

45 

Web Technology Neamat El Tazi 

**==> picture [608 x 450] intentionally omitted <==**

46 Web Technology Neamat El Tazi 

**==> picture [545 x 236] intentionally omitted <==**

c = function () {alert("this is a function without a name")}; How can we call this function? ☺ This is called a function expression instead of function declaration 

47 

Web Technology 

Neamat El Tazi 

**==> picture [661 x 428] intentionally omitted <==**

48 Web Technology Neamat El Tazi 

**==> picture [620 x 323] intentionally omitted <==**

49 

Web Technology Neamat El Tazi 

**==> picture [687 x 366] intentionally omitted <==**

##  **Warning: Avoid eval() in production code** 

- Security risk — executes arbitrary code 

- Performance impact — cannot be optimized by JS engine 

50 

Web Technology 

Neamat El Tazi 

**==> picture [600 x 472] intentionally omitted <==**

Web Technology Neamat El Tazi 

51 

**==> picture [603 x 445] intentionally omitted <==**

 Check Demo 9 

52 

Web Technology 

Neamat El Tazi 

**==> picture [611 x 414] intentionally omitted <==**

53 

Web Technology Neamat El Tazi 

**==> picture [676 x 399] intentionally omitted <==**

54 Web Technology Neamat El Tazi 

**==> picture [659 x 467] intentionally omitted <==**

55 Web Technology Neamat El Tazi 

## Question 

 var a = 10; 

 b = 20; 

 console.log(window.a); // ? 

 console.log(window.b); // ? 

 console.log(delete a); // ? 

 console.log(delete b); // ? 

- console.log(a); // ? 

- console.log(b); // ? 

56 

Web Technology 

Neamat El Tazi 

## Answer 

##  window.a // 10 

##  window.b // 20 

- delete a // false 

- delete b // true 

- a // 10 

- b // ReferenceError 

Web Technology 

Neamat El Tazi 

57 

**==> picture [665 x 389] intentionally omitted <==**

58 Web Technology Neamat El Tazi 

**==> picture [654 x 410] intentionally omitted <==**

59 Web Technology Neamat El Tazi 

**==> picture [691 x 350] intentionally omitted <==**

**==> picture [641 x 95] intentionally omitted <==**

60 Web Technology Neamat El Tazi 

**==> picture [628 x 450] intentionally omitted <==**

61 

Web Technology Neamat El Tazi 

**==> picture [641 x 430] intentionally omitted <==**

62 Web Technology Neamat El Tazi 

**==> picture [612 x 371] intentionally omitted <==**

# **Prototype is the basis of JavaScript inheritance** Check Demo 10 

63 

Web Technology 

Neamat El Tazi 

## AI in JavaScri t Develo ment p p 

##  **Writing JavaScript with AI:** 

- Generate boilerplate: 'Write a JS class for a shopping cart with add, remove, total' 

- Debug: paste your error + code — AI identifies the issue and explains the fix 

- Refactor: 'Convert this callback-based code to async/await' 

##  **AI tools for JavaScript:** 

- GitHub Copilot — autocompletes functions, generates test stubs 

- Claude / ChatGPT — explain concepts, refactor, review logic, convert JS versions 

- Tabnine / Codeium — lightweight in-editor AI completion 

##  **Good prompt pattern:** 

- State task + constraints: 'Write a debounce function in vanilla JS, no dependencies' 

64 

Web Technology 

Neamat ElTazi 

## AI in JavaScri t Testin p g 

##  **Unit test generation:** 

- Paste a function → ask AI to generate Jest / Mocha test cases including edge cases 

- GitHub Copilot auto-suggests test() blocks as you write code 

##  **End-to-end testing:** 

- Playwright + AI: describe user flows in plain English, AI writes the script 

- Testim / Mabl: AI-powered recorders that self-heal when UI changes 

##  **Debugging & code review:** 

- Paste a stack trace into Claude or ChatGPT — AI pinpoints the root cause 

- Prompt: 'Review this JS for security issues, performance, and best practices' 

65 

Web Technology 

Neamat ElTazi 

## What’s Comin in JavaScri t g p 

- ECMAScript 2015 (ES6) was the biggest update to JavaScript. 

##  **Coming in the next lecture:** 

- let and const — block-scoped variable declarations 

- Arrow functions — compact function syntax 

- JavaScript Classes — clean OOP over prototypes 

- Promises and async/await — asynchronous programming 

- Default parameters, Rest/Spread operators 

- ES7 through ES14 highlights 

- AJAX — Asynchronous JavaScript and XML 

66 

Web Technology 

Neamat ElTazi 

