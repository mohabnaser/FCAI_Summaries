## **Lecture 6: Django Apps, URLs, and Views** 

_Backend Python + Django | Second Year – Faculty of Computers & AI_ 

**Apps  •  URLs  •  Views  •  Routing  • Render Dr. Mohamed Nour Eldien** 

Backend Python + Django Course | Lecture 6 

## **Where are we now?** 

_Lecture 5 recap + today’s position_ 

- In Lecture 5 we created a Django project and ran the development server. 

## **Example to mention** 

Use a real page such as /students/about/ or the university portal home page to connect concept to reality. 

- Today we move from “project exists” to “project can serve real pages”. 

- We will create an app, register it, build URLs, write views, and test the result. 

- This is the bridge from setup to real web application behavior. 

Backend Python + Django Course | Lecture 6 

## **Learning Objectives** 

_By the end of this lecture, students should be able to:_ 

- Explain the difference between a Django project and a Django app. 

## **Example to mention** 

Use a real page such as /students/about/ or the university portal home page to connect concept to reality. 

- Create a new app and register it in INSTALLED_APPS. 

- Define URL patterns at both project level and app level. 

- Write function-based views and return HttpResponse or rendered templates. 

- Pass basic data from a view to the browser. 

- Debug common routing and import errors. 

Backend Python + Django Course | Lecture 6 

## **Big Picture of Today** 

_One request, many Django pieces_ 

**==> picture [866 x 336] intentionally omitted <==**

**----- Start of picture text -----**<br>
Browser Project URLs App URLs View Response<br>Read this from left to right while speaking. Ask students where errors can happen.<br>**----- End of picture text -----**<br>


Backend Python + Django Course | Lecture 6 

## **What is a Django App?** 

_The basic reusable unit inside a Django project_ 

- A Django app is a self-contained module that handles one part of the site. 

## **Example to mention** 

Use a real page such as /students/about/ or the university portal home page to connect concept to reality. 

- An app usually has its own views, URLs, models, templates, and admin settings. 

- Examples: students app, courses app, accounts app, library app. 

- Large systems are easier to build when functionality is split into multiple apps. 

Backend Python + Django Course | Lecture 6 

## **Project vs App** 

_Think of the project as the whole site and the app as a department_ 

**Project** 

- Global settings 

- Main URLs file 

- Server configuration 

- Contains many apps 

## **App** 

- Specific feature or domain 

- Own views and logic 

- Can have its own URLs and templates 

- Can be reused in another project 

Backend Python + Django Course | Lecture 6 

## **Real-Life Analogy** 

_University campus analogy_ 

- Project = the whole university campus. 

- App = one building or one department inside that 

## **Example to mention** 

Use a real page such as /students/about/ or the university portal home page to connect concept to reality. 

   - campus. 

- URLs = signs that guide visitors to a destination. 

- Views = the employee or office that handles the request. 

- Response = the final paper, result, or screen shown to the student. 

Backend Python + Django Course | Lecture 6 

## **Creating a New App** 

_Command line step_ 

```
1 python manage.py startapp students
```

Backend Python + Django Course | Lecture 6 

## **Files Created by startapp** 

_What Django gives us automatically_ 

- admin.py: register models in admin panel later. 

- apps.py: app configuration class. 

## **Example to mention** 

Use a real page such as /students/about/ or the university portal home page to connect concept to reality. 

- models.py: define database structure later. 

- tests.py: place automated tests. 

- views.py: write request handling logic. 

- migrations/: database migration history. 

Backend Python + Django Course | Lecture 6 

_Separation of concerns_ 

## **Why Many Apps?** 

- Each app owns a specific responsibility. 

- Code becomes easier to read and maintain. 

## **Example to mention** 

Use a real page such as /students/about/ or the university portal home page to connect concept to reality. 

- Teams can work on different parts in parallel. 

- Bugs become easier to isolate. 

- Some apps can be reused in future projects. 

Backend Python + Django Course | Lecture 6 

## **Register the App in settings.py** 

_Without registration Django does not know your app_ 

- `1 INSTALLED_APPS = [ 2 'django.contrib.admin', 3 'django.contrib.auth', 4 'django.contrib.contenttypes', 5 'django.contrib.sessions', 6 'django.contrib.messages', 7 'django.contrib.staticfiles', 8 'students', 9 ]` 

Backend Python + Django Course | Lecture 6 

## **Common Mistake: App Not Registered** 

_Symptoms students often see_ 

- Templates not discovered as expected later. 

- Models and admin registration not working correctly later. 

## **Example to mention** 

Use a real page such as /students/about/ or the university portal home page to connect concept to reality. 

- Confusion because the folder exists but behavior is incomplete. 

- Always check settings.py after creating any new app. 

Backend Python + Django Course | Lecture 6 

## **How a Request Finds Its View** 

_Routing pipeline_ 

**==> picture [866 x 336] intentionally omitted <==**

**----- Start of picture text -----**<br>
manage.py<br>Browser request project urls.py app urls.py view function<br>runserver<br>Read this from left to right while speaking. Ask students where errors can happen.<br>**----- End of picture text -----**<br>


Backend Python + Django Course | Lecture 6 

## **What is URL Dispatcher?** 

_The component that maps a path to a view_ 

- Django uses URL patterns to decide what code should run. 

## **Example to mention** 

Use a real page such as /students/about/ or the university portal home page to connect concept to reality. 

- A URL pattern has two main parts: the path and the view. 

- Sometimes we also give the URL a name for later use. 

- If no pattern matches, Django returns 404 Not Found. 

Backend Python + Django Course | Lecture 6 

## **Project-Level URLs** 

_Main urls.py in the project folder_ 

- `1 from django.contrib import admin` 

- `2 from django.urls import path, include` 

- `3` 

- `4 urlpatterns = [` 

```
5 path('admin/',admin.site.urls),
6 path('students/',include('students.urls')),
7 ]
```

Backend Python + Django Course | Lecture 6 

## **Why include() Matters** 

_Clean routing architecture_ 

- Project urls stay short and readable. 

- Each app manages its own internal paths. 

## **Example to mention** 

Use a real page such as /students/about/ or the university portal home page to connect concept to reality. 

- New apps can be plugged in without cluttering the main 

   - file. 

- Routing becomes easier to debug and maintain. 

Backend Python + Django Course | Lecture 6 

## **App-Level URLs** 

_students/urls.py_ 

- `1 from django.urls import path` 

- `2 from . import views` 

- `3 4 urlpatterns = [ 5 path('', views.home), 6 path('about/', views.about), 7 ]` 

Backend Python + Django Course | Lecture 6 

## **Your First View Function** 

_A view can return simple text_ 

- `1 from django.http import HttpResponse` 

```
2
```

```
3 defhome(request):
4 returnHttpResponse('Welcome to the Students App')
```

Backend Python + Django Course | Lecture 6 

## **Second View Example** 

_Another page in the same app_ 

- `1 from django.http import HttpResponse` 

```
2
```

- `3 def about(request):` 

```
4 returnHttpResponse('This app handles student pages')
```

Backend Python + Django Course | Lecture 6 

## **What Does request Mean?** 

_Every view receives the request object_ 

- The browser sends a request to the server. 

- Django packages that request into a Python object. 

## **Example to mention** 

Use a real page such as /students/about/ or the university portal home page to connect concept to reality. 

- The view can read method, headers, query data, form data, and more. 

- Even when we do not use it yet, request must exist in the function signature. 

Backend Python + Django Course | Lecture 6 

## **View = Business Logic Entry Point** 

_Where decisions are made_ 

- Check the request. 

- Prepare or fetch data. 

## **Example to mention** 

Use a real page such as /students/about/ or the university portal home page to connect concept to reality. 

- Choose what response to return. 

- Later, views may connect templates, forms, models, and 

   - authentication. 

Backend Python + Django Course | Lecture 6 

## **Returning HTML Inside HttpResponse** 

_Possible, but not the best long-term approach_ 

- `1 from django.http import HttpResponse` 

```
2
```

- `3 def home(request):` 

```
4 return HttpResponse('<h1>Students Home</h1><p>Welcome!</p>')
```

Backend Python + Django Course | Lecture 6 

## **Using render() Instead** 

_Better separation between logic and HTML_ 

- `1 from django.shortcuts import render` 

- `2` 

- `3 def home(request):` 

- `4 return render(request, 'students/home.html')` 

Backend Python + Django Course | Lecture 6 

## **Why Templates Are Better** 

_Preparing for next lecture_ 

- HTML stays readable. 

- Views stay focused on logic. 

## **Example to mention** 

Use a real page such as /students/about/ or the university portal home page to connect concept to reality. 

- Designers and backend developers can work separately. 

- Templates can later receive dynamic data from views. 

Backend Python + Django Course | Lecture 6 

## **Passing Context Data to a Template** 

_View sends data, template displays it_ 

```
1 fromdjango.shortcuts importrender
2
3 defhome(request):
4 data ={
5 'title':'Students Home',
6 'message':'Welcome to the students portal'
7 }
8 returnrender(request,'students/home.html',data)
```

Backend Python + Django Course | Lecture 6 

## **Dynamic URL Parameters** 

_Capture values from the path_ 

- `1 from django.urls import path` 

- `2 from . import views` 

```
3
```

- `4 urlpatterns = [` 

```
5 path('student/<int:id>/',views.student_details),
6 ]
```

Backend Python + Django Course | Lecture 6 

## **View with a URL Parameter** 

_The parameter arrives as a function argument_ 

- `1 from django.http import HttpResponse 2` 

```
3 defstudent_details(request,id):
4 returnHttpResponse(f'Student ID = {id}')
```

Backend Python + Django Course | Lecture 6 

## **Common Path Converters** 

_Django gives us converters out of the box_ 

**Useful converters** 

- str: text without slash 

- int: integer value 

- slug: letters, numbers, hyphen, underscore 

- uuid: UUID value 

## **Example paths** 

- <str:name>/ 

- <int:id>/ 

- <slug:code>/ 

- <uuid:item_id>/ 

Backend Python + Django Course | Lecture 6 

## **Practice 1: Predict the Final URL** 

_In-class activity_ 

**Work in pairs. Read, discuss, then code.** 

- If project urls contain path('students/', 

## **Teaching hint** 

Give students 4–5 minutes first. Then ask one team to explain their routing or view code on the board. 

   - include('students.urls')), what full path opens path('about/', views.about) inside the app? 

- If the app has path('', views.home), what full browser path reaches that view? 

- What full path reaches path('student/<int:id>/', views.student_details) when id = 8? 

Backend Python + Django Course | Lecture 6 

_First match wins_ 

## **Order of URL Patterns Matters** 

- Django checks patterns from top to bottom. 

- Place more specific patterns before broad catch-all patterns. 

## **Example to mention** 

Use a real page such as /students/about/ or the university portal home page to connect concept to reality. 

- Bad ordering can send the request to the wrong view or 

   - hide another route. 

- This becomes especially important in bigger apps. 

Backend Python + Django Course | Lecture 6 

## **Function-Based Views (FBV)** 

_Our focus in this course stage_ 

- A function-based view is a normal Python function. 

- Easy to read for beginners. 

## **Example to mention** 

Use a real page such as /students/about/ or the university portal home page to connect concept to reality. 

- Great for understanding request-response flow clearly. 

- Later Django also supports class-based views, but we delay them now. 

Backend Python + Django Course | Lecture 6 

## **Three Simple Views in One App** 

_A realistic starter example_ 

- `1 from django.http import HttpResponse` 

```
2
```

- `3 def home(request):` 

- `4 return HttpResponse('Students Home Page') 5` 

- `6 def contact(request): 7 return HttpResponse('Contact the students office') 8 9 def help_page(request):` 

- `10 return HttpResponse('Help page')` 

Backend Python + Django Course | Lecture 6 

## **Map Those Views to URLs** 

_Complete the routing_ 

- `1 from django.urls import path` 

- `2 from . import views` 

```
3
```

- `4 urlpatterns = [` 

```
5 path('',views.home),
6 path('contact/',views.contact),
7 path('help/',views.help_page),
```

```
7
8 ]
```

Backend Python + Django Course | Lecture 6 

## **What Makes a Good View?** 

_Simple rules for beginners_ 

- Clear name that reflects page purpose. 

- Short and readable code. 

## **Example to mention** 

Use a real page such as /students/about/ or the university portal home page to connect concept to reality. 

- Return one obvious response. 

- Avoid mixing too many unrelated tasks in one view. 

Backend Python + Django Course | Lecture 6 

## **JSON Response Preview** 

_Views can return machine-readable data too_ 

- `1 from django.http import JsonResponse` 

```
2
```

- `3 def api_status(request):` 

- `4 return JsonResponse({'status': 'ok', 'app': 'students'})` 

Backend Python + Django Course | Lecture 6 

## **Naming URL Patterns** 

_A small habit that helps later_ 

- Named URLs make templates and redirects cleaner. 

- Example: path("about/", views.about, name="about") 

## **Example to mention** 

Use a real page such as /students/about/ or the university portal home page to connect concept to reality. 

- Names reduce hard-coded links later. 

- Names become more useful as projects grow. 

Backend Python + Django Course | Lecture 6 

## **Named URL Example** 

_One line, better maintainability_ 

- `1 urlpatterns = [` 

```
''
2 path(,views.home,name='home'),
3 path('about/',views.about,name='about'),
4 ]
```

Backend Python + Django Course | Lecture 6 

## **Where Do Templates Live?** 

_Preview before the dedicated lecture_ 

- Common app-based pattern: 

   - app_name/templates/app_name/file.html 

## **Example to mention** 

Use a real page such as /students/about/ or the university portal home page to connect concept to reality. 

- Example: students/templates/students/home.html 

- This naming avoids conflicts between apps. 

- APP_DIRS=True helps Django find templates inside apps. 

Backend Python + Django Course | Lecture 6 

## **Minimal Template Example** 

_home.html_ 

- `1 <h1>{{ title }}</h1> 2 <p>{{ message }}</p>` 

Backend Python + Django Course | Lecture 6 

## **End-to-End Example** 

_From URL to HTML on screen_ 

**==> picture [866 x 336] intentionally omitted <==**

**----- Start of picture text -----**<br>
Pattern  Template<br>URL typed View runs Context built<br>matched rendered<br>Read this from left to right while speaking. Ask students where errors can happen.<br>**----- End of picture text -----**<br>


Backend Python + Django Course | Lecture 6 

## **Debugging Tip 1: 404 Not Found** 

_Most routing problems show up here_ 

- Check the full path typed in the browser. 

- Check whether project urls include the app urls. 

## **Example to mention** 

Use a real page such as /students/about/ or the university portal home page to connect concept to reality. 

- Check whether app urls contain the specific pattern. 

- Check trailing slash consistency. 

Backend Python + Django Course | Lecture 6 

## **Debugging Tip 2: Import Errors** 

_When Django cannot find your view or module_ 

- Check file name and function name carefully. 

- Ensure from . import views is correct in app urls. 

## **Example to mention** 

Use a real page such as /students/about/ or the university portal home page to connect concept to reality. 

- Ensure the function exists in views.py. 

- Read the traceback slowly instead of panicking. 

Backend Python + Django Course | Lecture 6 

## **A Small but Complete Working Example** 

_students/views.py + students/urls.py_ 

- `1 # views.py` 

- `2 from django.http import HttpResponse 3` 

- `4 def home(request):` 

- `5 return HttpResponse('Home page')` 

```
6
```

- `7 def about(request): 8 return HttpResponse('About page') 9` 

- `10 # urls.py` 

- `11 from django.urls import path 12 from . import views 13` 

- `14 urlpatterns = [ 15 path('', views.home), 16 path('about/', views.about), 17 ]` 

Backend Python + Django Course | Lecture 6 

## **Practice 2: Build a Courses App Mentally** 

_In-class activity_ 

## **Work in pairs. Read, discuss, then code.** 

- What command creates an app called courses? 

## **Teaching hint** 

Give students 4–5 minutes first. Then ask one team to explain their routing or view code on the board. 

- What line must be added to INSTALLED_APPS? 

- What line must be added to project urls.py? 

- What two views would you create first in the app? 

• What browser paths should open these views? 

Backend Python + Django Course | Lecture 6 

_Understand each piece_ 

## **path() Function Parameters** 

- First argument: route string. 

- Second argument: view function. 

## **Example to mention** 

Use a real page such as /students/about/ or the university portal home page to connect concept to reality. 

- Third optional argument: name. 

- Put together, they define one URL rule. 

Backend Python + Django Course | Lecture 6 

## **Example with name=** 

_Complete pattern syntax_ 

```
1 path('contact/',views.contact,name='contact')
```

Backend Python + Django Course | Lecture 6 

## **Trailing Slash in Django** 

_A detail students must notice_ 

- Many Django examples end paths with /. 

- Keep your style consistent across the project. 

## **Example to mention** 

Use a real page such as /students/about/ or the university portal home page to connect concept to reality. 

- Typing the wrong slash pattern may lead to confusion during testing. 

- Be careful when comparing the route string and the browser URL. 

Backend Python + Django Course | Lecture 6 

_Readable names help teams_ 

## **Good App Names** 

- Use meaningful singular or plural names such as students, courses, library. 

## **Example to mention** 

Use a real page such as /students/about/ or the university portal home page to connect concept to reality. 

- Avoid vague names like app1, data, temp, or test123. 

- Consistency across folder names, app labels, and URLs helps debugging. 

- Choose names that describe responsibility clearly. 

Backend Python + Django Course | Lecture 6 

## **Function-Based View vs HTML File** 

_What stays where?_ 

## **Inside the view** 

- Logic 

- Read request 

- Prepare data 

- Choose response type 

## **Inside the template** 

- HTML structure 

- Displayed text and layout 

- Presentation of context variables 

- Visual page content 

Backend Python + Django Course | Lecture 6 

## **One View, Different Responses** 

_Views can choose how to respond_ 

- `1 from django.http import HttpResponse, JsonResponse 2` 

- `3 def demo(request):` 

```
4 ifrequest.GET.get('format')=='json':
5 returnJsonResponse({'page':'demo'})
6 returnHttpResponse('Demo page')
```

Backend Python + Django Course | Lecture 6 

## **Mini Lab Workflow** 

_How to practice in the lab efficiently_ 

- Create app → register app → create app urls → include app urls → write views → test in browser. 

## **Example to mention** 

Use a real page such as /students/about/ or the university portal home page to connect concept to reality. 

- After every small step, save files and test quickly. 

- Do not write ten steps then test once. 

- Use the terminal output to confirm server behavior. 

Backend Python + Django Course | Lecture 6 

## **Practice 3: Fix the Broken Routing** 

_In-class activity_ 

**Work in pairs. Read, discuss, then code.** 

- A student wrote include('student.urls') but the app folder is students. 

## **Teaching hint** 

Give students 4–5 minutes first. Then ask one team to explain their routing or view code on the board. 

- Another student forgot to create students/urls.py. 

- Another student wrote path('about', views.about) and typed /students/about/ in the browser. 

- Explain the fix for each case. 

Backend Python + Django Course | Lecture 6 

## **Common Error Messages You May See** 

_Read them as clues_ 

- ModuleNotFoundError 

- ImportError 

## **Example to mention** 

Use a real page such as /students/about/ or the university portal home page to connect concept to reality. 

- Page not found (404) 

- ViewDoesNotExist or similar traceback references 

Backend Python + Django Course | Lecture 6 

## **Debug Example: Missing include import** 

_Small mistake, easy fix_ 

- `1 # Wrong` 

- `2 from django.urls import path 3` 

- `4 # Correct` 

- `5 from django.urls import path, include` 

Backend Python + Django Course | Lecture 6 

## **Debug Example: Wrong View Reference** 

_Another common beginner issue_ 

- `1 # Wrong` 

- `2 path('about/', view.about) 3` 

- `4 # Correct` 

- `5 path('about/', views.about)` 

Backend Python + Django Course | Lecture 6 

_Immediate feedback matters_ 

## **Why We Test in the Browser** 

- The browser is the easiest place to verify routing quickly. 

- If the page loads, routing and view are likely connected correctly. 

## **Example to mention** 

Use a real page such as /students/about/ or the university portal home page to connect concept to reality. 

- If not, the URL or traceback usually points to the problem. 

- Test one page at a time. 

Backend Python + Django Course | Lecture 6 

## **How This Connects to Backend Thinking** 

_Not just Django syntax_ 

- Client asks for a resource. 

- Server routes the request. 

## **Example to mention** 

Use a real page such as /students/about/ or the university portal home page to connect concept to reality. 

- Backend logic decides the response. 

- Django is implementing the same general backend idea using Python. 

Backend Python + Django Course | Lecture 6 

## **Quick Quiz 1** 

_Check understanding now_ 

## **Which file usually contains the line include("students.urls")?** 

A. students/views.py 

**Answer B. project urls.py** 

B. project urls.py 

C. students/models.py 

D. settings.py 

Backend Python + Django Course | Lecture 6 

## **Quick Quiz 2** 

_Concept check_ 

## **A view function must receive which required first argument?** 

A. response B. request C. template D. id only 

**Answer B. request** 

Backend Python + Django Course | Lecture 6 

_Routing check_ 

## **Quick Quiz 3** 

## **If project urls route students/ to students.urls, and app urls contain path("about/", views.about), what is the full path?** 

A. /about/ 

**Answer B. /students/about/** 

B. /students/about/ 

C. /students/ 

D. /about/students/ 

Backend Python + Django Course | Lecture 6 

## **Best Practices Summary** 

_Small rules with big impact_ 

- Use meaningful app names. 

- Register every app immediately after creating it. 

## **Example to mention** 

Use a real page such as /students/about/ or the university portal home page to connect concept to reality. 

- Keep urls organized using include(). 

- Write small, clear views. 

- Test every route in the browser. 

- Read tracebacks carefully. 

Backend Python + Django Course | Lecture 6 

## **What We Are Not Covering Yet** 

_To keep the foundation clear_ 

- Class-based views 

- Forms and POST handling in depth 

## **Example to mention** 

Use a real page such as /students/about/ or the university portal home page to connect concept to reality. 

- Database queries with models 

- Authentication and permissions 

- APIs with Django REST Framework 

Backend Python + Django Course | Lecture 6 

## **Connection to Lecture 7** 

_Why templates are the next natural step_ 

- Today we saw render(request, template). 

- Next lecture explains templates in detail. 

## **Example to mention** 

Use a real page such as /students/about/ or the university portal home page to connect concept to reality. 

- We will build dynamic HTML pages instead of plain text responses. 

- That means your Django site will start to look like a real website. 

Backend Python + Django Course | Lecture 6 

## **Homework** 

_Complete these tasks before the next class_ 

- Create a new Django app called courses. 

- Register it in INSTALLED_APPS. 

## **Example to mention** 

Use a real page such as /students/about/ or the university portal home page to connect concept to reality. 

- Connect it to project urls using include(). 

- Create at least three views: home, about, and contact. 

- Create matching URL patterns and test them in the browser. 

- Write down any errors you faced and how you fixed them. 

Backend Python + Django Course | Lecture 6 

## **Speaking Prompt for the Lab** 

_How to explain your solution aloud_ 

- What app did you create and why? 

- How did you register the app? 

## **Example to mention** 

Use a real page such as /students/about/ or the university portal home page to connect concept to reality. 

- How did the request move from project urls to app urls? 

- What does each view return? 

- Which problem did you face during testing? 

Backend Python + Django Course | Lecture 6 

## **Final Summary Map** 

_One sentence per concept_ 

- App = a focused module inside the project. 

- INSTALLED_APPS = activates the app inside Django. 

## **Example to mention** 

Use a real page such as /students/about/ or the university portal home page to connect concept to reality. 

- Project urls = main entry for routing. 

- App urls = routes inside one app. 

- View = Python function that handles the request and 

   - returns a response. 

- Render = return an HTML template, usually with data. 

Backend Python + Django Course | Lecture 6 

## **Thank You** 

Next time: Templates and Dynamic Pages 

Homework first. Templates next. 

Backend Python + Django Course | Lecture 6 

