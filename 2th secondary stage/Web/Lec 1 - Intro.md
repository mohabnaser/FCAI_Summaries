## **Backend Python + Django | Lecture 1** 

**Lecture 1 Introduction to Backend Development** Backend Python + Django Course Second Year – Faculty of Computers & AI This lecture builds the foundation before coding: web architecture, backend roles, Python setup, VS Code setup, terminal basics, and the first program. 

**Dr. Mohamed Nour Eldien** 

**==> picture [392 x 483] intentionally omitted <==**

_DR. Mohamed Nour Eldien_ 1 

## **Backend Python + Django | Lecture 1** 

## **Lecture roadmap** 

1. What backend development means 

2. How a website works from browser to server 3. Frontend vs backend vs database 4. Static vs dynamic web pages 5. Why Python is a good backend language 6. What a framework is and why Django matters 7. Installing Python and VS Code 8. Writing and running the first Python program 9. Common beginner mistakes and quick practice 

_Teaching tip: tell students that everything in Django will make more sense after they understand the request–response cycle._ 

_DR. Mohamed Nour Eldien_ 2 

## **Backend Python + Django | Lecture 1** 

## **Learning outcomes** 

_By the end of this lecture, a student should be able to:_ 

## **Conceptual outcomes** 

- •Define backend development in simple words. 

- •Draw the relationship between browser, server, and database. 

- •Explain the difference between static and dynamic websites. 

- •Explain why Python is popular in backend development. 

## **Practical outcomes** 

- •Install Python successfully on a computer. 

- •Install Visual Studio Code and useful extensions. 

- •Open a terminal and navigate to a folder. 

- •Create, save, and run the first Python file. 

_DR. Mohamed Nour Eldien_ 3 

## **Backend Python + Django | Lecture 1** 

## **Where this lecture fits in the course** 

**==> picture [869 x 349] intentionally omitted <==**

**----- Start of picture text -----**<br>
Python  Django  CRUD<br>Web Basics OOP + Files<br>Basics Basics Project<br>Lecture 1 is the foundation. Students who understand this lecture will understand later<br>Django lectures much faster.<br>**----- End of picture text -----**<br>


_DR. Mohamed Nour Eldien_ 4 

## **Backend Python + Django | Lecture 1** 

## **What is backend development?** 

- Backend development is the part of a software system that runs on the server side. 

- It receives requests, processes logic, talks to databases, enforces security, and returns responses. 

- The backend is not usually visible to end users, but it controls the application behavior. 

**Think of the backend as the “brain” of the application.** 

_Use examples students know: university portal, e-commerce checkout, social media login._ 

_DR. Mohamed Nour Eldien_ 5 

## **Backend Python + Django | Lecture 1** 

## **Main responsibilities of a backend** 

## **Data and logic** 

- Store and retrieve data from a database. 

- Validate user input before saving it. 

- Apply business rules, such as login checks or grade calculation. 

- Generate dynamic content based on user data. 

## **Security and integration** 

- Authenticate users and manage permissions. 

- Handle errors and send appropriate messages. 

- Connect the application to email, payment, or other APIs. 

- Serve data to web pages or mobile apps. 

_DR. Mohamed Nour Eldien_ 6 

## **Backend Python + Django | Lecture 1** 

## **Daily-life examples of backend work** 

**1. Logging in to a website** 

**3. Submitting a registration form** 

**5. Checking if a username already exists** 

**2. Searching for a product** 

**4. Saving a new post or comment** 

**6. Generating a personalized dashboard** 

_DR. Mohamed Nour Eldien_ 7 

## **Backend Python + Django | Lecture 1** 

## **Frontend vs Backend** 

## **Frontend (client side)** 

- What the user sees and interacts with. 

- Built using HTML, CSS, and JavaScript. 

- Runs mainly inside the browser. 

- Focuses on layout, colors, buttons, forms, and user experience. 

## **Backend (server side)** 

- Processes requests from users. 

- Built using languages like Python, JavaScript, Java, PHP, or C#. 

- Runs mainly on the server. 

- Focuses on logic, security, and data handling. 

_DR. Mohamed Nour Eldien_ 8 

## **Backend Python + Django | Lecture 1** 

## **Where does the database fit?** 

**==> picture [879 x 397] intentionally omitted <==**

**----- Start of picture text -----**<br>
Requests /  Read / Write<br>Responses data<br>Browser /<br>Backend Server Database<br>User<br>Explain: the database does not talk directly to the user; the backend is the middle layer.<br>**----- End of picture text -----**<br>


_DR. Mohamed Nour Eldien_ 9 

## **Backend Python + Django | Lecture 1** 

## **The 3-tier view of a web application** 

**==> picture [863 x 335] intentionally omitted <==**

**----- Start of picture text -----**<br>
Presentation Layer Application Layer Data Layer<br>SQLite, MySQL,<br>HTML, CSS, JS Python, Django<br>PostgreSQL<br>Browser interface Rules and processing<br>Persistent storage<br>**----- End of picture text -----**<br>


_DR. Mohamed Nour Eldien_ 10 

## **Backend Python + Django | Lecture 1** 

## **Static website vs Dynamic website** 

## **Static website** 

- Shows the same content to all users. 

- Pages are usually plain HTML files. 

- Good for simple informational websites. 

- Changes require editing files manually. 

## **Dynamic website** 

- Content can change based on the user or the database. 

- Generated by backend code. 

- Good for portals, stores, dashboards, and social apps. 

- Can process forms, logins, and user-specific data. 

_DR. Mohamed Nour Eldien_ 11 

## **Backend Python + Django | Lecture 1** 

## **Example: static page behavior** 

- **Static HTML file** 

- `1 <html> 2 <body> 3 <h1>Welcome to the department website</h1> 4 <p>Office hours: 9:00 AM - 2:00 PM</p> 5 </body> 6 </html>` 

- Everyone sees the same page content. 

- There is no logic deciding what to show. 

- No database is required for this simple page. 

_DR. Mohamed Nour Eldien_ 12 

## **Backend Python + Django | Lecture 1** 

## **Example: dynamic page behavior** 

## **Backend creates dynamic content** 

- `1 def dashboard(request): 2 student_name = 'Mona' 3 cgpa = 3.8 4 return render(request, 'dashboard.html', { 5 'student_name': student_name, 6 'cgpa': cgpa 7 })` 

- The page can display different content for each student. 

- The backend can fetch data from a database first. 

- Dynamic websites are the norm in modern applications. 

_DR. Mohamed Nour Eldien_ 13 

## **Backend Python + Django | Lecture 1** 

## **How does a website work?** 

**1. The user enters a URL or clicks a link.** 

**2. The browser sends an HTTP request to the server.** 

3. The backend receives the request and decides what to do. 

4. The backend may read from or write to the database. 

5. The server returns an HTTP response. 

6. The browser displays the page to the user. 

_DR. Mohamed Nour Eldien_ 14 

## **Backend Python + Django | Lecture 1** 

## **The request–response cycle** 

**Request Query (GET /students)** 

_DR. Mohamed Nour Eldien_ 15 

## **Backend Python + Django | Lecture 1** 

## **What is inside a request?** 

**Common request parts** 

- HTTP method such as GET or POST. 

- URL path such as /students or /login. 

- Headers that carry metadata. 

- Optional body data in forms or JSON. 

## **Why requests matter** 

- The method tells the backend the intended action. 

- The URL tells the backend which resource is requested. 

- The body contains user-submitted information. 

- Django reads all of this through the request object. 

_DR. Mohamed Nour Eldien_ 16 

## **Backend Python + Django | Lecture 1** 

## **What is inside a response?** 

**Common response parts** 

- Status code such as 200 or 404. 

- Headers that describe the response. 

- Response body such as HTML, JSON, or plain text. 

- Cookies or session data if needed. 

## **Why responses matter** 

- The browser decides how to display the content. 

- The status code tells the browser whether the request succeeded. 

- APIs often return JSON instead of HTML. 

- In Django, views usually return an HttpResponse or render a template. 

_DR. Mohamed Nour Eldien_ 17 

## **Backend Python + Django | Lecture 1** 

## **HTTP methods: GET and POST are the first two you need** 

**GET** Used to request and read information. Examples: open a page, view student list, search with URL parameters. GET requests should not change important data. 

**POST** Used to send data to the server. Examples: submit a login form, create a new student, upload data. POST is commonly used when data changes are expected. 

_DR. Mohamed Nour Eldien_ 18 

## **Backend Python + Django | Lecture 1** 

## **Three status codes every beginner should know** 

**200 OK 404 Not Found** The request The page or resource succeeded. does not exist. 

**500 Server Error** Something failed inside the backend code. 

_DR. Mohamed Nour Eldien_ 19 

## **Backend Python + Django | Lecture 1** 

## **Anatomy of a URL** 

# **`https://example.com/students/list/?level=2`** 

**Protocol Domain Path Query string** Later in Django, URLs are mapped to views using URL patterns. 

_DR. Mohamed Nour Eldien_ 20 

## **Backend Python + Django | Lecture 1** 

## **Browser, server, and database: one complete picture** 

**==> picture [882 x 360] intentionally omitted <==**

**----- Start of picture text -----**<br>
Database<br>Backend Server<br>User Interface<br>(SQLite /<br>(Python / Django)<br>(browser)<br>PostgreSQL)<br>Sends request Processes logic<br>Stores data<br>**----- End of picture text -----**<br>


_DR. Mohamed Nour Eldien_ 21 

## **Backend Python + Django | Lecture 1** 

## **Why backend development matters in real systems** 

- •Without backend code, a website cannot save student accounts, login data, exam records, or dynamic content. 

- •The backend protects data and makes sure that different users see the right information. 

- •Large systems such as banking apps, hospital systems, and university portals depend heavily on backend logic. 

- •For developers, backend skills open jobs in web development, APIs, data systems, DevOps-adjacent work, and more. 

_DR. Mohamed Nour Eldien_ 22 

## **Backend Python + Django | Lecture 1** 

## **Why is Python a strong choice for backend development?** 

**Reasons students like Python** 

## **Reasons teachers like Python** 

- Readable syntax and simple structure. 

- Large community and many tutorials. 

- Strong libraries for web, data, AI, and automation. 

- Good for beginners and still used in real companies. 

- Students focus on logic instead of complex syntax. 

- Easy transition from simple scripts to full frameworks. 

- Fast prototyping in labs and assignments. 

- Python connects well with databases, APIs, and machine learning. 

_DR. Mohamed Nour Eldien_ 23 

## **Backend Python + Django | Lecture 1** 

## **Python readability compared with intent** 

**==> picture [121 x 10] intentionally omitted <==**

**----- Start of picture text -----**<br>
Simple readable Python<br>**----- End of picture text -----**<br>


   - •The code is close to natural language. 

- `1 name = input('Enter your name: ')` 

- `2 if name:` 

- `3 print('Welcome', name) 4 else: 5 print('Name is required')` 

- •Indentation is part of the language syntax. 

- •This helps beginners write structured code early. 

_DR. Mohamed Nour Eldien_ 24 

## **Backend Python + Django | Lecture 1** 

## **What is a framework?** 

- A framework is a collection of ready-made tools, rules, and structure that helps developers build applications faster. 

- Instead of writing everything from scratch, developers use the framework to organize code and solve common problems. 

**Framework = a professional starting structure** 

- A framework usually handles routing, templates, database access, security, and project structure. 

_DR. Mohamed Nour Eldien_ 25 

## **Backend Python + Django | Lecture 1** 

## **What is Django?** 

## **Django is a high-level Python web framework that helps developers build secure and maintainable websites quickly.** 

- It follows the “batteries included” idea: many useful tools are available from the start. 

- It supports URLs, views, templates, models, forms, admin, and 

   - authentication. 

_Keep this lecture focused on introduction; students will install Django in a later lecture._ 

_DR. Mohamed Nour Eldien_ 26 

## **Backend Python + Django | Lecture 1** 

## **Why many teachers and companies choose Django** 

## **Educational value** 

## **Professional value** 

- Clear project structure. 

- Encourages separation of concerns. 

- Comes with an admin panel. 

- Good documentation and examples. 

- Built-in security helpers. 

- ORM for database work. 

- Scales from small to large projects. 

- Large ecosystem and community support. 

_DR. Mohamed Nour Eldien_ 27 

## **Backend Python + Django | Lecture 1** 

## **Typical backend stack for this course** 

**Python** Programming language 

## **Django** 

Web framework 

**SQLite** Default database 

## **VS Code** 

## **Terminal** 

Code editor Run commands 

_DR. Mohamed Nour Eldien_ 28 

## **Backend Python + Django | Lecture 1** 

## **From concept to practice** 

_Now we move from theory to tool setup_ 

## **In the rest of this lecture, students will prepare the programming environment and run the first Python file.** 

- Step 1: Install Python 

- Step 2: Install VS Code 

- Step 3: Open a project folder 

- Step 4: Create a .py file 

- Step 5: Run the file in the terminal 

_DR. Mohamed Nour Eldien_ 29 

## **Backend Python + Django | Lecture 1** 

## **Before installing anything** 

## **What students should have** 

- A Windows, Linux, or macOS computer. 

- Internet connection for downloading installers. 

- Permission to install software. 

- A folder where course files will be saved. 

## **What teachers should remind them** 

- Use a recent Python 3 version. 

- Do not install random extensions before basics. 

- Keep file names simple: avoid spaces at first. 

- Check whether Python was added to PATH. 

_DR. Mohamed Nour Eldien_ 30 

## **Backend Python + Django | Lecture 1** 

## **Installing Python: overview** 

1. Go to the official Python website. 

2. Download the latest stable Python 3 installer. 

3. Run the installer. 

4. Important: enable “Add Python to PATH”. 

5. Click “Install Now”. 

6. After installation, verify using the terminal. 

_Mention that Python installers differ slightly by operating system, but the logic is similar._ 

_DR. Mohamed Nour Eldien_ 31 

## **Backend Python + Django | Lecture 1** 

## **Python installation screen: what to look for** 

**==> picture [857 x 346] intentionally omitted <==**

**----- Start of picture text -----**<br>
Python<br>•<br>The check box is critical for<br>Installer<br>beginners.<br>•<br>Without PATH, the terminal may<br>not recognize python<br>Add Python to PATH<br>commands.<br>•<br>This slide is an illustration, not<br>the exact installer screenshot.<br>Install Now<br>**----- End of picture text -----**<br>


_DR. Mohamed Nour Eldien_ 32 

## **Backend Python + Django | Lecture 1** 

## **How to verify that Python is installed correctly** 

## **Terminal command** 

- `1 python --version` 

- `2 # or on some systems` 

- `3 python3 --version` 

- Open Command Prompt, PowerShell, or Terminal. 

- Type the version command. 

- If Python is installed correctly, the terminal prints a Python 3.x version. 

- If the command is not recognized, PATH may not be configured properly. 

_DR. Mohamed Nour Eldien_ 33 

## **Backend Python + Django | Lecture 1** 

## **Installing Visual Studio Code (VS Code)** 

1. Go to the official VS Code website. 

2. Download the installer for your operating system. 

3. Run the installer and follow the setup wizard. 

4. Open VS Code after installation. 

5. Later, install the Python extension inside VS Code. 

_VS Code is a code editor, not a programming language and not a framework._ 

_DR. Mohamed Nour Eldien_ 34 

## **Backend Python + Django | Lecture 1** 

## **VS Code interface: main areas** 

**==> picture [808 x 353] intentionally omitted <==**

**----- Start of picture text -----**<br>
•<br>Left sidebar: Explorer and<br>Extensions.<br>•<br>Center area: code editor.<br>•<br>Top tabs: opened files.<br>•<br>Bottom panel: terminal, output,<br>Editor and problems.<br>Explorer |  Search |  Extensions<br>**----- End of picture text -----**<br>


_DR. Mohamed Nour Eldien_ 35 

## **Backend Python + Django | Lecture 1** 

## **Useful extension: Python for VS Code** 

- Open the Extensions icon in the left 

- **Extensions** sidebar. 

- **Search:** • Search for “Python”. 

- **Python** • Install the extension published by Microsoft. 

- • This extension provides syntax highlighting, linting, and easier 

- **Install** execution. 

_DR. Mohamed Nour Eldien_ 36 

## **Backend Python + Django | Lecture 1** 

## **Create a course folder before coding** 

## **Example folder name: backend_course** 

• Inside the folder, students can save all lecture files. 

- Organized folders make later Django projects easier to manage. 

• A clean folder structure reduces confusion in labs and homework. 

_DR. Mohamed Nour Eldien_ 37 

## **Backend Python + Django | Lecture 1** 

## **Open a folder in VS Code** 

1. File → Open Folder 

2. Choose the folder created for the course 

3. Click Select Folder / Open 

4. The folder appears in the Explorer panel on the left 

_DR. Mohamed Nour Eldien_ 38 

## **Backend Python + Django | Lecture 1** 

## **Create the first Python file** 

**==> picture [436 x 353] intentionally omitted <==**

**----- Start of picture text -----**<br>
New file name<br>1 hello.py<br>**----- End of picture text -----**<br>


- In the Explorer panel, click New File. 

- Type the file name hello.py. 

- The .py extension tells the editor this is a Python file. 

_DR. Mohamed Nour Eldien_ 39 

## **Backend Python + Django | Lecture 1** 

## **Write the first Python program** 

**==> picture [42 x 10] intentionally omitted <==**

**----- Start of picture text -----**<br>
hello.py<br>**----- End of picture text -----**<br>


- `1 print('Hello, Backend World!')` 

- The print function displays text in the terminal. 

- Strings are written inside quotes. 

- Save the file before running it. 

_DR. Mohamed Nour Eldien_ 40 

## **Backend Python + Django | Lecture 1** 

## **Save before run** 

## **Keyboard shortcut: Ctrl + S** 

Unsaved files may lead to confusion because the terminal runs the old version of the code, not the changes the student just typed. 

_DR. Mohamed Nour Eldien_ 41 

## **Backend Python + Django | Lecture 1** 

## **What is the terminal?** 

## **Simple definition** 

- The terminal is a text-based interface for running commands. 

- It allows developers to run Python files, install packages, and create projects. 

## **In this course** 

   - We will use it to run Python files. 

   - Later, we will use it to create Django projects. 

   - Students should not fear it; they only need a few commands at first. 

- The terminal is a normal part of programming work. 

_DR. Mohamed Nour Eldien_ 42 

## **Backend Python + Django | Lecture 1** 

## **How to open the terminal inside VS Code** 

## **Method 1: Terminal → New Terminal Method 2: Shortcut Ctrl + `** 

The terminal usually opens at the bottom of the VS Code window. 

_Show this live in class. Students usually understand faster by seeing the terminal panel appear._ 

_DR. Mohamed Nour Eldien_ 43 

## **Backend Python + Django | Lecture 1** 

## **Run the first Python file from the terminal** 

**==> picture [122 x 8] intentionally omitted <==**

**----- Start of picture text -----**<br>
Command to run the file<br>**----- End of picture text -----**<br>


- `1 python hello.py` 

- `2 # or on some systems 3 python3 hello.py` 

- If the terminal is already inside the correct folder, the command should work immediately. 

- The output should appear in the terminal below the command. 

_DR. Mohamed Nour Eldien_ 44 

## **Backend Python + Django | Lecture 1** 

## **Expected output** 

```
> python hello.py
Hello, Backend World!
```

If students see this output, they have completed the first successful program run. 

_DR. Mohamed Nour Eldien_ 45 

## **Backend Python + Django | Lecture 1** 

## **Second program: reading input from the user** 

**==> picture [91 x 10] intentionally omitted <==**

**----- Start of picture text -----**<br>
input_example.py<br>**----- End of picture text -----**<br>


- `1 name = input('Enter your name: ')` 

- `2 print('Welcome,', name)` 

- input() waits for the user to type something. 

- The typed value is stored in the variable name. 

- print() displays the greeting. 

_DR. Mohamed Nour Eldien_ 46 

## **Backend Python + Django | Lecture 1** 

## **Tiny concept break: what is a variable?** 

# **A variable is a named location in memory used to store a value that the program can use later.** 

## **Variables in Python** 

- `1 student_name = 'Mona'` 

- `2 age = 20` 

- `3 print(student_name)` 

_DR. Mohamed Nour Eldien_ 47 

## **Backend Python + Django | Lecture 1** 

## **Common beginner mistakes** 

**Typical mistakes** 

- Forgetting quotes around text. 

- Using wrong indentation. 

- Misspelling python file names. 

- Running the command from the wrong folder. 

## **How to react as a student** 

- Read the error carefully. 

- Check line numbers mentioned in the terminal. 

- Fix one issue at a time. 

- Run the file again after saving. 

_DR. Mohamed Nour Eldien_ 48 

## **Backend Python + Django | Lecture 1** 

## **Mistake example: missing quotes around text** 

**==> picture [755 x 357] intentionally omitted <==**

**----- Start of picture text -----**<br>
Wrong<br>• Without quotes, Python thinks<br>1 print(Hello) Hello is a variable name.<br>• If no such variable exists, Python<br>raises an error.<br>Correct<br>1 print('Hello')<br>**----- End of picture text -----**<br>


- If no such variable exists, Python raises an error. 

_DR. Mohamed Nour Eldien_ 49 

## **Backend Python + Django | Lecture 1 Mistake example: running the command in the wrong folder** 

## **Error situation** 

- `1 C:\Users\Student> python hello.py 2 python: can't open file ...` 

**==> picture [15 x 8] intentionally omitted <==**

**----- Start of picture text -----**<br>
Fix<br>**----- End of picture text -----**<br>


```
1 cd backend_course
2 python hello.py
```

**The terminal must be inside the folder that contains the file.** 

_DR. Mohamed Nour Eldien_ 50 

## **Backend Python + Django | Lecture 1** 

## **Terminal navigation: the cd command** 

**==> picture [147 x 10] intentionally omitted <==**

**----- Start of picture text -----**<br>
Useful navigation commands<br>**----- End of picture text -----**<br>


   - cd changes the current directory. 

   - cd .. goes one level up. 

- `1 cd folder_name 2 cd .. 3 dir   # on Windows` 

   - dir or ls helps students confirm the files in the current folder. 

- `4 ls    # on Linux/macOS` 

_DR. Mohamed Nour Eldien_ 51 

## **Backend Python + Django | Lecture 1** 

## **Class activity 1: students do it now** 

1. Open VS Code. 

2. Open the course folder. 

3. Create hello.py. 

4. Type the print statement. 

5. Save the file. 

**6. Run it in the terminal.** 

_DR. Mohamed Nour Eldien_ 52 

## **Backend Python + Django | Lecture 1** 

## **Class activity 2: personalized greeting** 

## **Task code** 

- `1 name = input('Enter your name: ')` 

- `2 print('Welcome to backend,', name)` 

- Ask each student to replace the text message. 

- Check whether the program waits for input. 

- Let students run it and show the result to a partner. 

_DR. Mohamed Nour Eldien_ 53 

**54** 

## **Backend Python + Django | Lecture 1** 

## **Learning Objectives** 

_What students should be able to do after this lesson_ 

**==> picture [432 x 314] intentionally omitted <==**

Identify the tools required to start coding in Python. 

Create and run a simple Python file from VS Code or the terminal. 

Use variables, input, conditions, loops, lists, and functions. 

Understand how to debug simple mistakes. 

_DR. Mohamed Nour Eldien_ 

**55** 

## **Backend Python + Django | Lecture 1** 

## **Tools You Need Before Coding** 

_Python interpreter and a code editor_ 

**==> picture [432 x 314] intentionally omitted <==**

Install Python 3 on your computer. Use a code editor such as VS Code. Keep a simple folder for your course files. The terminal will be used to run programs. 

```
--
1 python version
```

_DR. Mohamed Nour Eldien_ 

**56** 

## **Backend Python + Django | Lecture 1** 

## **Install VS Code** 

_A popular editor for Python beginners_ 

**==> picture [432 x 314] intentionally omitted <==**

Download VS Code from the official website. Open the installer and complete the setup steps. After installation, launch the editor. 

Later, add the Python extension for better support. 

_DR. Mohamed Nour Eldien_ 

**57** 

## **Backend Python + Django | Lecture 1** 

## **Open a Project Folder** 

_Start with an organized workspace_ 

**==> picture [432 x 314] intentionally omitted <==**

Create a clean folder such as python_basics. 

Use File → Open Folder in VS Code. 

The Explorer panel will show your files on the left. Good organization makes practice easier later. 

_DR. Mohamed Nour Eldien_ 

**58** 

## **Backend Python + Django | Lecture 1** 

## **Create the First Python File** 

_The .py extension tells the editor this is Python code_ 

**==> picture [432 x 314] intentionally omitted <==**

Create a new file and name it hello.py. Type a simple print statement. Save the file before running it. Start with very small examples. 

```
1 print('Hello, Backend World!')
```

_DR. Mohamed Nour Eldien_ 

**59** 

## **Backend Python + Django | Lecture 1** 

## **Run Python from the Terminal** 

_Executing the file is a core skill_ 

**==> picture [432 x 314] intentionally omitted <==**

Open the terminal inside VS Code. Navigate to the correct folder if needed. Use python hello.py or python3 hello.py. The output will appear below the command. 

```
1 python hello.py
```

_DR. Mohamed Nour Eldien_ 

**60** 

## **Backend Python + Django | Lecture 1** 

## **Variables** 

_A variable stores data so the program can use it later_ 

**==> picture [432 x 314] intentionally omitted <==**

Variables hold values such as numbers or text. Choose meaningful names whenever possible. The equal sign assigns a value to a variable. Variables make code easier to read and reuse. 

```
1 name ='Yahya'
2 age =20
```

_DR. Mohamed Nour Eldien_ 

**61** 

## **Backend Python + Django | Lecture 1** 

## **Variable Examples in Code** 

_Reading code is as important as writing it_ 

**==> picture [432 x 314] intentionally omitted <==**

A string is written inside quotes. An integer is written without quotes. Use print() to display variable values. You can combine text with variables in output. 

```
1 name ='Yahya'
2 age =20
3 print(name)
4 print(age)
```

_DR. Mohamed Nour Eldien_ 

**62** 

## **Backend Python + Django | Lecture 1** 

## **Basic Data Types** 

_Python starts with a few essential categories_ 

**==> picture [432 x 314] intentionally omitted <==**

str for text values. int for whole numbers. float for decimal numbers. bool for True / False logic. 

- `1 name = 'Ali'` 

```
2 level =2
3 gpa =3.4
4 is_active =True
```

_DR. Mohamed Nour Eldien_ 

**63** 

## **Backend Python + Django | Lecture 1** 

## **User Input** 

_Programs become interactive when they ask the user for data_ 

**==> picture [432 x 314] intentionally omitted <==**

input() waits for the user to type something. The typed value is stored in a variable. The result of input() is text by default. Use print() to show the result. 

- `1 name = input('Enter your name: ') 2 print('Welcome,', name)` 

_DR. Mohamed Nour Eldien_ 

**64** 

## **Backend Python + Django | Lecture 1** 

## **Using Input in a Real Example** 

_Turn input into a personalized message_ 

**==> picture [432 x 314] intentionally omitted <==**

Read a value from the user. Store it in a variable. Reuse the value in the output. This pattern appears in most applications. 

- `1 city = input('Enter your city: ') 2 print('Your city is', city)` 

_DR. Mohamed Nour Eldien_ 

**65** 

## **Backend Python + Django | Lecture 1** 

## **Type Casting** 

_Convert text input into numbers when needed_ 

**==> picture [432 x 314] intentionally omitted <==**

input() returns text, not numbers. Use int() to convert to an integer. Use float() to convert to a decimal number. Casting is necessary before arithmetic operations. 

- `1 age = int(input('Enter your age: ')) 2 print(age + 1)` 

_DR. Mohamed Nour Eldien_ 

**66** 

## **Backend Python + Django | Lecture 1** 

## **Comments** 

_Comments explain code to humans and are ignored by Python_ 

**==> picture [432 x 314] intentionally omitted <==**

Single-line comments start with #. Use comments to clarify tricky logic. 

Do not write comments that repeat obvious code. Good comments help future revision. 

- `1 # This program reads the user's name` 

```
2 name =input('Enter your name: ')
```

_DR. Mohamed Nour Eldien_ 

**67** 

## **Backend Python + Django | Lecture 1** 

## **Variable Naming Rules** 

_Good naming is both valid and meaningful_ 

**==> picture [432 x 314] intentionally omitted <==**

Names cannot contain spaces. Names cannot start with a number. Use underscore to separate words. Prefer descriptive names over x and y. 

```
1 student_name ='Mona'
2 score_1 =90
```

_DR. Mohamed Nour Eldien_ 

**68** 

## **Backend Python + Django | Lecture 1** 

## **Conditions with if** 

_Programs need decision making_ 

**==> picture [432 x 314] intentionally omitted <==**

Use if to run code only when a condition is true. Conditions often compare values. Indentation is required in Python blocks. Decision logic is everywhere in real systems. 

```
1 age =20
2 ifage >=18:
3 print('Allowed')
```

_DR. Mohamed Nour Eldien_ 

**69** 

## **Backend Python + Django | Lecture 1** 

## **if / else** 

_Handle both the true case and the false case_ 

**==> picture [432 x 314] intentionally omitted <==**

if covers the true branch. else covers the alternative branch. 

This makes decisions complete and clear. Use readable conditions and outputs. 

- `1 marks = 45` 

- `2 if marks >= 50:` 

- `3 print('Pass') 4 else:` 

- `5 print('Fail')` 

_DR. Mohamed Nour Eldien_ 

**70** 

## **Backend Python + Django | Lecture 1** 

## **Logical Operators** 

_Combine multiple conditions using and, or, and not_ 

**==> picture [432 x 314] intentionally omitted <==**

and means both conditions must be true. or means at least one condition is true. not reverses a boolean value. These operators help build realistic rules. 

```
1 ifage >=18 andhas_id:
2 print('Enter')
```

_DR. Mohamed Nour Eldien_ 

**71** 

## **Backend Python + Django | Lecture 1** 

## **Loops: for** 

_Repeat an action for a known number of items_ 

**==> picture [432 x 314] intentionally omitted <==**

A for loop is useful with lists and ranges. It runs the same block many times. The loop variable changes each iteration. Use loops to avoid repetitive code. 

```
1 fori inrange(5):
2 print(i)
```

_DR. Mohamed Nour Eldien_ 

**72** 

## **Backend Python + Django | Lecture 1** 

## **Loops: while** 

_Repeat while a condition remains true_ 

**==> picture [432 x 314] intentionally omitted <==**

while checks a condition before each iteration. 

It is useful when the number of repetitions is unknown. 

The loop must update something inside the body. Otherwise, it may become an infinite loop. 

- `1 count = 0` 

```
2 whilecount <3:
3 print(count)
4 count +=1
```

_DR. Mohamed Nour Eldien_ 

**73** 

## **Backend Python + Django | Lecture 1** 

## **Lists** 

_Store multiple related values in one variable_ 

**==> picture [432 x 314] intentionally omitted <==**

Lists use square brackets [ ]. Items are separated by commas. Each item has an index starting at 0. Lists are one of the most used data structures. 

```
1 students =['Ali','Mona','Sara']
2 print(students[0])
```

_DR. Mohamed Nour Eldien_ 

**74** 

## **Backend Python + Django | Lecture 1** 

## **Functions** 

_Group reusable logic into a named block_ 

**==> picture [432 x 314] intentionally omitted <==**

Functions reduce repetition in code. 

Use def to define a function. 

A function can receive inputs and produce outputs. Functions make programs easier to organize. 

```
1 defwelcome():
2 print('Welcome to Python')
3
```

```
4 welcome()
```

_DR. Mohamed Nour Eldien_ 

**75** 

## **Backend Python + Django | Lecture 1** 

## **Functions with Parameters** 

_Make the same function work with different values_ 

**==> picture [432 x 314] intentionally omitted <==**

Parameters act like inputs inside the function. 

The caller sends values when calling the function. 

This makes one function flexible and reusable. Parameters are essential in practical coding. 

```
1 defwelcome(name):
2 print('Welcome',name)
3
```

- `4 welcome('Yahya')` 

_DR. Mohamed Nour Eldien_ 

**76** 

## **Backend Python + Django | Lecture 1** 

## **return vs print** 

_A key distinction for beginners_ 

**==> picture [432 x 314] intentionally omitted <==**

print() displays a value on the screen. return sends a value back to the caller. 

A returned value can be stored and reused. Many bugs come from confusing these two ideas. 

```
1 defadd(a,b):
2 returna +b
3
4 result =add(2,3)
```

- `5 print(result)` 

_DR. Mohamed Nour Eldien_ 

**77** 

## **Backend Python + Django | Lecture 1** 

## **Debugging** 

_Read errors calmly and fix one issue at a time_ 

**==> picture [432 x 314] intentionally omitted <==**

Syntax errors often come from missing quotes or indentation. 

Tracebacks show the line where Python found a problem. 

Read the error message before changing the code. Save the file and run again after each fix. 

_DR. Mohamed Nour Eldien_ 

**78** 

## **Backend Python + Django | Lecture 1** 

## **Mini Practice Task** 

_A small exercise to combine the ideas_ 

Ask the user for name and age. Convert age to an integer. Print a welcome message. Use if to check whether the user is an adult. 

- `1 name = input('Enter your name: ')` 

- `2 age = int(input('Enter your age: '))` 

- `3 if age >= 18: 4 print('Welcome', name) 5 else:` 

```
6 print('Too young')
```

_DR. Mohamed Nour Eldien_ 

**79** 

## **Backend Python + Django | Lecture 1** 

## **Recap and Homework** 

_What to remember after the lesson_ 

**==> picture [432 x 314] intentionally omitted <==**

Install the tools and run Python from the terminal. 

Practice variables, input, conditions, loops, lists, and functions. 

Rewrite every example by yourself at least once. 

Try a small homework script using more than one concept. 

_DR. Mohamed Nour Eldien_ 

## **Backend Python + Django | Lecture 1** 

## **Think–Pair–Share question** 

## **Question: Why do we say that the backend is the “brain” of the system and not the “face” of the system?** 

Give students 1 minute to think, 1 minute to discuss with a partner, then collect two or three answers. 

_DR. Mohamed Nour Eldien_ 80 

## **Backend Python + Django | Lecture 1** 

## **Mini quiz (oral or written)** 

1. What is the difference between frontend and backend? 

2. What is the purpose of a database? 

3. What is the difference between static and dynamic websites? 

4. Why is Python a good language for beginners? 

5. What command checks the installed Python version? 

_DR. Mohamed Nour Eldien_ 81 

## **Backend Python + Django | Lecture 1** 

## **Lecture recap** 

- Backend runs on the server side and handles logic and data. 

- Web applications involve browser, server, and database. 

- Dynamic websites depend on backend code. 

- Python is a readable and practical backend language. 

- A framework such as Django organizes web development. 

- Students should now be able to install Python, install VS Code, and run a simple script. 

_DR. Mohamed Nour Eldien_ 82 

## **Backend Python + Django | Lecture 1** 

## **Homework** 

1. Install Python and verify the version. 

2. Install VS Code and the Python extension. 

3. Create a folder named lecture1_practice. 

4. Create hello.py and input_example.py. 

5. Run both files successfully. 

6. Write one paragraph: “What does backend mean?” 

_DR. Mohamed Nour Eldien_ 83 

## **Backend Python + Django | Lecture 1** 

## **Preview of Lecture 2** 

**Next lecture: Python essentials for backend development** We will cover variables, data types, conditions, loops, functions, lists, dictionaries, and simple validation examples. 

_DR. Mohamed Nour Eldien_ 84 

