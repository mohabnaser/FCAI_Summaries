**Backend Python + Django Course • Lecture 5** 

## **Lecture 5 Getting Started with Django** 

_Installing the framework, creating the first project, understanding the files, and running the development server._ 

**Dr. Mohamed Nour Eldien** 

**Goal: every student leaves the lab able to create and run a fresh Django project.** 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **Why do we need a framework?** 

_Students already know Python syntax; now they need a faster way to build full web apps._ 

## **Core classroom idea** 

- Writing every web feature from zero wastes time. 

- A framework provides ready-made structure and common tools. 

- It reduces repeated code such as routing, forms, and admin tasks. 

## **Simple example** 

Imagine building a student portal. Without a framework, you would manually connect URLs, forms, database logic, and templates. With Django, many of these pieces are already organized for you. 

- It helps teams follow one organized style. 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **What is Django?** 

_A high-level Python web framework_ 

## **Definition** 

- Django is built using Python. 

- It is designed for rapid development. 

- It follows a structured architecture called MVT. 

## **Why teachers like it for second-year students** 

It is practical, readable, and close to real industry work. Students can build useful web apps early without getting lost in too much low-level setup. 

- It includes admin panel, ORM, routing, templates, and security features. 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

**==> picture [905 x 288] intentionally omitted <==**

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **Why Django is a strong teaching choice** 

_It is fast to learn, but also real enough for serious projects._ 

## **Technical strengths** 

- Clean project structure 

- Built-in admin interface 

- ORM instead of raw SQL at the start 

- Good documentation and a huge community 

## **Teaching strengths** 

It lets us connect Python, web basics, templates, URLs, models, and forms inside one coherent environment. That is perfect for a semester plan. 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **Django follows the MVT pattern** 

_Model • View • Template_ 

## **Three main pieces** 

- Model: handles data and database tables. 

- View: receives requests and decides what logic to run. 

- Template: controls what the user sees in HTML. 

## **Important teaching note** 

MVT in Django is close to MVC in the general web-development discussion. For our course, focus on the role of each file rather than memorizing terms only. 

Faculty of Computers & AI • Cairo University 

**==> picture [803 x 453] intentionally omitted <==**

## **Backend Python + Django Course • Lecture 5** 

## **A simple Django request flow** 

_Show the path from browser to response in one straight line._ 

## **Browser** 

The user types a URL or submits a form. 

## **URL + View** 

## **Model** 

Django matches If needed, data is the path and read from or runs a Python written to the function. database. 

**Template Response** The HTML is browser prepared for the shows the user. result. 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **Part 1 • Tools and Installation** 

_Python, pip, VS Code, terminal, virtual environment, and Django package._ 

**In this part, slow down and connect every command to a real classroom demonstration.** 

Faculty of Computers & AI • Cairo University 

## **Python + Django Setup Workflow** 

Open VS Code • Create a virtual environment • Install Django • Create the project • Run the local server 

- What each step does 

- Why the step is necessary 

- Where to write each command 

- How the project folder changes after key steps 

**Key idea** 

VS Code = write code Terminal = run commands Browser = view result 

**==> picture [287 x 429] intentionally omitted <==**

1 

Python + Django Setup 

**Backend Python + Django Course • Lecture 5** 

Faculty of Computers & AI • Cairo University 

## **Workflow overview** 

_From local setup to a running Django website_ 

- 1. Open the backend_course folder in VS Code. 

- 2. Open the integrated terminal. 

## **Folder status before setup** 

- 3. Verify that Python is installed. 

- 4. Create and activate a virtual environment. 

```
backend_course/
```

- 5. Install Django with pip. 

- 6. Create a Django project and enter its folder. 

- 7. Run the local development server. 

- 8. Open the project in the browser at http://127.0.0.1:8000/ 

- `1 python --version` 

- `1 python -m venv venv` 

- `1 venv\Scripts\activate` 

- `1 pip install django` 

- `1 django-admin startproject myproject` 

2 

Python + Django Setup 

## **Step 1 — Open VS Code** 

## **Action** 

```
1 File → Open Folder → backend_course
```

## **Where to do it** 

Inside Visual Studio Code. 

## **Why this step matters** 

- Opening the whole folder lets VS Code manage the project as one workspace. 

- The Explorer panel will show files and folders clearly. 

- The integrated terminal will usually open in the correct location. 

- This becomes very important later when Django creates many files. 

**==> picture [423 x 254] intentionally omitted <==**

**----- Start of picture text -----**<br>
Folder at this moment<br>backend_course/<br>**----- End of picture text -----**<br>


## **Remember** 

This step prepares the next one. The workflow should be followed in order. 

3 

Python + Django Setup 

## **Step 2 — Open Terminal** 

## **Action** 

**==> picture [354 x 46] intentionally omitted <==**

**----- Start of picture text -----**<br>
1 Terminal → New Terminal<br>**----- End of picture text -----**<br>


## **Folder still unchanged** 

## **Where to do it** 

## Inside Visual Studio Code, at the bottom panel. 

## **Why this step matters** 

```
backend_course/
```

- The terminal is where you run Python and Django commands. 

- You will use it to create the virtual environment, install packages, and run the server. 

- Keeping the terminal inside VS Code is easier for 

   - students because code, commands, and output stay in one place. 

## **Remembe** 

## **r** 

This step prepares the next one. The workflow should be followed in order. 

4 

Python + Django Setup 

## **Step 3 — Check Python** 

## **Action** 

```
1 python --version
```

**==> picture [97 x 14] intentionally omitted <==**

**----- Start of picture text -----**<br>
Folder change<br>**----- End of picture text -----**<br>


## **Where to do it** 

Write the command in the VS Code terminal. 

## **Why this step matters** 

```
No new files yet.
```

- This confirms that Python is installed correctly. 

- Django cannot work until Python is available on the 

   - computer. 

- It also confirms that the terminal recognizes the python command. 

- If the command is not recognized, Python may not be installed or PATH may not be configured correctly. 

## **Remember** 

If Python is not recognized, fix the installation before moving on. 

5 

Python + Django Setup 

## **Step 4 — Create the virtual environment** 

## **Action** 

```
1 python -m venv venv
```

## **Folder after Step 4** 

## **Where to do it** 

Write the command in the VS Code terminal while you are inside backend_course. **Why this step matters** 

- A virtual environment creates an isolated Python environment for this project only. 

```
backend_course/
├── venv/
```

- It keeps the project’s packages separate from other projects on the same computer. 

- This prevents version conflicts when different projects need different package versions. 

- It makes the project easier to move to another machine later. 

## **Remember** 

Creating the environment does not activate it. Activation is the next step. 

6 

Python + Django Setup 

## **Step 5 — Activate the virtual environment** 

## **Action** 

**==> picture [354 x 46] intentionally omitted <==**

**----- Start of picture text -----**<br>
1 venv\Scripts\activate<br>**----- End of picture text -----**<br>


## **Folder after Step 5** 

## **Where to do it** 

Write the command in the VS Code terminal on Windows. 

## **Why this step matters** 

- Activation tells the terminal to use the project’s private Python environment now. 

```
backend_course/
├── venv/
Terminal prompt shows: (venv)
```

- After activation, installed packages go into this environment instead of the global system. 

- You should see (venv) at the start of the terminal line. 

- This is the sign that the environment is active and ready for Django installation. 

## **Remember** 

Look for (venv) in the terminal prompt as proof of activation. 

7 

Python + Django Setup 

## **Step 6 — Install Django** 

## **Action** 

**==> picture [354 x 46] intentionally omitted <==**

**----- Start of picture text -----**<br>
1 pip install django<br>**----- End of picture text -----**<br>


## **Folder after Step 6** 

## **Where to do it** 

Write the command in the VS Code terminal after activation. 

## **Why this step matters** 

- pip is Python’s package manager; it downloads and installs external libraries. 

**==> picture [297 x 43] intentionally omitted <==**

**----- Start of picture text -----**<br>
backend_course/<br>├── venv/<br>│   └── Django package files installed here<br>**----- End of picture text -----**<br>


- Django is a Python web framework, not part of the basic Python installation. 

- We install Django because it provides routing, views, templates, models, forms, admin tools, and database support. 

- Installing Django inside the virtual environment keeps the setup clean and project-specific. 

## **Remembe** 

## **r** 

Install Django only after the environment is active. 

8 

Python + Django Setup 

## **Step 7 — Create the Django project** 

## **Action** 

## `1 django-admin startproject myproject` 

## **Where to do it** 

Write the command in the VS Code terminal while still in backend_course. 

## **Why this step matters** 

- This command creates the standard Django project structure automatically. 

- It generates the main configuration files needed to start development. 

## **Folder after Step 7** 

```
backend_course/
├── venv/
└── myproject/
├── manage.py
└── myproject/
├── settings.py
├── urls.py
├── asgi.py
└── wsgi.py
```

- You do not need to build the project structure manually from scratch. 

- This saves time and reduces mistakes for beginners. 

## **Remember** 

This step prepares the next one. The workflow should be followed in order. 

9 

Python + Django Setup 

## **Backend Python + Django Course • Lecture 5** 

## **Initial project tree** 

_Use this slide to point at each file with the cursor._ 

## **myproject/** 

Outer project folder Contains manage.py and the inner package 

**Inside the inner manage.py myproject/ folder** Command entry point Inner project settings.py Used for package urls.py runserver, Contains settings asgi.py migrate, and URLs wsgi.py startapp 

Faculty of Computers & AI • Cairo University 

## **Step 8 — Enter the project folder** 

## **Action** 

```
1 cd myproject
```

## **Terminal location after Step 8** 

## **Where to do it** 

Write the command in the VS Code terminal. 

## **Why this step matters** 

```
backend_course\myproject>
```

- The file manage.py is inside the myproject folder. 

- Most Django commands must be run from the folder that contains manage.py. 

- This moves the terminal into the correct location for the next command. 

## **Remember** 

If manage.py is not found, you are probably in the wrong folder. 

10 

Python + Django Setup 

## **Step 9 — Run the Django server** 

## **Action** 

```
1 python manage.py runserver
```

## **What happens now?** 

## **Where to do it** 

Write the command in the terminal inside the myproject folder. 

## **Why this step matters** 

- This starts Django’s local development server. 

## `No major folder change.` 

```
The project becomes available locally in the browser.
```

- The server allows your browser to connect to the project running on your own computer. 

- It lets you test pages, URLs, templates, and backend logic during development. 

- This is a development server used for learning and local testing. 

## **Remember** 

Keep the server running while you test the project in the browser. 

11 

Python + Django Setup 

## **Step 10 — Open the browser** 

## **Action** 

**==> picture [354 x 46] intentionally omitted <==**

**----- Start of picture text -----**<br>
1 http://127.0.0.1:8000/<br>**----- End of picture text -----**<br>


## **Final status** 

## **Where to do it** 

Write the URL in Chrome, Edge, Firefox, or any browser. 

## **Why this step matters** 

- 127.0.0.1 means your own computer (localhost). 

- Port 8000 is the default port used by Django’s development server. 

```
backend_course/
├── venv/
└── myproject/
├── manage.py
└── myproject/
Browser opens: http://127.0.0.1:8000/
```

- If the setup is correct, you will see the default Django welcome page. 

- This confirms that Python, the virtual environment, Django, the project structure, and the server are all working together. 

## **Remembe** 

## **r** 

If the page opens successfully, the setup chain worked end to end. 

12 

Python + Django Setup 

## **One-sentence summary for students** 

## **Write code in VS Code → run commands in Terminal → view the result in the Browser** 

- Python is the programming language. 

- The virtual environment protects the project and keeps packages isolated. 

- Django is the framework that provides the web application structure. 

- manage.py is the command entry point for the Django project. 

## **Final project view** 

```
backend_course/
├── venv/
```

```
└── myproject/
├── manage.py
└── myproject/
├── settings.py
└── urls.py
```

- The browser shows the running local website at 

   - 127.0.0.1:8000. 

13 

Python + Django Setup 

**Backend Python + Django Course • Lecture 5** 

## **Tool checklist before writing code** 

_Make students verify the environment before typing framework commands._ 

## **Required items** 

- Python installed 

- pip available 

- VS Code installed 

## **Teacher note** 

Spend real time here. In many labs, this is where students get blocked. A working environment saves huge time later. 

- Terminal or command prompt working 

- Internet connection for package 

   - installation 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **Check the Python version** 

_First command to verify the interpreter_ 

## **What to explain** 

   - Run the command in terminal. 

   - If Python is installed, a version number appears. 

   - If command not found appears, 

- `1 python --version` 

- `2 # sometimes` 

   - installation or PATH is the problem. 

- `3 python3 --version` 

**Show it live in class before moving on.** 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **Installing Python – Step 1** 

_Download from the official website_ 

## **What students should do** 

- Open python.org in the browser. 

- Download Python 3 for your operating system. 

- Prefer the stable release shown on the home page. 

## **Why the official site matters** 

The official site gives the correct installer, documentation, and trusted version. This reduces confusion and avoids broken package setups. 

- Start the installer normally. 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **Installing Python – Step 2** 

_The important checkbox on Windows_ 

## **Critical point** 

- On Windows, check “Add Python to PATH”. 

- Then continue the installation. 

- Without PATH, terminal may not recognize python. 

## **How to explain PATH simply** 

PATH is like a list of places the operating system searches when you type a command. If Python is not in that list, the terminal cannot find it easily. 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **Verify pip** 

_pip is Python’s package installer_ 

## **What to explain** 

   - pip installs packages such as Django. 

   - It should show a version and Python path. 

- `1 pip --version` 

- `2 # sometimes` 

   - If pip is missing, Python installation may be incomplete. 

- `3 pip3 --version` 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **Install VS Code** 

_A lightweight editor that works well with Python and Django_ 

## **What students do** 

- Download from code.visualstudio.com. 

- Run the installer and keep default options. 

- Open VS Code after installation. 

- Allow it to add desktop or context-menu shortcuts if needed. 

## **Why VS Code is enough for this course** 

It gives us file navigation, syntax coloring, terminal, and extensions in one place. Students can see code and run commands without switching tools constantly. 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **Install the Python extension in VS Code** 

_This improves running, linting, and editing Python files._ 

## **Steps** 

- Open the Extensions sidebar. 

- Search for Python. 

- Install the Microsoft Python extension. 

- Restart VS Code if needed. 

## **Benefit in class** 

Students get syntax help, interpreter selection, and a smoother workflow. It reduces confusion when opening .py files and virtual environments. 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **Create a course workspace folder** 

_Keep each project inside a clean parent folder._ 

## **Recommended classroom structure** 

- Create one main folder such as backend_course. 

- Inside it, create another folder for today’s project. 

## **Why organization matters** 

Later we will have many apps, templates, and environments. A clean folder structure makes debugging and revision much easier. 

- Avoid saving projects in random places on the desktop. 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **Open the folder in VS Code** 

_File → Open Folder is better than opening individual files._ 

## **Explain this workflow** 

- Open the whole project folder, not one file only. 

- The Explorer will show the full project tree. 

## **Why it matters for Django** 

Django commands such as startproject and runserver depend on where the terminal is opened. The working directory matters. 

- The integrated terminal will open inside that folder. 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **Open the integrated terminal** 

_Use the terminal inside VS Code instead of switching to many windows._ 

## **What to explain** 

   - The prompt opens inside the current folder. 

   - Most Django commands are typed here. 

   - Students should learn to read the 

- `1 Terminal → New Terminal` 

- current path before running commands. 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **Part 2 • Virtual Environment** 

_Students must understand isolation before package installation._ 

**In this part, slow down and connect every command to a real classroom demonstration.** 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **What is a virtual environment?** 

_A separate Python environment for one project_ 

## **Core meaning** 

- It isolates project packages from the system-wide Python. 

- Different projects can use different package versions. 

## **Simple analogy** 

Think of it as a private lab table for one project. The tools on that table belong to this project only. 

- It keeps the machine cleaner and more predictable. 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **Create a virtual environment** 

_Use the built-in venv module_ 

## **What to explain** 

   - python runs the interpreter. 

   - -m means run a module as a script. 

   - venv is the module name. 

- The last venv is the folder name that will be created. 

- `1 python -m venv venv` 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **Activate the environment on Windows** 

_The prompt usually changes after activation_ 

## **What to explain** 

   - This is the common Windows activation command. 

   - After activation, the prompt often starts with (venv). 

   - That visual cue is very important. 

- `1 .\venv\Scripts\activate` 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **Activate the environment on macOS / Linux** 

_A slightly different command path_ 

## **What to explain** 

   - Use source followed by the activation script path. 

   - The goal is the same: enter the isolated environment. 

   - Again, look for (venv) in the 

- `1 source venv/bin/activate` 

- prompt. 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **Install Django inside the environment** 

_The package manager downloads the framework and its dependencies_ 

## **What to explain** 

   - Run it after activating the virtual environment. 

   - pip downloads Django into the environment only. 

   - Students need internet for this 

- `1 pip install django` 

- step. 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **Verify the Django installation** 

_Make the framework introduce itself_ 

## **What to explain** 

   - A version number means the installation succeeded. 

   - If command not found appears, environment or PATH may be wrong. 

- `1 django-admin --version` 

- This is like a health check before project creation. 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **Part 3 • First Django Project** 

_From startproject to the first successful page in the browser._ 

**In this part, slow down and connect every command to a real classroom demonstration.** 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **Create the first project** 

_The command that generates the initial structure_ 

## **What to explain** 

   - django-admin is the commandline tool. 

   - startproject tells Django to generate a new project. 

- `1 django-admin startproject myproject` 

- myproject is the project name; students can change it. 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **What appears after startproject?** 

_Two important levels: outer folder and inner project package_ 

## **What students will see** 

- An outer folder named myproject 

- A manage.py file 

- An inner folder also named myproject 

## **Teacher advice** 

Students often get confused by the two similar names. Slow down here and point to each level clearly in the file explorer. 

- Inside it: settings.py, urls.py, asgi.py, wsgi.py 

Faculty of Computers & AI • Cairo University 

## **Backend Python + Django Course • Lecture 5** 

## **Initial project tree** 

_Use this slide to point at each file with the cursor._ 

## **myproject/** 

Outer project folder Contains manage.py and the inner package 

**Inside the inner manage.py myproject/ folder** Command entry point Inner project settings.py Used for package urls.py runserver, Contains settings asgi.py migrate, and URLs wsgi.py startapp 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **What is manage.py?** 

_The command entry point for project administration_ 

## **Use cases students will repeat often** 

- Run the development server 

- Create apps 

- Make migrations 

## **Simple wording to tell the class** 

manage.py is not where we write the main web logic. It is the tool we use to control the project from the command line. 

- Migrate the database 

- Create admin users 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **What is settings.py?** 

_The central configuration file_ 

## **What lives there** 

- Installed apps 

- Database configuration 

- Templates and static settings 

## **How to explain it simply** 

If the project were a machine, settings.py would be the control panel where many general switches are stored. 

- Language, timezone, and security-related settings 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **What is urls.py?** 

_The traffic map of the project_ 

## **Key role** 

- Maps URL paths to views or included app 

   - routes. 

- Controls where each request should go. 

- Grows gradually as the project grows. 

## **Analogy** 

Think of it as a road map. When the browser requests /students/, Django checks the map to know which code should handle that request. 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **What are asgi.py and wsgi.py?** 

_Deployment-related entry files_ 

## **Simple explanation for beginners** 

- They help servers communicate with your Django project. 

- wsgi.py is the traditional interface used by many deployments. 

## **What to tell second-year students** 

Do not fear these files. In the first phase of the course, students mainly need to recognize their purpose, not edit them deeply. 

- asgi.py is useful for newer async-capable 

   - setups. 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **Run the development server** 

_The most repeated command in daily Django work_ 

## **What to explain** 

   - Run this command from the outer project folder. 

   - Django starts a local development server. 

   - The terminal prints an address such as 127.0.0.1:8000. 

- `1 python manage.py runserver` 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **How to read the startup message** 

_Do not skip the terminal output_ 

## **Important items on the screen** 

- Server address 

- Confirmation that no fatal error occurred 

- Watching for file changes with auto-reload 

## **Teacher note** 

Train students to read terminal messages. In real work, the terminal often explains exactly what is happening. 

- Quit command hint 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **Open the browser at 127.0.0.1:8000** 

_This is the first visible success moment for students._ 

## **What students should see** 

- The default Django welcome page 

- A message showing the installation worked 

- A clear sign that the project is alive locally 

## **Why this moment matters** 

This is often the first time students feel they have launched a real web framework on their own machine. 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **Stop the server correctly** 

_The standard terminal shortcut_ 

## **What to explain** 

   - This stops the running development server. 

   - Students should use it before changing folders or closing the terminal. 

- A running server keeps the 

- `1 Ctrl + C` terminal busy. 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **Part 4 • Common Setup Problems** 

_Turn classroom errors into teaching moments instead of panic._ 

**In this part, slow down and connect every command to a real classroom demonstration.** 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **Problem 1: “python is not recognized”** 

_A classic setup issue on Windows_ 

## **What it usually means** 

- Python is not installed, or 

- Python is installed but not added to PATH. 

- Sometimes the terminal needs to be reopened after installation. 

## **Immediate classroom fix** 

Close and reopen terminal, verify the installation, and if needed reinstall Python with the PATH option checked. 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **Problem 2: packages installed in the wrong place** 

_The student forgot to activate the environment_ 

## **Symptoms** 

- Django installed globally instead of in the project environment 

- The prompt does not show (venv) 

## **How to teach the habit** 

Before any pip install command, students should look at the prompt and confirm the environment is active. 

- Commands behave differently between machines 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **Problem 3: Port already in use** 

_The default port 8000 may be busy_ 

## **What happens** 

- runserver tries to use port 8000 by default. 

- Another process may already be using it. 

## **Fast solution** 

Stop the other process if you can, or run the server on another port such as 8001. 

- Django will complain that the address is 

   - already in use. 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **Run the server on another port** 

_Useful when 8000 is busy_ 

## **What to explain** 

   - The last number is the desired port. 

   - Open the browser at the new address. 

- `1 python manage.py runserver 8001` 

- This does not change the project itself; it only changes where the local server listens. 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **Part 5 • Project and App Preview** 

_Today we preview apps so students are ready for the next lecture._ 

**In this part, slow down and connect every command to a real classroom demonstration.** 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **Project vs App in Django** 

_One of the most important distinctions for beginners_ 

## **Project** 

- The whole website configuration 

- Contains overall settings and global URLs 

- Can include many apps 

## **App** 

A smaller module focused on one feature or domain, such as students, courses, blog, or accounts. A project may contain several apps that work together. 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **Create the first app (preview)** 

_We will use apps deeply in the next lecture_ 

## **What to explain** 

   - Run it from the same outer folder that contains manage.py. 

   - A new folder called students will be created. 

- `1 python manage.py startapp students` 

- This command gives us files for views, models, admin, tests, and more. 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **Register the app in settings.py** 

_Django must know which apps are installed._ 

## **What students will do later** 

- Open settings.py 

- Find the INSTALLED_APPS list 

- Add the app name such as students 

## **Reason** 

If the app is not registered, Django will not fully include its models and related behavior in the project lifecycle. 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **INSTALLED_APPS example** 

_A tiny code change with big importance_ 

## **Explain first** 

- The list contains built-in Django apps already. 

- We append our app name as a string. 

- Pay attention to commas and quotation marks. 

- `1 INSTALLED_APPS = [` 

- `2 'django.contrib.admin', 3 'django.contrib.auth', 4 'django.contrib.contenttypes', 5 'django.contrib.sessions', 6 'django.contrib.messages', 7 'django.contrib.staticfiles', 8 'students', 9 ]` 

Faculty of Computers & AI • Cairo University 

## **Backend Python + Django Course • Lecture 5** 

## **A first Django view** 

_Views are Python functions that receive a request and return a response._ 

## **Explain first** 

- The function takes request as input. 

- It returns an HttpResponse object. 

- This is a minimal example before templates. 

- `1 from django.http import HttpResponse` 

- `2` 

- `3 def home(request):` 

- `4 return HttpResponse("Welcome to Django")` 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **A first app-level URL pattern** 

_The path decides which view should run_ 

## **Explain first** 

- path connects a URL to a view function. 

- The empty string means the root path of that app. 

- This code is usually placed in students/urls.py. 

- `1 from django.urls import path` 

- `2 from . import views 3` 

- `4 urlpatterns = [` 

- `5 path('', views.home), 6 ]` 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **Include app URLs in the main project** 

_Project-level URLs can delegate to app-level URLs_ 

## **Explain first** 

- include sends a group of routes to the app. 

- This keeps the project organized as it grows. 

- Each app can manage its own URL file. 

- `1 from django.contrib import admin 2 from django.urls import path, include 3` 

- `4 urlpatterns = [ 5 path('admin/', admin.site.urls), 6 path('students/', include('students.urls')), 7 ]` 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **HttpResponse is the simplest response** 

_Useful for testing routing before templates_ 

## **What to explain** 

   - Good for early testing. 

   - Not ideal for full page design. 

   - Later we will use render and templates for real pages. 

- `1 from django.http import HttpResponse` 

- `2` 

- `3 def about(request):` 

- `4 return HttpResponse("About page")` 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **Templates: the next step after HttpResponse** 

_HTML files give us structured pages instead of plain text responses._ 

## **What changes conceptually** 

- The view can prepare data. 

- The template controls the page layout. 

- This separates logic from presentation. 

## **Why that is good** 

Students can keep Python logic in views and visual page structure in HTML templates. This is cleaner and easier to maintain. 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **Django admin: a built-in power feature** 

_One reason many beginners love Django quickly_ 

## **What the admin can do** 

- Manage records through a ready-made interface 

- Add, edit, and delete data 

- Review models without building custom pages first 

## **Teaching value** 

It lets students see their data in a real interface early. This creates motivation before building their own forms and dashboards. 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **Create an admin user** 

_Django calls it a superuser_ 

## **What to explain** 

   - The terminal will ask for username, email, and password. 

   - This account can sign in to the admin panel. 

   - Students should choose 

- `1 python manage.py createsuperuser` 

memorable credentials during lab work. 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **What is a migration?** 

_A controlled way to apply model changes to the database_ 

## **Beginner understanding** 

- Models describe data structure in Python. 

- Migrations translate those structural changes into database operations. 

- They keep database evolution organized. 

## **Simple analogy** 

Think of the model as the design on paper and the migration as the approved construction change applied to the actual building. 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **Generate migration files** 

_Django inspects model changes and prepares migration instructions_ 

## **What to explain** 

   - Creates migration files based on model changes. 

   - It does not yet apply them to the database. 

   - Think of it as preparing the plan. 

- `1 python manage.py makemigrations` 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **Apply migrations to the database** 

_This step updates the actual database tables_ 

## **What to explain** 

   - Reads migration files and applies them. 

   - Creates or updates database tables. 

- `1 python manage.py migrate` 

- Needed before many features can work correctly. 

Faculty of Computers & AI • Cairo University 

## **Backend Python + Django Course • Lecture 5** 

## **End-to-end classroom workflow** 

_From empty folder to a running local Django project_ 

**4. 1. Check 3. Install 5. 6. startapp 2. venv startprojec tools runserver Django preview t** Python Create pip install Generate Open Prepare for pip Activate verify version project files browser next lecture VS Code 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **Classroom Practice 1** 

_Students work in pairs for 5–7 minutes_ 

## **Task** 

- One student explains the installation sequence out loud. 

- The other student types the commands in the correct order on paper or in VS Code. 

## **Expected output** 

By the end, each pair should be able to write a correct sequence from checking Python to running the first server. 

- Then they swap roles. 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **Classroom Practice 2** 

_Identify files by role_ 

## **Ask students to match** 

- manage.py → command tool 

- settings.py → project configuration • urls.py → route map 

## **Teacher direction** 

Call random students to explain one file in one sentence only. Short answers reveal whether the concept is clear. 

• asgi.py / wsgi.py → server entry interfaces 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **Mini Quiz** 

_Use these orally or as a quick written check_ 

## **Questions** 

- What is the purpose of a virtual environment? 

- What does startproject create? 

- Which file is used to run project commands? 

## **How to use in class** 

Ask students to answer in full sentences, not one-word answers. This helps them practice technical explanation, not memorization only. 

- What command starts the development 

   - server? 

- Where do we register a new app? 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **Homework** 

_Students must repeat the full setup on their own machine._ 

## **Required tasks** 

- Install Python if needed and verify python -- version. 

- Create and activate a virtual environment. 

## **Optional challenge** 

Ask students to create an app named students and identify the generated files, even if they do not build features yet. 

- Install Django. 

- Create a project named fcai_project. 

- Run the server successfully and take a 

   - screenshot. 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **Lecture recap** 

_Five messages students should remember after class_ 

## **Main takeaways** 

- Django is a Python web framework that gives structure. 

- A working environment is the first real success condition. 

## **Closing line to students** 

If you can repeat today’s setup independently, then you are ready for apps, URLs, views, and templates in the next lectures. 

- Virtual environments isolate project packages. 

- startproject creates the initial project 

   - structure. 

- runserver lets us view the project in the browser. 

Faculty of Computers & AI • Cairo University 

**Backend Python + Django Course • Lecture 5** 

## **Preview of Lecture 6** 

_Next time: apps, URLs, views, and the first real pages_ 

## **What comes next** 

- Create apps with purpose 

- Connect app URLs to project URLs 

- Write views that return responses 

## **Motivation note** 

Today we prepared the lab. Next lecture we begin the real application flow inside that lab. 

- Start thinking like a Django developer 

Faculty of Computers & AI • Cairo University 

