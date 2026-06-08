**Backend Python + Django Course | Lecture 7** 

Second Year – Faculty of Computers & AI 

## **Lecture Summary** 

## **Main Points** 

## **Classroom Connection** 

- •Templates are HTML files enhanced by Django syntax. 

- •Views send context data to templates through render(). 

If students understand this slide, they are ready for models-driven templates. 

- •Variables, loops, and conditions make pages dynamic. 

- •Inheritance and include reduce repetition. 

**Teaching Note** Use this slide as your final recap. 

- •Static files and URL tags complete real page building. 

1 

**Backend Python + Django Course | Lecture 7** 

Second Year – Faculty of Computers & AI 

## **Lecture 7: Django Templates and Dynamic Pages** 

## **Main Themes** 

- Templates and render() 

- 

- Variables, loops, and conditions 

- 

## **Teaching Promise** 

Every major idea today is tied to a practical web page example so you can speak from the slide with confidence. 

- Inheritance, include, and static files 

- 

- Hands-on mini project and classroom exercises 

## **Classroom Hint** 

Start with the student portal and keep returning to it throughout the lecture. 

2 

**Backend Python + Django Course | Lecture 7** 

Second Year – Faculty of Computers & AI 

## **Lecture 7: Django Templates and Dynamic Pages** 

## **Lecture Goals** 

## **Real-life link** 

- •Understand what a Django template is and why we use it. 

- •Learn how render() connects a view with an HTML file. 

Think of a student portal page that shows a different name and course list for each student. 

- •Send variables, lists, and condition results from the view to the template. 

- •Use template tags such as for, if, block, extends, and include. 

- •Build pages that feel dynamic instead of hard-coded. 

## **Teaching Note** 

Tell students that this lecture is the bridge between plain HTML and real web applications. 

3 

**Backend Python + Django Course | Lecture 7** 

Second Year – Faculty of Computers & AI 

## **Why Templates Matter** 

## **Main Idea** 

## **Classroom Connection** 

- •A static HTML page shows the same content every time. 

- •A template allows placeholders that Django fills with data. 

A single course page layout can display different course titles, codes, and instructors. 

- •One template can serve many users and many records. 

- •Templates reduce repetition and improve maintainability. 

**Teaching Note** 

Emphasize the saving in time and effort. 

4 

**Backend Python + Django Course | Lecture 7** 

Second Year – Faculty of Computers & AI 

## **Static HTML vs Dynamic Template** 

## **Static HTML** 

- •Fixed text inside the file. 

- •No placeholders for changing data. 

- •Good for a simple one-page site. 

- •Bad choice for a student 

system or e-commerce site. 

## **Django Template** 

- •Contains placeholders like {{ name }}. 

- •Receives values from the view. 

- •Can loop through a list of records. 

- •Can show or hide sections with conditions. 

5 

**Backend Python + Django Course | Lecture 7** 

Second Year – Faculty of Computers & AI 

## **What Is a Template in Django?** 

## **Main Points** 

## **Classroom Connection** 

- •It is still HTML, so the browser can 

   - display it. 

- •It contains variables: {{ variable_name }} 

The browser never sees the Django tags; it only receives the final HTML output. 

- •It contains tags: {% for %}, {% if %}, {% extends %} 

- •It may contain filters: {{ name|upper }} 

- •Django renders it before sending it to 

   - the browser. 

## **Teaching Note** 

Repeat this sentence: the template is processed on the server, not in the browser. 

6 

**Backend Python + Django Course | Lecture 7** 

Second Year – Faculty of Computers & AI 

## **Where Do We Store Templates?** 

## **Main Points** 

## **Classroom Connection** 

- •Common structure: 

app_name/templates/app_name/file.html 

students/templates/students/list.html is safer than list.html alone. 

- •This avoids name collisions between 

   - apps. 

- •Some projects use a global templates folder at the project level. 

## **Teaching Note** 

Mention that organization now prevents confusion later. 

- •You must tell Django where to find templates in settings if needed. 

7 

**Backend Python + Django Course | Lecture 7** 

Second Year – Faculty of Computers & AI 

}, 

}, 

] 

## TEMPLATES = [ 

## { 

## 'BACKEND': 

'django.template.backends.django.DjangoTemplate s', 

'DIRS': [], 

'APP_DIRS': True, 

'OPTIONS': { 

'context_processors': [ 

'django.template.context_processors.request', 

'django.contrib.auth.context_processors.auth', 

'django.contrib.messages.context_processors.mes sages', 

], 

## from pathlib import Path 

BASE_DIR = Path(__file__).resolve().parent.parent 

TEMPLATES = [ 

{ 

'BACKEND': 

'django.template.backends.django.DjangoTemplates', 'DIRS': [BASE_DIR / 'templates'], 'APP_DIRS': True, 'OPTIONS': { 

'context_processors': [ 

'django.template.context_processors.request', 'django.contrib.auth.context_processors.auth', 

'django.contrib.messages.context_processors.messages', ], 

}, 

**==> picture [12 x 16] intentionally omitted <==**

**----- Start of picture text -----**<br>
},<br>**----- End of picture text -----**<br>


] 

**project-level templates folder** 

**Backend Python + Django Course | Lecture 7** 

Second Year – Faculty of Computers & AI 

**import os BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))** 

**from pathlib import Path BASE_DIR = Path(__file__).resolve().parent.parent** 

**Backend Python + Django Course | Lecture 7** 

Second Year – Faculty of Computers & AI 

## **First Template File** 

## **home.html** 

## **What to explain** 

Explain that this is normal HTML. At this stage nothing is dynamic yet. 

- `1 <!DOCTYPE html>` 

- `2 <html>` 

- `3 <head>` 

- `4 <title>Students Home</title>` 

## **Ask students** 

- `5 </head>` 

- `6 <body>` 

- `7 <h1>Welcome to the Students App</h1>` 

If we open this page ten times, will it change? 

- `8 <p>This page is rendered by Django.</p> 9 </body>` 

- `10 </html>` 

## **Common mistake** 

Students may save the file in the wrong folder. 

10 

**Backend Python + Django Course | Lecture 7** 

Second Year – Faculty of Computers & AI 

## **Using render() in a View** 

## **views.py** 

## **What to explain** 

Show that render() takes the request and the template path. It creates the response automatically. 

- `1 from django.shortcuts import render` 

## **Ask students** 

```
2
```

- `3 def home(request):` 

```
4 returnrender(request,'students/home.html')
```

What does Django send back to the browser here? 

## **Common mistake** 

Students may forget the correct relative template path. 

11 

**Backend Python + Django Course | Lecture 7** 

Second Year – Faculty of Computers & AI 

## ~~**URL to Template Flow**~~ 

_Request -> URL -> View -> Template -> Response_ 

## **urls.py** 

## **What to explain** 

Remind students that the URL calls the view, and the view renders the template. 

- `1 from django.urls import path` 

- `2 from . import views` 

## **Ask students** 

```
3
```

- `4 urlpatterns = [` 

```
''
5 path(,views.home,name='home'),
```

Which file receives the browser request first: template or URLconf? 

```
6 ]
```

## **Common mistake** 

Students may think the template is opened directly without a view. 

12 

Second Year – Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 7** 

## ~~**Template Variables**~~ 

_Variables display changing values._ 

## **Main Points** 

## **Classroom Connection** 

- Use double curly braces: {{ variable_name }} 

- The variable name must come from the context dictionary in the view. 

- If the variable is missing, Django usually shows empty output. 

{{ student.name }} works if student is an object passed to the template. 

- Variables can be strings, numbers, objects, or object attributes. 

## **Teaching Note** 

Write the syntax on the board: two curly braces for output. 

13 

**Backend Python + Django Course | Lecture 7** 

Second Year – Faculty of Computers & AI 

## ~~**Sending a Variable from the View**~~ 

_Context is a dictionary of names and values._ 

## **views.py** 

## **What to explain** 

Explain the context dictionary: keys are names used in the template, values are actual data. 

- `1 from django.shortcuts import render` 

```
2
```

- `3 def welcome(request): 4 context = {` 

- `5 'student_name': 'Ali', 6 'level': 2,` 

```
}
```

```
7 }
8 returnrender(request,'students/welcome.html',context)
```

## **Ask students** 

What will the key name be inside the HTML file? 

## **Common mistake** 

Students may confuse the dictionary key with the Python variable name. 

14 

**Backend Python + Django Course | Lecture 7** 

Second Year – Faculty of Computers & AI 

## ~~**Displaying Variables in HTML**~~ 

_The template reads names from the context._ 

## **welcome.html** 

## **What to explain** 

Show how Django replaces each placeholder with the real value before the browser sees it. 

## **Ask students** 

```
1 <h1>Welcome {{ student_name }}</h1>
2 <p>Your academic level is {{ level }}</p>
```

What final HTML will the browser receive for Ali? 

## **Common mistake** 

Students may place extra spaces or wrong braces. 

15 

Second Year – Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 7** 

## ~~**Why Lists Matter in Templates**~~ 

_Most real pages display multiple records, not one value only._ 

## **Main Points** 

## **Classroom Connection** 

- Student lists 

- Course lists 

- Messages, notifications, and comments 

- Search results and tables 

A university system might show all registered courses, not one course only. 

## **Teaching Note** 

Prepare students for loops. 

16 

Second Year – Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 7** 

## ~~**Sending a List to the Template**~~ 

_A list can be passed in the context just like a string._ 

## **views.py** 

## **What to explain** 

The key courses is linked to a Python list. The template will iterate over it. 

- `1 def course_list(request):` 

- `2 courses = ['Python', 'Database', 'AI', 'Networks'] 3 return render(request, 'students/courses.html', {'courses': courses})` 

## **Ask students** 

If the list has four items, how many list elements do you expect on the page? 

## **Common mistake** 

Students may think Django prints the whole Python list automatically in a nice layout. 

17 

Second Year – Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 7** ~~**Template for Loop**~~ 

_Use {% for item in items %} ... {% endfor %}_ 

## **courses.html** 

## **What to explain** 

The for tag repeats the HTML block once for every item in the list. 

- `1 <h2>Registered Courses</h2>` 

- `2 <ul>` 

- `3 {% for course in courses %} 4 <li>{{ course }}</li> 5 {% endfor %}` 

## **Ask students** 

What would happen if the list had zero items? 

- `6 </ul>` 

## **Common mistake** 

Students may forget {% endfor %}. 

18 

Second Year – Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 7** 

## ~~**Handling an Empty List**~~ 

_Good pages handle missing data gracefully._ 

## **courses.html** 

## **What to explain** 

Use if to decide whether to show a list or a fallback message. 

- `1 <h2>Registered Courses</h2>` 

- `2 {% if courses %}` 

- `3 <ul>` 

- `4 {% for course in courses %} 5 <li>{{ course }}</li> 6 {% endfor %}` 

- `7 </ul>` 

## **Ask students** 

Why is this better than showing an empty area? 

- `8 {% else %}` 

- `9 <p>No courses found.</p>` 

- `10 {% endif %}` 

## **Common mistake** 

Students may nest tags incorrectly or forget endif. 

19 

Second Year – Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 7** 

## ~~**Template if Tag**~~ 

_Conditional rendering means showing different HTML in different situations._ 

## **Main Points** 

## **Classroom Connection** 

- Syntax starts with {% if condition %} 

- You may use {% elif %} and {% else %} 

- Always close the condition with {% endif %} 

- Useful for login state, marks, status messages, and empty records. 

Show “Passed” if mark >= passing value, otherwise show “Try again”. 

## **Teaching Note** 

Link to Python if statement from Lecture 2. 

20 

Second Year – Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 7** 

## ~~**Example: Pass or Fail Message**~~ 

_Templates can show different messages based on context values._ 

## **result.html** 

## **What to explain** 

Explain that the value of mark comes from the view. The template only decides which branch to display. 

- `1 <h2>Student Result</h2>` 

- `2 {% if mark >= 50 %}` 

- `3 <p>Passed</p>` 

- `4 {% else %}` 

- `5 <p>Failed</p>` 

## **Ask students** 

If mark is 48, which paragraph will appear? 

- `6 {% endif %}` 

## **Common mistake** 

Students may assume heavy business logic should live here. 

21 

**Backend Python + Django Course | Lecture 7** 

Second Year – Faculty of Computers & AI 

## ~~**Logic in the View vs Logic in the Template**~~ 

_Keep templates simple and readable._ 

## **Good in the view** 

- Complex calculations 

- Database queries 

- Decision-heavy business rules 

- Preparing context data 

## **Good in the template** 

- Simple display conditions 

- Loops for rendering lists 

- Formatting output 

- Choosing visible sections 

22 

**Backend Python + Django Course | Lecture 7** 

Second Year – Faculty of Computers & AI 

## ~~**Displaying Object Attributes**~~ 

_Templates can access attributes with dot notation._ 

## **profile.html** 

## **What to explain** 

If student is an object or model instance, dot notation accesses its attributes. 

- `1 <h2>Student Profile</h2>` 

```
2 <p>Name: {{ student.name }}</p>
```

- `3 <p>Level: {{ student.level }}</p> 4 <p>Department: {{ student.department }}</p>` 

## **Ask students** 

Does student here refer to one object or a list of objects? 

## **Common mistake** 

Students may expect Python method calls with parentheses in templates. 

23 

Second Year – Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 7** 

## ~~**Looping Over Objects**~~ 

_Each iteration can display object attributes._ 

## **students.html** 

## **What to explain** 

Each student inside the loop is one object from the students collection. 

- `1 <ul>` 

- `2 {% for student in students %}` 

- `3 <li>{{ student.name }} - Level {{ student.level` 

- `}}</li>` 

- `4 {% endfor %}` 

## **Ask students** 

What would one line look like for a student named Mona in level 2? 

- `5 </ul>` 

## **Common mistake** 

Students may use the same name for the list and the loop variable. 

24 

Second Year – Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 7** 

## ~~**Template Filters**~~ 

_Filters transform output values without changing the original data._ 

## **Main Points** 

## **Classroom Connection** 

- {{ name|upper }} -> uppercase 

- {{ name|lower }} -> lowercase 

- {{ text|length }} -> number of characters or items 

- {{ title|default:"No Title" }} -> fallback value 

- {{ name|title }} -> title case 

Filters are for presentation, not business logic. 

## **Teaching Note** 

Write the pipe symbol on the board and say “pipe means pass through a filter.” 

25 

## **What is a Django Template Filter?** 

_Quick explanation before the detailed list_ 

A template filter formats or transforms a value before displaying it in HTML. It is used inside Django templates, not in Python code directly. Filters are ideal for simple presentation logic such as making text uppercase, formatting dates, truncating long text, or showing default values. For complex logic, calculations, and database work, use views/models instead of templates. 

## Examples 

{{ name|upper }} {{ bio|truncatewords:10 }} {{ created_at|date:"d/m/Y" }} {{ email|default:"No email" }} 

## **Text Filters (Part 1)** 

_Common text filters students use first_ 

|**Filter**|**What it does**|**Example**|**Output / Note**|
|---|---|---|---|
|upper|Converts text to uppercase letters|{{ name|upper }}|mohamed → MOHAMED|
|lower|Converts text to lowercase letters|{{ name|lower }}|Mohamed → mohamed|
|title|Capitalizes the first letter of each word|{{ department|title }}|computer science → Computer Science|
|capfirst|Capitalizes only the first letter of the<br>first word|{{ text|capfirst }}|hello world → Hello world|
|length|Returns number of letters or list items|{{ students|length }}|Useful for counts|



3 

## **Text Filters (Part 2)** 

_Useful for long descriptions and missing values_ 

|**Filter**|**What it does**|**Example**|**Output / Note**|
|---|---|---|---|
|default|Shows a fallback value if empty|{{ nickname|default:"Guest" }}|If empty → Guest|
|default_if_none|Shows fallback only if value is None|{{ value|default_if_none:"No value" }}|Works only for None|
|truncatechars|Shortens text after a certain number of<br>characters|{{ text|truncatechars:20 }}|Cuts long text and adds ...|
|truncatewords|Shortens text after a certain number of<br>words|{{ text|truncatewords:10 }}|Useful in previews|
|cut|Removes all occurrences of given<br>text/character|{{ text|cut:" " }}|Can remove spaces|



4 

## **Safety and Formatting Filters** 

_Important note: safe can create security issues if content is untrusted_ 

|**Filter**|**What it does**|**Example**|**Output / Note**|
|---|---|---|---|
|safe|Treats text as safe HTML|{{ content|safe }}|Use carefully for trusted HTML only|
|escape|Escapes HTML and shows it as normal<br>text|{{ content|escape }}|Prevents HTML rendering|
|linebreaks|Converts line breaks into HTML<br>paragraphs and <br>|{{ text|linebreaks }}|Good for long user text|
|linebreaksbr|Converts line breaks to <br> only|{{ text|linebreaksbr }}|Simpler than linebreaks|
|filesizeformat|Formats file size into KB/MB/etc.|{{ file.size|filesizeformat }}|1024 → 1 KB|



5 

## **Date and Time Filters** 

_Very common in news, events, and timestamps_ 

|**Filter**|**What it does**|**Example**|**Output / Note**|
|---|---|---|---|
|date|Formats a date value|{{ mydate|date:"Y-m-d" }}|Example: 2026-08-03|
|time|Formats a time value|{{ mytime|time:"H:i" }}|Example: 14:30|
|timesince|Shows time since a past date|{{ created_at|timesince }}|2 days / 3 hours|
|timeuntil|Shows time until a future date|{{ exam_date|timeuntil }}|Useful for countdowns|



6 

## **List and Sequence Filters** 

_Useful in lists, cards, menus, and quick displays_ 

|**Filter**|**What it does**|**Example**|**Output / Note**|
|---|---|---|---|
|first|Returns the first item in a list|{{ students|first }}|Useful with arrays/lists|
|last|Returns the last item in a list|{{ students|last }}|Gets final element|
|join|Joins list items into one string using a<br>separator|{{ courses|join:", " }}|Python, AI, DB|
|slice|Returns part of a list or string|{{ students|slice:":3" }}|First 3 items|
|random|Returns a random item from a list|{{ quotes|random }}|Changes each refresh|
|dictsort|Sorts dictionaries/objects by a key|{{ students|dictsort:"name" }}|Sort by field|



7 

## **Numeric and Logical Filters** 

_Good for reports, statistics, and quantities_ 

|**Filter**|**What it does**|**Example**|**Output / Note**|
|---|---|---|---|
|yesno|Displays words instead of True/False|{{ is_active|yesno:"Yes,No" }}|True → Yes, False → No|
|add|Adds a value|{{ age|add:"5" }}|20 → 25|
|pluralize|Adds plural suffix when count is not 1|{{ count }} item{{ count|pluralize }}|1 item / 2 items|
|floatformat|Controls decimal places|{{ price|floatformat:2 }}|12.3456 → 12.35|



8 

## **Practice Examples** 

_Short exercises for students_ 

- 1) Convert a user name to uppercase. Answer: {{ username|upper }} 

- 2) Show first 15 words from a long description. Answer: {{ description|truncatewords:15 }} 

- 3) Show a default message if email is missing. Answer: {{ email|default:"No email" }} 

- 4) Format an event date as day/month/year. Answer: {{ event_date|date:"d/m/Y" }} 

5) Show Yes/No instead of True/False. Answer: {{ is_active|yesno:"Yes,No" }} 6) Show only first 3 students from a list. Answer: {{ students|slice:":3" }} 7) Show a number with 2 decimal places. Answer: {{ gpa|floatformat:2 }} 

## **Best Filters to Memorize First** 

_Recommended starter list for students_ 

Text: upper, lower, title, capfirst Defaults: default, default_if_none Shortening: truncatechars, truncatewords Lists: length, first, last, join, slice Dates: date, time, timesince Numbers/logic: yesno, add, floatformat, pluralize Safety: safe, escape 

## **Summary** 

_What students should remember_ 

A Django template filter changes the display of a value inside templates. It is written using the pipe symbol | . Many filters are used for text formatting, dates, lists, numbers, and safe output. Use filters for simple presentation logic only. Do not move heavy logic to templates; keep it in views/models. 

**Backend Python + Django Course | Lecture 7** 

Second Year – Faculty of Computers & AI 

## ~~**Examples of Common Filters**~~ 

_Use filters to polish the page output._ 

## **filters demo** 

## **What to explain** 

Explain each filter one by one and show expected output. 

- `1 <p>{{ student_name|upper }}</p> 2 <p>{{ department|title }}</p> 3 <p>{{ bio|length }}</p>` 

```
4 <p>{{ nickname|default:"Guest" }}</p>
```

## **Ask students** 

Which filter would you use if nickname is empty? 

## **Common mistake** 

Students may forget the colon syntax in some filters. 

36 

Second Year – Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 7** 

## ~~**Template Comments**~~ 

_Comments help developers without appearing in the browser._ 

## **comments** 

## **What to explain** 

Django comments are removed during rendering and are not visible in page source as final content. 

```
1 {% comment %}
```

## **Ask students** 

- `2 This section is for the course table.` 

```
3 It may later become a reusable include.
4 {% endcomment %}
```

Why are comments useful in team projects? 

## **Common mistake** 

Students may think HTML comments and template comments are identical in behavior. 

37 

**Backend Python + Django Course | Lecture 7** 

Second Year – Faculty of Computers & AI 

## ~~**The Problem of Repetition**~~ 

_Many pages share the same header, navbar, and footer._ 

## **Main Points** 

## **Classroom Connection** 

- If every page duplicates the full layout, changes become slow. 

- One small edit may need to be repeated in ten files. 

- Repetition increases mistakes and inconsistency. 

- Django template inheritance solves this elegantly. 

Imagine editing the navbar link in 15 pages one by one. 

## **Teaching Note** 

Set up the need for base.html. 

38 

**Backend Python + Django Course | Lecture 7** 

Second Year – Faculty of Computers & AI 

## ~~**Base Template Structure**~~ 

_A parent template defines common layout._ 

## **base.html** 

- `1 <!DOCTYPE html>` 

- `2 <html>` 

## **What to explain** 

Explain the idea of blocks: child templates replace specific sections while the shared layout stays the same. 

- `3 <head>` 

- `4 <title>{% block title %}My Site{% endblock %}</title> 5 </head> 6 <body>` 

- `7 <header>Faculty Portal</header> 8 <nav>Home | Courses | Students</nav>` 

```
9
```

- `10 {% block content %} 11 {% endblock %}` 

- `11 12` 

- `13 <footer>All rights reserved</footer> 14 </body> 15 </html>` 

## **Ask students** 

Which parts stay common for all pages here? 

## **Common mistake** 

Students may forget that the parent file itself is usually not the page-specific content. 

39 

Second Year – Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 7** ~~**Child Template with extends**~~ 

_A child template fills the blocks defined in base.html._ 

## **home.html** 

## **What to explain** 

Show that extends must appear near the top. The child page only writes the changing content. 

- `1 {% extends 'students/base.html' %} 2` 

- `3 {% block title %}Home{% endblock %} 4` 

- `5 {% block content %}` 

- `6 <h1>Welcome to the Home Page</h1>` 

## **Ask students** 

Why is this shorter than writing a full HTML page? 

- `7 <p>This content is specific to this page.</p> 8 {% endblock %}` 

## **Common mistake** 

Students may type content outside the block or use wrong path in extends. 

40 

**Backend Python + Django Course | Lecture 7** 

Second Year – Faculty of Computers & AI 

## ~~**Rules of Template Inheritance**~~ 

_These rules prevent common errors._ 

## **Main Points** 

## **Classroom Connection** 

- Create meaningful block names such as title, content, sidebar. 

- Put {% extends %} at the top of the child template. 

- Keep the base template general and reusable. 

- Do not fill blocks in the base with page-specific details. 

Think of base.html as the building structure and child templates as decorated rooms. 

## **Teaching Note** 

Use the building analogy. 

41 

Second Year – Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 7** 

## ~~**Using include for Reusable Pieces**~~ 

_include inserts a smaller template inside another template._ 

## **example** 

## **What to explain** 

Use include for components like navbars, alerts, cards, and tables. 

- `1 <!-- navbar.html -->` 

- `2 <nav>` 

- `3 <a href="/">Home</a>` 

- `4 <a href="/students/">Students</a>` 

- `5 </nav>` 

## **Ask students** 

```
6
```

- `7 <!-- base.html -->` 

When is include better than extends? 

- `8 <body>` 

- `9 {% include 'students/navbar.html' %}` 

- `10 {% block content %}{% endblock %} 11 </body>` 

## **Common mistake** 

Students may confuse parent-child inheritance with inserting small reusable parts. 

42 

**Backend Python + Django Course | Lecture 7** 

Second Year – Faculty of Computers & AI 

## ~~**Templates and Static Files**~~ 

_HTML alone is not enough for visual design._ 

## **Main Points** 

## **Classroom Connection** 

- CSS styles the page. 

- JavaScript adds browser-side behavior. 

- Images and icons improve clarity. 

- Django uses the static system to serve these files in development. 

A template controls structure; CSS controls appearance. 

## **Teaching Note** 

Clarify the separation of concerns. 

43 

Second Year – Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 7** 

## ~~**Loading Static Files in a Template**~~ 

_Use the static template tag._ 

## **base.html** 

## **What to explain** 

You must load static first. Then Django can build the correct static file URL. 

- `1 {% load static %}` 

- `2 <!DOCTYPE html>` 

- `3 <html>` 

- `4 <head>` 

- `5 <link rel="stylesheet" href="{% static` 

- `'students/style.css' %}">` 

- `6 </head>` 

- `7 <body>` 

## **Ask students** 

Why do we not type the full file path from the computer? 

- `8 <img src="{% static 'students/logo.png' %}" alt="Logo"> 9 </body>` 

- `10 </html>` 

## **Common mistake** 

Students may forget {% load static %}. 

44 

**Backend Python + Django Course | Lecture 7** 

Second Year – Faculty of Computers & AI 

## ~~**Linking Pages with the url Tag**~~ 

_Avoid hard-coded links when possible._ 

## **template link** 

## **What to explain** 

The url tag uses the route name from urls.py. This is safer than writing literal paths. 

## **Ask students** 

```
1 <a href="{% url 'home' %}">Home</a>
2 <a href="{% url 'student_list' %}">Students</a>
```

What happens if the path changes but the route name stays the same? 

## **Common mistake** 

Students may forget to name their URLs in urls.py. 

45 

Second Year – Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 7** 

## ~~**url Tag with Parameters**~~ 

_Dynamic pages often need an ID or slug._ 

## **student row** 

## **What to explain** 

The template passes the current student.id into the URL pattern. 

```
1 <a href="{% url 'student_detail' student.id %}">
2 View Profile
3 </a>
```

## **Ask students** 

If student.id is 7, what kind of path do you expect? 

## **Common mistake** 

Students may not match the URL parameters required in urls.py. 

46 

**Backend Python + Django Course | Lecture 7** 

Second Year – Faculty of Computers & AI 

|**مثال**|**الوظيفة**|**Tag**|
|---|---|---|
|{% extends 'base.html' %}|يرث منtemplateأساسي|**{% extends %}**|
|{% block content %}|يحدد جزء يمكن استبداله|**{% block %}**|
|{% endblock %}|نهاية الـblock|**{% endblock %}**|
|{% include 'navbar.html' %}|إدخالtemplateداخل<br>templateأخرى|**{% include %}**|
|{% if user.is_authenticated %}|شرط|**{% if %}**|
|{% elif marks > 50 %}|شرط إضافي|**{% elif %}**|
|{% else %}|الحالة البديلة|**{% else %}**|
|{% endif %}|نهاية الشرط|**{% endif %}**|
|{% for student in students %}|Loopللتكرار|**{% for %}**|
|{% empty %}|ينفذ إذا كانت القائمة فارغة|**{% empty %}**|
|{% endfor %}|نهاية الـloop|**{% endfor %}**|



**Backend Python + Django Course | Lecture 7** 

Second Year – Faculty of Computers & AI 

> **[{% comment %} text {% ] تعليق ال يظهر للمستخدم {% comment %} endcomment %}** {% endcomment %} نهاية التعليق **{% endcomment %}** {% load static %} static files تحميل **{% load static %}** {% static 'css/style.css' %} static الوصول لملف **{% static %}** {% csrf_token %} CSRF حماية الفورم من **{% csrf_token %}** {% url 'home' %} ديناميكي URL إنشاء **{% url %}** `{% with total=students إنشاء متغير مؤقت **{% with %}** {% endwith %} with نهاية **{% endwith %}** {% autoescape off %} escaping تشغيل/إيقاف **{% autoescape %}** 

**Backend Python + Django Course | Lecture 7** 

Second Year – Faculty of Computers & AI 

|**{% endautoescape %}**|**نهايةautoescape**|**{% endautoescape %}**|
|---|---|---|
|{% cycle 'red' 'blue' %}|التبديل بين قيممتعددة|**{% cycle %}**|
|{% firstof name username 'Guest' %}|أول قيمة غير فارغة|**{% firstof %}**|
|{% now 'Y-m-d' %}|عرض التاريخ/الوقت الحالي|**{% now %}**|
|{% spaceless %}|إزالة المسافات بينHTML tags|**{% spaceless %}**|
|{% endspaceless %}|نهايةspaceless|**{% endspaceless %}**|
|{% regroup students by department<br>as grouped %}|تجميع البيانات حسب قيمة|**{% regroup %}**|
|{% verbatim %}|منعDjangoمن تفسير الكود|**{% verbatim %}**|
|{% endverbatim %}|نهايةverbatim|**{% endverbatim %}**|
|{% lorem 3p%}|إنشاء نص تجريبي|**{% lorem %}**|
|{% filter upper %}|تطبيقfilterعلىblockكامل|**{% filter %}**|
|{% endfilter %}|نهايةfilter|**{% endfilter %}**|
|{% debug%}|عرض معلوماتdebug|**{% debug %}**|
|{% widthratio 5 10 50 %}|حساب نسبة رقمية|**{% widthratio %}**|
|{% templatetagopenblock %}|عرض رموزtemplateنفسها|**{% templatetag %}**|



**Backend Python + Django Course | Lecture 7** 

Second Year – Faculty of Computers & AI 

## ~~**Data Flow Review**~~ 

_The server prepares, the template displays, the browser receives._ 

## **View responsibilities** 

- Collect data 

- Query the database 

- Build the context dictionary 

- Choose the template to render 

## **Template responsibilities** 

- Display variables 

- Repeat HTML with loops 

- Show or hide sections 

- Format output with filters 

50 

Second Year – Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 7** 

## ~~**Mini Project Goal for This Lecture**~~ 

_Build a simple student list page with a base template._ 

## **Main Points** 

## **Classroom Connection** 

- Create base.html 

- Create students/list.html 

- Pass a list of student dictionaries from the view 

- Display the students inside a loop 

- Show a “No students found” message if the list is empty 

This mini project brings together render, context, loops, and inheritance. 

## **Teaching Note** 

Tell them this is the practical heart of the lecture. 

51 

Second Year – Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 7** 

## ~~**Mini Project View**~~ 

_Pass a list of dictionaries from Python to the template._ 

## **views.py** 

## **What to explain** 

Each dictionary acts like one student record. Later this list can come from the database. 

- `1 from django.shortcuts import render 2` 

- `3 def student_list(request): 4 students = [` 

- `5 {'name': 'Ali', 'level': 2},` 

- `6 {'name': 'Mona', 'level': 2}, 7 {'name': 'Omar', 'level': 3}, 8 ]` 

- `8 ] 9 return render(request, 'students/list.html', {'students': students})` 

## **Ask students** 

How many student cards or list items should appear? 

## **Common mistake** 

Students may use curly braces incorrectly or forget commas between dictionaries. 

52 

Second Year – Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 7** ~~**Mini Project Template**~~ 

_Render each student neatly._ 

## **list.html** 

- `1 {% extends 'students/base.html' %} 2` 

## **What to explain** 

Introduce the useful {% empty %} option inside a for loop. It handles empty lists elegantly. 

- `3 {% block title %}Students{% endblock %} 4` 

- `5 {% block content %}` 

- `6 <h2>Students List</h2>` 

- `7 <ul>` 

- `{% for student in students %}` 

```
8
9
```

- `<li>{{ student.name }} - Level {{ student.level` 

```
}}</li>
10 {% empty %}
11 <li>No students found.</li>
12 {% endfor %}
13 </ul>
```

```
14 {% endblock %}
```

## **Ask students** 

What is better here: using if around the loop or using empty inside the loop? 

## **Common mistake** 

Students may forget that empty belongs inside the for block. 

53 

Second Year – Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 7** 

## ~~**Simple CSS for the Student List**~~ 

_Use CSS to make the page easier to read._ 

## **style.css** 

## **What to explain** 

This is a quick reminder that templates work well with external CSS. 

```
1 body{
2 font-family:Arial,sans-serif;
3 }
4
5 li{
6 margin-bottom:8px;
7 padding:6px;
8 background-color:#f4f7fb;
9 }
```

## **Ask students** 

Does CSS make the page dynamic by itself? 

## **Common mistake** 

Students may put CSS in the wrong static folder. 

54 

Second Year – Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 7** ~~**Displaying Data in a Table**~~ 

_Tables are common for admin panels and management systems._ 

## **table example** 

## **What to explain** 

Show the difference between list view and table view. Same data, different presentation. 

- `1 <table border="1">` 

```
2 <tr>
3 <th>Name</th>
4 <th>Level</th>
5 </tr>tr>>
```

```
5 </tr>tr>>
6 {% for student in students %}
7 <tr>tr>>
```

```
7 <tr>tr>>
8 <td>{{ student.name }}</td>
9 <td>{{ student.level }}</td>
10 </tr>
11 {% endfor %}
12 </table>
```

## **Ask students** 

Which layout is better for many columns of data? 

## **Common mistake** 

Students may place the loop around the entire table incorrectly. 

55 

Second Year – Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 7** 

## ~~**Common Template Errors**~~ 

_Most mistakes are small, but they stop the page from rendering correctly._ 

## **Main Points** 

## **Classroom Connection** 

- Wrong template path in render() 

- File saved in the wrong templates folder 

- Missing {% endfor %} or {% endif %} 

- Using a variable name that is not in the context 

- Forgetting {% load static %} 

A small missing brace can break the page. 

## **Teaching Note** 

Normalize mistakes so students are not afraid of them. 

56 

**Backend Python + Django Course | Lecture 7** 

Second Year – Faculty of Computers & AI 

## ~~**How to Debug a Template Problem**~~ 

_Use a simple checklist before asking for help._ 

## **Main Points** 

## **Classroom Connection** 

- Check the file path first. 

- Check the context keys in the view. 

- Check braces and closing tags. 

- Read the traceback carefully. 

Debugging is a skill, not a punishment. 

- Test with a simpler version of the template. 

**Teaching Note** Tell them to isolate the problem. 

57 

Second Year – Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 7** 

## ~~**Class Activity 1: Predict the Output**~~ 

_Read the code mentally before running it._ 

## **Main Points** 

## **Classroom Connection** 

- Given a context with name = "Mona" and level = 2 

- Predict the result of: <p>{{ name }}</p> 

- Predict the result of: {% if level == 2 %}<p>Second Year</p>{% endif %} 

Ask students to answer before you reveal the result. 

- Predict the result of a loop over ["AI", "DB"] 

## **Teaching Note** 

Use the board and let two students write their predictions. 

58 

Second Year – Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 7** 

## ~~**Class Activity 2: Fix the Template Errors**~~ 

_Students identify and correct mistakes._ 

## **broken template** 

## **What to explain** 

There is a missing brace and an unclosed tag syntax error. Let students find both. 

```
1 <ul>
```

- `2 {% for student in students %}` 

- `3 <li>{{ student.name } - Level {{ student.level }}</li> 4 {% endfor %` 

- `5 </ul>` 

## **Ask students** 

Who can point to the exact broken symbols? 

## **Common mistake** 

Do not fix it immediately; wait for students. 

59 

Second Year – Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 7** 

## ~~**Class Activity 3: Design a base Template**~~ 

_Students think structurally, not only syntactically._ 

## **Main Points** 

## **Classroom Connection** 

- Suggest which parts should go into base.html. 

- Suggest which parts belong only to one page. 

- Decide good block names. 

- Discuss whether navbar should be part of base or 

This activity trains architectural thinking. 

- include. 

## **Teaching Note** 

Accept multiple reasonable answers. 

60 

**Backend Python + Django Course | Lecture 7** 

Second Year – Faculty of Computers & AI 

## ~~**Connection to Upcoming Lectures**~~ 

_Templates become much more powerful with models and forms._ 

## **Main Points** 

## **Classroom Connection** 

- With models, the list comes from the database instead of hard-coded data. 

- With forms, the template can display input fields and validation messages. 

Today we simulate data manually. Soon the data will be real. 

- With the admin panel, you can add data and then see it on templates. 

## **Teaching Note** 

Build motivation for Lecture 8 and 9. 

61 

Second Year – Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 7** 

## ~~**Template Best Practices**~~ 

_Small habits make a big difference in real projects._ 

## **Main Points** 

## **Classroom Connection** 

- Use clear variable names in the context. 

- Keep templates simple and readable. 

- Prefer inheritance over copy-paste. 

- Organize files by app. 

Readable templates help teams move faster. 

- Comment tricky sections when needed. 

## **Teaching Note** 

Relate this to software engineering, not just Django syntax. 

62 

**Backend Python + Django Course | Lecture 7** 

Second Year – Faculty of Computers & AI 

## ~~**Running the Project to Test Templates**~~ 

_Remind students of the command flow._ 

## **terminal** 

## **What to explain** 

After saving the view, URL, and template files, run the server and test in the browser. 

## **Ask students** 

```
1 python manage.py runserver
```

What should we do if the server is already running and we changed files? 

## **Common mistake** 

Students may edit files but forget to refresh the browser. 

63 

**Backend Python + Django Course | Lecture 7** 

Second Year – Faculty of Computers & AI 

## ~~**Lab Checklist for Students**~~ 

_A simple order prevents confusion in the lab._ 

## **Main Points** 

## **Classroom Connection** 

- Open the project folder in VS Code. 

- Confirm the app exists and is added in INSTALLED_APPS. 

- Create the templates folder in the right place. 

- Write the view, then the URL, then the HTML file. 

- Run the server and test one page at a time. 

One page working well is better than five broken pages. 

## **Teaching Note** 

Encourage incremental testing. 

64 

Second Year – Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 7** 

## ~~**Quick Quiz 1**~~ 

_Answer verbally before we move on._ 

## **Main Points** 

## **Classroom Connection** 

- What function usually returns a rendered template? 

- What syntax prints a variable value? 

- What tag repeats HTML for each item in a list? 

- What tag creates parent-child template inheritance? 

Wait for students to answer, then confirm. 

## **Teaching Note** 

Do not rush through quiz slides. 

65 

Second Year – Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 7** 

## ~~**Quick Quiz 2**~~ 

_Check understanding of structure and debugging._ 

## **Main Points** 

## **Classroom Connection** 

- Why is base.html useful? 

- When would you use include? 

- Why is hard-coded linking weaker than {% url %}? 

- Give one common template error. 

Use student answers as revision, not judgment. 

## **Teaching Note** 

Invite short explanations, not one-word answers only. 

66 

**Backend Python + Django Course | Lecture 7** 

Second Year – Faculty of Computers & AI 

## ~~**Homework Task**~~ 

_Small but complete practice after class._ 

## **Main Points** 

## **Classroom Connection** 

- Create a base template with header and footer. 

- Create a page called courses.html that extends the base. 

- Pass a list of at least four courses from the view. 

This homework mirrors the lecture workflow. 

- Display the list using a loop. 

- Show a message if the list is empty. 

- Add one CSS file through the static system. 

## **Teaching Note** 

Tell them to submit screenshots and code files if required. 

67 

**Backend Python + Django Course | Lecture 7** 

Second Year – Faculty of Computers & AI 

## ~~**Template Syntax Cheat Sheet**~~ 

_Deepening understanding through focused revision._ 

## **Main Points** 

## **Classroom Connection** 

- {{ variable }} prints a value. 

- {% tag %} performs logic or structure. 

- {# comment #} or {% comment %} hides notes for 

   - developers. 

Keep this slide as a revision anchor. 

- Use | for filters such as upper and length. 

## **Teaching Note** 

Pause and let students speak. 

68 

Second Year – Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 7** 

## ~~**Naming Context Variables Clearly**~~ 

_Deepening understanding through focused revision._ 

## **Main Points** 

## **Classroom Connection** 

- Bad: data, item1, x 

- Better: student_name, course_list, total_marks 

- Clear names make templates readable. 

Relate to clean code from Python basics. 

**Teaching Note** Pause and let students speak. 

69 

Second Year – Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 7** 

## ~~**Why the Browser Never Sees Django Tags**~~ 

_Deepening understanding through focused revision._ 

## **Main Points** 

## **Classroom Connection** 

- Django processes templates on the server. 

- The browser only receives final HTML, CSS, and JS. 

- This is why users cannot directly execute Django template tags. 

Contrast with JavaScript running in the browser. 

## **Teaching Note** 

Pause and let students speak. 

70 

Second Year – Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 7** 

## ~~**TemplateDoesNotExist Error**~~ 

_Deepening understanding through focused revision._ 

## **Main Points** 

## **Classroom Connection** 

- Usually caused by wrong file path or folder structure. 

- Check TEMPLATES setting and app templates folder. 

- Read the missing path shown in the traceback. 

A useful debugging slide. 

**Teaching Note** Pause and let students speak. 

71 

**Backend Python + Django Course | Lecture 7** 

Second Year – Faculty of Computers & AI 

## ~~**Using {% empty %} in a for Loop**~~ 

_Deepening understanding through focused revision._ 

## **Main Points** 

## **Classroom Connection** 

- {% empty %} is cleaner than a separate if in some cases. 

- It keeps the loop and fallback message together. 

- Very useful for list pages. 

Show students both patterns and compare. 

**Teaching Note** Pause and let students speak. 

72 

**Backend Python + Django Course | Lecture 7** 

Second Year – Faculty of Computers & AI 

## ~~**When to Use include vs extends**~~ 

_Deepening understanding through focused revision._ 

## **Main Points** 

## **Classroom Connection** 

- extends = full parent-child page structure 

- include = insert a small reusable partial 

- Many projects use both together. 

Use navbar and footer examples. 

**Teaching Note** Pause and let students speak. 

73 

**Backend Python + Django Course | Lecture 7** 

Second Year – Faculty of Computers & AI 

## ~~**Design Question for Students**~~ 

_Deepening understanding through focused revision._ 

## **Main Points** 

## **Classroom Connection** 

- What blocks would you create for an academic portal base template? 

- Possible answers: title, content, sidebar, scripts 

Pause for brainstorming. 

**Teaching Note** Pause and let students speak. 

74 

**Backend Python + Django Course | Lecture 7** 

Second Year – Faculty of Computers & AI 

## ~~**Mini Reflection**~~ 

_Deepening understanding through focused revision._ 

## **Main Points** 

## **Classroom Connection** 

- What felt easier today: variables, loops, or inheritance? 

- What needs more practice in the lab? 

Use this before closing. 

**Teaching Note** Pause and let students speak. 

75 

