**Lecture 2: Python Essentials for Backend Development** Second-year students | Detailed, example-driven, installation-aware lecture 

**Detailed lecture deck for in-class explanation, live coding, practice, and homework** 

## **What students should feel after this lecture** 

“I can write simple Python code by myself, run it correctly, read errors, and understand the building blocks needed before Django.” 

## **Dr. Mohamed Nour Eldien** 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development1 

_By the end of this lecture, students should be able to:_ 

**==> picture [960 x 33] intentionally omitted <==**

## **Lecture Objectives** 

- Explain why Python is a practical language for backend development. 

- Install and run the core tools: Python, VS Code, and the integrated terminal. 

- Write simple Python programs using variables, data types, input, and output. 

- Use decisions, loops, functions, collections, modules, and basic file handling. 

- Understand how these basics will later appear inside Django projects. 

**==> picture [360 x 187] intentionally omitted <==**

## **Suggested pacing** 

Use this as your opening map for the entire lecture. Tell students that Python syntax is only the start; problem solving is the real target. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development2 

_A 60-minute explanation needs a visible structure_ 

**==> picture [960 x 33] intentionally omitted <==**

## **Lecture Roadmap** 

- Part 1: Tools and environment setup. 

- Part 2: Core Python syntax and data types. 

- Part 3: Conditions and loops. 

- Part 4: Data structures and functions. 

- Part 5: Modules, errors, files, and how all of this supports backend work. 

**==> picture [360 x 187] intentionally omitted <==**

## **Teaching Tip** 

Students feel safer when they know where the lecture is going. Keep referring back to this structure. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development3 

**==> picture [960 x 33] intentionally omitted <==**

## **Part 1 - Tools and Environment** 

Students must know how to install, open, and run before they can code confidently. 

**==> picture [360 x 130] intentionally omitted <==**

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development4 

_Before syntax, explain the big reason_ 

**==> picture [960 x 33] intentionally omitted <==**

## **Why Python for Backend?** 

- Python is readable. Students can focus on logic instead of complex punctuation. 

- Python is productive. We can build prototypes quickly and test ideas fast. 

- Python has a large ecosystem. Django, Flask, FastAPI, Pandas, and many more libraries exist. 

- Python is friendly for education. It helps students move from theory to practice smoothly. 

**==> picture [360 x 187] intentionally omitted <==**

## **How to explain** 

Contrast Python with low-level languages: Python lets us express ideas with fewer lines, which is valuable in backend learning. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development5 

_Keep the toolchain simple in the beginning_ 

**==> picture [960 x 33] intentionally omitted <==**

## **Programs We Need Today** 

- Python: the language interpreter that runs our code. 

- VS Code: a lightweight editor to write, save, and organize code files. 

- Python Extension for VS Code: gives syntax highlighting and useful coding support. 

- Terminal / Command Prompt: runs programs and checks the environment. 

**==> picture [360 x 187] intentionally omitted <==**

## **Classroom Tip** 

Tell students that professional programmers still use these same basic tools every day. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development6 

_Explain this as a real procedure students can repeat at home_ 

**==> picture [960 x 33] intentionally omitted <==**

## **Step 1 - Download Python** 

- Open the official Python website in the browser. 

- Choose the latest stable Python 3 release. 

- During installation on Windows, check “Add Python to PATH”. 

- Complete the installation and keep the default options if unsure. 

**==> picture [360 x 187] intentionally omitted <==**

## **Important warning** 

The “Add Python to PATH” checkbox is crucial. If students miss it, the terminal may not recognize python. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development7 

_Do not assume the installation worked; always test it_ 

**==> picture [960 x 33] intentionally omitted <==**

## **Verify the Python Installation** 

- Open Command Prompt or PowerShell. 

**==> picture [54 x 9] intentionally omitted <==**

**----- Start of picture text -----**<br>
Live Code<br>**----- End of picture text -----**<br>


- Type one of these commands and press Enter. 

- If Python is installed correctly, the version number appears. 

- If the command is not recognized, PATH is probably not configured. 

- `1 python --version` 

- `2 py --version` 

## **Teaching Tip** 

Demonstrate both commands. On many Windows machines, py works even when python does not. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development8 

_Students need an editor that is simple and modern_ 

**==> picture [960 x 33] intentionally omitted <==**

## **Step 2 - Download VS Code** 

- Open the official VS Code website. 

- Download the installer for Windows. 

- Install it with the default settings. 

- Open VS Code and notice the Explorer, Editor, and Terminal areas. 

**==> picture [360 x 187] intentionally omitted <==**

## **Explain visually** 

Point to the three most important areas: file explorer, code editor, and terminal panel. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development9 

**==> picture [960 x 33] intentionally omitted <==**

**Step 3 - Install the Python Extension** _This is optional for running code, but important for a good learning experience_ 

- Open VS Code. 

- Click Extensions on the left sidebar. 

- Search for “Python” published by Microsoft. 

- Install it so code becomes easier to read, run, and debug. 

**==> picture [360 x 187] intentionally omitted <==**

## **Why it matters** 

Without the extension, students can still write code, but the experience is less friendly and more error-prone. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development10 

_Teach students early how to stay organized_ 

**==> picture [960 x 33] intentionally omitted <==**

## **Create a Working Folder** 

- Create a folder such as python_backend_course. 

- Inside it, make separate files like lecture2_examples.py. 

- Keep names meaningful and avoid random desktop files. 

- Good organization reduces mistakes later in Django projects. 

**==> picture [360 x 187] intentionally omitted <==**

## **Bridge to future lectures** 

Explain that Django itself is a structured project, so students should begin learning organization now. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development11 

**==> picture [960 x 33] intentionally omitted <==**

**Running the First Python File in VS Code** _Students must see the full cycle: write, save, run, read output_ 

- Create a file named first_program.py. 

**==> picture [54 x 9] intentionally omitted <==**

**----- Start of picture text -----**<br>
Live Code<br>**----- End of picture text -----**<br>


- Type the program shown on the right. 

- Save the file. 

- Open the terminal and run the script. 

- `1 print("Hello, Backend Students!") 2 print("Python is working correctly.")` 

## **Teaching Tip** 

Run it in the terminal using: python first_program.py 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development12 

_Students often fear the terminal because it looks different_ 

**==> picture [960 x 33] intentionally omitted <==**

## **The Terminal Is Your Friend** 

- The terminal is simply a text-based way to talk to the computer. 

- We use it to run Python files, install packages, and execute framework commands. 

- Later, Django commands like runserver and migrate will also be executed here. 

- So learning the terminal now saves confusion later. 

**==> picture [360 x 187] intentionally omitted <==**

## **Reassure students** 

The terminal is not dangerous when used carefully; it is a normal part of modern development. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development13 

**==> picture [960 x 33] intentionally omitted <==**

## **Quick Class Task - Tool Check** 

_Practice is where programming starts to make sense_ 

## **Class Task** 

- Open VS Code. 

- Create a folder for today’s lecture. 

- Create a file named test_run.py. 

- Write one print statement and run it from the 

   - terminal. 

**==> picture [360 x 163] intentionally omitted <==**

## **Expected Direction** 

Walk around the room. Success means students can save and execute a file without help. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development14 

**==> picture [960 x 33] intentionally omitted <==**

## **Part 2 - Python Basics** 

Now that the tools work, begin building the language itself. 

**==> picture [360 x 130] intentionally omitted <==**

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development15 

_A useful conceptual slide before syntax_ 

**==> picture [960 x 33] intentionally omitted <==**

## **What Is a Program?** 

- A program is a sequence of instructions given to a computer. 

- Python reads these instructions from top to bottom. 

- Each line should communicate a clear action. 

- Good code is not just correct; it is also readable. 

**==> picture [360 x 187] intentionally omitted <==**

## **Explain with examples** 

Use simple examples like “print a message”, “store a value”, and “ask the user for input”. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development16 

_A variable is a named place in memory_ 

**==> picture [960 x 33] intentionally omitted <==**

## **Variables - Storing Information** 

- Variables let us save data and use it later. 

- A good variable name explains the meaning of the value. 

- The assignment operator = stores the value inside the variable. 

- Variables are fundamental because backend code constantly stores and manipulates data. 

**==> picture [360 x 187] intentionally omitted <==**

## **Live analogy** 

Use the “labeled box” analogy: the variable name is the label, the value is what is inside the box. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development17 

**==> picture [960 x 33] intentionally omitted <==**

## **Variable Examples** 

_Start with very small and readable examples_ 

- Read each line aloud. 

**==> picture [54 x 9] intentionally omitted <==**

**----- Start of picture text -----**<br>
Live Code<br>**----- End of picture text -----**<br>


- Ask students what value each variable stores. 

- Then show how print can display these values. 

- Emphasize meaningful naming. 

- `1 student_name = "Mona"` 

- `2 age = 20` 

- `3 course = "Backend Python"` 

- `4 passed = True 5` 

- `6 print(student_name)` 

- `7 print(age) 8 print(course) 9 print(passed)` 

## **Teaching Tip** 

Ask: which names are clearer, student_name or x? This starts the style discussion early. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development18 

_Teach correctness and readability together_ 

**==> picture [960 x 33] intentionally omitted <==**

## **Rules for Naming Variables** 

- A variable name can contain letters, digits, and underscore _. 

- A variable name cannot start with a digit. 

- Avoid spaces and reserved keywords like if, for, while. 

- Use lowercase_with_underscores for readability in Python. 

**==> picture [360 x 187] intentionally omitted <==**

## **Important teaching move** 

Show both correct and incorrect examples: user_name is good, 2name is not, user name is not. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development19 

**==> picture [960 x 33] intentionally omitted <==**

## **Practice - Fix the Variable Names** 

_Practice is where programming starts to make sense_ 

## **Class Task** 

- Convert bad names into valid Python names. 

- Example: student name -> student_name 

- Example: 1score -> score_1 

- Ask students to suggest better names for x, y, and z. 

**==> picture [360 x 163] intentionally omitted <==**

## **Expected Direction** 

The goal is not only syntax validity, but also good meaning. Encourage descriptive names. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development20 

_Backend systems care about what kind of data they are processing_ 

**==> picture [960 x 33] intentionally omitted <==**

## **Data Types - Why Type Matters** 

- Different operations work on different data types. 

- A string stores text, an integer stores whole numbers, and a float stores decimal numbers. 

- A boolean stores True or False. 

- Choosing the correct type reduces errors and makes code more logical. 

**==> picture [360 x 187] intentionally omitted <==**

## **Connect to backend** 

Explain that user names, emails, prices, and login states are all different kinds of data. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development21 

**==> picture [960 x 33] intentionally omitted <==**

## **Strings - Text Data** 

_Strings appear everywhere in web applications_ 

- A string is text enclosed in single or double quotes. 

## **Live Code** 

- Strings are used for names, messages, IDs, addresses, and form data. 

- We can combine strings using concatenation or f-strings. 

- Readable output matters for users and debugging. 

- `1 name = "Ali"` 

- `2 city = "Cairo"` 

- `3` 

- `4 print("Student name: " + name)` 

- `5 print(f"{name} lives in {city}")` 

## **Teaching Tip** 

Show both concatenation and f-strings, but recommend f-strings for readability. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development22 

**==> picture [960 x 33] intentionally omitted <==**

## **Integers and Floats** 

_Numerical data is common in all applications_ 

- Use int for whole numbers like age, count, year. 

**==> picture [54 x 9] intentionally omitted <==**

**----- Start of picture text -----**<br>
Live Code<br>**----- End of picture text -----**<br>


- Use float for decimal values like price or average. 

- Python allows arithmetic directly on numeric types. 

- The output changes if the type changes. 

- `1 age = 19` 

- `2 price = 149.75` 

```
3
```

- `4 print(age + 1)` 

- `5 print(price * 2)` 

## **Teaching Tip** 

Ask students: why should a phone number usually be stored as text, not as an integer? 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development23 

_Booleans control program decisions_ 

**==> picture [960 x 33] intentionally omitted <==**

## **Booleans - True or False** 

- A boolean has only two values: True and False. 

**==> picture [54 x 9] intentionally omitted <==**

**----- Start of picture text -----**<br>
Live Code<br>**----- End of picture text -----**<br>


- Booleans are used for conditions such as logged_in, passed, or is_admin. 

- They often appear inside if statements. 

- Backend logic depends heavily on boolean thinking. 

- `1 logged_in = True` 

- `2 is_admin = False` 

- `3` 

- `4 print(logged_in)` 

- `5 print(is_admin)` 

## **Teaching Tip** 

Bridge ahead: later, if statements will ask questions based on these values. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development24 

**==> picture [960 x 33] intentionally omitted <==**

## **Using type()** 

_Students should learn to inspect values when confused_ 

- type() tells us the type of a variable or value. 

## **Live Code** 

- This helps when debugging input and conversion issues. 

- Students should use it when results look strange. 

- It is a simple but powerful habit. 

- `1 name = "Sara"` 

- `2 score = 95` 

- `3 average = 87.5` 

- `4 active = True` 

- `5` 

- `6 print(type(name))` 

- `7 print(type(score))` 

- `8 print(type(average))` 

- `9 print(type(active))` 

## **Teaching Tip** 

Mention that many beginner errors come from not realizing the actual type of a value. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development25 

**==> picture [960 x 33] intentionally omitted <==**

## **Input and Output** 

_Programming becomes interactive when the user gives data_ 

- print() sends output to the screen. 

## **Live Code** 

- input() reads text entered by the user. 

- input() returns a string, even if the user types a number. 

- This is why type conversion often becomes necessary. 

- `1 name = input("Enter your name: ")` 

- `2 print("Welcome", name)` 

## **Teaching Tip** 

Very important: tell students that input() returns text. This will matter in later conversion examples. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development26 

**==> picture [960 x 33] intentionally omitted <==**

## **Converting Input to int and float** 

_Without conversion, arithmetic may behave incorrectly_ 

- Use int() when the input should become a whole number. 

**==> picture [54 x 9] intentionally omitted <==**

**----- Start of picture text -----**<br>
Live Code<br>**----- End of picture text -----**<br>


- Use float() when decimals are allowed. 

- Always think about what the real-world meaning of the data is. 

- Type conversion is a bridge between user text and program logic. 

- `1 age = int(input("Enter your age: "))` 

- `2 height = float(input("Enter your height in meters: ")) 3` 

- `4 print(age + 1)` 

- `5 print(height)` 

## **Teaching Tip** 

Ask: what happens if the user enters text instead of a number? Use this as a lead-in to errors later. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development27 

**==> picture [960 x 33] intentionally omitted <==**

## **Comments in Python** 

_Explain why comments exist, but warn against useless comments_ 

- Comments start with the symbol #. 

- They are ignored by Python during execution. 

- Use comments to explain intent, not obvious code. 

- Good comments help humans; good names reduce the need for too many comments. 

**==> picture [360 x 187] intentionally omitted <==**

## **Give one good and one bad comment** 

Bad: # print the name above print(name). Good: # Convert age to int because input returns text. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development28 

**==> picture [960 x 33] intentionally omitted <==**

## **Part 3 - Operators, Conditions, and Loops** 

Now students begin controlling program behavior. 

**==> picture [360 x 130] intentionally omitted <==**

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development29 

**==> picture [960 x 33] intentionally omitted <==**

## **Arithmetic Operators** 

_These are the building blocks of calculation_ 

- Addition +, subtraction -, multiplication *, division /. 

- Integer division // removes the fractional part. 

- Remainder % is useful for even/odd checks. 

- Exponent ** raises a number to a power. 

## **Live Code** 

```
1 a =10
```

- `2 b = 3 3` 

- `4 print(a + b)` 

- 

- `5 print(a b)` 

- `6 print(a * b)` 

- `7 print(a / b)` 

- `8 print(a // b)` 

- `9 print(a % b)` 

- `10 print(a ** b)` 

**==> picture [91 x 14] intentionally omitted <==**

**----- Start of picture text -----**<br>
Teaching Tip<br>**----- End of picture text -----**<br>


Spend extra time on // and % because students usually ask about them. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development30 

**==> picture [960 x 33] intentionally omitted <==**

## **Comparison Operators** 

_Programs make decisions by comparing values_ 

- == checks equality, != checks inequality. 

**==> picture [54 x 9] intentionally omitted <==**

**----- Start of picture text -----**<br>
Live Code<br>**----- End of picture text -----**<br>


- > and < compare larger and smaller values. 

- >= and <= include equality as well. 

- The result of a comparison is always True or False. 

- `1 score = 75` 

- `2 print(score > 50)` 

- `3 print(score == 75)` 

- `4 print(score != 100)` 

## **Teaching Tip** 

Point out the difference between = for assignment and == for comparison. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development31 

**==> picture [960 x 33] intentionally omitted <==**

## **Logical Operators** 

_Use logic to combine more than one condition_ 

- and means both conditions must be true. 

**==> picture [54 x 9] intentionally omitted <==**

**----- Start of picture text -----**<br>
Live Code<br>**----- End of picture text -----**<br>


- or means at least one condition is true. 

- not reverses the boolean result. 

- These operators are essential in backend validation. 

- `1 age = 20` 

- `2 has_id = True 3` 

- `4 print(age >= 18 and has_id)` 

- `5 print(age < 18 or has_id)` 

- `6 print(not has_id)` 

## **Teaching Tip** 

Use a real example: a system allows access if age >= 18 and the student has an ID. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development32 

**==> picture [960 x 33] intentionally omitted <==**

## **if Statement** 

_A decision starts with asking a question_ 

- if runs a block of code only when the condition is True. 

**==> picture [54 x 9] intentionally omitted <==**

**----- Start of picture text -----**<br>
Live Code<br>**----- End of picture text -----**<br>


- Indentation is part of Python syntax, not only style. 

- The colon : starts the block. 

- This is one of the most important Python structures. 

- `1 score = 80` 

- `2` 

- `3 if score >= 50:` 

- `4 print("Passed")` 

## **Teaching Tip** 

Show how removing indentation causes a syntax or logic problem. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development33 

**==> picture [960 x 33] intentionally omitted <==**

## **if - else** 

_Programs often need two possible paths_ 

- if handles the True case. 

**==> picture [54 x 9] intentionally omitted <==**

**----- Start of picture text -----**<br>
Live Code<br>**----- End of picture text -----**<br>


- else handles the False case. 

- Together they express clear binary logic. 

- This is common in login checks, validations, and status messages. 

- `1 score = 42 2 3 if score >= 50: 4 print("Passed") 5 else: 6 print("Failed")` 

**==> picture [91 x 14] intentionally omitted <==**

**----- Start of picture text -----**<br>
Teaching Tip<br>**----- End of picture text -----**<br>


Ask students to predict the output before running it. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development34 

**==> picture [960 x 33] intentionally omitted <==**

## **if - elif - else** 

_Use elif when there are multiple categories_ 

- elif means “else if”. 

## **Live Code** 

- Python checks conditions from top to bottom. 

- The first matching condition runs. 

- This pattern is useful for grading, status labels, and classification. 

- `1 mark = 87 2 3 if mark >= 90: 4 print("A") 5 elif mark >= 80: 6 print("B") 7 elif mark >= 70: 8 print("C") 9 else:` 

- `10 print("D")` 

## **Teaching Tip** 

Stress order: higher thresholds should come before lower thresholds. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development35 

**==> picture [960 x 33] intentionally omitted <==**

## **Practice - Write a Grade Classifier** 

_Practice is where programming starts to make sense_ 

## **Class Task** 

- Ask the user to enter a numeric grade. 

- Display Excellent if grade >= 85. 

- Display Good if grade >= 65 and < 85. 

- Display Need Improvement otherwise. 

**==> picture [360 x 163] intentionally omitted <==**

## **Expected Direction** 

Expected solution uses input(), int(), and if-elif-else. Encourage students to test multiple values. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development36 

_Sometimes one decision contains another decision_ 

**==> picture [960 x 33] intentionally omitted <==**

## **Nested Conditions** 

- A nested condition means an if statement inside another if statement. 

- Use nesting only when it truly improves clarity. 

- Too much nesting can make code hard to read. 

- Backend code often nests checks for login, role, and permissions. 

**==> picture [360 x 187] intentionally omitted <==**

## **Classroom example** 

If user is logged in, then check role. If role is admin, then show admin panel. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development37 

**==> picture [960 x 33] intentionally omitted <==**

## **Nested Condition Example** 

_Use a realistic scenario students can imagine_ 

- First check whether the user is logged in. 

- Then check whether the user is an admin. 

- Print a different message for each case. 

- This mirrors backend authorization logic. 

**==> picture [463 x 283] intentionally omitted <==**

**----- Start of picture text -----**<br>
Live Code<br>1 logged_in = True<br>2 is_admin = False<br>3<br>4 if logged_in:<br>5  if is_admin:<br>6  print("Open admin dashboard")<br>7  else:<br>8  print("Open student dashboard")<br>9 else:<br>10  print("Please log in")<br>**----- End of picture text -----**<br>


## **Teaching Tip** 

Bridge to web apps: in a real system, different users see different pages based on such checks. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development38 

_Loops save us from repeating code manually_ 

**==> picture [960 x 33] intentionally omitted <==**

## **Why Loops Matter** 

- A loop repeats a block of code. 

- Use loops when the same action must happen many times. 

- Loops are essential for processing lists of records, names, files, or requests. 

- In backend work, loops often handle collections of objects from a database. 

**==> picture [360 x 187] intentionally omitted <==**

## **Everyday analogy** 

Instead of printing ten names with ten print statements, a loop can handle them automatically. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development39 

**==> picture [960 x 33] intentionally omitted <==**

## **while Loop** 

_A while loop repeats while a condition remains True_ 

- Initialize a variable before the loop. 

## **Live Code** 

- Update that variable inside the loop. 

- If the condition never becomes False, the loop may never stop. 

- So students must always think about the stopping condition. 

- `1 count = 1 2 3 while count <= 5: 4 print(count) 5 count += 1` 

## **Teaching Tip** 

Slowly trace the value of count on the board after each repetition. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development40 

**==> picture [960 x 33] intentionally omitted <==**

## **for Loop with range()** 

_for is often the preferred loop in Python_ 

- for reads more naturally when the number of repetitions is known. 

## **Live Code** 

- range(5) means 0, 1, 2, 3, 4. 

- range(start, stop) begins from start and stops before stop. 

- This form is widely used in counting and indexing. 

- `1 for i in range(5): 2 print(i) 3` 

- `4 for i in range(1, 6): 5 print(i)` 

## **Teaching Tip** 

Spend time explaining that the stop value is excluded. This confuses many beginners. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development41 

**==> picture [960 x 33] intentionally omitted <==**

## **Looping Through a String and a List** 

_Loops become more powerful when they iterate over collections_ 

- A for loop can visit each character in a string. 

**==> picture [54 x 9] intentionally omitted <==**

**----- Start of picture text -----**<br>
Live Code<br>**----- End of picture text -----**<br>


- It can also visit each item in a list. 

- This is very natural Python code. 

- Students should learn both patterns. 

**==> picture [280 x 114] intentionally omitted <==**

**----- Start of picture text -----**<br>
1 name = "Omar"<br>2 for ch in name:<br>3  print(ch)<br>4<br>5 students = ["Ali", "Mona", "Sara"]<br>6 for student in students:<br>7  print(student)<br>**----- End of picture text -----**<br>


## **Teaching Tip** 

Use this to prepare students for collections in the next part. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development42 

_These keywords modify loop behavior_ 

**==> picture [960 x 33] intentionally omitted <==**

## **break, continue, and pass** 

- break exits the loop immediately. 

- continue skips the current iteration and moves to the next one. 

- pass does nothing; it is a placeholder. 

- Use them carefully because they can also reduce clarity if overused. 

**==> picture [463 x 283] intentionally omitted <==**

**----- Start of picture text -----**<br>
Live Code<br>1 for i in range(1, 6):<br>2  if i == 3:<br>3  continue<br>4  if i == 5:<br>5  break<br>6  print(i)<br>**----- End of picture text -----**<br>


## **Teaching Tip** 

Trace the output with students and ask which values are printed and why. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development43 

**==> picture [960 x 33] intentionally omitted <==**

## **Practice - Multiplication Table** 

_Practice is where programming starts to make sense_ 

## **Class** 

## **Task** 

- Ask the user for a number. 

- Use a for loop to print the multiplication 

   - table from 1 to 10. 

- Format the output clearly. 

- Optional: ask students to add a title line before the table. 

**==> picture [360 x 163] intentionally omitted <==**

## **Expected Direction** 

Expected solution uses input(), int(), range(1, 11), and print formatting. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development44 

**==> picture [960 x 33] intentionally omitted <==**

## **Part 4 - Data Structures and Functions** 

This part moves from single values to organized collections and reusable logic. 

**==> picture [360 x 130] intentionally omitted <==**

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development45 

_One value is rarely enough in real applications_ 

**==> picture [960 x 33] intentionally omitted <==**

## **Why Data Structures Matter** 

- A backend system usually handles many pieces of information together. 

- We may need a list of students, a dictionary of profile data, or a set of unique values. 

- Data structures help us organize information correctly. 

- The correct structure makes later code cleaner and faster to understand. 

**==> picture [360 x 187] intentionally omitted <==**

## **Relate to web forms** 

A submitted form often contains multiple fields. We need organized ways to store them. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development46 

**==> picture [960 x 33] intentionally omitted <==**

## **Lists** 

_A list stores multiple items in order_ 

- Lists use square brackets []. 

## **Live Code** 

- Items keep their order and can be changed. 

- Lists are very common for names, products, tasks, and results. 

- Each item has an index starting from 0. 

- `1 students = ["Ali", "Mona", "Sara"]` 

- `2 print(students)` 

- `3 print(students[0])` 

- `4 print(students[2])` 

## **Teaching Tip** 

Explain indexing carefully. Students must understand that the first item is index 0. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development47 

**==> picture [960 x 33] intentionally omitted <==**

## **Common List Operations** 

_Students should learn to modify lists, not only read them_ 

- append() adds one item at the end. 

**==> picture [54 x 9] intentionally omitted <==**

**----- Start of picture text -----**<br>
Live Code<br>**----- End of picture text -----**<br>


- remove() deletes an item by value. 

- len() gives the number of items. 

- Lists work very naturally with loops. 

- `1 students = ["Ali", "Mona"] 2 students.append("Sara") 3 students.remove("Ali") 4` 

- `5 print(students) 6 print(len(students))` 

## **Teaching Tip** 

Show the state of the list after each operation. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development48 

**==> picture [960 x 33] intentionally omitted <==**

## **Tuples** 

_A tuple is like a list but fixed_ 

- Tuples use parentheses (). 

**==> picture [54 x 9] intentionally omitted <==**

**----- Start of picture text -----**<br>
Live Code<br>**----- End of picture text -----**<br>


- They preserve order but cannot be modified after creation. 

- Use tuples when the data should stay constant. 

- Examples include coordinates, fixed settings, or known pairs. 

- `1 point = (10, 20)` 

- `2 print(point)` 

- `3 print(point[0])` 

## **Teaching Tip** 

Keep it simple: the main idea is that tuples are ordered but immutable. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development49 

_Sets store unique values_ 

**==> picture [960 x 33] intentionally omitted <==**

## **Sets** 

- Sets use curly braces {} or set(). 

**==> picture [54 x 9] intentionally omitted <==**

**----- Start of picture text -----**<br>
Live Code<br>**----- End of picture text -----**<br>


- A set does not keep duplicate values. 

- Use sets when uniqueness matters. 

- They are useful for tags, unique IDs, or removing repeated entries. 

- `1 colors = {"red", "blue", "red", "green"}` 

- `2 print(colors)` 

## **Teaching Tip** 

Explain that the repeated value red appears only once. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development50 

**==> picture [960 x 33] intentionally omitted <==**

## **Dictionaries** 

_A dictionary stores data as key-value pairs_ 

- Use a dictionary when values have labels. 

## **Live Code** 

- This is excellent for user profiles, product data, or settings. 

- Keys should be meaningful and usually unique. 

- Dictionaries are a very backend-friendly structure. 

```
1 student ={
```

- `2 "name": "Laila", 3 "age": 20, 4 "department": "IS"` 

- `5 } 6` 

- `7 print(student["name"])` 

- `8 print(student["department"])` 

## **Teaching Tip** 

Relate this directly to JSON and web data, but keep the explanation simple. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development51 

_A dictionary can be read and modified easily_ 

**==> picture [960 x 33] intentionally omitted <==**

## **Updating a Dictionary** 

- Use a key to access a value. 

**==> picture [54 x 9] intentionally omitted <==**

**----- Start of picture text -----**<br>
Live Code<br>**----- End of picture text -----**<br>


- Assign a new value to update existing data. 

- Add a new key-value pair by assigning a new key. 

- This pattern feels similar to updating records. 

- `1 student = {"name": "Laila", "age": 20}` 

- `2 student["age"] = 21` 

- `3 student["department"] = "CS"` 

- `4` 

- `5 print(student)` 

## **Teaching Tip** 

Show before and after to highlight mutation. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development52 

_Students often ask which structure to use_ 

**==> picture [960 x 33] intentionally omitted <==**

## **How to Choose the Right Structure** 

- Use list when order matters and items may change. 

- Use tuple when order matters but items should stay fixed. 

- Use set when uniqueness matters more than order. 

- Use dictionary when each value has a clear label or key. 

**==> picture [360 x 187] intentionally omitted <==**

## **Ask a question** 

For student data with name, age, and department, which structure is best? The answer should be dictionary. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development53 

_Functions make code reusable and cleaner_ 

**==> picture [960 x 33] intentionally omitted <==**

## **Why Functions Matter** 

- A function groups code that performs one task. 

- Instead of repeating the same code many times, define it once and call it when needed. 

- Functions improve readability, testing, and maintenance. 

- Backend frameworks depend heavily on functions and reusable blocks. 

**==> picture [360 x 187] intentionally omitted <==**

## **Bridge to Django views** 

Tell students that later a Django view is also a function that receives a request and returns a response. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development54 

**Defining and Calling a Function** _Start with the simplest possible form_ 

**==> picture [960 x 33] intentionally omitted <==**

- Use def to define a function. 

**==> picture [54 x 9] intentionally omitted <==**

**----- Start of picture text -----**<br>
Live Code<br>**----- End of picture text -----**<br>


- The function name should describe its action. 

- Call the function by writing its name with parentheses. 

- Indent the function body correctly. 

- `1 def welcome(): 2 print("Welcome to Backend Python") 3 4 welcome()` 

## **Teaching Tip** 

Ask students to explain the difference between defining a function and calling it. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development55 

**==> picture [960 x 33] intentionally omitted <==**

## **Function Parameters** 

_Parameters let one function work with many values_ 

- A parameter is a variable inside the function definition. 

## **Live Code** 

- An argument is the actual value passed during the call. 

- This makes the function flexible and reusable. 

- Backend systems constantly pass data into functions. 

- `1 def greet(name): 2 print(f"Hello, {name}")` 

- `3` 

- `4 greet("Mona")` 

- `5 greet("Omar")` 

## **Teaching Tip** 

Use the terms parameter and argument carefully; repeat them more than once. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development56 

**==> picture [960 x 33] intentionally omitted <==**

## **return Statement** 

_A function can send a result back to the caller_ 

- print shows output immediately, but return gives a value back. 

## **Live Code** 

- Returned values can be stored in variables or used later. 

- This is more powerful than always printing directly. 

- Most backend functions return values that are processed by other parts of the program. 

- `1 def add(a, b): 2 return a + b` 

- `3` 

- `4 result = add(5, 7)` 

- `5 print(result)` 

## **Teaching Tip** 

Explain the difference clearly: print displays, return hands back a value. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development57 

**==> picture [960 x 33] intentionally omitted <==**

## **Local Variables and Scope** 

_Variables do not all live in the same place_ 

- A variable created inside a function is usually local to that function. 

## **Live Code** 

- It cannot normally be used outside the function. 

- This protects code from accidental interference. 

- Understanding scope prevents many confusing errors. 

- `1 def test_scope(): 2 message = "Inside function" 3 print(message) 4 5 test_scope()` 

- `6 # print(message)  # This would cause an error` 

## **Teaching Tip** 

Explain that scope is one reason functions help organize larger programs. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development58 

**==> picture [960 x 33] intentionally omitted <==**

## **Practice - Build Three Functions** 

_Practice is where programming starts to make sense_ 

## **Class** 

## **Task** 

- Write a function that returns the square of a 

   - number. 

- Write a function that checks whether a 

   - number is even. 

- Write a function that receives a student name and prints a welcome message. 

**==> picture [360 x 163] intentionally omitted <==**

- Test each function with at least two 

   - examples. 

## **Expected Direction** 

Encourage students to create one file and solve all three tasks inside it. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development59 

**==> picture [960 x 33] intentionally omitted <==**

## **Part 5 - Modules, Errors, Files, and Backend Connection** 

Students now see how Python grows beyond a single script. 

**==> picture [360 x 130] intentionally omitted <==**

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development60 

**==> picture [960 x 33] intentionally omitted <==**

## **What Is a Module?** 

_A module is simply a Python file that contains reusable code_ 

- Modules help us split programs into logical parts. 

- We can import built-in modules like math. 

- We can also create our own modules. 

- Django itself is a collection of many modules working together. 

**==> picture [360 x 187] intentionally omitted <==**

## **Make the future connection** 

When students later import from django.shortcuts or django.urls, they are importing from modules. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development61 

**Importing a Built-in Module** _Use a tiny example that students can run immediately_ 

**==> picture [960 x 33] intentionally omitted <==**

- Import the math module. 

**==> picture [54 x 9] intentionally omitted <==**

**----- Start of picture text -----**<br>
Live Code<br>**----- End of picture text -----**<br>


- Use math.sqrt() or math.pi. 

- Show that Python already comes with many useful modules. 

- Importing keeps code organized and avoids rewriting everything. 

- `1 import math` 

- `2` 

- `3 print(math.sqrt(25))` 

- `4 print(math.pi)` 

## **Teaching Tip** 

Mention that many powerful tools come from importing libraries, not writing everything manually. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development62 

**==> picture [960 x 33] intentionally omitted <==**

## **Creating Your Own Module** 

_This is a gentle introduction to code organization_ 

- Create one file named helpers.py. 

**==> picture [54 x 9] intentionally omitted <==**

**----- Start of picture text -----**<br>
Live Code<br>**----- End of picture text -----**<br>


- Define a function inside it. 

- Create another file and import that function. 

- This shows students how code can be split across files. 

- `1 # helpers.py 2 def greet(name): 3 return f"Hello, {name}" 4 5 # main.py 6 from helpers import greet 7 print(greet("Nour"))` 

**Teaching Tip** Explain that Python looks for the other file in the same folder. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development63 

_Normalize mistakes early so students do not panic_ 

**==> picture [960 x 33] intentionally omitted <==**

## **Errors Are Part of Programming** 

- An error message is not a sign of failure; it is information. 

- Good programmers read errors carefully instead of guessing blindly. 

- The line number and error type are usually the first clues. 

- Debugging is a normal skill, not a punishment. 

**==> picture [360 x 187] intentionally omitted <==**

## **Encouragement** 

Tell students clearly: every programmer sees errors daily, even professionals. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development64 

**==> picture [960 x 33] intentionally omitted <==**

## **try and except** 

_Basic error handling should be introduced gently_ 

- Some code may fail during execution. 

**==> picture [54 x 9] intentionally omitted <==**

**----- Start of picture text -----**<br>
Live Code<br>**----- End of picture text -----**<br>


- try lets us test risky code. 

- except lets us handle the error instead of crashing badly. 

- This is useful when dealing with user input and file operations. 

**==> picture [326 x 80] intentionally omitted <==**

**----- Start of picture text -----**<br>
1 try:<br>2  num = int(input("Enter a number: "))<br>3  print(num * 2)<br>4 except:<br>5  print("Invalid input")<br>**----- End of picture text -----**<br>


## **Teaching Tip** 

Keep this basic. Mention later they will learn more specific exceptions. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development65 

_Prepare students to diagnose frequent problems_ 

**==> picture [960 x 33] intentionally omitted <==**

## **Common Beginner Errors** 

- SyntaxError: Python cannot understand the written code structure. 

- NameError: a variable is used before it is defined. 

- TypeError: an operation is used on the wrong type. 

- IndentationError: spacing is wrong in a language where indentation matters. 

**==> picture [360 x 187] intentionally omitted <==**

## **Good teaching move** 

Show one tiny example of each type verbally, even if not all are coded on the slide. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development66 

_Give students a method, not only motivation_ 

**==> picture [960 x 33] intentionally omitted <==**

## **Debugging Tips** 

- Read the error message slowly. 

- Check the line number shown in the terminal. 

- Print intermediate values to inspect them. 

- Simplify the program until the problem becomes easier to isolate. 

**==> picture [360 x 187] intentionally omitted <==**

## **Classroom script** 

Say: do not change ten things at once. Change one thing, test, observe, and continue. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development67 

_Real applications often need to read or write data_ 

**==> picture [960 x 33] intentionally omitted <==**

## **Files in Python** 

- A file is external stored data on disk. 

- Programs can read existing files or create new 

   - ones. 

- This is useful for logs, reports, simple data storage, and configuration. 

- In backend systems, file handling is common for uploads, exports, and text processing. 

**==> picture [360 x 187] intentionally omitted <==**

## **Bridge to real systems** 

Mention uploaded files, reports, and logs as realistic backend examples. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development68 

_Use a small and readable example_ 

**==> picture [960 x 33] intentionally omitted <==**

## **Reading from a File** 

- Create a text file named notes.txt in the same folder. 

**==> picture [54 x 9] intentionally omitted <==**

**----- Start of picture text -----**<br>
Live Code<br>**----- End of picture text -----**<br>


- Use open() with mode "r" for reading. 

- Read the contents and print them. 

- Close the file or use with later in advanced examples. 

- `1 file = open("notes.txt", "r")` 

- `2 content = file.read()` 

- `3 print(content)` 

- `4 file.close()` 

## **Teaching Tip** 

Do not go too deep. The goal is simply to show the concept of external data. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development69 

**==> picture [960 x 33] intentionally omitted <==**

## **Writing to a File** 

_Students should see that programs can also produce output files_ 

- Use mode "w" to write into a file. 

**==> picture [54 x 9] intentionally omitted <==**

**----- Start of picture text -----**<br>
Live Code<br>**----- End of picture text -----**<br>


- If the file does not exist, Python creates it. 

- If it exists, writing may replace old content. 

- Always explain this risk so students are careful. 

- `1 file = open("report.txt", "w")` 

- `2 file.write("Backend Python Lecture 2")` 

- `3 file.close()` 

## **Teaching Tip** 

Stress that mode w can overwrite content. This is a practical warning. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development70 

**==> picture [960 x 33] intentionally omitted <==**

## **Mini Program - Student Information** 

_End the technical part with a small complete example_ 

- Take user input for name and score. 

**==> picture [54 x 9] intentionally omitted <==**

**----- Start of picture text -----**<br>
Live Code<br>**----- End of picture text -----**<br>


- Convert score to int. 

- Use a condition to decide pass/fail. 

- Print a final message. 

**==> picture [295 x 148] intentionally omitted <==**

**----- Start of picture text -----**<br>
1 name = input("Enter student name: ")<br>2 score = int(input("Enter score: "))<br>3<br>4 if score >= 50:<br>5  status = "Passed"<br>6 else:<br>7  status = "Failed"<br>8<br>9 print(f"{name} -> {status}")<br>**----- End of picture text -----**<br>


## **Teaching Tip** 

This example combines input, conversion, condition, and output into one coherent mini application. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development71 

**Python Style Habits to Start Today** _Style affects readability and teamwork_ 

**==> picture [960 x 33] intentionally omitted <==**

- Use meaningful names. 

- Indent consistently with 4 spaces. 

- Do not write extremely long and confusing lines. 

- Leave blank lines between logical blocks of code when it improves readability. 

**==> picture [360 x 187] intentionally omitted <==**

## **State the principle** 

Clean code is a gift to your future self and to anyone who reads your program. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development72 

_Students should see the future purpose of every concept_ 

**==> picture [960 x 33] intentionally omitted <==**

## **How Today’s Topics Connect to Django** 

- Variables and data types appear in form handling and program logic. 

- Conditions appear in validation and access control. 

- Loops appear when processing query results and repeated content. 

- Functions appear in views and helper utilities. 

- Modules appear in project organization. 

**==> picture [360 x 187] intentionally omitted <==**

## **Very important bridge** 

This slide makes the lecture feel purposeful. Without this bridge, Python may seem disconnected from backend development. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development73 

**==> picture [960 x 33] intentionally omitted <==**

## **Final In-Class Activity** 

_Practice is where programming starts to make sense_ 

## **Class Task** 

- Build a small script that asks for a student name, age, and three quiz marks. 

- Store the marks in a list. 

- Calculate the average. 

- Print whether the student passed or failed based on the average. 

**==> picture [360 x 163] intentionally omitted <==**

## **Expected Direction** 

Students may solve this in multiple ways. Accept different correct solutions, but ask them to explain their logic. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development74 

_Use these orally or on the board at the end_ 

**==> picture [960 x 33] intentionally omitted <==**

## **Mini Quiz Questions** 

- What is the difference between = and == ? 

- Why does input() often require int() or float() afterward? 

- When should we use a dictionary instead of a list? 

- What is the difference between print and return? 

- Why is indentation important in Python? 

**==> picture [360 x 187] intentionally omitted <==**

## **Use this interactively** 

Take answers from several students instead of answering everything yourself. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development75 

**==> picture [960 x 33] intentionally omitted <==**

## **Homework** 

_Homework should reinforce execution, not memorization only_ 

- Write a Python program that stores five course names in a list and prints them one by one. 

- Write a function that receives a mark and returns Pass or Fail. 

- Create a dictionary for one student with name, level, and department. 

- Optional challenge: save one result message into a text file. 

**==> picture [360 x 187] intentionally omitted <==**

## **Homework tip** 

Ask students to submit both the code and a screenshot of successful execution. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development76 

_Keep motivation high for the next class_ 

**==> picture [960 x 33] intentionally omitted <==**

## **Preview of Lecture 3** 

- Lecture 3 will move into Object-Oriented Programming (OOP). 

- Students will learn classes, objects, attributes, methods, and constructors. 

- This will prepare them for Django models and more structured code. 

- So today’s basics are the foundation for tomorrow’s organization. 

**==> picture [360 x 187] intentionally omitted <==**

## **Closing message** 

End with confidence: today students learned how to think and work in Python, not only how to type code. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development77 

_Invite questions about code, tools, or concepts_ 

**==> picture [960 x 33] intentionally omitted <==**

## **Thank You - Q&A** 

- Ask students what still feels confusing. 

- Re-run any small code example if needed. 

- Remind them to practice at home on the same machine. 

- Encourage them not to fear errors during practice. 

**==> picture [360 x 187] intentionally omitted <==**

## **Last classroom move** 

Stay for questions about installation problems; these small issues can block learning in future lectures. 

Backend Python + Django | FCAI - Cairo University _ Mohamed Nour Eldien 

Lecture 2 | Python Essentials for Backend Development78 

